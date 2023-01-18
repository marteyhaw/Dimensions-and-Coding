steps = [
    [
        """
        CREATE TABLE characters (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER DEFAULT 0,
            name VARCHAR(100) NOT NULL,
            class_id INTEGER REFERENCES class(id),
            img_url VARCHAR(1000),
            quest_id INTEGER REFERENCES quests(id),
            health INTEGER DEFAULT 5,
            currency INTEGER DEFAULT 0
        );
        """,
        """
        DROP TABLE characters;
        """,
    ]
]

