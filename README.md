# Todo List API
A RESTful backend API for managing tasks in a Todo List application.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Docker
* TypeScript

---

### Fields

| Field       | Type       | Description           |
| ----------- | ---------- | --------------------- |
| id          | Int        | Unique identifier     |
| title       | String     | Todo title            |
| description | String?    | Optional description  |
| status      | TodoStatus | Current status        |
| completedAt | DateTime?  | Completion timestamp  |
| createdAt   | DateTime   | Creation timestamp    |
| updatedAt   | DateTime   | Last update timestamp |

---

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd todo-api
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tododb"
PORT=3000
```

---

## Running PostgreSQL with Docker

Start PostgreSQL container:

```bash
docker compose up -d
```

Verify container is running:

```bash
docker ps
```

---

## Prisma Setup

Run migrations:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

---

## API Endpoints test in Postman

### Create Todo in Postman (POST)

`/todos`

Request Body:

```json
{
  "title": "Learn Prisma",
  "description": "Study Prisma ORM basics"
}
```

---

### Get All Todos

`/todos`

Response:

```json
[
  {
    "id": 1,
    "title": "Learn Prisma",
    "status": "PENDING"
  }
]
```

---

### Update Entire Todo (PUT)

`/todos/:id`

Request Body:

```json
{
  "title": "Learn Prisma ORM",
  "description": "Updated description",
  "status": "DONE"
}
```

---

### Partially Update (PATCH) Todo

`/todos/:id`

Request Body:

```json
{
  "status": "DONE"
}
```

---

### Delete Todo

`/todos/:id`

Response:

```json
{
  "message": "Todo deleted successfully"
}
```

---

## Status Values

| Status      |
| ----------- |
| NOT_STARTED |
| PENDING     |
| DONE        |