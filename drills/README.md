# Drill Definition Format

Drills are written as Markdown files with YAML frontmatter.  
Both the web app and the Neovim plugin read from this directory.

## File Location

```
drills/
├── tier-1/   # Basic motions
├── tier-2/   # Operators + motions
├── tier-3/   # Text objects
└── tier-4/   # Macros, marks, registers
```

## Frontmatter Schema

```yaml
---
id: <string>          # Unique slug. Convention: "tier-<N>-<short-name>"
tier: <1|2|3|4>       # Difficulty tier
target_time_ms: <int> # Goal completion time in milliseconds
template:             # One or more content generation rules (see below)
  - kind: <string>
    ...
i18n:
  en:
    title: <string>
    description: <string>
  ja:
    title: <string>
    description: <string>
---
```

### `template` kinds

| `kind` | Fields | Description |
|--------|--------|-------------|
| `random_text_line` | `chars: <int>` | Random ASCII word sequence of approximately `chars` characters |
| `fixed` | `lines: [<string>]` | Static text, picked randomly from the list each session |

More kinds will be added as drills evolve.

## Example

```markdown
---
id: tier-1-hjkl
tier: 1
target_time_ms: 8000
template:
  - kind: random_text_line
    chars: 40
i18n:
  en:
    title: "Basic motion: hjkl"
    description: "Move the cursor using h j k l."
  ja:
    title: "基本移動: hjkl"
    description: "h j k l でカーソルを動かす。"
---
```

## Notes

- The web app converts all drill files to `web/public/drills.json` at build time.
- The Neovim plugin reads drill files directly at runtime via a Lua YAML parser.
- `id` must be unique across all tiers.
- `target_time_ms` is the **goal** time, not a hard cutoff. The app tracks personal bests separately.
