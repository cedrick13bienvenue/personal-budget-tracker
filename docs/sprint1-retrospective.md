# Sprint 1 Retrospective — Personal Budget Tracker

**Date:** 12 May 2026

---

## What Went Well

- **Clear acceptance criteria** made every endpoint straightforward to implement and test — no ambiguity about what "done" meant.
- **Tests covered all ACs** — the 11 test cases mapped directly to acceptance criteria, giving confidence that nothing was missed.
- **CI/CD was set up from the very first commit**, not bolted on at the end. The pipeline caught a lint issue early before it could accumulate.
- **Iterative commits** (7 commits, one per logical piece of work) made the Git history readable and the sprint demonstrably incremental.

---

## What Could Be Improved

1. **No request logging** — during manual testing there was no visibility into what the server received or how long it took. Adding structured logging middleware in Sprint 2 will make debugging significantly faster.

2. **Error messages lacked field context** — a `400` response said `"amount must be a positive number"` but did not echo back what value was received. Sprint 2 will not add that for internal calls, but the validation messages can be more descriptive.

3. **No monitoring on the /health endpoint** — the endpoint returned uptime but nothing about memory or server timestamp, making it less useful for operational monitoring. Sprint 2 will enhance this.

---

## Process Improvements for Sprint 2

| # | Improvement | Action |
|---|-------------|--------|
| 1 | Add request logging | Implement a logging middleware in Sprint 2 (addresses Sprint 2 monitoring requirement) |
| 2 | Enhance /health | Add `timestamp` and `memoryMB` fields to give a fuller operational picture |
| 3 | Continue iterative commits | Maintain one commit per user story / logical change — no big-bang commits |
