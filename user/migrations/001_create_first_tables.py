steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25)  NOT NULL,
            email VARCHAR(25) NOT NULL UNIQUE,
            username VARCHAR(25)  NOT NULL,
            password TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ]
]
