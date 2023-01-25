import os
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self
    ):
        # Use your repo to get the user based on the
        # username (which could be an email)
        # return users.get_user(email)
        pass

    def get_account_getter(
        self
    ):
        # Return the users. That's it.
        # return users
        pass

    def get_hashed_password(self):
        # Return the encrypted password value from your
        # user object
        # return user.hashed_password
        pass

    def get_account_data_for_cookie(self):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        # return user.email, UserOut(**user.dict())
        pass


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
