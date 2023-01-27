from fastapi.testclient import TestClient
from main import app
from routers.characters import CharacterOut
from authenticator import authenticator
from queries.characters import CharacterRepo


character_out = CharacterOut(
    id=1,
    user_id=1,
    name="test",
    class_id={"id": 1, "name": "test"},
    img_url="test",
    quest_id=1,
    health=1,
    currency=1,
)

client = TestClient(app)


class FakeCharacterRepo:
    def get_character_by_characterid(self, character_id):
        return character_out


def fake_authenticator():
    pass


def test_get_character():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    app.dependency_overrides[
        CharacterRepo
    ] = FakeCharacterRepo
    response = client.get("/characters/character/1")
    assert response.status_code == 200
    assert response.json() == character_out
