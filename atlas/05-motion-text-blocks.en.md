---
id: motion-text-blocks
category: motion
status: drill-backed
related_drills:
  - tier-1-05-paragraph
related_articles:
  - text-objects
  - motion-bracket-match
help_tags:
  - ":h paragraph"
  - ":h sentence"
  - ":h section"
---

# Paragraph, sentence, section motions

Jump by structural unit larger than a word but smaller than the file. Useful for prose, code blocks, and language-aware navigation.

## Commands

| Key   | Action                                                       |
|-------|--------------------------------------------------------------|
| `{`   | Backward to previous blank-line (paragraph) boundary         |
| `}`   | Forward to next blank-line boundary                          |
| `(`   | Backward to previous sentence start. A sentence ends at `.` `!` `?` followed by EOL or a space/tab (any number of `)`, `]`, `"`, `'` may sit between). **A paragraph or section boundary is also a sentence boundary** |
| `)`   | Forward to next sentence start                               |
| `[[`  | Backward `[count]` **sections**, or to the previous `{` in column 0 (sections are defined by `'sections'` plus form-feed (CTRL-L) at column 0) |
| `]]`  | Forward `[count]` sections, or to the next `{` in column 0   |
| `][`  | Forward to next `}` at column 0                              |
| `[]`  | Backward to previous `}` at column 0                         |
| `[m`  | Backward to start of previous **method** — designed for Java-like languages; tracks `{`/`}` nesting to find class-member boundaries |
| `]m`  | Forward to next method start                                 |
| `[M`  | Backward to previous method end                              |
| `]M`  | Forward to next method end                                   |
| `[*` (`[/`) | Backward to start of a **C** comment (`/* ... */`)    |
| `]*` (`]/`) | Forward to end of a **C** comment                     |

## Choosing between

- **`{`/`}` vs `(`/`)`**: Paragraphs (blank-line separated) vs sentences (period-separated). In code, `{`/`}` is almost always what you want. `(`/`)` is for prose editing.
- **`{`/`}` vs `ip`/`ap`**: `{`/`}` are **motions** (jump cursor). `ip`/`ap` are **text objects** (select region). Use motion to navigate, object to operate (`dap` deletes a paragraph).
- **`[[`/`]]` vs `]m`/`[m`**: `[[`/`]]` rely on `{` in **column 0** (C/C++/Java top-level style). `]m`/`[m` track `{`/`}` nesting to find class-member boundaries (Java-like). For modern indented code where braces aren't in column 0, `]m` is more reliable.
- **`}` vs `G`**: `}` jumps to next blank line — useful to skim through code in chunks. `G` jumps to file end. Use `}` repeatedly for chunked reading.
- **`(`/`)` vs `f.`**: For sentence navigation, `)` is smarter (handles `!` `?`, skips abbreviations) but slower than `f.;` for crude period-hopping.

## Grammar

All compose with operators:

- `d}`   — delete to next blank line (paragraph forward)
- `c}`   — change a paragraph
- `y}`   — yank a paragraph
- `dap`  — delete a paragraph with its trailing blank line (text object form)
- `=ap`  — auto-indent a paragraph

## Examples

```text
function foo() {        }      → jump to next blank line
  x = 1;
                                paragraph break (blank line)
  y = 2;
}

Code skim:          ] ] ] ]    walk top-level function definitions
Sentence delete:    d)         delete forward through end of current sentence
Indent block:       =ap        auto-format current paragraph
```

## Pitfalls

- "Sentence" requires `.`/`!`/`?` followed by **end-of-line, or a single space/tab** by default. Paragraph/section boundaries also count as sentence boundaries. Adding `J` to `'cpoptions'` makes Vim require **two spaces** (and **tab is no longer recognized** as the separator).
- `[[` requires `{` at column 0. Code with indented braces (most modern formatters) breaks this. Use `]m` or text-object based navigation instead.
- `[m`/`]m` is built for **Java/C++ and similar structured languages** that delimit methods with `{` `}`. Filetype matters; less reliable for Python/Ruby (use language-specific plugins).
- Paragraph/section boundaries also respect `'paragraphs'` and `'sections'` (nroff macro pairs, e.g. `.IP`, `.LP`, `.SH`). Defaults target nroff documents; modern users rarely customize them, but if `{`/`}` or `[[`/`]]` behaves unexpectedly in non-code files, check these options.

## See also

- 🎯 Practice: [tier-1-05-paragraph]
- 📖 Related: [text-objects], [motion-bracket-match]
- 📚 `:h paragraph`, `:h sentence`, `:h section`, `:h ]m`
