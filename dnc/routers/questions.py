from fastapi import APIRouter, Response, Depends
from queries.questions import QuestionsRepository, QuestionOut, AnswersRepo

router = APIRouter()


@router.get("/questions/{question_id}")
def get_question(
    question_id: int,
    response: Response,
    repo: QuestionsRepository = Depends(),
) -> QuestionOut:
    return repo.get_one(question_id)


@router.get("/questions/answer/")
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
