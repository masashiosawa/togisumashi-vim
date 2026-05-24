---
id: global-command
category: repeat
status: concept-only
related_drills: []
related_articles:
  - substitute
  - macros
  - regex-patterns
help_tags:
  - ":h :global"
  - ":h :vglobal"
---

# Global command — `:g`

Run an ex command on every line matching a pattern. Mighty when combined with `:s`, `:d`, `:m`, or `:normal @a`.

## Commands

| Form                       | Effect                                              |
|----------------------------|-----------------------------------------------------|
| `:g/{pat}/{cmd}`           | Run `{cmd}` on each matching line                   |
| `:g!/{pat}/{cmd}`          | Run on each **non-matching** line (same as `:v`)    |
| `:v/{pat}/{cmd}`           | Inverse global (lines NOT matching)                 |
| `:[range]g/{pat}/{cmd}`    | Limit to range                                      |
| `:g/{pat}/d`               | Delete matching lines                               |
| `:g/{pat}/m$`              | Move matching lines to end of file                  |
| `:g/{pat}/s/foo/bar/g`     | Substitute on matching lines only                   |
| `:g/{pat}/normal @a`       | Run macro `a` on each matching line                 |
| `:g/{pat}/.,/end/d`        | Delete from match through pattern "end"             |

## Choosing between

- **`:g` vs `:s`**: `:s` is line-internal pattern replacement. `:g` is "find lines, then do X". Combine — `:g/pat/s/.../.../g` filters then replaces.
- **`:g` vs `:v`**: `:g` matches; `:v` (or `:g!`) inverts. To delete **everything except** comments: `:v/^#/d`.
- **`:g/...d` vs `:%s/.../\r/g`**: Both manipulate by line. `:g/...d` deletes whole matching lines. `:s` rewrites within lines. Use `:g` when the unit of operation is "line".
- **`:g/.../normal @a` vs macro alone**: A macro replayed with `@a` runs once where you are. `:g/pat/normal @a` runs it on **every matching line** automatically.
- **`:g` vs visual + operator**: `:g` is pattern-driven (declarative), visual is range-driven (manual). For "every line containing X", `:g` is faster and more reliable.

## Examples

```text
Delete blank lines:
  :g/^$/d

Delete lines containing TODO:
  :g/TODO/d

Keep only lines starting with import:
  :v/^import/d

Move all comments to end:
  :g/^#/m$

Substitute only on matching lines:
  :g/^class/s/foo/bar/g

Apply macro to every matching line:
  :g/^def /normal @a

Underline every non-blank line (duplicate then dashify):
  :v/^$/normal! YpVr-      (silly but shows composition)

Print all lines matching pattern:
  :g/error/p
```

## Pitfalls

- `:g` first **marks** all matching lines internally, then executes `{cmd}` on each — so `:g/pat/d` works correctly: line numbers shift as lines are deleted, but the marks track the right lines.
- `:v` and `:g!` are identical. Use `:v` for clarity ("inverse").
- The pattern delimiter is the second char: `:g#path#d` works when `pat` contains `/`.
- `:g//d` with empty pattern reuses the **last search or substitute pattern** — combine with `/pat<CR>` then `:g//d` to delete recently-searched.
- `:normal @a` **respects mappings**; use `:normal! @a` to bypass them (`!`). To suppress per-line output, prepend `:silent` (`:silent g/pat/normal! @a`). Test the macro first on one line.

## See also

- 📖 Related: [substitute], [macros], [regex-patterns]
- 📚 `:h :global`, `:h :vglobal`, `:h :g//`
