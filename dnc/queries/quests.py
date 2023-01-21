from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class Quests(BaseModel):
    name: str
    question: str
    reward: int
    instructor: int


class QuestOut(BaseModel):
    id: int
    name: str
    question: str
    reward: int
    instructor: int


class QuestsRepository:
    def get_one(self, quest_id: int) -> Optional[QuestOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM quests
                        WHERE id = %s
                        """,
                        [quest_id],
                    )
                    record = result.fetchone()
                    return self.record_to_quest_out(record)
        except Exception:
            return {"message": "Could not get that quest"}

    def record_to_quest_out(self, record):
        return QuestOut(
            id=record[0],
            name=record[1],
            question=record[2],
            reward=record[3],
            instructor=record[4],
        )
