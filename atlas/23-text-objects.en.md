---
id: text-objects
category: composition
status: drill-backed
related_drills:
  - tier-2-06-text-objects
related_articles:
  - grammar-of-vim
  - change
  - delete
  - visual-mode
help_tags:
  - ":h text-objects"
  - ":h objects"
---

# Text objects — bounded regions

Refer to a piece of text by what it **is** (a word, a quote, a function body) rather than where the cursor is relative to it. The genius of Vim composition.

## Commands

Text objects always take the form `i{x}` (**inner**, content only) or `a{x}` (**a**, content + delimiters).

### Word and WORD

| Object | Meaning                                  |
|--------|------------------------------------------|
| `iw` `aw` | Word / word + adjacent whitespace      |
| `iW` `aW` | WORD (whitespace-separated)            |

### Sentence and paragraph

| Object | Meaning                                  |
|--------|------------------------------------------|
| `is` `as` | Sentence / sentence + trailing space   |
| `ip` `ap` | Paragraph / paragraph + blank line     |

### Quotes

| Object | Meaning                                                       |
|--------|---------------------------------------------------------------|
| `i"` `a"` | Inside / around double quotes                              |
| `i'` `a'` | Inside / around single quotes                              |
| `` i` `` `` a` `` | Inside / around backticks                          |

### Brackets

| Object | Meaning                                                       |
|--------|---------------------------------------------------------------|
| `i(` `a(` or `i)` `a)` or `ib` `ab` | Parentheses                         |
| `i[` `a[` or `i]` `a]`              | Square brackets                     |
| `i{` `a{` or `i}` `a}` or `iB` `aB` | Curly braces (Block)                |
| `i<` `a<` or `i>` `a>`              | Angle brackets                      |
| `it` `at`                           | HTML/XML tag (`<tag>...</tag>`)     |

## Choosing between

- **`i` (inner) vs `a` (a/around)**: `i` is the **content only**, no delimiters. `a` includes the delimiters and (for some) trailing whitespace. Use `i` when reshaping content, `a` when removing the construct entirely.
- **`iw` vs `iW`**: `iw` stops at punctuation (`foo.bar` is 2 words). `iW` includes punctuation (1 WORD). Use `iW` for paths, URLs, identifiers with dots.
- **`iw` vs `i"`**: `iw` selects a word at cursor regardless of context. `i"` selects content inside the nearest enclosing double quotes — even if the cursor isn't between them on a single-line search. Use `i"` to grab content, `iw` to grab a token.
- **`ap` vs `ip`**: `ap` includes the **trailing** blank line; if there's none (end of file), it falls back to the leading blank line. `ip` leaves blank lines alone. For removing a paragraph cleanly, `ap`. The same trailing-first / leading-fallback rule applies to `as` and `aw`/`aW` — it's positional, **not** based on which direction the cursor came from. (`is` / `ip` / `iw` are "inner" forms — they don't include surrounding whitespace.)
- **`ib`/`iB` vs `i(`/`i{`**: Aliases. `ib` ≡ `i(`, `iB` ≡ `i{`. Use the symbol form for clarity; the letter form when finger position favors it.
- **Text object vs motion**: Text objects bound a region (`diw` works mid-word). Motions go from cursor to a target (`dw` may leave the start of word). For "operate on this thing", always prefer text objects.
- **`it` vs `i<`**: `it` selects the **content** between matching HTML/XML tags (`<a>...</a>` → `...`). `i<` is a generic angle-bracket text object — content between any `<` and `>` pair (with nesting). Different jobs; `it` is for tag bodies, `i<` for raw angle-bracket content.

## Grammar

Text objects are operands, not operators. They follow any operator:

- `d` + text object: `daw`, `diw`, `di"`, `dap`, `di{`, `dat`
- `c` + text object: `ciw`, `ci(`, `cit`, `cip`
- `y` + text object: `yi"`, `ya{`, `yip`
- `>` `<` + text object: `>ap`, `<i{`
- Visual + text object: `vi"`, `vap`, `vi{`

## Examples

```text
Change content of string:    ci"     "old"   →   "new"
Delete a function body:      di{
Delete entire function:      da{      includes braces
Select paragraph + blank:    vap
Change HTML tag content:     cit
Delete arguments:            di(
Replace URL inside quotes:   ci"  https://...<Esc>
```

## Pitfalls

- Text objects look at the **nearest** enclosing instance. For nested quotes/brackets, the innermost wins.
- `i"` searches the **current line** only by default — multi-line strings need plugins like `targets.vim` for true multi-line semantics.
- `as` (around sentence) uses Vim's sentence definition: `.` `!` `?` + EOL or one space/tab (or two spaces if `'cpoptions'` includes `J`). Fragile for code comments. Stick to `ap` for code.
- `it`/`at` is **textual** tag matching — it pairs `<tag>...</tag>` by string, independent of `'filetype'` or syntax. Self-closing tags (`<br/>`) and `<` `>` in attributes can confuse it.
- `ip`/`ap` consider blank lines as paragraph boundaries — a single blank line is a paragraph break.

## See also

- 🎯 Practice: [tier-2-06-text-objects]
- 📖 Related: [grammar-of-vim], [change], [delete], [visual-mode]
- 📚 `:h text-objects`, `:h objects`, `:h a)`, `:h at`
