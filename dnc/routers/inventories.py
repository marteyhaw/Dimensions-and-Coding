from fastapi import (
    APIRouter,
    Depends,
    status,
    HTTPException,
)
from typing import Union
from queries.inventories import (
    HttpError,
    CharacterInventory,
    InventoriesRepository,
)


router = APIRouter()


@router.post(
    "/inventories/{character_id}",
    response_model=Union[CharacterInventory, HttpError],
)
def add_item_to_inventory(
    character_id: int,
    item_id: int,
    repo: InventoriesRepository = Depends(),
):
    try:
        character_inventory = repo.purchase_item(item_id, character_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to finish that transaction.",
        )
    return character_inventory
