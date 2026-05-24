---
id: dot-repeat
category: composition
drillable: true
difficulty: intermediate
frequency: high
related_drills:
  - tier-3-09-dot-anatomy
related_articles:
  - macros
  - grammar-of-vim
  - search-navigation
help_tags:
  - ":h ."
  - ":h single-repeat"
---

# Dot repeat — `.`

The most powerful single keystroke in Vim. Replays the **last edit** as a fresh change. Master this and most macros become unnecessary.

## What `.` repeats

`.` re-applies the most recent **change**: anything that modified the buffer. The replay includes:

- The operator (`d`, `c`, `>`, `gu`, `=` — note: `y` is **not** repeated by `.` unless you set `'cpoptions'+=y`)
- The motion or text object (`w`, `iw`, `i"`, `}`)
- The count (`3`, `5`)
- The Insert-mode text typed before `<Esc>`

`ciwfoo<Esc>` then `.` will, wherever you land, change the current inner word to `foo`.

## What `.` does NOT repeat

- Cursor motions alone (`w`, `j`, `gg`, `/foo<CR>`)
- `n` / `N` (search repeat)
- `;` / `,` (find-char repeat)
- `u` / `<C-r>` (undo/redo)
- Ex commands (`:s`, `:g`, `:w`, etc.)
- Macros (`@a`)
- `.` itself

These all have **their own repeat mechanism**: motions don't need repeating (just press them again), search has `n`, find has `;`, ex commands have command history (`@:`).

## Choosing between

- **`.` vs macro `@a`**: `.` replays the last **single change**. Macros replay arbitrary sequences. If one operator+motion+insert does it, use `.`. For multi-step (involving motions, searches, ex), use a macro.
- **`.` vs `&`**: `.` replays the last edit. `&` replays the last `:s` substitute. Different histories — `.` won't redo a `:s`, and `&` won't redo a `c`.
- **`.` vs `@:`**: `.` for buffer edits, `@:` for the last `:` ex command. Use `@:` to repeat a substitution or `:w` etc.
- **`.` vs `n` `;`**: `n` repeats search, `;` repeats find-char. None of them repeat edits. Combine: `cgn` then `.` is the canonical "edit each search match" loop.
- **One-key `.` vs scripted**: For repetitive structural edits, `.` is faster than writing a macro **provided each edit can be expressed as one change**. The art is shaping the edit into a single change.

## The search-edit-loop pattern

```text
/foo<CR>      find first match
cw bar<Esc>   change first match to bar
n             next match
.             change it too
n             next
.             ...
```

Or even tighter with `cgn`:

```text
/foo<CR>
cgn bar<Esc>     change next match to bar
.                next match + change
.                ...
```

`cgn` is `.`-aware: each `.` moves to the next match **and** applies the change.

## Splitting Insert into multiple undo units

Within Insert mode, `<C-g>u` creates a new **undo boundary** — useful for finer-grained `u`. **It does NOT split `.`-repeat**: `.` still replays the entire Insert session (from `i`/`a`/`o` to `<Esc>`). To get `.` to replay a smaller unit, end the Insert with `<Esc>` and start a new one.

## Examples

```text
Add semicolons to many lines:
  A;<Esc>j  →  .  →  j.  →  j.  ...

Wrap word in quotes everywhere:
  /foo<CR>  →  cgn"foo"<Esc>  →  .  →  .
  (cgn replaces the current match; . re-runs cgn so it finds the next match)

Change var name in a few spots:
  cwBar<Esc>  →  n  →  .  →  n  →  .

Indent every other line:
  >>j  →  .  →  j.  →  j.  ...
```

## Pitfalls

- `.` replays the **last** change. Yanks don't update the target (good — `.` survives copying). Pasting (`p`/`P`) **is** a buffer change, so it overwrites the target. Be careful with `yyp` then `.`.
- Motion-only commands (`w`, `}`, `f`) don't update `.`'s target — good, this is why `.` survives navigation.
- A single Insert session (from `i`/`a`/`o` to `<Esc>`) is one change for `.`. `<C-g>u` only splits **undo**, not `.`-repeat. To make `.` replay a smaller unit, end the Insert with `<Esc>` and start a new one.
- Plugin commands often don't update `.` unless authored with `repeat.vim`. If you use `vim-surround` etc., install `tpope/vim-repeat` to make plugin actions dot-repeatable.
- `.` repeats at the **new cursor position**. Plan motions to land where the change should happen.

## See also

- 🎯 Practice: [tier-3-09-dot-anatomy]
- 📖 Related: [macros], [grammar-of-vim], [search-navigation]
- 📚 `:h .`, `:h single-repeat`, `:h i_CTRL-G_u`
