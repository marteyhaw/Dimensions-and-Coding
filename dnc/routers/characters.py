from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.characters import (
    CharacterIn,
    CharacterRepo,
    CharacterOut,
    CharacterUpdate,
    Error,
)


router = APIRouter()


@router.post("/characters", response_model=Union[CharacterOut, Error])
def character_creation(
    character: CharacterIn, response: Response, repo: CharacterRepo = Depends()
):
    return repo.create_character(character)


@router.get("/characters/user/{user_id}")
def get_user_characters(
    user_id: int,
    repo: CharacterRepo = Depends(),
) -> CharacterOut:
    return repo.get_characters_by_userid(user_id)


@router.get("/characters/character/{character_id}")
def get_character(
    character_id: int,
    repo: CharacterRepo = Depends(),
) -> CharacterOut:
    return repo.get_character_by_characterid(character_id)


@router.put("/characters/character/{character_id}")
def update_character(
    character_id: int,
    character: CharacterUpdate,
    repo: CharacterRepo = Depends(),
) -> CharacterOut:
    return repo.update(character_id, character)


@router.delete("/characters/character/{character_id}")
def delete_character(
    character_id: int,
    repo: CharacterRepo = Depends(),
) -> CharacterOut:
    return repo.delete(character_id)
