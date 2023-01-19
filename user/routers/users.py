from fastapi import (
    Depends,
    HTTPException,
    status,
    Request,
    Response,
    APIRouter,
)
from typing import List, Union
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.users import (
    Error,
    UserIn,
    UserRepository,
    UserOut,
    UserUpdate,
    DuplicateUserError,
)


router = APIRouter()


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


class UserForm(BaseModel):
    username: str
    password: str


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/api/users", response_model=UserToken | HttpError)
async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    users: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        account = users.create(user, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an user with those credentials",
        )
    # if not hasattr(user, "email"):
    #     user.email = user.username
    form = UserForm(username=user.email, password=user.password)
    token = await authenticator.login(response, request, form, users)
    return UserToken(user=account, **token.dict())


# @router.post("/users", response_model=Union[UserOut, Error])
# def create_users(
#     user: UserIn, response: Response, repo: UserRepository = Depends()
# ):
#     # return repo.create(user)
#     user = repo.create(id, user)
#     if user is None:
#         response.status_code = 404
#     return user


@router.get("/users", response_model=Union[List[UserOut], Error])
def get_all(
    repo: UserRepository = Depends(),
):
    return repo.get_all()


@router.put("/users/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserUpdate,
    repo: UserRepository = Depends(),
) -> Union[Error, UserOut]:
    return repo.update_user(user_id, user)


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    repo: UserRepository = Depends(),
) -> bool:
    return repo.delete_user(user_id)


@router.get("/users/{user_id}", response_model=Union[UserOut, Error])
def get_user(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    user = repo.get_user(user_id)
    if user is None:
        response.status_code = 404
    return user
