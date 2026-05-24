---
id: spell-checking
category: power
drillable: false
difficulty: intermediate
frequency: low
related_drills: []
related_articles:
  - settings
help_tags:
  - ":h spell"
  - ":h z="
---

# Spell checking

Vim has built-in spell checking with dictionaries, navigation, and personal word lists. Useful for documentation, commit messages, and prose.

## Commands

### Enable

```vim
:set spell           " on
:set nospell         " off
:set spelllang=en    " English (default)
:set spelllang=en,cjk " English + skip CJK chars (Japanese, Chinese, Korean)
:set spellfile=~/.vim/spell/personal.utf-8.add
```

### Navigate

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `]s`     | Next misspelled / rare / wrong-region word          |
| `[s`     | Previous (same scope as `]s`)                       |
| `]S`     | Next misspelling **only** (skips rare/region words — stricter than `]s`) |
| `[S`     | Previous (same scope as `]S`)                       |

### Act on cursor word

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `z=`     | Show correction candidates                          |
| `{n}z=`  | Pick candidate `n` without prompt                   |
| `zg`     | Mark word as **good** (add to personal dictionary)  |
| `zG`     | Mark good for this session only                     |
| `zw`     | Mark word as **wrong** (add to spellfile with `!`)  |
| `zW`     | Mark wrong for this session only                    |
| `zug` `zuw` | Undo zg / zw                                     |

## Choosing between

- **`z=` vs autocorrect**: `z=` shows a numbered candidate list. Type the number, hit `<CR>`. No auto-replace — Vim asks every time.
- **`zg` vs adding to dictionary**: `zg` adds to your personal `spellfile`. When `'spellfile'` is empty, Vim auto-creates a file in the first writable `runtimepath` entry: typically `~/.vim/spell/en.utf-8.add` in Vim, `~/.config/nvim/spell/en.utf-8.add` in Neovim (whichever `runtimepath` directory comes first and is writable). Maintainable, version-controllable.
- **`spelllang=en` vs `en_us`**: `en` accepts all English variants. `en_us` / `en_gb` are stricter — `colour` is wrong in `en_us`. Pick based on your house style.
- **Multi-lang `spelllang=en,de`**: Vim checks each language and accepts words in any. Good for bilingual docs. Note: Vim ships spellfiles only for languages with `*.spl` available — there is **no Japanese spellfile**. For docs mixing English and Japanese, use `spelllang=en,cjk` so CJK character ranges are skipped.

## Examples

```text
Enable for current buffer:    :setlocal spell
Walk misspellings:            ]s  z=  (choose)  ]s  z=  ...
Add "Neovim" to dictionary:   on the word: zg
Suggest 1st correction:       1z=
Disable for buffer:           :setlocal nospell

Filetype-specific (in ftplugin/markdown.vim):
  setlocal spell spelllang=en
```

## Pitfalls

- Vim needs **spell files** for each language. Built-in for English; for others, Vim downloads them on first use (with permission). Offline systems may need manual install.
- `'spell'` is **window-local**, not buffer-local. The same buffer viewed in a different window won't inherit it. To get per-buffer feel, set it in a `BufEnter` autocmd.
- Misspellings show as wavy red underline (in GUI) or colored letters (in terminal). If colors are bad, check `:hi SpellBad`.
- `z=` candidates are unsorted — number `1` isn't always best. Read the list.
- Code-heavy files (programming languages) will spell-check identifiers as misspellings — disable for code or set `spell` only for comment regions via syntax tricks.

## See also

- 📖 Related: [settings]
- 📚 `:h spell`, `:h z=`, `:h 'spelllang'`, `:h spellfile`
