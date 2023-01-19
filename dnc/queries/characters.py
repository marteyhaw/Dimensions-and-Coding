from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class CharacterClass(BaseModel):
    id: int
    name: str


class CharacterUpdate(BaseModel):
    img_url: Optional[str]
    quest_id: Optional[int]
    health: Optional[int]
    currency: Optional[int]


class CharacterIn(BaseModel):
    name: str
    class_id: int


class CharacterOut(BaseModel):
    id = int
    user_id: int
    name: str
    class_id: CharacterClass
    img_url: str
    quest_id: int
    health: int
    currency: int


class CharacterRepo:
    url_1 = "https://jamestownnd.gov/wp-content/"
    url_2 = "uploads/2018/06/blank-silhouette.png"

    def create_character(
        self,
        character: CharacterClass,
        user_id: int = 0,
        img_url: str = url_1+url_2,
        quest_id: int = 1,
        health: int = 5,
        currency: int = 0,
    ) -> CharacterOut:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:

                result = db.execute(
                    """
                        INSERT INTO characters
                            (
                                user_id,
                                name,
                                class_id,
                                img_url,
                                quest_id,
                                health,
                                currency
                            )
                        VALUES
                            (%s,%s,%s,%s,%s,%s,%s)
                        RETURNING id;
                        """,
                    [
                        user_id,
                        character.name,
                        character.class_id,
                        img_url,
                        quest_id,
                        health,
                        currency,
                    ],
                )

                id = result.fetchone()[0]

                class_info = db.execute(
                    """
                    SELECT *
                    FROM class
                    WHERE id = %s;
                    """,
                    [character.class_id]
                )
                class_info_x = class_info.fetchone()
                class_info_record = {}
                class_info_record['id'] = class_info_x[0]
                class_info_record['name'] = class_info_x[1]
                print("class info record", class_info_record)
                old_data = character.dict()
                old_data["class_id"] = class_info_record
                old_data["user_id"] = user_id
                old_data["img_url"] = img_url
                old_data["quest_id"] = quest_id
                old_data["health"] = health
                old_data["currency"] = currency
                return CharacterOut(id=id, **old_data)

    # except Exception:
    #     return {"message": "error!"}

    def get_characters_by_userid(
        self, user_id: int
    ) -> Union[Error, List[CharacterOut]]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT characters.id, user_id, characters.name,
                    img_url, quest_id, health, currency,class.id, class.name
                    FROM characters
                    JOIN class
                    ON class_id = class.id
                    WHERE user_id = %s
                    """,
                    [user_id],
                )

                result = []
                for record in db:
                    class_record = CharacterClass(id=record[7], name=record[8])
                    characters = CharacterOut(
                        id=record[0],
                        user_id=record[1],
                        name=record[2],
                        class_id=class_record,
                        img_url=record[3],
                        quest_id=record[4],
                        health=record[5],
                        currency=record[6],
                    )
                    result.append(characters)
                return result
                # record = result.fetchone()
                # return self.record_to_character_out(record)

    def get_character_by_characterid(self, character_id: int) -> CharacterOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT characters.id, user_id, characters.name,
                    img_url, quest_id, health, currency,class.id, class.name
                    FROM characters
                    JOIN class
                    ON class_id = class.id
                    WHERE characters.id = %s
                    """,
                    [character_id],
                )

                record = result.fetchone()
                return self.record_to_character_out(record)

    def record_to_character_out(self, record):
        class_record = CharacterClass(id=record[7], name=record[8])
        return CharacterOut(
            id=record[0],
            user_id=record[1],
            name=record[2],
            class_id=class_record,
            img_url=record[3],
            quest_id=record[4],
            health=record[5],
            currency=record[6]
            )

    def record_to_character_out_update(self, record):
        return CharacterOut(
            id=record[0],
            user_id=record[1],
            name=record[2],
            class_id=record[3],
            img_url=record[4],
            quest_id=record[5],
            health=record[6],
            currency=record[7]
            )

    def update(
        self, character_id: int, character: CharacterUpdate
    ) -> CharacterOut:

        update_strings = []

        if character.img_url is not None:
            update_strings.append(f"img_url = '{character.img_url}'")
        if character.quest_id is not None:
            update_strings.append(f"quest_id = {character.quest_id}")
        if character.health is not None:
            update_strings.append(f"health = {character.health}")
        if character.currency is not None:
            update_strings.append(f"currency = {character.currency}")

        inserted_string = ", ".join(update_strings)

        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    f"UPDATE characters "
                    f"SET "
                    f"{inserted_string} "
                    f" WHERE id = {character_id} "
                    f";"
                )

                class_result = db.execute(
                    """
                    SELECT characters.id, user_id, characters.name,
                    img_url, quest_id, health, currency,class.id, class.name
                    FROM characters
                    JOIN class
                    ON class_id = class.id
                    WHERE characters.id = %s
                    """,
                    [character_id],
                )
                record = class_result.fetchone()
                return self.record_to_character_out(record)

    def delete(self, character_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM characters
                        WHERE id = %s
                        """,
                        [character_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_classes(self) -> List[CharacterClass]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM class
                    """
                )

                result = []
                for record in db:
                    classes = CharacterClass(
                        id=record[0],
                        name=record[1],
                    )
                    result.append(classes)
                return result
