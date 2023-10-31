# coding: utf-8
"""
Blueprint utils methods
"""

import json
from functools import wraps
from cerberus import Validator
from flask import jsonify, request
from collections import OrderedDict
from user_api.user_api_exception import ApiUnprocessableEntity, ApiException

to_dict = lambda x: json.loads(x, encoding=u"utf8")
to_unicode_list = lambda x: x.split(u",")
to_int_list = lambda x: [int(val) for val in x.split(u",")]

LIST_API_VALIDATION_SCHEMA = {
    u"filters": {
        u"type": u"dict",
        u"coerce": to_dict
    },
    u"offset": {
        u"type": u"integer",
        u"coerce": int
    },
    u"limit": {
        u"type": u"integer",
        u"coerce": int
    },
    u"order": {
        u"type": u"list",
        u"coerce": to_unicode_list
    },
    u"order_by": {
        u"type": u"list",
        u"coerce": to_int_list
    }
}


def flask_constructor_error(message, status=500, custom_error_code=None, error_payload=None):
    """
    Construct Json Error returned message.
    """
    payload = {
        u"message": message
    }

    if error_payload:
        payload[u"payload"] = error_payload

    if custom_error_code:
        payload[u"error_code"] = custom_error_code

    return jsonify(payload), status


def flask_construct_response(item, code=200):
    """
    Construct Json response returned.
    """
    return jsonify(item), code


def flask_check_args(validation_schema):
    """

    Args:
        validation_schema (dict):

    Returns:
        (funct):
    """

    def decorated(funct):
        @wraps(funct)
        def wrapper(*args, **kwargs):
            args_dict = request.args.copy().to_dict()

            validator = Validator(validation_schema)
            # Check if the document is valid.
            if not validator.validate(args_dict):
                return flask_constructor_error(
                    message=u"Wrong args.",
                    custom_error_code=u"WRONG_ARGS",
                    status=422,
                    error_payload=validator.errors
                )

            kwargs[u"args"] = validator.document
            return funct(*args, **kwargs)

        return wrapper

    return decorated


def validate_document(validation_schema, document):
    """
    Validate the format of a document, depending on the schema supplied in the class constructor.
    Args:
        validation_schema (dict): The schema the document has to follow.
        document (dict): The format specification.

    """
    validator = Validator(validation_schema)
    # Check if the document is valid.
    if not validator.validate(document):
        raise ApiUnprocessableEntity(
            u"The submitted document doesn't have the right format.",
            api_error_code=u"WRONG_DOCUMENT_FORMAT",
            payload=validator.errors

        )
    return None


def flask_check_and_inject_payload(validation_schema):

    def decorated(funct):

        @wraps(funct)
        def wrapper(*args, **kwargs):

            payload_dict = {}

            if u"application/json" in request.headers.get(u"Content-Type"):
                try:
                    payload_dict = json.loads(request.data, object_pairs_hook=OrderedDict, encoding=u"utf8")
                except Exception as err:
                    return flask_constructor_error(
                        message=getattr(err, "message", "Wrong payload."),
                        custom_error_code=u"WRONG_PAYLOAD",
                        status=422
                    )
            else:
                return flask_constructor_error(
                    message=u"The payload format is unknown.",
                    custom_error_code=u"WRONG_PAYLOAD_FORMAT",
                    status=422
                )

            validate_document(validation_schema, payload_dict)
            kwargs[u"payload"] = payload_dict
            return funct(*args, **kwargs)

        return wrapper

    return decorated


def add_api_error_handler(blueprint):
    @blueprint.errorhandler(ApiException)
    def api_error_handler(exception):
        return flask_constructor_error(
            exception.message,
            exception.status_code,
            custom_error_code=exception.api_error_code,
            error_payload=exception.payload
        )
