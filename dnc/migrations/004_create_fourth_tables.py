steps = [
    [
        # Create the table
        """
        CREATE TABLE maps (
            id SERIAL PRIMARY KEY NOT NULL,
            quest_id INTEGER NOT NULL,
            name VARCHAR (100)
        );
        """,
        # Drop the table
        """
        DROP TABLE maps;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE inventories (
            character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
            item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE inventories;
        """,
    ],
]
