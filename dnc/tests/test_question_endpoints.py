from fastapi.testclient import TestClient
from main import app
from queries.questions import QuestionsRepository
from routers.questions import QuestionOut
from authenticator import authenticator


client = TestClient(app)


class FakeQuestionRepo:
    def get_one(self, question_id):
        return question_out


def fake_authenticator():
    pass


def test_get_question():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator
    app.dependency_overrides[QuestionsRepository] = FakeQuestionRepo
    response = client.get("/questions/1")
    assert response.status_code == 200
    assert response.json() == question_out


question_out = QuestionOut(
    id=1,
    question="test",
    answer="test",
    option_1="test",
    option_2="test",
    option_3="test",
)
