---
id: motion-bracket-match
category: motion
drillable: true
difficulty: intermediate
frequency: mid
related_drills:
  - tier-1-09-bracket-match
related_articles:
  - text-objects
  - motion-text-blocks
help_tags:
  - ":h %"
  - ":h ["
---

# Bracket matching

Jump between paired brackets and around enclosing blocks. The key to navigating nested code without scrolling.

## Commands

| Key    | Action                                                  |
|--------|---------------------------------------------------------|
| `%`    | Jump to matching `()`, `[]`, `{}` (searches forward on the line from cursor to find a bracket, then jumps to its mate — cursor doesn't have to be exactly ON the bracket) |
| `[(`   | Backward to **unmatched** `(`                           |
| `])`   | Forward to **unmatched** `)`                            |
| `[{`   | Backward to **unmatched** `{`                           |
| `]}`   | Forward to **unmatched** `}`                            |
| `[/`   | Backward to start of C comment                          |
| `]/`   | Forward to end of C comment                             |
| `[#`   | Backward to unmatched `#if` / `#else`                   |
| `]#`   | Forward to unmatched `#else` / `#endif`                 |

## Choosing between

- **`%` vs `[{`/`]}`**: `%` searches **the current line** for a bracket from the cursor rightward, then jumps to its mate (so it needs a bracket on the same line). `[{`/`]}` works from **anywhere inside** the block — jumps to the enclosing bracket. Use `[{` from the middle of a long function body when no bracket is on the current line.
- **`%` vs text object**: `%` moves the cursor. `vi{` or `ci{` operates on the contents. Use `%` to navigate, text objects to edit.
- **`%` vs `:set matchpairs+=<:>`**: By default `%` matches `()`/`[]`/`{}` plus anything in `'matchpairs'`. Add `<:>` for HTML/XML tag matching. The `matchit` plugin (Neovim: **default on**; Vim: ships with the distribution but requires `:packadd matchit`) extends `%` further — `if`/`endif`, `def`/`end`, HTML tags, etc. See Pitfalls for setup.
- **`]}` vs `}`**: `]}` jumps to the closing brace of the **enclosing** block. `}` jumps to the next blank line. Different concepts entirely.

## Grammar

Bracket motions compose with operators:

- `d%`   — delete from `(` to its match (parenthesized expression)
- `y%`   — yank the whole bracketed group
- `c%`   — change a bracketed expression
- `v%`   — visually select bracket-to-bracket
- `d]}`  — delete from cursor to end of enclosing block

## Examples

```text
if (cond|ition && other) {       %  → cursor on (   →  jumps to matching )
function long_one() {            [{ → from inside, jumps to {
  ...                            ]} → from inside, jumps to }
  cursor here|
  ...
}

Delete arg list:    di(   (text object form, no need for %)
Select function body:    vi{
Indent enclosing block:  =i{
```

## Pitfalls

- `%` does not selectively ignore brackets inside strings/comments by default. Behavior is governed by `'cpoptions'` (the `%` flag) and matchit, not by syntax highlighting.
- **`%` with a count is a completely different command**: `{n}%` (with count) jumps to `n` percent through the file (`50%` = middle). `%` (no count) is the bracket match. Don't combine them — `5%` does not mean "the 5th bracket pair".
- `%` doesn't match angle brackets `<>` by default — add `:set matchpairs+=<:>` for HTML/JSX work.
- The `matchit` plugin dramatically expands `%` (HTML tags, `if`/`endif`, etc.). **Neovim enables matchit by default** (since 0.5; set `let loaded_matchit = 1` to disable). Vim ships it but doesn't load it — add `:packadd matchit` in `~/.vimrc`.
- `[{` finds the **enclosing** `{`, not the previous `{` regardless of nesting. Pairs with `]}`.

## See also

- 🎯 Practice: [tier-1-09-bracket-match]
- 📖 Related: [text-objects], [motion-text-blocks]
- 📚 `:h %`, `:h matchit`, `:h [(`
