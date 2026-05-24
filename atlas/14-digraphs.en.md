---
id: digraphs
category: insert
status: concept-only
related_drills: []
related_articles:
  - insert-mode-keys
  - special-inserts
help_tags:
  - ":h digraphs"
  - ":h i_CTRL-K"
---

# Digraphs — typing special characters

Insert characters that aren't on your keyboard: `é` `→` `™` `©` `…`. Vim ships a table of two-letter codes you press together to produce one character.

## Commands

| Key                    | Action                                              |
|------------------------|-----------------------------------------------------|
| `<C-k>{a}{b}`          | Insert digraph for `{a}{b}` (Insert / Command mode) |
| `:digraphs`            | Show all built-in digraphs                          |
| `:dig {a}{b} {decimal}` | Define custom digraph                              |

## Common digraphs

| Type | Char | Press                |
|------|------|----------------------|
| Acute    | é    | `<C-k>e'`        |
| Grave    | è    | `<C-k>e!`        |
| Umlaut   | ö    | `<C-k>o:`        |
| Tilde    | ñ    | `<C-k>n?`        |
| Eszett   | ß    | `<C-k>ss`        |
| Cedilla  | ç    | `<C-k>c,`        |
| Yen      | ¥    | `<C-k>Ye`        |
| Pound    | £    | `<C-k>Pd`        |
| Euro     | €    | `<C-k>Eu`        |
| Copyright| ©    | `<C-k>Co`        |
| Trademark| ™    | `<C-k>TM`        |
| Ellipsis | …    | `<C-k>,.`        |
| Em dash  | —    | `<C-k>-M`        |
| Right arrow | →  | `<C-k>->`        |
| Left arrow  | ←  | `<C-k><-`        |
| Up arrow    | ↑  | `<C-k>-!`        |
| Down arrow  | ↓   | `<C-k>-v`        |
| Smiley   | ☺    | `<C-k>0u`        |
| Heart (♡, white) | ♡  | `<C-k>cH`     |
| Check    | ✓    | `<C-k>OK`        |

## Choosing between

- **Digraph vs Unicode codepoint**: `<C-v>u00e9` inserts `é` by hex codepoint (4 hex digits). Digraph (`<C-k>e'`) is shorter and memorable. Use codepoint when you know the number but not the digraph, or for chars without a digraph.
- **Digraph vs IME**: If your OS has a fast IME (input method) for accented or CJK characters, prefer that. Digraphs are best when IME isn't available or you only need a single non-keyboard char.
- **Digraph vs paste**: For a one-off, copying from elsewhere is easier. For repeated use (math/symbols in prose), digraphs save thinking time.

## Examples

```text
Type "café":     ca<C-k>e'    →  café
Right arrow:     <C-k>->      →  →
Pi symbol:       <C-k>p*      →  π
View list:       :digraphs    (or :dig)
Custom digraph:  :dig sn 9731  (now <C-k>sn inserts ☃ U+2603, snowman)
```

## Pitfalls

- Many digraphs are registered in **both orders** (`e'` and `'e` both map to `é`), so either typing direction often works. Vim does not auto-swap — it's just that the table contains both entries.
- Most Unicode digraphs (`Eu`, `0u`, `cH`, `,.`, `->`, etc.) require **`'encoding'`=utf-8** (Vim default in modern builds; Neovim is always UTF-8). On `latin1` only the Latin-1 range works.
- There is **no built-in digraph for ♥ (BLACK HEART SUIT, U+2665)**. Only ♡ (`cH`, white heart) and ♢ (`cD`, white diamond) are defined. If you need ♥, use `<C-v>u2665` (codepoint insert).
- `<C-k>` in insert mode shows nothing until both chars are typed — easy to think it failed and bail. Just press both.
- Not all OS terminals render every glyph. Box-drawing and obscure symbols may show as missing-glyph boxes.
- `:digraphs` is paginated — long. After it pages, type `/arrow` to search inside the listing.
- Some plugins remap `<C-k>` for completion (snippets). Check `:imap <C-k>` if digraphs stop working.

## See also

- 📖 Related: [insert-mode-keys], [special-inserts]
- 📚 `:h digraphs`, `:h i_CTRL-K`, `:h digraph-table`
