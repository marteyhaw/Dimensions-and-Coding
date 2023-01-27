from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository

client = TestClient(app)


class FakeUserRepository:
    def get_user_by_id(self, user_id):
        return {
            "id": 1,
            "first_name": "String",
            "last_name": "Cheese",
            "email": "string@cheese.com",
            "username": "string",
        }


def test_get_all():
    app.dependency_overrides[UserRepository] = FakeUserRepository
    response = client.get(
        "/users/1",
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "first_name": "String",
        "last_name": "Cheese",
        "email": "string@cheese.com",
        "username": "string",
    }
