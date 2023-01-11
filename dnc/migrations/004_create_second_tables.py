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
        """

    ]
]
