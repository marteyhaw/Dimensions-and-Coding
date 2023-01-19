from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class HttpError(BaseModel):
    detail: str


class Item(BaseModel):
    id: int
    name: str
    img: str
    description: str
    price: int


class CharacterInventory(BaseModel):
    character_name: str
    character_inventory: List[Item]


class InventoriesRepository:
    def purchase_item(
        self,
        item_id: int,
        character_id: int,
    ) -> Union[CharacterInventory, HttpError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Retrieve the item's price
                    sql_item_price = db.execute(
                        """
                        SELECT price
                        FROM items
                        WHERE id = %s;
                        """,
                        [item_id],
                    )
                    item_price = sql_item_price.fetchone()[0]

                    # Get character's current balance
                    sql_character_currency = db.execute(
                        """
                        SELECT currency, name
                        FROM characters
                        WHERE id = %s;
                        """,
                        [character_id],
                    )
                    try:
                        (
                            current_balance,
                            character_name,
                        ) = sql_character_currency.fetchone()
                    except TypeError:
                        return {"detail": "That character does not exist."}

                    # Check if there is enough currency to make the purchase
                    if item_price > current_balance:
                        return {"detail": "Insufficient balance."}

                    new_balance = current_balance - item_price

                    # Subtract currency
                    db.execute(
                        """
                        UPDATE characters
                        SET currency = %s
                        WHERE id = %s;
                        """,
                        [
                            new_balance,
                            character_id,
                        ],
                    )

                    # insert item
                    db.execute(
                        """
                        INSERT INTO inventories
                            (character_id,item_id)
                        VALUES
                            (%s,%s);
                        """,
                        [
                            character_id,
                            item_id,
                        ],
                    )

                    # Return inventory list
                    result = db.execute(
                        """
                        SELECT id, name, img, description, price
                        FROM inventories
                        RIGHT JOIN items
                        ON item_id = id
                        WHERE character_id = %s;
                        """,
                        [
                            character_id,
                        ],
                    )

                    item_list = [
                        self.item_record_to_out(record) for record in result
                    ]

                    # Return shop items for sale
                    return self.item_to_item_list(character_name, item_list)

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

    def item_to_item_list(self, character_name, item_list):
        return CharacterInventory(
            character_name=character_name, character_inventory=item_list
        )
