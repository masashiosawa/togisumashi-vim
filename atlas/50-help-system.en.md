---
id: help-system
category: meta
status: concept-only
related_drills: []
related_articles:
  - plugins
  - settings
help_tags:
  - ":h help"
  - ":h help.txt"
  - ":h helpgrep"
---

# The `:help` system — self-rescue

The single most important meta-skill in Vim mastery: **look it up yourself**. Vim ships with a complete searchable manual. Knowing the help system lets you stop memorizing and start exploring.

## Commands

| Key                 | Action                                                            |
|---------------------|-------------------------------------------------------------------|
| `:h {topic}`        | Open help for `{topic}` (e.g., `:h dw`, `:h ctrl-r`, `:h 'incsearch'`) |
| `:help`             | Open the help index                                               |
| `<C-]>`             | Follow help tag under cursor                                      |
| `<C-t>`             | Jump back through tag history                                     |
| `:helpgrep {pat}`   | Search the entire help corpus, populating quickfix                |
| `:cn` `:cp`         | Walk results of `:helpgrep`                                       |
| `:helpclose`        | Close the help window                                             |
| `K`                 | Look up word under cursor via `'keywordprg'` (default `man`). The help ftplugin sets `'keywordprg'` **buffer-locally** to `:help` (Vim) / `:help!` (Neovim), so inside a help buffer `K` behaves like `:h {word}`. Outside help, `K` runs `man` by default |

## Choosing between

- **`:h {topic}` vs `:helpgrep {pat}`**: Use `:h` when you know the exact tag name (e.g., `:h CTRL-A`). Use `:helpgrep` when you only know a keyword and want to find every mention of it across the help corpus.
- **`<C-]>` vs `K`**: `<C-]>` follows the literal tag string under the cursor (precise — direct tag lookup). `K` extracts the `iskeyword` word and runs `'keywordprg'` (default `man`; help ftplugin sets it buffer-locally to `:help` / `:help!` so K behaves like `:h {word}` inside help). Different mechanisms; `<C-]>` is the right tool inside help.
- **`:h i_CTRL-W` vs `:h <C-W>`**: Help uses **canonical notation** `CTRL-W`. The angle-bracket form `<C-W>` is for `:map` definitions. The mode prefixes (`i_` `v_` `c_`) narrow scope — note that `g` and `z` in tags like `:h g~` or `:h z=` are part of the command name itself, not scope prefixes.
- **`:h` vs Google**: `:h` is canonical, version-correct, and offline. External docs lag and conflate Vim/Neovim. Reach for `:h` first.

## Topic naming conventions

Vim help uses **prefix conventions** so you can locate things without guessing:

**Mode-scope prefixes** (narrow by where the command runs):

| Prefix | Meaning                  | Example          |
|--------|--------------------------|------------------|
| `i_`   | Insert-mode command      | `:h i_CTRL-W`    |
| `v_`   | Visual-mode command      | `:h v_o`         |
| `c_`   | Command-line command     | `:h c_CTRL-R`    |
| `t_`   | Terminal-mode command    | `:h t_CTRL-W`    |

**Symbolic markers** (used in tag itself, not a scope prefix):

| Marker | Meaning                       | Example          |
|--------|-------------------------------|------------------|
| `:`    | Ex command                    | `:h :substitute` |
| `'`    | Option                        | `:h 'hlsearch'`  |
| `Q_`   | Section of `quickref.txt`     | `:h Q_de`        |

For commands starting with `g` or `z` (like `g~`, `z=`), just write the literal: `:h g~`, `:h z=`.

## Worth knowing exists

- `:h user-manual` — narrative chapters (`usr_01` to `usr_52`)
- `:h quickref` — single-page cheat sheet (organized by `Q_xx`)
- `:h index` — every command by mode
- `:h pattern.txt` — regex reference
- `:h options` — every option

## Examples

```text
:h ctrl-a         → docs for the increment command
:h i_CTRL-W       → "delete word back" in insert mode
:h :s_flags       → flags for the :substitute command
:helpgrep yank    → all mentions of "yank" across docs
```

## Pitfalls

- Tag follow with `<C-]>` only works when cursor is on a `|tag|`. Use `/` to search inside the help buffer otherwise.
- Topic matching prefers an exact case-sensitive match but **falls back to case-insensitive** if none is found. So `:h ctrl-w` works (resolves to `CTRL-W`), but the canonical name is uppercase.
- The help buffer is a normal buffer — `:q` closes it, all motions/searches work.
- **Neovim 0.10+**: when an LSP client is attached, `K` is rebound to `vim.lsp.buf.hover()` by the default LSP keymaps. To force the help/man-style lookup, use `gK` (`:h lsp-defaults` for the full list).

## See also

- 📖 Related: [plugins], [settings]
- 📚 `:h help.txt`, `:h help-context`, `:h notation`
