from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.shops import ShopItemsRepository
from queries.inventories import InventoriesRepository

client = TestClient(app)


class FakeAuthenticator:
    pass


class FakeShopItemsRepository:
    def get_items_for_sale(self, shop_id):
        if shop_id == 1:
            return {
                "shop_name": "Pixellated Tavern",
                "items": [
                    {
                        "id": 1,
                        "name": "Ancient Sword",
                        "img": "ancient_sword.jpg",
                        "description": "An ancient sword.",
                        "price": 1,
                    },
                    {
                        "id": 2,
                        "name": "Mythril Armor",
                        "img": "mythril_armor.jpg",
                        "description": "Armor made out of mythril.",
                        "price": 1,
                    },
                    {
                        "id": 3,
                        "name": "Adamantium Shield",
                        "img": "adamantium_shield.jpg",
                        "description": "Shield made out of adamantium.",
                        "price": 1,
                    },
                    {
                        "id": 4,
                        "name": "Party Hat",
                        "img": "party_hat.jpg",
                        "description": "A party hat.",
                        "price": 1,
                    },
                ],
            }
        raise Exception


class FakeInventoriesRepository:
    def purchase_item(self, item_id, character_id):
        return {
            "character_name": "string",
            "character_inventory": [
                {
                    "id": 1,
                    "name": "Ancient Sword",
                    "img": "ancient_sword.jpg",
                    "description": "An ancient sword.",
                    "price": 1,
                },
            ],
        }

    def get_character_details(self, character_id):
        return {
            "character_name": "string",
            "character_inventory": [
                {
                    "id": 1,
                    "name": "Ancient Sword",
                    "img": "ancient_sword.jpg",
                    "description": "An ancient sword.",
                    "price": 1,
                }
            ],
            "character_id": 1,
            "user_id": 1,
            "class_id": {"id": 1, "name": "Dog"},
            "img_url": "blank-silhouette.png",
            "quest_id": {
                "id": 1,
                "name": "Question 1",
                "questions": {
                    "id": 1,
                    "question": "Question",
                    "option_1": 'p("Hello World")',
                    "option_2": 'print("Hello World")',
                    "option_3": "print Hello World",
                },
                "reward": 1,
                "instructor": {
                    "id": 1,
                    "name": "Shahzad",
                    "quote": "Let's Party",
                },
            },
            "health": 5,
            "currency": 10,
        }


def test_get_shop_one_items():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
    app.dependency_overrides[ShopItemsRepository] = FakeShopItemsRepository
    response = client.get(
        "/shops/1",
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "shop_name": "Pixellated Tavern",
        "items": [
            {
                "id": 1,
                "name": "Ancient Sword",
                "img": "ancient_sword.jpg",
                "description": "An ancient sword.",
                "price": 1,
            },
            {
                "id": 2,
                "name": "Mythril Armor",
                "img": "mythril_armor.jpg",
                "description": "Armor made out of mythril.",
                "price": 1,
            },
            {
                "id": 3,
                "name": "Adamantium Shield",
                "img": "adamantium_shield.jpg",
                "description": "Shield made out of adamantium.",
                "price": 1,
            },
            {
                "id": 4,
                "name": "Party Hat",
                "img": "party_hat.jpg",
                "description": "A party hat.",
                "price": 1,
            },
        ],
    }


def test_get_shop_not_exist_items():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
    app.dependency_overrides[ShopItemsRepository] = FakeShopItemsRepository
    response = client.get(
        "/shops/9999999999",
    )
    app.dependency_overrides = {}
    assert response.status_code == 400
    assert response.json() == {
        "detail": "Unable to retrieve that shop's items."
    }


def test_get_shop_one_items_with_bad_token():
    response = client.get(
        "/shops/1", headers={"Authorization": "Bearer Badtoken"}
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}


def test_get_character_details_of_character_that_does_not_exist():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
    response = client.get(
        "/inventories/-1/",
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"detail": "That character does not exist."}


def test_purchase_item():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
    app.dependency_overrides[InventoriesRepository] = FakeInventoriesRepository
    response = client.post(
        "/inventories/1?item_id=1",
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "character_name": "string",
        "character_inventory": [
            {
                "id": 1,
                "name": "Ancient Sword",
                "img": "ancient_sword.jpg",
                "description": "An ancient sword.",
                "price": 1,
            },
        ],
    }


def test_purchase_item_with_bad_token():
    response = client.post(
        "/inventories/1?item_id=1",
        headers={"Authorization": "Bearer Badtoken"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}


def test_get_character_details():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
    app.dependency_overrides[InventoriesRepository] = FakeInventoriesRepository
    response = client.get(
        "/inventories/1",
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
        "character_name": "string",
        "character_inventory": [
            {
                "id": 1,
                "name": "Ancient Sword",
                "img": "ancient_sword.jpg",
                "description": "An ancient sword.",
                "price": 1,
            }
        ],
        "character_id": 1,
        "user_id": 1,
        "class_id": {"id": 1, "name": "Dog"},
        "img_url": "blank-silhouette.png",
        "quest_id": {
            "id": 1,
            "name": "Question 1",
            "questions": {
                "id": 1,
                "question": "Question",
                "option_1": 'p("Hello World")',
                "option_2": 'print("Hello World")',
                "option_3": "print Hello World",
            },
            "reward": 1,
            "instructor": {"id": 1, "name": "Shahzad", "quote": "Let's Party"},
        },
        "health": 5,
        "currency": 10,
    }


def test_get_character_details_with_bad_token():
    response = client.get(
        "/inventories/1",
        headers={"Authorization": "Bearer Badtoken"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}
