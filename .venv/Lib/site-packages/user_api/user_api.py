# coding: utf-8

from .db.db_user_manager import DBUserManager
from .db.db_exception import (
    DBUserConflict,
    DBUserNotFound
)
from .user_api_exception import (
    ApiConflict,
    ApiNotFound,
    ApiForbidden,
    ApiUnauthorized,
    ApiUnprocessableEntity
)
from .auth.auth_manager import AuthManager
from .adapter.flask import FlaskUserApi


class UserApi(object):

    def __init__(
        self,
        db_user_manager,
        db_role_manager,
        auth_manager,
        user_created_callback=None,
        user_updated_callback=None
    ):
        """
        Build the user API
        Args:
            db_user_manager (DBUserManager): Injected object to handle DB interaction.
            db_role_manager (DBRoleManager): Injected object to handle DB interaction.
            auth_manager (AuthManager): Injected object to handle Auth interactions.
            user_created_callback (callable): Optional method to be called when a user is created.
            user_updated_callback (callable): Optional method to be called when a user is edited.
        """
        self._db_user_manager = db_user_manager
        self._db_role_manager = db_role_manager
        self._auth_manager = auth_manager

        self._user_created_callback = user_created_callback
        self._user_updated_callback = user_updated_callback

    def get_flask_user_api(self):
        """
        Get an adapter for the API.

        Returns:
            (FlaskAdapter): The adapter.
        """
        return FlaskUserApi(self)

    def get_user_information(
            self, 
            customer_id: int, 
            user_id: int, 
            with_roles=True
        ):
        """
        Get the user informations for a specific user id.
        Args:
            customer_id (int): The ID of the customer of the user requesting.
            user_id (int): The id of the user to fetch.
            with_roles (boolean): Fetch the roles with the user.

        Returns:
            (dict): The user representation.
        """
        try:
            user = self._db_user_manager.get_user_information(user_id, with_roles)
            if user["customer"]["id"] != customer_id:
                raise ApiForbidden

        except DBUserNotFound:
            raise ApiNotFound(u"User '{}' doesn't exist.".format(user_id))

        return user

    def update(self, customer_id: int, user_id: int, payload: dict):
        """
        Update a user.
        Args:
            customer_id (int): The customer id of the user requesting.
            user_id (int): The ID of the user to update.
            payload (dict): The user to update.

        Returns:
            (dict): The updated user.
        """
        try:
            user = self._db_user_manager.get_user_information(
                user_id)
            if user["customer"]["id"] != customer_id:
                raise ApiForbidden

            user = self._db_user_manager.update_user_information(
                payload.get(u"email"),
                payload.get(u"name"),
                payload.get(u"active"),
                user_id,
                payload.get(u"roles")
            )

            if payload.get(u"password") is not None:
                self.reset_password(user.get(u"email"), payload.get(u"password"))

            if self._user_updated_callback is not None:
                self._user_updated_callback(user)

            return user
        except DBUserConflict:
            raise ApiConflict
        except DBUserNotFound:
            raise ApiNotFound(u"User not found.")

    def authenticate_no_password(self, email):
        """
        Used to authenticate without password (for Google authentication for example).
        This method isn't mapped to the flask rest API and should be used with caution.
        Args:
            email (unicode): The email of the user to connect.

        Returns:
            (dict, unicode): The user auth information and the token.
        """
        payload = self._db_user_manager.get_user_information(email)
        if not payload[u"active"]:
            raise ApiUnauthorized(u"User is not active.")

        payload[u"roles"] = self._db_role_manager.get_user_roles(
            user_id=payload[u"id"]
        )
        token = self._auth_manager.generate_token(payload)
        return payload, token
    
    def authenticate(self, email, password):
        """
        Authenticate a user.
        Args:
            email (unicode): The user email.
            password (unicode): The user password.

        Returns:
            (dict, unicode): The user auth information and the token.
        """
        try:
            salt = self._db_user_manager.get_user_salt(email=email)
        except DBUserNotFound:
            raise ApiNotFound(u"Can't find user {}.".format(email))

        hash = self._auth_manager.generate_hash(
            password,
            salt
        )
        valid = self._db_user_manager.is_user_hash_valid(
            email,
            hash=hash
        )
        if not valid:
            raise ApiUnauthorized(u"Wrong login or / and password.")

        payload = self._db_user_manager.get_user_information(email)
        if not payload[u"active"]:
            raise ApiUnauthorized(u"User is not active.")

        payload[u"roles"] = self._db_role_manager.get_user_roles(
            user_id=payload[u"id"]
        )
        token = self._auth_manager.generate_token(payload)
        return payload, token

    def reset_password(self, email, password):
        """
        Reset a user password.
        Args:
            email (unicode): The user email.
            password (unicode): The user new password.

        Returns:
            (dict): The user auth new information.
        """
        salt = self._auth_manager.generate_salt()
        hash = self._auth_manager.generate_hash(password, salt)

        self._db_user_manager.modify_hash_salt(email, hash, salt)
        try:
            payload = self._db_user_manager.get_user_information(email)
        except DBUserNotFound:
            raise ApiUnprocessableEntity(u"User '{}' doesn't exist.".format(email))

        return payload

    def register(self, customer_id: int, payload: dict):
        """
        Register a new user.
        Args:
            customer_id (int): The related customer.
            payload (dict): The user to create.
        Returns:
            (dict): The user auth new information.
        """
        salt = self._auth_manager.generate_salt()
        hash = self._auth_manager.generate_hash(payload.get(u"password"), salt)
        try:
            user = self._db_user_manager.save_new_user(
                email=payload.get(u"email"),
                name=payload.get(u"name"),
                active=payload.get(u"active"),
                hash=hash,
                salt=salt,
                roles=payload.get(u"roles"),
                customer_id=customer_id
            )
            if self._user_created_callback is not None:
                self._user_created_callback(user)

            return user
        except DBUserConflict:
            raise ApiConflict(u"User already exists.")

    def get_token_data(self, token):
        """
        Decrypt token and return payload.
        Args:
            token (unicode): The JWT token.

        Returns:
            (dict): The payload contained in the token.
        """
        return self._auth_manager.get_token_data(token)

    def is_token_valid(self, token):
        """
        Check if a token is valid.
        Args:
            token (unicode): The token value.

        Returns:
            (boolean): Return True if valid, else False.
        """
        return self._auth_manager.is_token_valid(token)

    def list_users(self, customer_id: int, limit=20, offset=0, email=None, name=None):
        """
        List the users from the API.
        Args:
            customer_id (int): The corresponding customer.
            limit (int): The max number of returned users.
            offset (int): The cursor.
            email (unicode): An email to filter on.
            name (unicode): A name to filter on.

        Returns:
            (list of dict, boolean): A list of users representations. The boolean stands for if there is more to fetch.
        """
        users, has_next = self._db_user_manager.list_users(customer_id, limit, offset, email, name)
        return {
            u"users": users,
            u"has_next": has_next
        }

    def list_roles(self, limit=20, offset=0):
        """
        List the roles from the API.
        Args:
            limit (int): The max number of returned roles.
            offset (int): The cursor.

        Returns:
            (list of dict, boolean): A list of roles representations. The boolean stands for if there is more to fetch.
        """
        roles, has_next = self._db_role_manager.list_roles(limit, offset)
        return {
            u"roles": roles,
            u"has_next": has_next
        }

    def token_has_roles(self, token, roles):
        """
        Check if a token is authorized for a role list.
        Args:
            token (Dict): The token to check.
            roles (list of unicode): The list of roles code to check.

        Returns:
            (boolean): Returns true if it has the roles.

        Raises
            (ApiForbidden): Raised if the token doesn't have the expected roles.
        """
        missing_roles = []
        user_roles = [role[u"code"] for role in token[u"roles"]]
        for required_role in roles:
            if required_role not in user_roles:
                missing_roles.append(required_role)
        if len(missing_roles) > 0:
            raise ApiForbidden(u"You don't have the {} role(s).".format(u", ".join(missing_roles)))

        return True
