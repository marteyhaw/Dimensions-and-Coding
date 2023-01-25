from fastapi import APIRouter, Depends
from queries.maps import MapsRepo, MapsIn
from authenticator import authenticator

router = APIRouter()


@router.get("/maps/{quest_id}")
def get_maps(
    quest_id: int,
    repo: MapsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get(MapsIn(quest_id=quest_id))
