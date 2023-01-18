steps = [
    [
        """
        INSERT INTO instructors (
            name
            , quote
        ) VALUES
        ('Shahzad'
        , 'Let''s Party'),
        ('Josh'
        , 'No pineapple on pizza'),
        ( 'Andrew'
        , 'TBD');
        """,
        """
        DROP TABLE instructors;
        """,
    ]

]