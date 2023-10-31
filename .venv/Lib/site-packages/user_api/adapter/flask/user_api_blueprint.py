# coding: utf-8
"""
User API blueprint
"""

import base64
from .flask_utils import (
    flask_check_args,
    add_api_error_handler,
    flask_construct_response,
    flask_check_and_inject_payload
)

from flask import request, jsonify, Blueprint


def construct_user_api_blueprint(flask_user_api):
    user_api_blueprint = Blueprint(u'user_api', __name__)

    @user_api_blueprint.route(u'/login', methods=[u"POST"])
    @flask_check_and_inject_payload({
        u"email": {
            u"type": u"string",
            u"required": True
        },
        u"password": {
            u"type": u"string",
            u"required": True
        }
    })
    def login(payload):

        token_payload, token = flask_user_api._user_api.authenticate(
            email=payload.get(u"email"),
            password=payload.get(u"password")
        )

        response = jsonify(token_payload)
        response.set_cookie(
            u"user-api-credentials",
            value=base64.b64encode(token),
            httponly=True,
            expires=token_payload[u"exp"]
        )

        return response, 200
    
    def get_customer_id(request) -> int:
        """
        Returns the customer ID from the flask token.
        Args:
            request: The flask object.
        Returns:
            (int): The customer ID.
        """
        token = flask_user_api.check_token(request)
        if token is not None:
            return token["customer"]["id"]
        return None


    @user_api_blueprint.route(u'/reset-password', methods=[u'POST'])
    @flask_user_api.is_connected()
    @flask_check_and_inject_payload({
        u"email": {
            u"type": u"string",
            u"required": True
        },
        u"password": {
            u"type": u"string",
            u"required": True
        }
    })
    def reset_password(payload):
        token = flask_user_api.check_token(request)
        token_payload = flask_user_api._user_api.get_token_data(token)
        # If connected user different from the one to reset, check admin rights.
        if token_payload[u"email"] != payload.get(u"email"):
            flask_user_api._user_api.token_has_roles(token, [u"admin"])

        result = flask_user_api._user_api.reset_password(**payload)
        return flask_construct_response(result, 200)

    @user_api_blueprint.route(u'/', methods=[u"POST"])
    @flask_user_api.has_roles(roles=[u"admin"])
    @flask_user_api.is_connected()
    @flask_check_and_inject_payload({
        u"email": {
            u"type": u"string",
            u"required": True
        },
        u"name": {
            u"type": u"string",
            u"required": True
        },
        u"password": {
            u"type": u"string",
            u"required": True
        },
        u"active": {
            u"type": u"boolean",
            u"required": True
        },
        u'roles': {
            u'type': u'list',
            u"required": True,
            u'schema': {
                u'type': u'dict',
                u"allow_unknown": True,
                u'schema': {
                    u"id": {
                        u"type": u"integer",
                        u"required": True
                    }
                }
            }
        }
    })
    def register(payload):
        customer_id = get_customer_id(request)
        return flask_construct_response(
            flask_user_api._user_api.register(customer_id, payload)
        , 201)


    @user_api_blueprint.route(u'/token', methods=[u"GET"])
    @flask_user_api.is_connected()
    def token():
        if u"user-api-credentials" in request.cookies:
            decoded_token = base64.b64decode(request.cookies.get(u'user-api-credentials'))
            return flask_construct_response(flask_user_api._user_api.get_token_data(decoded_token), 200)

    @user_api_blueprint.route(u'/logout', methods=[u"GET"])
    @flask_user_api.is_connected()
    def logout():
        if u"user-api-credentials" in request.cookies:
            response, code = flask_construct_response({
                u"message": u"User disconnected."
            }, 200)
            response.set_cookie(
                u"user-api-credentials",
                value=u"",
                httponly=True,
                expires=0
            )
            return response, code

    @user_api_blueprint.route(u'/', methods=[u"GET"])
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
        },
        u"email": {
            u"type": u"string"
        },
        u"name": {
            u"type": u"string"
        }
    })
    def list_users(args):
        args["customer_id"] = get_customer_id(request)
        return flask_construct_response(
            flask_user_api._user_api.list_users(**args), 200
        )

    @user_api_blueprint.route(u'/<int:user_id>', methods=[u"GET"])
    @flask_user_api.has_roles(roles=[u"admin"])
    def get_user(user_id):
        customer_id = get_customer_id(request)
        return flask_construct_response(
            flask_user_api._user_api.get_user_information(
                customer_id,
                user_id
            )
        )

    @user_api_blueprint.route(u'/<int:user_id>', methods=[u"PUT"])
    @flask_user_api.has_roles(roles=[u"admin"])
    @flask_check_and_inject_payload({
        u"email": {
            u"type": u"string",
            u"required": True
        },
        u"id": {
            u"type": u"integer",
            u"required": False
        },
        u"name": {
            u"type": u"string",
            u"required": True
        },
        u"password": {
            u"type": u"string",
            u"required": False
        },
        u"active": {
            u"type": u"boolean",
            u"required": True
        },
        u'roles': {
            u'type': u'list',
            u"required": False,
            u'schema': {
                u'type': u'dict',
                u"allow_unknown": True,
                u'schema': {
                    u"id": {
                        u"type": u"integer",
                        u"required": True
                    }
                }
            }
        }
    })
    def update(payload, user_id):
        customer_id = get_customer_id(request)
        if u"id" in payload:
            del payload[u"id"]

        result = flask_user_api._user_api.update(customer_id, user_id, payload)
        return flask_construct_response(result, 200)

    add_api_error_handler(user_api_blueprint)

    return user_api_blueprint




