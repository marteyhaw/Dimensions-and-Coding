from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class Questions(BaseModel):
    question: str
    answer: str
    option_1: str
    option_2: str
    option_3: str


class QuestionOut(BaseModel):
    id: int
    question: str
    answer: str
    option_1: str
    option_2: str
    option_3: str


class QuestionsRepository:
    def get_one(self, question_id: int) -> Optional[QuestionOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , question
                        , answer
                        , option_1
                        , option_2
                        , option_3
                        FROM questions
                        WHERE id = %s
                        """,
                        [question_id],
                    )
                    record = result.fetchone()
                    return self.record_to_question_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that question"}

    def record_to_question_out(self, record):
        return QuestionOut(
            id=record[0],
            question=record[1],
            answer=record[2],
            option_1=record[3],
            option_2=record[4],
            option_3=record[5],
        )
