# coding: utf-8
"""
File contains base API Exception.
"""


class ApiException(Exception):
    """
    Base exception.
    """
    def __init__(self, message, status_code=None, api_error_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code if status_code else 400
        self.api_error_code = api_error_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv[u'message'] = self.message
        return rv


class ApiNotFound(ApiException):
    """
    Raised if something could not be found. For example a document in the database.
    """
    def __init__(self, message, api_error_code=u"NOT_FOUND", payload=None):
        ApiException.__init__(self, message, 404, api_error_code, payload)


class ApiUnprocessableEntity(ApiException):
    """
    Raised if something can't be processed. For example a value to insert in the database for integrity reason
    or a payload with a wrong format.
    """
    def __init__(self, message, api_error_code=u"UNPROCESSABLE_ENTITY", payload=None):
        ApiException.__init__(self, message, 422, api_error_code, payload)


class ApiForbidden(ApiException):
    """
    Raised if a user is authenticated, but doesn't have rights to use the API.
    """
    def __init__(self, message=u"Forbidden.", api_error_code=u"FORBIDDEN", payload=None):
        ApiException.__init__(self, message, 403, api_error_code, payload)


class ApiRoleMissing(ApiForbidden):
    """
    Raised if a user is authenticated, but isn't in the right role (Google group) to use the API.
    """
    def __init__(self):
        ApiForbidden.__init__(self, message=u"Forbidden. Role(s) missing.", api_error_code=u"ROLE_MISSING")


class ApiUnauthorized(ApiException):
    """
    Raised if the user isn't authenticated.
    """
    def __init__(self, message=u"No credentials supplied."):
        ApiException.__init__(self, message, 401, u"UNAUTHORIZED")


class ApiConflict(ApiException):
    """
    Raised if the there is a conflict when updating resource.
    """
    def __init__(self, message=u"Conflict."):
        ApiException.__init__(self, message, 409, u"CONFLICT")