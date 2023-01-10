steps = [
    [
        """
        CREATE TABLE class (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL

        );
        """,
        """
        DROP TABLE class;
        """
    ]

]
