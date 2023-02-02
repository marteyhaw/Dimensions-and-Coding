# APIs

## Maps

![Maps](apidesign/getmap.PNG)
![Maps](apidesign/getmap1.PNG)

```json
{
  "id": 0,
  "quest_id": 0,
  "name": "string"
}
```

## Classes

![Classes](apidesign/getclasses.PNG)
![Classes](apidesign/getclasses1.PNG)

```json
[
  {
    "id": 0,
    "name": "string"
  }
]
```

## Characters

![Characters](apidesign/postcharacters.PNG)
![Characters](apidesign/postcharacters2.PNG)

```json
{
  "name": "string",
  "user_id": 0,
  "class_id": 0,
  "img_url": "string"
}
```

![Characters](apidesign/postcharacters1.PNG)

```json

Response body
Download
{
  "id": 1,
  "user_id": 1,
  "name": "string",
  "class_id": {
    "id": 1,
    "name": "Dog"
  },
  "img_url": "string",
  "quest_id": 1,
  "health": 5,
  "currency": 0
}
```

---

![Characters](apidesign/getusercharacter.PNG)
![Characters](apidesign/getusercharacter1.PNG)

```json
[
  {
    "id": 0,
    "user_id": 0,
    "name": "string",
    "class_id": {
      "id": 0,
      "name": "string"
    },
    "img_url": "string",
    "quest_id": 0,
    "health": 0,
    "currency": 0
  }
]
```

---

![Characters](apidesign/getcharacter.PNG)
![Characters](apidesign/getcharacter1.PNG)

```json
{
  "id": 0,
  "user_id": 0,
  "name": "string",
  "class_id": {
    "id": 0,
    "name": "string"
  },
  "img_url": "string",
  "quest_id": 0,
  "health": 0,
  "currency": 0
}
```

---

![Characters](apidesign/putcharacter.PNG)
![Characters](apidesign/putcharacter1.PNG)

```json
{
  "id": 0,
  "user_id": 0,
  "name": "string",
  "class_id": {
    "id": 0,
    "name": "string"
  },
  "img_url": "string",
  "quest_id": 0,
  "health": 0,
  "currency": 0
}
```

---

![Characters](apidesign/deletecharacter.PNG)

```json
true
```

## Questions

![Questions](apidesign/getquestion.PNG)
![Questions](apidesign/getquestion1.PNG)

```json
{
  "id": 0,
  "question": "string",
  "answer": "string",
  "option_1": "string",
  "option_2": "string",
  "option_3": "string"
}
```

## Shop

![Shop](apidesign/getshop.PNG)
![Shop](apidesign/getshop1.PNG)

```json
true
```

## Inventory

![Inventory](apidesign/getinventory.PNG)

```json
{
  "character_name": "string",
  "character_inventory": [
    {
      "id": 0,
      "name": "string",
      "img": "string",
      "description": "string",
      "price": 0
    }
  ],
  "character_id": 0,
  "user_id": 0,
  "class_id": {
    "id": 0,
    "name": "string"
  },
  "img_url": "string",
  "quest_id": {
    "id": 0,
    "name": "string",
    "questions": {
      "id": 0,
      "question": "string",
      "option_1": "string",
      "option_2": "string",
      "option_3": "string"
    },
    "reward": 0,
    "instructor": {
      "id": 0,
      "name": "string",
      "quote": "string"
    }
  },
  "health": 0,
  "currency": 0
}
```

![Inventory](apidesign/postinventory1.PNG)

```json
{
  "character_name": "string",
  "character_inventory": [
    {
      "id": 0,
      "name": "string",
      "img": "string",
      "description": "string",
      "price": 0
    }
  ]
}
```
