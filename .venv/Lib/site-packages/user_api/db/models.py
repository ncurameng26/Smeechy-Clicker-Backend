# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    Table,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

user_has_role = Table(u'user_has_role', Base.metadata,
    Column(u'user_id', Integer, ForeignKey(u'_user.id')),
    Column(u'role_id', Integer, ForeignKey(u'role.id'))
)
class SchemaSpec(Base):
    __tablename__ = "schema_spec"

    id = Column(Integer, primary_key=True, autoincrement=True)
    version = Column(String(255), default="1.0.0")

class Customer(Base):

    __tablename__ = "customer"

    id = Column(Integer, primary_key=True, autoincrement=True)
    max_user_quota = Column(Integer, default=1)

class User(Base):

    __tablename__ = u"_user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True)
    name = Column(String(255))
    hash = Column(String(255))
    salt = Column(String(255))
    active = Column(Boolean, default=True)
    customer = Column(u'customer_id', Integer, ForeignKey(u'customer.id'))
    roles = relationship(
        u"Role",
        secondary=user_has_role,
        back_populates=u"users")


class Role(Base):

    __tablename__ = u"role"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(255), unique=True)
    name = Column(String(255))
    users = relationship(
        u"User",
        secondary=user_has_role,
        back_populates=u"roles")


