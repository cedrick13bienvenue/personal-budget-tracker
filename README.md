# Personal Budget Tracker API

A RESTful API for tracking personal income and expenses, built as part of the Agile & DevOps in Practice module evaluation.

**Stack:** Node.js · TypeScript · Express · Swagger/OpenAPI · Jest · GitHub Actions

---

## Project Structure

```
personal-budget-tracker/
├── src/
│   ├── server.ts          # Entry point — starts the HTTP server
│   ├── app.ts             # Express app setup, middleware, and route mounting
│   ├── swagger.ts         # Swagger/OpenAPI spec configuration
│   ├── types.ts           # TypeScript interfaces (Transaction, CreateTransactionBody)
│   ├── store.ts           # In-memory data store (add, remove, update, reset)
│   └── routes/
│       ├── transactions.ts # POST, GET, DELETE /transactions endpoints
│       └── health.ts       # GET /health endpoint
├── tests/
│   ├── transactions-test.ts  # Unit/integration tests for transactions routes
│   └── health-test.ts        # Unit tests for health endpoint
├── .github/
│   └── workflows/
│       └── main.yml       # GitHub Actions CI pipeline (lint → test → build)
├── package.json
├── tsconfig.json
├── jest.config.js
└── .eslintrc.json
```

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Server starts at `http://localhost:3000`. Swagger UI is at `http://localhost:3000/api-docs`.

### Build for production

```bash
npm run build
npm start
```

---

## API Endpoints

### `GET /health`
Returns service status and uptime in seconds.

```json
{ "status": "ok", "uptime": 42 }
```

---

### `POST /transactions`
Creates a new income or expense transaction.

**Request body:**
```json
{
  "amount": 50.00,
  "type": "expense",
  "category": "food",
  "description": "Lunch at cafe",
  "date": "2026-05-12"
}
```
- `amount` — positive number, required
- `type` — `"income"` or `"expense"`, required
- `category` — non-empty string, required
- `description` — optional string
- `date` — optional ISO date string; defaults to today if omitted

**Responses:** `201 Created` with the saved transaction, or `400 Bad Request` with an error message.

---

### `GET /transactions`
Returns all transactions. Supports optional category filtering.

```
GET /transactions
GET /transactions?category=food
```

Category filtering is case-insensitive. Returns `200` with an array (empty array when none exist).

---

### `DELETE /transactions/:id`
Deletes a transaction by its UUID.

**Responses:** `204 No Content` on success, `404 Not Found` if the ID does not exist.

---

## Running Tests

```bash
npm test
```

Runs all test suites in `tests/` using Jest and ts-jest. Tests cover:
- Creating valid and invalid transactions
- Listing transactions with and without category filters
- Deleting existing and non-existent transactions
- Health endpoint response shape

---

## Linting

```bash
npm run lint
```

Uses ESLint with the TypeScript plugin. Rules enforce strict typing and disallow unused variables.

---

## CI/CD Pipeline

GitHub Actions runs on every push to `main`, `sprint-1`, or `sprint-2`, and on all pull requests targeting `main`.

Pipeline steps:
1. **Lint** — ESLint checks all TypeScript source and test files
2. **Test** — Jest runs all test suites and must pass with zero failures
3. **Build** — TypeScript compiles to `dist/`

Configuration: [`.github/workflows/main.yml`](.github/workflows/main.yml)

---

## Sprint Plan

| Sprint | Status | Stories |
|--------|--------|---------|
| Sprint 0 — Planning | ✅ Done | Backlog, DoD, Sprint plans |
| Sprint 1 — Core API | ✅ Done | US-01 (add), US-02 (list), US-03 (delete), US-07 (health) |
| Sprint 2 — Improvements | 🔜 Next | US-04 (summary), US-05 (filter), US-06 (update), monitoring |
