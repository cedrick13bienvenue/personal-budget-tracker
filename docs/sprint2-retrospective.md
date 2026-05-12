# Sprint 2 Final Retrospective — Personal Budget Tracker

**Date:** 12 May 2026

---

## What Went Well

- **Retrospective feedback was actioned immediately** — both improvements identified in Sprint 1 (logging and enhanced health endpoint) were the first commits of Sprint 2, demonstrating that the retrospective drove real change rather than being performative.
- **Test coverage scaled naturally** — adding tests alongside each story (not after) kept the test suite trustworthy. 20 tests, 4 suites, zero failures.
- **The CI pipeline earned its value** — the GitHub Actions pipeline running lint + test + build on every push meant no broken state ever sat on `main`. Every commit on the branch is green.
- **Partial updates (PUT) were designed safely** — only provided fields are patched, preserving existing data. This prevented a class of bugs where omitting a field would silently clear it.
- **In-memory store with a `reset()` function** made tests fully isolated with no shared state between test cases — a key design decision that paid off when tests scaled to 20.

---

## What Could Be Improved (Lessons for Future Projects)

1. **Persistence** — the in-memory store resets when the server restarts. A real production service would need a database (e.g., SQLite, PostgreSQL). This was an intentional scope decision for the prototype but would be the first thing to address in a real product.

2. **Authentication** — the API has no auth layer. Any caller can read or delete any transaction. Adding token-based authentication (e.g., JWT) would be the natural next story in a real backlog.

3. **Sprint planning estimation accuracy** — US-06 (update) was estimated at 3 points and took roughly the same effort as US-04 (summary) at 3 points, validating the estimates. However, US-05 (filter) was marked as Sprint 2 but was already partially implemented in Sprint 1 — this shows that acceptance criteria should be checked against existing implementation before sprint planning to avoid double-counting.

---

## Key Lessons Learned

| Lesson | Takeaway |
|--------|----------|
| Iterative commits create a readable audit trail | The 11-commit history shows clearly when each feature was added — no single big-bang commit at the end |
| CI from day one prevents drift | Setting up GitHub Actions in the first sprint meant the pipeline was always a source of truth, not a last-minute addition |
| Test isolation matters at scale | `store.reset()` in `beforeEach` kept 20 tests independent — without it, test order would affect results |
| Retrospectives only work if acted on | The Sprint 1 retrospective listed 3 improvements; all 3 were implemented at the start of Sprint 2 |
| Swagger as documentation contract | Keeping the OpenAPI spec in sync with code meant the API was always self-documenting — no separate doc maintenance |

---

## Final Project Summary

| Metric | Value |
|--------|-------|
| Total sprints | 3 (Sprint 0 planning + Sprint 1 + Sprint 2) |
| User stories delivered | 7 / 7 |
| Total story points | 16 |
| Test suites | 4 |
| Tests passing | 20 / 20 |
| Git commits | 11 (iterative) |
| CI pipeline | GitHub Actions — lint + test + build |
| API documentation | Swagger UI at `/api-docs` |
| Monitoring | Request logger + enhanced `/health` |
