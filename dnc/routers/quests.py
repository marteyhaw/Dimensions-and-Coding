from fastapi import APIRouter, Response, Depends
from queries.quests import QuestsRepository, QuestOut

router = APIRouter()


@router.get("/quests/{quest_id}")
def get_quest(
    quest_id: int,
    response: Response,
    repo: QuestsRepository = Depends(),
) -> QuestOut:
    return repo.get_one(quest_id)
