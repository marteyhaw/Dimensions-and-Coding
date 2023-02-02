# Schemas

## First Tables

| class | type        |
| ----- | ----------- |
| id    | PRIMARY KEY |
| name  | VARCHAR     |

---

| questions | type        |
| --------- | ----------- |
| id        | PRIMARY KEY |
| question  | VARCHAR     |
| answer    | VARCHAR     |
| option_1  | VARCHAR     |
| option_2  | VARCHAR     |
| option_3  | VARCHAR     |

---

| shops    | type        |
| -------- | ----------- |
| id       | PRIMARY KEY |
| question | VARCHAR     |
| answer   | VARCHAR     |
| option_1 | VARCHAR     |
| option_2 | VARCHAR     |
| option_3 | VARCHAR     |

---

| instructors | type        |
| ----------- | ----------- |
| id          | PRIMARY KEY |
| name        | VARCHAR     |
| quote       | VARCHAR     |

---

## Second Tables

| quests     | type        |
| ---------- | ----------- |
| id         | PRIMARY KEY |
| name       | VARCHAR     |
| questions  | INTEGER     |
| reward     | INTEGER     |
| instructor | INTEGER     |

---

| shop_items | type    |
| ---------- | ------- |
| shop_id    | INTEGER |
| item_id    | INTEGER |

---

## Third Tables

| characters | type        |
| ---------- | ----------- |
| id         | PRIMARY KEY |
| user_id    | INTEGER     |
| name       | VARCHAR     |
| class_id   | INTEGER     |
| img_url    | VARCHAR     |
| quest_id   | INTEGER     |
| health     | INTEGER     |
| currency   | INTEGER     |

---

## Fourth Tables

| maps     | type        |
| -------- | ----------- |
| id       | PRIMARY KEY |
| quest_id | INTEGER     |
| name     | VARCHAR     |

---

| inventories  | type    |
| ------------ | ------- |
| character_id | INTEGER |
| quest_id     | INTEGER |

## Fifth Tables

| inventories  | type    |
| ------------ | ------- |
| character_id | INTEGER |
| quest_id     | INTEGER |
