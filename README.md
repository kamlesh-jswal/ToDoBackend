# ToDo Backend (TypeScript, Express, MongoDB)

## Setup

1. Install dependencies

```bash
cd ToDoBackend
npm install
```

2. Copy env file

```bash
cp .env.example .env
```

3. Set `MONGODB_URI` in `.env`

4. Dev run:

```bash
npm run dev
```

5. Build + run:

```bash
npm run build
npm start
```

## API

- `GET /api/todos`
- `GET /api/todos/:id`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

Payload example for create/update:

```json
{
  "title": "Buy milk",
  "description": "2 liters",
  "completed": false
}
```
