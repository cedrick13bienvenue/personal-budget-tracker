# Sprint 2 Review — Personal Budget Tracker

**Date:** 12 May 2026
**Sprint Goal:** Apply Sprint 1 retrospective improvements, deliver the remaining backlog, and add basic monitoring/logging to the application.

---

## Stories Delivered

| Story | Title | Points | Status |
|-------|-------|--------|--------|
| US-04 | View budget summary | 3 | ✅ Done |
| US-05 | Filter by category | 2 | ✅ Done (already in US-02, verified & tested) |
| US-06 | Update a transaction | 3 | ✅ Done |
| Monitoring | Logging middleware + enhanced /health | — | ✅ Done |

**Total story points delivered this sprint:** 8

---

## What Was Delivered

### `GET /summary`
Returns `{ totalIncome, totalExpenses, netBalance }` computed across all stored transactions. Values are rounded to two decimal places. Returns `200` always (zeros when empty).

### `GET /transactions?category=<value>` (US-05)
Category filtering confirmed end-to-end with dedicated test coverage. Case-insensitive match — `?category=Food` matches transactions stored as `food`, `Food`, or `FOOD`.

### `PUT /transactions/:id`
Partial updates supported — only fields provided in the request body are changed; existing fields are preserved. Validation enforced on updated fields (invalid `amount` or `type` returns `400`). Returns `404` for unknown IDs.

### Request Logging Middleware
Every HTTP request is logged to stdout in the format:
```
[ISO timestamp] METHOD /path statusCode Xms
```
Visible during both development and in CI logs. Zero external dependencies — implemented as a custom Express middleware.

### Enhanced `GET /health`
Now returns:
```json
{
  "status": "ok",
  "uptime": 42,
  "timestamp": "2026-05-12T17:00:00.000Z",
  "memoryMB": 28.45
}
```

---

## Test Results

```
Test Suites: 4 passed, 4 total
Tests:       20 passed, 20 total
```

Sprint 2 added 9 new tests (4 for summary, 5 for update). All 20 tests pass.

---

## Sprint 1 Retrospective Actions — Applied

| Action | Applied? |
|--------|----------|
| Add request logging middleware | ✅ `src/middleware/logger.ts` |
| Enhance /health with timestamp and memory | ✅ Updated `src/routes/health.ts` |
| Maintain iterative commits | ✅ 4 focused commits this sprint |

---

## Definition of Done Checklist

- [x] Code committed with meaningful messages
- [x] All tests pass in CI pipeline
- [x] CI/CD pipeline green (lint + test + build)
- [x] All acceptance criteria met and verified via tests
- [x] Swagger docs updated for new endpoints
- [x] No critical bugs
- [x] Code self-reviewed before marking Done
