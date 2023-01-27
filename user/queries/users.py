from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool


class DuplicateUserError(ValueError):
    pass


class Error(BaseModel):
    message: str


class UserUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    username: Optional[str]
    password: Optional[str]


class UserUpdateOut(BaseModel):
    id: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    username: Optional[str]


class UserIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository(BaseModel):
    def get_user(
        self,
        email: str,
    ) -> Union[Error, UserOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        email,
                        username,
                        password
                        FROM users
                        WHERE email = %s;
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    # return [
                    #     UserOut(
                    #         id=record[0],
                    #         first_name=record[1],
                    #         last_name=record[2],
                    #         email=record[3],
                    #         username=record[4],
                    #         # password=record[5],
                    #         )
                    #         for record in db
                    #     ]
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get user"}

    def delete_user(self, user_id: int) -> Union[None, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_user(
        self, user_id: int, user: UserUpdate
    ) -> Union[UserUpdateOut, Error]:
        try:
            # connect the database
            # the With is called a monitor
            with pool.connection() as conn:
                # get a cursor (something to run SQL with )
                with conn.cursor() as db:
                    if (
                        user.first_name is None
                        and user.last_name is None
                        and user.email is None
                        and user.username is None
                        and user.password is None
                    ):
                        return {"message": "No property to update"}
                    if user.first_name:
                        db.execute(
                            "UPDATE users SET first_name=%s WHERE id=%s",
                            [user.first_name, user_id],
                        )
                    if user.last_name:
                        db.execute(
                            "UPDATE users SET last_name=%s WHERE id=%s",
                            [user.last_name, user_id],
                        )
                    if user.email:
                        db.execute(
                            "UPDATE users SET email=%s WHERE id=%s",
                            [user.email, user_id],
                        )
                    if user.username:
                        db.execute(
                            "UPDATE users SET username=%s WHERE id=%s",
                            [user.username, user_id],
                        )
                    if user.password:
                        db.execute(
                            "UPDATE users SET password=%s WHERE id=%s",
                            [user.password, user_id],
                        )
                    # else:
                    #     return {"message": "No property to update"}
                    input = user.dict()
                    del input["password"]
                    update_response = UserUpdateOut(id=user_id, **input)
                    return update_response
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def get_all(self) -> Union[Error, List[UserOut]]:
        try:
            # connect the database
            # the With is called a monitor
            with pool.connection() as conn:
                # get a cursor (something to run SQL with )
                with conn.cursor() as db:
                    # Run out SELECT Statement
                    result = db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        email,
                        username,
                        password
                        FROM users
                        ORDER BY first_name;
                        """
                    )
                    return [
                        self.record_to_user_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def create(
        self, user: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with )
                with conn.cursor() as db:
                    # Run out Inset Statement
                    result = db.execute(
                        """
                        INSERT INTO users (
                            first_name,
                            last_name,
                            email,
                            username,
                            password
                        )
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.username,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new Data
                    # old_data = user.dict()
                    # return UserOut(id=id, **old_data)
                    return self.user_in_to_out(id, user, hashed_password)
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def user_in_to_out(
        self,
        id: int,
        user: UserIn,
        hashed_password: str,
    ):
        old_data = user.dict()
        return UserOutWithPassword(
            id=id, hashed_password=hashed_password, **old_data
        )

    def record_to_user_out(self, record):
        return UserOutWithPassword(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            username=record[4],
            hashed_password=record[5],
        )

    def get_user_by_id(self, user_id) -> Union[Error, UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        email,
                        username
                        FROM users
                        WHERE id = %s;
                        """,
                        [user_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return UserOut(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        username=record[4],
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not get user"}
