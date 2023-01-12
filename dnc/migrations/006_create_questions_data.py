steps = [
    [
        """
        INSERT INTO questions(
            question
            , answer
            , option_1
            , option_2
            , option_3) VALUES
        ('What is a correct syntax to output "Hello World" in Python',
        'print("Hello World")',
        'p("Hello World")',
        'print("Hello World")',
        'print Hello World'),
        ('How do you insert comments in Python code',
        '#This is a comment',
        '/This is a comment',
        '//This is a comment',
        '#This is a comment'),
        ('What is the correct file extension for Python files?',
        '.py',
        '.py',
        '.pyt',
        '.pt'),
        ('What is the output of the following code?
        a = [1, 2, 3] b = a b[0] = 5 print(a)',
        '[1, 2, 3]',
        '[1, 2, 3]',
        '[5, 2, 3]',
        '[1, 2, 3, 5]'),
        ('Suppose my_list is [3, 6, 12, 24, 5, 10, 15, 20].
        Which of the statements returns the following list [6, 24, 10, 20]?',
        'print(my_list[1::2])',
        'print(my_list[::2]))',
        'print(my_list[1::2])',
        'print(my_list[1:8])'),
        ('What is the correct way to import the "math" module in Python?',
        'import math',
        'import math',
        'include math',
        'use math'),
        ('How do you create a tuple in python?',
        'using parentheses ()',
        'using square brackets []',
        'using curly braces {}',
        'using parentheses ()'),
        ('What is the output of the following code? a = 5 b = 10 print(a > b)',
        'False',
        'True',
        'False',
        'Error'),
        ('Given that num1 = 7 num2 = 3,
        what is the output of num3 if: num3 = num1 % num2?',
        '1',
        '0',
        '1',
        '2')
        """,
        """
        DROP TABLE questions;
        """,
    ]
]
