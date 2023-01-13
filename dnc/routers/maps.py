from fastapi import APIRouter, Depends
from queries.maps import MapsRepo, MapsIn

router = APIRouter()


@router.get("/maps/{quest_id}")
def get_maps(quest_id: int, repo: MapsRepo = Depends()):
    return repo.get(MapsIn(quest_id=quest_id))
