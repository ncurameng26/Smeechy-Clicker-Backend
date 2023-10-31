# -*- coding: utf-8 -*-
"""
Contains the DB manager exceptions.
"""


class DBException(Exception):
    """
    Base exception.
    """
    def __init__(self, message):
        Exception.__init__(self)
        self.message = message


class DBUserNotFound(DBException):
    """
    Raised if a user can't be found in the database.
    """
    def __init__(self):
        DBException.__init__(self, u"Can't find user in the database.")


class DBUserConflict(DBException):
    """
    Raised if a user conflict happens.
    """
    def __init__(self):
        DBException.__init__(self, u"User conflict.")


