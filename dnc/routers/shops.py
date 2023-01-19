from fastapi import (
    APIRouter,
    Depends,
    status,
    HTTPException,
)
from typing import Union
from queries.shops import ShopItemsRepository, ShopItemsForSale, HttpError


router = APIRouter()


@router.get(
    "/shops/{shop_id}",
    response_model=Union[ShopItemsForSale, HttpError],
)
def get_shop_items(shop_id: int, repo: ShopItemsRepository = Depends()):
    try:
        shop_items = repo.get_items_for_sale(shop_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to retrieve that shop's items.",
        )
    return shop_items
