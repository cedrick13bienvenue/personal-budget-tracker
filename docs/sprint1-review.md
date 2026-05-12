# Sprint 1 Review — Personal Budget Tracker

**Date:** 12 May 2026
**Sprint Goal:** Deliver a working REST API core enabling users to add, list, and delete transactions, with a health endpoint — all covered by unit tests, iterative Git commits, and a passing GitHub Actions CI pipeline with Swagger docs live.

---

## Stories Delivered

| Story | Title | Points | Status |
|-------|-------|--------|--------|
| US-01 | Add a transaction | 3 | ✅ Done |
| US-02 | List all transactions | 2 | ✅ Done |
| US-03 | Delete a transaction | 2 | ✅ Done |
| US-07 | Health check endpoint | 1 | ✅ Done |

**Total delivered:** 8 / 8 story points

---

## What Was Delivered

### `POST /transactions`
Accepts `amount`, `type` (`income`/`expense`), `category`, optional `description` and `date`. Returns `201` with the created transaction including a UUID. Returns `400` with a clear error message on invalid input.

### `GET /transactions`
Returns all stored transactions as a JSON array. Returns an empty array when no transactions exist. Supports `?category=` query parameter for case-insensitive filtering.

### `DELETE /transactions/:id`
Removes a transaction by UUID. Returns `204` on success and `404` when the ID does not exist.

### `GET /health`
Returns `{ status: "ok", uptime: <seconds> }`. Always responds quickly and is suitable for pipeline health checks.

### CI/CD Pipeline
GitHub Actions workflow (`main.yml`) runs on every push to `main`. Steps: lint → test → build. All steps pass on the current commit.

### Swagger UI
Full OpenAPI spec accessible at `/api-docs`. All four endpoints are documented with request/response schemas.

---

## Test Results

```
Test Suites: 2 passed, 2 total
Tests:       11 passed, 11 total
```

All acceptance criteria verified via automated tests (supertest + Jest).

---

## Definition of Done Checklist

- [x] Code committed with meaningful messages (7 iterative commits — no big-bang)
- [x] All tests pass in CI pipeline
- [x] CI/CD pipeline green (lint + test + build)
- [x] All acceptance criteria met
- [x] Swagger docs updated for all endpoints
- [x] No critical bugs
- [x] Code self-reviewed before marking Done
