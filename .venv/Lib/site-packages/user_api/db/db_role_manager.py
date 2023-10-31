# -*- coding: utf-8 -*-
"""
Contains the DB Role manager.
"""

from .models import Role, User
from .db_manager import DBManager
from sqlalchemy import and_
from sqlalchemy.orm import joinedload, load_only


class DBRoleManager(DBManager):
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
        DBManager.__init__(self, url)

    def get_user_roles(self, user_id):
        """
        Get the list of roles for a specific user.
        Args:
            user_id (int): The ID of the user we want the roles.
        Returns:
            (list of dict): The list of roles.
        """
        session = self.get_session()
        user = session.query(User) \
            .filter_by(id=user_id) \
            .options(joinedload(u"roles"))\
            .one()
        return [
            self.to_role_dict(role) for role in user.roles
        ]

    def list_roles(self, limit=20, offset=0):
        """
        List the roles from the API.
        Args:
            limit (int): The max number of returned roles.
            offset (int): The cursor.

        Returns:
            (list of dict, boolean): A list of roles representations. The boolean stands for if there is more to fetch.
        """
        session = self.get_session()
        columns = [u"id", u"code", u"name"]

        filters = []

        roles = session.query(Role)\
            .options(load_only(*columns))\
            .filter(and_(*filters))\
            .offset(offset)\
            .limit(limit+1)

        if roles.count() > limit:
            roles = roles[:-1]
            has_next = True
        else:
            has_next = False

        return [
            self.to_role_dict(role)
            for role in roles
        ], has_next
