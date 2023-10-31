# coding: utf-8

import jwt
import time
import datetime
import Crypto.Random
import Crypto.Protocol.KDF
import binascii

class AuthManager(object):
    def __init__(self, jwt_secret, jwt_lifetime):
        self._jwt_secret = jwt_secret
        self._jwt_lifetime = jwt_lifetime

    @staticmethod
    def generate_salt():
        """
        Generate a salt.
        :return (unicode): The salt.
        """
        salt = binascii.hexlify(Crypto.Random.new().read(32)).decode()
        return salt

    @staticmethod
    def generate_hash(password, salt):
        hash = Crypto.Protocol.KDF.PBKDF2(password, salt)
        hash = binascii.hexlify(hash).decode()
        return hash

    def generate_token(self, payload):
        """
        Return a token from the JSON passed in parameter
        :param payload:
        :return:
        """
        # Get user informations metadata
        # Update with expiration date
        timestamp = int(time.mktime(datetime.datetime.utcnow().timetuple()))

        payload[u"exp"] = timestamp + self._jwt_lifetime
        # Create JWT token
        encoded = jwt.encode(
            payload,
            self._jwt_secret,
            algorithm=u"HS256"
        )
        # Return
        return encoded

    def is_token_valid(self, token):
        """
        Check the validity of a token, and send back a boolean if
        valid or not.
        :param token: The token to check.
        :return: Boolean value if the token is valid or not.
        """
        decoded = self.get_token_data(token)
        return decoded is not None

    def get_token_data(self, token):
        """
        :param token:
        :return:
        """
        try:
            decoded = jwt.decode(token, self._jwt_secret)
        except jwt.ExpiredSignature:
            return None
        except jwt.DecodeError:
            return None
        return decoded
