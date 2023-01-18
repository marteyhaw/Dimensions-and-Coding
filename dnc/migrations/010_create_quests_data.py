steps = [
    [
        """
        INSERT INTO quests (
            name
            , questions
            , reward
            , instructor
        ) VALUES
        ('Question 1'
        , 1
        , 1
        , 1),
        ('Question 2'
        , 2
        , 1
        , 1),
        ('Question 3'
        , 3
        , 1
        , 1),
        ('Question 4'
        , 4
        , 1
        , 2),
        ('Question 5'
        , 5
        , 1
        , 2),
        ('Question 6'
        , 6
        , 1
        , 2),
        ('Question 7'
        , 7
        , 1
        , 3),
        ('Question 8'
        , 8
        , 1
        , 3),
        ('Question 9'
        , 9
        , 1
        , 3);
        """,
        """
        DROP TABLE quests
        """,
    ]
]