---
id: abbreviations
category: config
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - mappings
  - insert-mode-keys
help_tags:
  - ":h abbreviations"
  - ":h :abbreviate"
---

# Abbreviations — text expansion

A typed phrase expands into another when you hit a non-keyword character. Useful for fixing typos, expanding boilerplate, or domain-specific shorthand. Less popular than mappings but distinct in semantics.

## Commands

| Command            | Mode applied to               |
|--------------------|-------------------------------|
| `:abbreviate`      | Both Insert and Command-line  |
| `:iabbrev` `:iab`  | Insert mode only              |
| `:cabbrev` `:cab`  | Command-line only             |
| `:noreabbrev`      | Non-recursive variant (also `:inoreabbrev`, `:cnoreabbrev`) |
| `:unabbreviate`    | Remove abbreviation           |
| `:abclear`         | Clear all abbreviations       |
| `:abbreviate` (no args) | List abbreviations       |

## Syntax

```vim
:iabbrev teh the
:iabbrev <expr> tdy strftime('%Y-%m-%d')
:cabbrev cdh cd %:h
```

The expansion triggers when you type the abbreviation followed by a **non-keyword character** (space, punctuation, `<CR>`, `<Esc>`).

### Three abbreviation kinds (`:h abbreviations`)

Vim classifies the `{lhs}` by what its characters are:

| Kind        | `{lhs}` shape                                | Trigger rule                                       |
|-------------|----------------------------------------------|----------------------------------------------------|
| **full-id** | All `'iskeyword'` chars (letters/digits/`_`) | Char before `{lhs}` must be non-keyword or start of line |
| **end-id**  | Ends with a keyword char, contains a non-keyword | Char before `{lhs}` can be anything            |
| **non-id**  | Ends with a non-keyword char                 | Char before `{lhs}` must be non-keyword or start of line |

So `iabbrev teh the` is full-id (won't fire mid-word). `iabbrev <-- ←` is non-id. `iabbrev #i #include` is end-id.

## Choosing between

- **Abbreviation vs mapping**: Abbreviations expand on a **trigger character**, only in Insert/Cmdline modes. Mappings fire instantly on key press, in chosen modes. Use abbreviations for **word-like text expansion**, mappings for actions.
- **`:iab` vs snippet plugin**: `:iab` is built-in, simple, single-line text. Snippet plugins (UltiSnips, vim-snippets, LuaSnip) handle multi-line, tab stops, dynamic content. For real templating, use a snippet plugin.
- **`:iab teh the` vs autocorrect**: Abbreviations only fix typos when you remember to set them. Spell-check (`:set spell`) flags typos visually for manual fix.
- **`:cab` vs alias**: `:cabbrev` rewrites the command line as you type — clever but can surprise. Many users prefer `:command -nargs=... MyCmd ...` (proper command alias) over `:cabbrev`.
- **`:noreabbrev` vs `:abbreviate`**: As with mappings, the non-recursive form is safer. Use `:noreabbrev` unless you specifically want chained expansions.

## Examples

```vim
" Fix common typos
iabbrev teh the
iabbrev recieve receive
iabbrev cancled canceled

" Boilerplate
iabbrev ssig -- <CR>Sincerely,<CR>Your Name
iabbrev sig@ name@example.com

" Date/time via expression
iabbrev <expr> ddate strftime('%Y-%m-%d')

" Command-line shortcuts
cabbrev cdh cd %:h
cabbrev W w

" Filetype-local (in ftplugin/python.vim)
iabbrev <buffer> imp import
iabbrev <buffer> fn def
```

## Pitfalls

- Abbreviations fire on **non-keyword characters**. Typing `teh<Esc>` expands; typing `teher<Esc>` does not (still a keyword). To force expansion, press `<C-]>` in Insert mode.
- `:cabbrev W w` is a classic — but it expands whenever `W` is typed in cmdline. `:Walk` becomes `:walk` — surprising. Use `:command! W w` instead.
- Abbreviations don't expand inside `:noremap`-style mappings. `:noreabbrev` is the **non-recursive form of `:abbreviate`** (it doesn't prevent expansion-from-mapping; it just stops *the abbreviation's own replacement text* from triggering further abbreviations). If you want a mapping to force expansion, embed `<C-]>` in the rhs.
- Abbreviations can clash with snippet plugins — if a snippet trigger and abbreviation share a keyword, behavior is unpredictable. Pick one system.
- Saving the file with an unwanted expansion still on screen: `<C-v>` before the trigger char prevents expansion (`teh<C-v> ` keeps `teh `).

## See also

- 📖 Related: [mappings], [insert-mode-keys]
- 📚 `:h abbreviations`, `:h :abbreviate`, `:h abbrev`
