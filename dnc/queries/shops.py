from pydantic import BaseModel
from typing import List
from queries.pool import pool


class HttpError(BaseModel):
    detail: str


class Item(BaseModel):
    id: int
    name: str
    img: str
    description: str
    price: int


class ShopItemsForSale(BaseModel):
    shop_name: str
    items: List[Item]


class ShopItemsRepository:
    def get_items_for_sale(self, shop_id: int) -> ShopItemsForSale:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Retrieve the shop name given the id
                    sql_shop_name = db.execute(
                        """
                        SELECT name
                        FROM shops
                        WHERE id = %s;
                        """,
                        [shop_id],
                    )
                    shop_name = sql_shop_name.fetchone()[0]

                    # Retrieve the shop's items given the id
                    sql_shop_items = db.execute(
                        """
                        SELECT id, name, img, description, price
                        FROM shop_items
                        RIGHT JOIN items
                        ON item_id = id
                        WHERE shop_id = %s;
                        """,
                        [shop_id],
                    )
                    item_list = [
                        self.item_record_to_out(record)
                        for record in sql_shop_items
                    ]

                    # Return shop items for sale
                    return self.item_to_item_list(shop_name, item_list)

        except Exception as e:
            print("There was a problem interacting with the database.")
            print(e)
            raise Exception

    def item_record_to_out(self, record):
        return Item(
            id=record[0],
            name=record[1],
            img=record[2],
            description=record[3],
            price=record[4],
        )

    def item_to_item_list(self, shop_name, item_list):
        return ShopItemsForSale(shop_name=shop_name, items=item_list)
