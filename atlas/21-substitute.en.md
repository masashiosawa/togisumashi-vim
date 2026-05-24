---
id: substitute
category: edit
status: drill-backed
related_drills:
  - tier-3-07-substitute
related_articles:
  - regex-patterns
  - global-command
  - search-navigation
help_tags:
  - ":h :s"
  - ":h :s_flags"
  - ":h sub-replace-special"
---

# Substitute — search and replace

The `:s` ex command does find-and-replace with regex. Combined with ranges and flags it covers most "rewrite text" needs.

## Commands

| Form                            | Effect                                              |
|---------------------------------|-----------------------------------------------------|
| `:s/{pat}/{rep}/`               | Replace first match on current line                 |
| `:s/{pat}/{rep}/g`              | All matches on current line                         |
| `:%s/{pat}/{rep}/g`             | All matches in file (`%` = whole file)              |
| `:%s/{pat}/{rep}/gc`            | All matches with confirm prompt                     |
| `:[range]s/{pat}/{rep}/`        | Substitute over `[range]`                           |
| `:'<,'>s/{pat}/{rep}/g`         | Within visual selection                             |
| `:g/{pat}/s//{rep}/g`           | Run substitute on lines matching `{pat}` (`//` reuses pattern) |
| `&`                             | Repeat last `:s` on current line (Normal-mode; **flags are dropped**) |
| `:&&`                           | Repeat last `:s` on current line, **keeping flags** |
| `g&`                            | Repeat last `:s` on entire file (keeps pattern, replacement, flags) |
| `:s//{rep}/g`                   | Empty `{pat}` reuses **last search pattern**        |

## Flags

| Flag | Effect                                                    |
|------|-----------------------------------------------------------|
| `g`  | All matches on each line (default: first only)            |
| `c`  | Confirm each replacement                                  |
| `i`  | Ignore case (this match)                                  |
| `I`  | Case-sensitive (override `ignorecase`)                    |
| `n`  | Count matches without replacing                           |
| `e`  | Don't error if no match                                   |
| `&`  | Reuse flags from previous `:s` (**must be the first flag**) |

## Replacement specials

| Token       | Meaning                                                   |
|-------------|-----------------------------------------------------------|
| `&` or `\0` | Entire match                                              |
| `\1`..`\9`  | Captured group                                            |
| `\u` `\l`   | Uppercase / lowercase next char                           |
| `\U` `\L`   | Uppercase / lowercase until `\E`                          |
| `\E`        | End case modification                                     |
| `\r`        | Newline (in replacement)                                  |
| `\=expr`    | Replace with the result of Vim expression `expr`          |
| `~`         | Reuse previous replacement string (magic-independent; use `\~` to insert a literal `~`) |

## Choosing between

- **`:s` vs `cgn`**: `:s` is batch — fast and final. `cgn` lets you change one match interactively then `.` to advance. Use `:s` when the pattern is trusted, `cgn` when you want eye-on-each.
- **`:s` vs `:g/.../s//.../g`**: `:%s/foo/bar/g` substitutes everywhere. `:g/^if/s/foo/bar/g` substitutes **only on lines starting with `if`** — gives line-level conditional control.
- **`:s` vs LSP rename**: LSP rename is symbol-aware (handles scopes, file boundaries). `:s` is text-level. Use LSP for refactoring; `:s` for text rewriting.
- **Range `%` vs `1,$`**: Identical. `%` is shorter.
- **Confirm `c` vs no `c`**: With `c`, each match prompts `y/n/a/q/l`. Use `c` on uncertain patterns or first run; drop it for batch confidence.
- **`&` vs `:&&` vs `g&`**: Normal-mode `&` repeats the last `:s` on the current line **without flags** (often a surprise — `:%s/foo/bar/g` then `&` substitutes only the first match per line). `:&&` keeps flags. `g&` runs it on the whole file with the previous pattern/replacement/flags.

## Examples

```text
Rename a variable globally:
  :%s/\<oldName\>/newName/g

Confirmed rename:
  :%s/\<old\>/new/gc

Within visual selection:
  Vap → :'<,'>s/foo/bar/g

Increment all numbers:
  :%s/\v\d+/\=submatch(0)+1/g

Wrap each word in quotes:
  :%s/\v(\w+)/"\1"/g

Sentence-case lines:
  :%s/\v(^|\.\s+)([a-z])/\1\u\2/g

Reverse last two CSV columns:
  :%s/\v^(.*),([^,]+),([^,]+)$/\1,\3,\2/

Count occurrences:
  :%s/pattern//n
```

## Pitfalls

- Default `:s` replaces only the **first match per line**. Add `g` for all matches. This catches everyone once.
- The delimiter is the second character — `:s#foo#bar#g` works when the pattern contains `/`.
- `\n` and `\r` have **inverted meanings** between the search side and the replacement side. In the **pattern**, `\n` matches a newline (line break). In the **replacement**, `\n` inserts a **NUL byte (0x00)** — Vim's internal line separator — which appears in the file as `^@` and does **not** split the line; `\r` inserts an actual newline. Beginners get this backwards — for a real line break in the replacement, use `\r`.
- Case sensitivity follows `ignorecase` and `smartcase` unless overridden with `\C` (case-sensitive) or `\c` (insensitive) in the pattern.
- `:s` with empty pattern (`:s//bar/g`) reuses the **last search** — confusing if you didn't realize you'd recently searched.
- Neovim has `'inccommand'` (`split`/`nosplit`) for live `:s` preview — invaluable for confirming a substitution before pressing `<CR>`. Vim has no equivalent built in. (Don't confuse with `'incsearch'`, which previews `/` searches but not `:s`.)

## See also

- 🎯 Practice: [tier-3-07-substitute]
- 📖 Related: [regex-patterns], [global-command], [search-navigation]
- 📚 `:h :s`, `:h :s_flags`, `:h sub-replace-special`, `:h :range`
