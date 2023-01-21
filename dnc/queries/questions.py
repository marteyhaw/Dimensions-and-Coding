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


class AnswersRepo:
    def check_answer(
        self,
        question_id: int,
        character_id: int,
        char_answer: int,
    ):

        with pool.connection() as conn:

            with conn.cursor() as db:

                sql_question_info = db.execute(
                    """
                        SELECT answer, option_1, option_2, option_3
                        FROM questions
                        WHERE id = %s
                        """,
                    [question_id],
                )
                question_info = sql_question_info.fetchone()
                answer = question_info[0]
                char_answer_str = question_info[char_answer]

                # If answer is right
                if char_answer_str == answer:

                    # Add reward/currency
                    get_currency = db.execute(
                        """
                            SELECT currency, quest_id
                            FROM characters
                            WHERE id = %s;
                            """,
                        [character_id],
                    )
                    current_currency, current_quest = get_currency.fetchone()
                    new_quest = current_quest + 1
                    new_currency = current_currency + 1
                    db.execute(
                        """
                            UPDATE characters
                            SET currency = %s,
                            quest_id = %s
                            WHERE id = %s;
                            """,
                        [new_currency, new_quest, character_id],
                    )
                    return True
                else:

                    get_health = db.execute(
                        """
                            SELECT health
                            FROM characters
                            WHERE id = %s
                            """,
                        [character_id],
                    )
                    current_health = get_health.fetchone()[0]
                    new_health = current_health - 1
                    if new_health == 0:
                        db.execute(
                            """
                            UPDATE characters
                            SET health = 5
                            WHERE id = %s
                            """,
                            [character_id],
                        )
                    else:
                        db.execute(
                            """
                            UPDATE characters
                            SET health = %s
                            WHERE id = %s
                            """,
                            [current_health, character_id],
                        )
                    return False
