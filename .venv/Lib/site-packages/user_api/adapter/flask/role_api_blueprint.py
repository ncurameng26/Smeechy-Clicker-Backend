# coding: utf-8
"""
User API blueprint (roles section).
"""

import base64
from .flask_utils import (
    flask_check_args,
    add_api_error_handler,
    flask_constructor_error,
    flask_construct_response,
    flask_check_and_inject_payload
)

from user_api.user_api_exception import (
    ApiException
)

from flask import Blueprint


def construct_role_api_blueprint(flask_user_api):
    role_api_blueprint = Blueprint(u'role_api', __name__)

    @role_api_blueprint.route(u'/', methods=[u"GET"])
    @flask_user_api.has_roles(roles=[u"admin"])
    @flask_check_args({
        u"limit": {
            u"type": u"integer",
            u"default": 20,
            u"coerce": int
        },
        u"offset": {
            u"type": u"integer",
            u"default": 0,
            u"coerce": int
        }
    })
    def list_roles(args):
        return flask_construct_response(
            flask_user_api._user_api.list_roles(**args), 200
        )

    add_api_error_handler(role_api_blueprint)

    return role_api_blueprint
