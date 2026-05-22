# Drill Format Reference

This document describes the YAML frontmatter format used by every drill file under `drills/`.

## Quick start

1. Create a `.md` file in the appropriate lesson directory (e.g., `drills/tier-1/06-my-lesson/01-first-drill.md`).
2. Add YAML frontmatter (see schema below).
3. Run `pnpm build:drills` from the repo root to regenerate `web/public/drills.json` and `web/public/lessons.json`.
4. Start the dev server with `pnpm dev` and verify the drill works.

---

## Lesson descriptor (`_lesson.md`)

Each lesson directory **must** contain `_lesson.md`. It is not a drill — it provides the concept text shown in guided mode.

```yaml
---
id: tier-1-06-example           # unique across all lessons
tier: 1                         # 1 | 2 | 3 | …
order: 6                        # display order within the tier
title_en: "Example: key1 key2"
title_ja: "例: key1 key2"
concept_en: |
  Explanation in English.

    key1 — what it does
    key2 — what it does
concept_ja: |
  日本語の説明。

    key1 — 動作の説明
    key2 — 動作の説明
---
```

---

## Drill file schema

```yaml
---
id: tier-1-06-example-01        # unique across all drills (lesson-id + "-" + number)
tier: 1                         # must match parent lesson
type: motion | edit             # see "Drill types" below
target_time_ms: 4000            # par time in milliseconds
template:                       # starting document content
  - kind: fixed
    lines:
      - "const foo = bar;"
start_col: 0                    # initial cursor column (default: 0)
start_row: 0                    # initial cursor row    (default: 0 / "last" is allowed)
goal:                           # success condition
  type: col_N                   # see "Goal types" below
  n: 6
solution_keys:                  # displayed as hint in Practice mode
  - "w"
i18n:
  en:
    title: "Jump forward with w"
    description: "Press w to jump to the start of the next word (col 6)."
  ja:
    title: "w で前方にジャンプ"
    description: "w を押して次の単語の先頭（列 6）にジャンプせよ。"
---
```

---

## Drill types

### `motion`

The cursor must reach the `goalOffset` position. Document text is never modified.

Use for movement keys: `h j k l w b e 0 $ ^ g_ gg G f t ; ,` etc.

```yaml
type: motion
goal:
  type: col_N
  n: 10
```

### `edit`

The document text (trimmed) must equal `goalText`. Cursor position is ignored.

Use for editing keys: `d c y p r dd cc yy` etc.

```yaml
type: edit
goal:
  type: text_equals
  content: |-
    const a = 1;
    const b = 2;
```

For multi-line goals, use `|-` (YAML block scalar, strips trailing newline).

---

## Goal types

### `col_N`

Cursor must be at column `n` on the starting row.

```yaml
goal:
  type: col_N
  n: 8
```

### `col_start`

Cursor must be at column 0.

```yaml
goal:
  type: col_start
```

### `col_end`

Cursor must be at the last character of the line (same as `$`).

```yaml
goal:
  type: col_end
```

### `first_nonblank`

Cursor must be at the first non-whitespace character of the line (same as `^`).

```yaml
goal:
  type: first_nonblank
```

### `last_line_start`

Cursor must be at column 0 of the last line (used for `G`).

```yaml
goal:
  type: last_line_start
```

### `row_col`

Cursor must be at a specific row **and** column (0-indexed).

```yaml
goal:
  type: row_col
  row: 2
  col: 0
```

### `text_equals`

Document text (after `trimEnd()`) must equal `content`. Only valid for `edit` type drills.

```yaml
goal:
  type: text_equals
  content: "const foo = bar;"
```

---

## Template format

```yaml
template:
  - kind: fixed
    lines:
      - "first line"
      - "second line"
```

`kind: fixed` is the only supported kind. Each string in `lines` becomes one line in the editor.

---

## `start_row` and `start_col`

Both default to `0`. Special values:

| Value | Meaning |
|-------|---------|
| `0` (or omitted) | first row / first column |
| `"last"` | last row (computed from template line count) |
| `"end"` | last column of the starting row (`start_col` only) |
| any integer | zero-indexed row or column |

---

## `solution_keys`

An array of strings shown as hint keys in Practice mode. Each string is rendered as a `<kbd>` element.

For insert-mode sequences, write the text and `<Esc>` literally:

```yaml
solution_keys:
  - "cwresult<Esc>"
```

For alternative solutions, list multiple entries:

```yaml
solution_keys:
  - "f,;"
  - "2f,"
```

---

## Naming conventions

| Item | Convention | Example |
|------|-----------|---------|
| Lesson directory | `tier-{N}/{NN}-{slug}` | `tier-2/04-undo` |
| Lesson `id` | `tier-{N}-{NN}-{slug}` | `tier-2-04-undo` |
| Drill file | `{NN}-{slug}.md` | `01-u.md` |
| Drill `id` | `{lesson-id}-{NN}` | `tier-2-04-undo-01` |

Numbers are zero-padded to two digits. Slugs are lowercase kebab-case.

---

## Running the build

```bash
pnpm build:drills
```

This regenerates:
- `web/public/drills.json` — all drill definitions (gitignored, generated at build time)
- `web/public/lessons.json` — all lesson descriptors (committed)

Always commit the updated `lessons.json` along with any new drill files.
