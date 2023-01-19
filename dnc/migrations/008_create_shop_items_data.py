from pathlib import Path
import sys

path = str(Path(Path(__file__).parent.absolute()).parent.absolute())
sys.path.insert(0, path)
from dncdb.dnc_db import import_db_contents

steps = [
    [
        f"INSERT INTO shops(name) "
        f"VALUES "
        f"{import_db_contents('shop_db.txt')}"
        f";",
        """
        DROP TABLE shops;
        """,
    ],
    [
        f"INSERT INTO items(name, img, description, price) "
        f"VALUES "
        f"{import_db_contents('item_db.txt')}"
        f";",
        """
        DROP TABLE items;
        """,
    ],
    [
        f"INSERT INTO shop_items "
        f"VALUES "
        f"{import_db_contents('shop_items.txt')}"
        f";",
        """
        DROP TABLE items;
        """,
    ],
]
