from pydantic import BaseModel
from queries.pool import pool


## Datatypes we are accepting, essentially models from django
class MapsIn(BaseModel):
    quest_id: int


## Datatypes we are sending. We'll be sending name & quest_id so that our front end
## can choose which map to display
class MapsOut(BaseModel):
    id: int
    quest_id: int
    name: str


class MapsRepo(BaseModel):
    ## This is the get request repo, unsure of this logic: (self, maps: MapsIn) -> MapsOut:
    def get(self, maps: MapsIn) -> MapsOut:
        # connect the database
        with pool.connection() as conn:
            # Get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                # this is our SQL logic, we can select/insert/join etc.. here
                result = db.execute(
                    """
                    SELECT *
                    FROM maps
                    WHERE quest_id = %s;
                    """,
                    [maps.quest_id],
                )
                ## not completely sure of fetchone
                ## is it instances of data?
                ## I understand that [0] == to the first datatype we defined, but why is the data indexed?
                record = result.fetchone()
                id = record[0]
                name = record[2]
                # Return new data
                ## is this a dictionary containing all of the data?
                old_data = maps.dict()
                ## old topic in django too, but why set id=id more of a curiosity question
                return MapsOut(id=id, name=name, **old_data)
