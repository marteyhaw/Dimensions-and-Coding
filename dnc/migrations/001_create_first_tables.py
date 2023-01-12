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
    [
        # "Up" SQL statement
        """
        CREATE TABLE items (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            img VARCHAR(1000) NOT NULL,
            description VARCHAR(100) NOT NULL,
            price INTEGER NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE items;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE shops (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE shops;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE instructors (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            quote TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE instructors;
        """,
    ],
]
