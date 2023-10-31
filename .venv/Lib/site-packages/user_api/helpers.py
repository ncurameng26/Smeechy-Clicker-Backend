# -*- coding: utf-8 -*-
"""
Contains helpers to help construct objects.
"""

from .user_api import UserApi
from .db.db_user_manager import DBUserManager
from .db.db_role_manager import DBRoleManager
from .auth.auth_manager import AuthManager
from user_api.db.models import Base, Role, User, Customer
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.orm.exc import NoResultFound


def create_user_api(
    db_url,
    jwt_secret,
    jwt_lifetime=3600 * 12 * 30,
    user_created_callback=None,
    user_updated_callback=None
):
    """
    Create a user API method.
    Args:
        db_url (unicode): The DB url for connection.
        jwt_secret (unicode): The secret used to generate tokens.
        jwt_lifetime (unicode): How long each token is valid.
        user_created_callback (callable): Optional method to be called when a user is created.
        user_updated_callback (callable): Optional method to be called when a user is edited.

    Returns:
        (UserApi): The constructed UserApi object.
    """
    return UserApi(
        db_user_manager=DBUserManager(db_url),
        db_role_manager=DBRoleManager(db_url),
        auth_manager=AuthManager(
            jwt_lifetime=jwt_lifetime,
            jwt_secret=jwt_secret
        ),
        user_created_callback=user_created_callback,
        user_updated_callback=user_updated_callback
    )

def init_db(
        db_url: str,
        drop_before: bool = False
    ):
    """
    Init the user api database.
    Args:
        db_url (str): The connection string to the database.
        drop_before (bool): If true, the database is deleted first.
    """
    engine = create_engine(db_url, echo=True)
    conn = engine.connect()
    conn.execution_options(isolation_level="AUTOCOMMIT")
    if drop_before:
        conn.execute("DROP DATABASE IF EXISTS user_api")
    conn.execute("CREATE DATABASE user_api;")
    conn.close()
    engine = create_engine("{}/{}".format(db_url, "user_api", echo=True))
    Base.metadata.create_all(bind=engine)

def add_customer(db_url: str):
    """
    Add a customer in the database.
    Args:
        db_url (str): The connection string to the database.
    Returns:
        (int): The created customer id.
    """
    db_url = "{}/{}".format(db_url, "user_api")
    engine = create_engine(db_url, echo=True)
    session = sessionmaker(engine)()
    customer = Customer()
    session.add(customer)
    session.commit()
    return customer.id

def add_user(
        db_url: str, 
        jwt_secret: str,
        username: str,
        email: str,
        password: str,
        customer_id: int = 1
    ):
    """
    Create a base user in the database.
    Args:
        db_url (str): The connection string to the database.
        jwt_secret (str): The JWT secret used to generate the hash in the DB.
        username (str): The name of the user to create.
        email (str): The email of the user to create.
        password (str): The password of the user to create.
        customer_id (int): The customer ID relative to the user.
    """
    db_url = "{}/{}".format(db_url, "user_api")
    engine = create_engine(db_url, echo=True)
    session = scoped_session(
        sessionmaker(autocommit=False, autoflush=False, bind=engine)
    )

    # Create user api object
    user_api = create_user_api(
        db_url=db_url,
        jwt_secret=jwt_secret
    )

    # Create Admin user.
    user_api.register(
        customer_id, {
        "email": email,
        "name": username,
        "active": True,
        "roles": [
            {"id": 1}
        ],
        "password": password
    })
    # Fetch created Admin.
    admin = session.query(User).filter_by(email=email).one()
    # Add admin to admin role.
    try:
        admin_role = session.query(Role).filter_by(code="admin").one()
    except NoResultFound:
        admin_role = Role(code=u"admin", name=u"Admin")

    admin_role.users.append(admin)
    session.add(admin_role)
    session.commit()

