# -*- coding: utf-8 -*-
"""
Contains the DB manager.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class DBManager(object):
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
            url (unicode): The construction URL to connect to the database.
        """
        self._engine = create_engine(url)

    def get_session(self):
        """
        Returns a DB access session.
        Returns:
            (Session): The session object.
        """
        session = sessionmaker(self._engine)
        return session()

    @staticmethod
    def to_role_dict(role):
        """
        Take a role Object to transform it into dict.
        Args:
            role (Role): The role to process.
        Returns:
            (dict): The role.

        """
        return {
            col: getattr(role, col)
            for col in [u"id", u"code", u"name"]
        }