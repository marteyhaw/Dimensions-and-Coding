steps = [
    [
        """
        INSERT INTO maps(name, quest_id) VALUES
        ('map1', 1),
        ('map2', 2),
        ('map3', 3),
        ('map4', 4)
        ;
        """,
        """
        DROP TABLE maps;
        """
    ]
]
