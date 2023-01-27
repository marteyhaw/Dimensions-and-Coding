from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.maps import MapsRepo


client = TestClient(app)


class FakeAuthenticator:
    pass


class FakeMapsRepo:
    def get(self, maps):
        return {"id": 1, "quest_id": 1, "name": "map1"}


def test_get_map_one():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
    app.dependency_overrides[MapsRepo] = FakeMapsRepo
    response = client.get(
        "/maps/1",
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"id": 1, "quest_id": 1, "name": "map1"}


def test_get_shop_one_items_with_bad_token():
    app.dependency_overrides = {}
    response = client.get(
        "/maps/1", headers={"Authorization": "Bearer Badtoken"}
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}
