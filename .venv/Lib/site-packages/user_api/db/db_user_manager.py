# -*- coding: utf-8 -*-
"""
Contains the DB User manager.
"""

from .db_exception import (
    DBUserConflict,
    DBUserNotFound
)
from typing import List
from .models import User, Role
from sqlalchemy import exc
from .db_manager import DBManager
from sqlalchemy import and_, or_
from sqlalchemy.orm import load_only, exc as orm_exc, joinedload, noload


class DBUserManager(DBManager):
    """
    Handles the interactions with the database.
    """

    def __init__(
            self,
            url
    ):
        """
        Constructor.
        Args:
            url (string): The construction URL to connect to the database.
        """
        DBManager.__init__(self, url)

    def to_user_dict(self, user, with_roles=False):
        """
        Take a user Object to transform it into dict.
        Args:
            user (User): The user to process.
            with_roles(boolean): Display roles or not.
        Returns:
            (dict): The user.

        """
        j_user = {
            col: getattr(user, col)
            for col in [u"id", u"email", u"name", u"active"]
        }
        if with_roles:
            j_user[u"roles"] = [self.to_role_dict(role) for role in user.roles]
        j_user["customer"] = {
            "id": user.customer
        }
        return j_user

    def get_user_information(self, user_id, with_roles=False):
        """
        Get the information of the user from his email.
        Args:
            user_id (string||int): The email of the user we want the information.
            with_roles (boolean): Fetch the roles with the user.

        Returns:
            (dict): The user information.
        """
        filters = {}
        try:
            filters[u"id"] = int(user_id)
        except ValueError:
            filters[u"email"] = user_id

        session = self.get_session()
        columns = [u"id", u"email", u"name", u"active"]

        try:
            options = [load_only(*columns)]
            if with_roles:
                options.append(joinedload(User.roles))

            user = session.query(User).filter_by(**filters).options(*options).one()
            return self.to_user_dict(user, with_roles)

        except orm_exc.NoResultFound:
            raise DBUserNotFound

    def update_user_information(self, email, name, active, user_id, roles=None):
        """
        Update information for a user.
        Args:
            email (string): The updated email for the user.
            name (string): The updated name for the user.
            active (boolean): The updated status for the use.
            user_id (int): The ID of the user to update.
            roles (list of dict): A list of groups to apply to the user.

        Returns:
            (dict): The updated user.
        """

        session = self.get_session()
        try:

            if roles is not None:

                user = session.query(User).filter_by(id=user_id).options(joinedload(User.roles)).one()
                to_save_role_ids = [role.get(u"id") for role in roles]
                saved_role_ids = [role.id for role in user.roles]

                # Remove
                for role in reversed(list(user.roles)):
                    if role.id not in to_save_role_ids:
                        user.roles.remove(role)

                # Add
                role_ids_to_add = [
                    role_id
                    for role_id in to_save_role_ids
                    if role_id not in saved_role_ids
                ]

                roles_to_add = session.query(Role).filter(Role.id.in_(role_ids_to_add)).all()
                for role in roles_to_add:
                    user.roles.append(role)

            session.query(User)\
                .filter_by(id=user_id)\
                .update({
                    u"email": email,
                    u"name": name,
                    u"active": active
                })
            session.commit()
        except exc.IntegrityError:
            raise DBUserConflict
        except orm_exc.NoResultFound:
            raise DBUserNotFound

        session.commit()
        return self.get_user_information(user_id, with_roles=True)

    def get_user_salt(self, email):
        """
        Get the salt for the user.
        Args:
            email (string): The email of the user we want the salt.

        Returns:
            (string): The salt.
        """
        session = self.get_session()
        try:
            user = session.query(User).filter_by(email=email).options(load_only(u"salt")).one()

        except orm_exc.NoResultFound:
            raise DBUserNotFound

        return user.salt

    def modify_hash_salt(self, email, hash, salt):
        """
        Modify the hash / salt for a specific user (email).
        Args:
            email (string): The email of the user to alter.
            hash (string): The hash (password).
            salt (string): The salt associated with the hash before saving.
        """
        session = self.get_session()
        session.query(User)\
            .filter_by(email=email)\
            .update({User.hash: hash, User.salt: salt})

        session.commit()

    def save_new_user(
            self, 
            email: str, 
            name: str, 
            active: bool, 
            hash: str, 
            salt: str, 
            roles: List[dict],
            customer_id: int
        ):
        """
        Save a new user.
        Args:
            email (string): The email of the user to save.
            name (string): The name of the user.
            active (boolean): Does the user need to be active or not.
            hash (string): The hash (password).
            salt (string): The salt associated with the hash before saving.
            roles (list of dict): List of roles to save.
            customer_id (int): The customre related to the user.

        Raises:
            (ValueError): if user breaks a constraint.
        """
        try:
            session = self.get_session()

            roles_to_add = session.query(Role).filter(Role.id.in_([
                role[u"id"] for role in roles
            ])).all()


            user = User(
                email=email,
                name=name,
                active=active,
                hash=hash,
                salt=salt,
                roles=roles_to_add,
                customer=customer_id
            )
            session.add(user)
            session.commit()
            return self.get_user_information(user_id=user.id, with_roles=True)

        except exc.IntegrityError as err:
            raise DBUserConflict

    def is_user_hash_valid(self, email, hash):
        """
        Check if a hash is valid.
        Args:
            email (string): The email of the user we are checking the hash.
            hash (string): The hash to test.

        Returns:
            (boolean): If the hash is valid or not.
        """
        session = self.get_session()
        user = session.query(User).filter_by(email=email).options(load_only(u"hash")).one()

        return False if (user is None or hash != user.hash) else True

    def list_users(self, customer_id: int, limit=20, offset=0, email=None, name=None):
        """
        List the users from the API.
        Args:
            customer_id (int): The corresponding customer id.
            limit (int): The max number of returned users.
            offset (int): The cursor.
            email (string): An email to filter on.
            name (string): A name to filter on.

        Returns:
            (list of dict, boolean): A list of user representations. The boolean stands for if there is more to fetch.
        """
        session = self.get_session()
        columns = [u"id", u"email", u"name", u"active"]

        filters = []
        if email is not None:
            filters.append(User.email.like(u"%{}%".format(email)))

        if name is not None:
            filters.append(User.name.like(u"%{}%".format(name)))

        filters.append(User.customer==customer_id)
        
        users = session.query(User)\
            .options(load_only(*columns), noload(u"roles"))\
            .filter(or_(*filters))\
            .offset(offset)\
            .limit(limit+1)

        if users.count() > limit:
            users = users[:-1]
            has_next = True
        else:
            has_next = False

        return [
            self.to_user_dict(user, with_roles=False)
            for user in users
        ], has_next

