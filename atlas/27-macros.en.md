---
id: macros
category: repeat
drillable: true
difficulty: advanced
frequency: mid
related_drills:
  - tier-3-06-macros
related_articles:
  - registers
  - dot-repeat
  - global-command
  - grammar-of-vim
help_tags:
  - ":h q"
  - ":h @"
  - ":h recording"
---

# Macros — record and replay

Vim's killer feature for repetitive structural edits. Record a sequence of commands once, replay it as many times as needed. Macros are stored in **registers** (`a`–`z`), so you can keep many and reuse them across sessions.

## Commands

| Key             | Action                                                       |
|-----------------|--------------------------------------------------------------|
| `q{a-zA-Z}`     | Start recording into register `{a-z}` (lowercase = overwrite, uppercase = append) |
| `q`             | Stop recording (while recording)                             |
| `@{a-z}`        | Replay the macro in register `{a-z}`                         |
| `@@`            | Replay the most recently used macro                          |
| `{n}@{a}`       | Replay the macro `n` times                                   |
| `q{A-Z}`        | **Append** to existing macro (capital letter)                |
| `:@{a}`         | Execute the macro as ex commands                             |
| `:[range]normal @{a}` | Run the macro on every line in `[range]`               |
| `:g/pat/normal @{a}` | Run the macro on every line matching `pat`              |

## Choosing between

- **Macro `@a` vs dot `.`**: `.` replays only the **last single edit** (one operator+motion+insert). Macros replay arbitrary sequences including motions and ex commands. If one verb does it, prefer `.`.
- **Macro vs `:s/.../.../g`**: Substitute wins for **pattern-based** transforms (`s/foo/bar/g`). Macros win when the change is **positional**, needs **multiple steps per occurrence**, or interacts with surrounding lines.
- **Macro vs `:g/pat/cmd`**: `:g` applies one ex command to matching lines. Macros are arbitrary sequences. Combine them with `:g/pat/normal @a` — global iteration + macro body.
- **Macro vs visual-block + edit**: For columnar edits on adjacent lines, visual block (`<C-v>` + `I`/`A`/`c`) is simpler. Reach for macros when the edit varies per line or operates on non-adjacent lines.
- **`qa` vs `qA`**: Lowercase **overwrites** the register; uppercase **appends** to existing content. Use `qA` to refine a macro mid-session without restarting.

## How they work

A macro is just a **register storing keystrokes** verbatim. Anything you can type in normal mode is recordable. The status line shows `recording @{a}` while in record mode. Pressing `q` ends recording.

Because they're registers, you can edit them: `:let @a="cw\<Esc>"` builds a macro programmatically (double quotes + `\<Esc>` to embed a real Esc keycode — single quotes would store the literal 6 characters `<Esc>`). `"ap` pastes the macro's contents into the buffer for inspection.

## Examples

```text
Goal: turn every line "foo: 1" into "FOO = 1;"

  qa            start recording into a
  0             go to line start
  vey           visual-select word, yank into "
  VU            select line, uppercase
  f:            find colon
  r=            replace with =
  $             end of line
  a;<Esc>       append ;
  j             next line
  q             stop recording

  Replay:    @a
  10×:       10@a
```

```text
Goal: run macro on every line containing "TODO":

  :g/TODO/normal @a
```

## Pitfalls

- A macro that uses `j` to advance can break on the last line (no next line). Counter: use `:[range]normal @a` instead of relying on `j` inside.
- Recording over an existing macro with lowercase `q{a}` **wipes** the previous contents. Use uppercase `qA` to append.
- Macros stop at the first error by default (e.g., search miss). To make a macro survive missing matches, append `e` flag to searches inside it or use `:silent!` for individual commands.
- Inspect a recorded macro with `:reg a` (not `:reg @a` — the `@` prefix is for execution, not query). To paste a macro's raw keystrokes for hand-editing, use **`<C-r><C-r>a`** in Insert (literal — control chars like `<Esc>` aren't executed). Plain `<C-r>a` would execute the `<Esc>` and drop you out of Insert. Note: `<C-r><C-r>` still applies `'textwidth'`/`'formatoptions'`/auto-indent — for a long macro into a buffer with autowrap, prefer `:put a` (linewise, bypasses Insert formatting entirely).
- Set `'lazyredraw'` to skip mid-macro redraws for a real speedup on long macros over many lines.
- `@:` runs the `":` register (the **last ex command**) — distinct from the last macro. `":` is a real (read-only) register; you can also paste it with `<C-r>:`.

## See also

- 🎯 Practice: [tier-3-06-macros]
- 📖 Related: [registers], [dot-repeat], [global-command], [grammar-of-vim]
- 📚 `:h q`, `:h @`, `:h recording`, `:h complex-repeat`
