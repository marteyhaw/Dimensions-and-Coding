from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool
from queries.characters import CharacterClass


class HttpError(BaseModel):
    detail: str


class Item(BaseModel):
    id: int
    name: str
    img: str
    description: str
    price: int


class InstructorOut(BaseModel):
    id: int
    name: str
    quote: str


class QuestionOutNoAnswer(BaseModel):
    id: int
    question: str
    option_1: str
    option_2: str
    option_3: str


class QuestOut(BaseModel):
    id: int
    name: str
    questions: QuestionOutNoAnswer
    reward: int
    instructor: InstructorOut


class CharacterInventory(BaseModel):
    character_name: str
    character_inventory: List[Item]


class CharacterDetails(CharacterInventory):
    character_id: int
    user_id: int
    class_id: CharacterClass
    img_url: str
    quest_id: QuestOut
    health: int
    currency: int


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

    def get_character_details(self, character_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Get character details
                    sql_character_details = db.execute(
                        """
                        SELECT *
                        FROM characters
                        WHERE id = %s;
                        """,
                        [character_id],
                    )
                    try:
                        character_details = sql_character_details.fetchone()
                        if character_details is None:
                            raise TypeError
                    except TypeError:
                        return {"detail": "That character does not exist."}

                    # Get class info
                    class_id = character_details[3]
                    sql_class_info = db.execute(
                        """
                        SELECT *
                        FROM class
                        WHERE id = %s;
                        """,
                        [class_id],
                    )
                    class_info = sql_class_info.fetchone()

                    # Get quest info
                    quest_id = character_details[5]
                    sql_quest_info = db.execute(
                        """
                        SELECT *
                        FROM quests
                        WHERE id = %s;
                        """,
                        [quest_id],
                    )
                    quest_info = sql_quest_info.fetchone()

                    # Get question info
                    question_id = quest_info[2]
                    sql_question_info = db.execute(
                        """
                        SELECT *
                        FROM questions
                        WHERE id = %s;
                        """,
                        [question_id],
                    )
                    question_info = sql_question_info.fetchone()

                    # Get instructor info
                    instructor_id = quest_info[4]
                    sql_instructor_info = db.execute(
                        """
                        SELECT *
                        FROM instructors
                        WHERE id = %s;
                        """,
                        [instructor_id],
                    )
                    instructor_info = sql_instructor_info.fetchone()

                    # Get inventory list
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

                    return self.assemble_character_details(
                        character_details,
                        item_list,
                        class_info,
                        quest_info,
                        question_info,
                        instructor_info,
                    )

        except Exception as e:
            print("There was a problem interacting with the database.")
            print(e)
            raise Exception

    def assemble_character_details(
        self,
        character_details,
        item_list,
        class_info,
        quest_info,
        question_info,
        instructor_info,
    ):
        class_output = CharacterClass(
            id=class_info[0],
            name=class_info[1],
        )

        questions_output = QuestionOutNoAnswer(
            id=question_info[0],
            question=question_info[1],
            # answer=question_info[2],
            option_1=question_info[3],
            option_2=question_info[4],
            option_3=question_info[5],
        )

        instructor_output = InstructorOut(
            id=instructor_info[0],
            name=instructor_info[1],
            quote=instructor_info[2],
        )

        quest_output = QuestOut(
            id=quest_info[0],
            name=quest_info[1],
            questions=questions_output,
            reward=quest_info[3],
            instructor=instructor_output,
        )

        return CharacterDetails(
            character_id=character_details[0],
            character_name=character_details[2],
            user_id=character_details[1],
            class_id=class_output,
            img_url=character_details[4],
            quest_id=quest_output,
            health=character_details[6],
            currency=character_details[7],
            character_inventory=item_list,
        )
