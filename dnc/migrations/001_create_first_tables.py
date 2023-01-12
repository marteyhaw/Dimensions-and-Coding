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
        """,
    ],
    [
        """
        CREATE TABLE questions (
            id SERIAL PRIMARY KEY NOT NULL,
            question VARCHAR(1000) NOT NULL,
            answer VARCHAR(1000) NOT NULL,
            option_1 VARCHAR(1000) NOT NULL,
            option_2 VARCHAR(1000) NOT NULL,
            option_3 VARCHAR(1000) NOT NULL

        );
        """,
        """
        DROP TABLE questions;
        """,
    ],
]
