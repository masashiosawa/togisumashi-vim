# Data Model

This document describes the shared data model used by both the web app and the Neovim plugin.

## Cloudflare D1 (authenticated users)

```sql
CREATE TABLE drill_records (
  id          TEXT    PRIMARY KEY,   -- ULID
  user_id     TEXT    NOT NULL,      -- GitHub user ID (string)
  drill_id    TEXT    NOT NULL,      -- matches `id` in drills/*.md
  time_ms     INTEGER NOT NULL,      -- elapsed time in milliseconds
  mistakes    INTEGER NOT NULL,      -- number of incorrect keystrokes
  success     INTEGER NOT NULL,      -- 1 = completed within target_time_ms, 0 = failed
  started_at  INTEGER NOT NULL       -- Unix epoch milliseconds
);

CREATE INDEX idx_records_user_drill ON drill_records (user_id, drill_id);

CREATE TABLE users (
  id           TEXT    PRIMARY KEY,  -- GitHub user ID (string)
  github_login TEXT    NOT NULL,
  display_name TEXT    NOT NULL,
  created_at   INTEGER NOT NULL      -- Unix epoch milliseconds
);

CREATE TABLE audit_log (
  id         TEXT    PRIMARY KEY,    -- ULID
  user_id    TEXT    NOT NULL,
  event      TEXT    NOT NULL,       -- "login" | "logout" | "delete_account" | "token_refresh"
  ip_hash    TEXT,                   -- SHA-256 of IP, for abuse detection only
  created_at INTEGER NOT NULL        -- Unix epoch milliseconds
);
```

### Personal best query

Personal best is derived on read — never stored as a separate column.

```sql
SELECT drill_id, MIN(time_ms) AS best_ms
FROM drill_records
WHERE user_id = ? AND success = 1
GROUP BY drill_id;
```

### Anonymous user convention

Rows created before sign-in use `user_id = 'anon:<device-fingerprint>'`.  
On first sign-in, a migration query moves orphaned rows to the authenticated `user_id`.

## IndexedDB (unauthenticated / offline)

Object store name: `drill_records`  
Key path: `id` (ULID, generated client-side)

```ts
interface DrillRecord {
  id: string;          // ULID
  userId: string;      // "anon:<fingerprint>" before sign-in, GitHub ID after
  drillId: string;     // matches drill `id` in drills/*.md
  timeMs: number;      // elapsed time in milliseconds
  mistakes: number;
  success: boolean;
  startedAt: number;   // Unix epoch milliseconds
}
```

Indexes:
- `[userId, drillId]` — for personal best lookup
- `startedAt` — for history display

### Sync strategy

On sign-in, unsynced IndexedDB records (where `synced !== true`) are bulk-uploaded to D1 via `POST /api/records/sync`. Successfully uploaded records are marked `synced: true` in IndexedDB and kept for 30 days, then pruned.

## Shared conventions

| Convention | Value |
|---|---|
| IDs | ULID (sortable, collision-resistant, no UUID hyphen noise) |
| Time | Unix epoch **milliseconds** (`number`) everywhere — no ISO strings in storage |
| Booleans in D1 | `INTEGER` 0/1 (SQLite has no native boolean) |
| Personal email | Not stored. GitHub login + display name only |
