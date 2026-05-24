---
id: regex-patterns
category: search
status: meta
related_drills:
  - tier-3-08-regex
related_articles:
  - search-navigation
  - substitute
  - global-command
help_tags:
  - ":h pattern.txt"
  - ":h magic"
  - ":h sub-replace-special"
---

# Vim regex — patterns and replacements

Vim has its own regex flavor. It is **not** PCRE. The biggest gotcha is **magic modes** — Vim's default escaping rules surprise everyone exposed to other regex dialects.

## Magic modes

| Mode | Switch | Effect                                                  |
|------|--------|---------------------------------------------------------|
| Very magic | `\v...` | All regex metacharacters work without escaping (closest to PCRE) |
| Magic | (default) | `()` `{}` `+` need backslash; `*` `.` `[]` `^` `$` don't |
| Nomagic | `\M...` | Most metacharacters need backslash                       |
| Very nomagic | `\V...` | Only `\` is special; everything else is literal      |

**Recommendation**: prefix all complex patterns with `\v` for sanity. `\v` is "what you'd expect from any other language".

## Pattern atoms

**Backslash-prefixed atoms** (`\d` `\w` `\s` `\zs` `\<` etc.) work in every magic mode — the backslash is part of the atom, not escaping. The bare metacharacters below behave differently in `\V` (very nomagic): `.` and `[]` become literal, while `^` and `$` retain their anchor meaning only at the start/end of the pattern (elsewhere they're literal). Use `\v` for predictable behavior.

| Atom              | Meaning                                              |
|-------------------|------------------------------------------------------|
| `.`               | Any character                                        |
| `^`               | Start of line                                        |
| `$`               | End of line                                          |
| `\<`              | Start of word (word boundary)                        |
| `\>`              | End of word                                          |
| `\zs`             | Start of match (everything before is required but not captured) |
| `\ze`             | End of match                                         |
| `\d` `\D`         | Digit / non-digit                                    |
| `\w` `\W`         | Word char / non-word char                            |
| `\s` `\S`         | Whitespace / non-whitespace                          |
| `\a` `\A`         | Alphabetic / non-alphabetic                          |
| `\u` `\U`         | Uppercase / non-uppercase                            |
| `\l` `\L`         | Lowercase / non-lowercase                            |
| `[abc]`           | Character class                                      |
| `[^abc]`          | Negated class                                        |
| `[[:alpha:]]`     | POSIX class                                          |

## Quantifiers

| Atom (very magic) | Magic equivalent | Meaning             |
|-------------------|------------------|---------------------|
| `*`               | `*`              | 0 or more (greedy)  |
| `+`               | `\+`             | 1 or more           |
| `?`               | `\=`             | 0 or 1              |
| `{n,m}`           | `\{n,m}`         | n to m              |
| `{-}`             | `\{-}`           | Non-greedy (lazy)   |

## Groups and alternation

| Pattern (very magic) | Meaning                                            |
|----------------------|----------------------------------------------------|
| `(...)`              | Capturing group (in magic: `\(...\)`)              |
| `\1` ... `\9`        | Backreference                                       |
| `\%(...\)` / `%(...)` (`\v`) | Non-capturing group. In `\v` you can write it as `%(...)` (no backslashes); `\%(...\)` also works |
| `\|` (magic) / `|` (very magic) | Alternation: `(a|b)` in `\v`, `\(a\|b\)` in default magic |

## Replacement-side specials (in `:s/pat/REP/`)

| Token       | Meaning                                                    |
|-------------|------------------------------------------------------------|
| `&`         | Entire match                                               |
| `\0`        | Same as `&`                                                |
| `\1` ... `\9` | Captured group                                           |
| `\u`        | Uppercase next character                                   |
| `\l`        | Lowercase next character                                   |
| `\U`        | Uppercase from here until `\E`                             |
| `\L`        | Lowercase from here until `\E`                             |
| `\E`        | End case modification                                      |
| `\r`        | Newline                                                    |
| `\t`        | Tab                                                        |
| `\=expr`    | Replace with the result of evaluating `expr` (Vim expression) |

## Choosing between

- **`\v` vs default magic**: Always prefix `\v` for any pattern containing `(`, `+`, `{`, `?`, or `|`. Saves dozens of backslashes.
- **`*` (greedy) vs `{-}` (lazy)**: `a.*b` matches the longest possible; `a.\{-}b` matches the shortest. Use lazy when chunking up structured content (HTML attrs, JSON values).
- **`\zs`/`\ze` vs groups**: Both let you match context. `\zs`/`\ze` are simpler when you only need to **anchor** without capturing: `/href=\zs[^"]\+\ze"` selects just the URL.
- **`&` vs `\0`**: Identical in replacement. Use `&` — it's shorter.
- **`\=expr` vs sed-style**: `\=` runs Vim script per match. `\=submatch(0)+1` increments matched numbers. PCRE / sed cannot do this — it's a Vim superpower.

## Examples

```text
Wrap each word in quotes:
  :%s/\v(\w+)/"\1"/g

Lowercase all headings:
  :%s/\v^#+\s+\zs.+/\L&/

Renumber every line:
  :%s/\v^/\=line('.').' '/

Swap two columns (CSV):
  :%s/\v^([^,]+),([^,]+)$/\2,\1/

Increment numbers:
  :%s/\v\d+/\=submatch(0)+1/g

Match content of href:
  /\vhref\="\zs[^"]+\ze"
```

## Pitfalls

- The default magic mode treats `()` as **literal parens**. `\(...\)` to capture. Use `\v` to avoid this.
- `\<` and `\>` are word boundaries, **not** less-than/greater-than. To match `<` or `>` literally, use `[<]` or `[>]` (or in `\v`, just `<` works).
- Case sensitivity follows `ignorecase` / `smartcase` **and** `\c` / `\C` overrides. The interaction can be confusing — `\C` forces case-sensitive regardless of settings.
- `:s` uses the **last search pattern** if you pass empty `pat`: `/foo<CR>` then `:s//bar/g` replaces foo.
- `\n` matches a newline in **search** but is the null byte in **replacement** — use `\r` to insert a newline.

## See also

- 🎯 Practice: [tier-3-08-regex]
- 📖 Related: [search-navigation], [substitute], [global-command]
- 📚 `:h pattern.txt`, `:h magic`, `:h sub-replace-special`, `:h /\v`
