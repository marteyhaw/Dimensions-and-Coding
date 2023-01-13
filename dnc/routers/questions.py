from fastapi import APIRouter, Response, Depends
from queries.questions import QuestionsRepository, QuestionOut

router = APIRouter()

@router.get("/questions/{question_id}")
def get_question(
    question_id: int,
    response: Response,
    repo: QuestionsRepository = Depends(),
    ) -> QuestionOut:
    return repo.get_one(question_id)

