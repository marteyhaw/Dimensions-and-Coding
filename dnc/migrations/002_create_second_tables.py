steps = [
    [
        """
        CREATE TABLE quests (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            questions INTEGER REFERENCES questions(id),
            reward INTEGER,
            instructor INTEGER REFERENCES instructors(id) NOT NULL
        );
        """,
        """
        DROP TABLE quests;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE shop_items (
            shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
            item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE shop_items;
        """,
    ],
]
