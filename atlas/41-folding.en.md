---
id: folding
category: power
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - settings
help_tags:
  - ":h folding"
  - ":h fold-commands"
---

# Folding — collapse and expand sections

Hide chunks of text to focus on others. Useful for navigating large files (functions, sections, deep nesting). Vim has 6 fold methods.

## Fold methods (`'foldmethod'`)

| Method      | How folds are defined                                  |
|-------------|--------------------------------------------------------|
| `manual`    | You create folds explicitly with `zf`                  |
| `indent`    | By indentation level                                   |
| `expr`      | By `'foldexpr'` (custom function)                      |
| `syntax`    | By syntax highlighting groups                          |
| `diff`      | Differences (used in diff mode)                        |
| `marker`    | By literal markers (default `{{{` and `}}}`)           |

Set with `:set foldmethod=indent`.

## Commands

### Open / close

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `zo`     | Open fold under cursor                              |
| `zO`     | Open all folds under cursor (recursive)             |
| `zc`     | Close fold under cursor                             |
| `zC`     | Close all folds under cursor (recursive)            |
| `za`     | Toggle fold under cursor                            |
| `zA`     | Toggle recursive                                    |
| `zR`     | Open ALL folds (Reduce)                             |
| `zM`     | Close ALL folds (More) — **also sets `'foldenable'`** |
| `zv`     | Open just enough folds to view cursor               |
| `zx`     | Recompute folds, reset them to the `'foldlevel'` state, **then** apply `zv` (open enough to show cursor) |
| `zX`     | Like `zx` but **without** the final `zv` — no view-cursor adjustment |

### Navigate

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `zj`     | Move down to next fold                              |
| `zk`     | Move up to previous fold                            |
| `[z`     | Move to start of current fold                       |
| `]z`     | Move to end of current fold                         |

### Create / delete (`manual` and `marker` only)

`zf`, `zd`, `zD`, `zE` all require `'foldmethod'` to be `manual` or `marker` (with `indent`/`syntax`/`expr`/`diff`, folds are auto-generated; they can't be directly deleted — change `'foldmethod'` to manage manually).

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `zf{motion}` | Create fold over motion                          |
| `zfap`   | Create fold around paragraph                        |
| `zd`     | Delete fold under cursor                            |
| `zD`     | Delete all folds in line                            |
| `zE`     | Eliminate all folds                                 |

## Choosing between

- **`manual` vs `indent`**: `manual` requires you to mark folds yourself. `indent` auto-folds by indent level — perfect for Python or heavily-indented code. Start with `indent` for code, `manual` for prose.
- **`indent` vs `syntax`**: `indent` is filetype-agnostic. `syntax` uses language definitions — more semantic (folds functions, not just indent blocks). `syntax` is better when available; falls back if no syntax rules.
- **`marker` vs everything**: `marker` puts ugly `{{{` `}}}` in your file. Useful for shared dotfiles where you want explicit fold boundaries. Avoid in source code.
- **`za` vs `zo`/`zc`**: `za` toggles — one key for both directions. `zo`/`zc` are explicit. For frequent open/close, `za`.
- **`zR` vs `zM`**: Opposites. `zR` opens all, `zM` closes all. Mnemonic: Reduce / More folding. Side effect: `zM` also sets `'foldenable'`, so if you had disabled folds with `zi`, `zM` turns them back on.
- **`zv` vs `zo`**: `zv` opens **only enough** folds to make the cursor visible. `zo` opens the immediate fold. Use `zv` after a search that landed in a closed fold.

## Fold-level options

| Option              | Role                                                            |
|---------------------|-----------------------------------------------------------------|
| `'foldlevel'`       | Current depth at which folds are closed. `0` = close everything; higher = leave more open. `zR`/`zM` move this. |
| `'foldlevelstart'`  | The `'foldlevel'` value applied when a buffer is first loaded. Usually set in vimrc; changing it at runtime affects subsequently-loaded buffers, not the current one |
| `'foldnestmax'`     | Maximum nesting depth Vim will create (for `indent`/`syntax`)   |
| `'foldcolumn'`      | Side column width showing fold structure. Vim: `0`–`12` (number). Neovim also accepts `auto:N` (e.g. `auto:3`) for dynamic sizing |
| `'foldenable'` (`'fen'`) | Toggle whether folds are drawn at all (`zi` toggles)       |
| `'foldtext'`        | Vimscript expression producing the single-line summary shown for a closed fold |

Typical "everything open by default" pattern:

```vim
set foldmethod=indent
set foldlevelstart=99   " open all on load
set foldnestmax=10
```

## Examples

```text
Fold by indent:                :set foldmethod=indent
Fold visible region:           V}zf
Open all to inspect:           zR
Close all to overview:         zM
Toggle current fold:           za
After search, see context:     n  zv

In vimrc — sane fold defaults:
  set foldmethod=indent
  set foldlevelstart=99   " start with everything open
  set foldnestmax=10
```

## Web environment note

Most web Vim emulations don't render folds. CodeMirror handles folding separately from Vim's model.

## Pitfalls

- `'foldmethod=expr'` with a slow `'foldexpr'` makes editing laggy. Profile with `:profile`.
- `'foldmethod=syntax'` can be slow on large files — syntax must be evaluated. Switch to `indent` or `manual` for huge files.
- `zE` (eliminate all) is **not** "open all" — it removes the fold definitions. Use `zR` to open. Also note `zE` only works with `'foldmethod'=manual` or `marker` (same constraint as `zf`/`zd`/`zD`).
- Plugins frequently re-fold on save (`zR` then save → folds collapse again). Use `set foldlevelstart=99` to keep them open by default.
- Folding hides text but doesn't ignore it — `:%s` still affects folded lines. Use `:s/.../.../g` cautiously.

## See also

- 📖 Related: [settings]
- 📚 `:h folding`, `:h fold-commands`, `:h fold-methods`
