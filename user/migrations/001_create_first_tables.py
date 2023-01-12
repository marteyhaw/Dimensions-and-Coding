steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25)  NOT NULL,
            email VARCHAR(25) NOT NULL,
            username VARCHAR(25)  NOT NULL,
            password VARCHAR(175) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ]
]
