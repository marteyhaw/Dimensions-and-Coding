steps = [
    [
        """
        CREATE TABLE quests (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            questions INTEGER references questions(id),
            reward INTEGER,
            instructor INTEGER NOT NULL
        );
        """,
        """
        DROP TABLE quests;
        """,
    ]
]
