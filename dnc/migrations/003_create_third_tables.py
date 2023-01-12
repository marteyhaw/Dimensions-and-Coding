steps = [
    [
        """
        CREATE TABLE characters (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER DEFAULT 0,
            name VARCHAR(100) NOT NULL,
            class_id INTEGER REFERENCES class(id),
            img_url INTEGER DEFAULT 0,
            quest_id INTEGER DEFAULT 0 UNIQUE REFERENCES quests(id),
            health INTEGER DEFAULT 5,
            currency INTEGER DEFAULT 0
        );
        """,
        """
        DROP TABLE characters;
        """,
    ]
]
