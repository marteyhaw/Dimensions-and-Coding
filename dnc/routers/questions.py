from fastapi import APIRouter, Response, Depends, Request, status
from queries.questions import QuestionsRepository, QuestionOut, AnswersRepo
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel



# @app.exception_handler(RequestValidationError)
# async def validation_exception_handler(
#     request: Request, exc: RequestValidationError
# ):
#     return JSONResponse(
#         status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
#         content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
#     )


class Item(BaseModel):
    title: str
    size: int


# @app.post("/items/")
# async def create_item(item: Item):
#     return item


router = APIRouter()


@router.get("/questions/{question_id}")
def get_question(
    question_id: int,
    response: Response,
    repo: QuestionsRepository = Depends(),
) -> QuestionOut:
    return repo.get_one(question_id)


@router.get("/questions/answer/", response_model=bool)
def check_answer(
    response: Response,
    question_id: int = 0,
    character_id: int = 0,
    char_answer: int = 0,
    repo: AnswersRepo = Depends(),
):
    if question_id == 0 or char_answer == 0 or character_id == 0:
        return {"detail": "Invalid query parameters."}
    try:
        return repo.check_answer(question_id, character_id, char_answer)
    except Exception:
        return {"detail": "Invalid query parameters."}
