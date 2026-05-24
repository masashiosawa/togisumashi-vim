---
id: mappings
category: config
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - settings
  - abbreviations
help_tags:
  - ":h map.txt"
  - ":h :map"
  - ":h key-notation"
---

# Mappings — keyboard shortcuts

Bind a key sequence to a command. The mechanism behind every "I made my own command" in Vim. **Always use the `noremap` variants** — they're safer.

## Commands

### Define

| Command       | Mode applied to                                        |
|---------------|--------------------------------------------------------|
| `:map`        | Normal, Visual, Select, Operator-pending               |
| `:nmap`       | Normal only                                            |
| `:imap`       | Insert                                                 |
| `:vmap`       | Visual + Select                                        |
| `:xmap`       | Visual only                                            |
| `:smap`       | Select only                                            |
| `:omap`       | Operator-pending                                       |
| `:cmap`       | Command-line                                           |
| `:tmap`       | Terminal-Job                                           |
| `:map!`       | Insert + Command-line                                  |

**Non-recursive variants** (RECOMMENDED): replace `map` with `noremap` — `:nnoremap`, `:inoremap`, etc. These don't re-expand other mappings, avoiding infinite loops.

### List / remove

| Command       | Action                                              |
|---------------|-----------------------------------------------------|
| `:map`        | List all mappings                                   |
| `:nmap`       | List Normal mappings                                |
| `:map {lhs}`  | Show mapping for `{lhs}`                            |
| `:unmap {lhs}` | Remove mapping (per mode flavor)                   |
| `:mapclear`   | Remove all mappings (per mode flavor)               |

## Syntax

```vim
:nnoremap <lhs> <rhs>
:nnoremap <Leader>w :w<CR>
:inoremap jk <Esc>
:vnoremap <C-c> "+y
```

### Key notation

| Notation     | Means                                              |
|--------------|----------------------------------------------------|
| `<CR>` `<Enter>` `<Return>` | Enter key                            |
| `<Esc>`      | Escape                                             |
| `<Tab>`      | Tab                                                |
| `<BS>`       | Backspace                                          |
| `<Space>`    | Space                                              |
| `<C-x>`      | Ctrl+x                                             |
| `<S-x>` or `X`| Shift+x — for **letter keys** Vim treats `<S-a>` and `A` as identical; prefer the uppercase letter |
| `<A-x>` or `<M-x>` | Alt/Meta+x                                   |
| `<Leader>`   | Configurable, default `\`                          |
| `<LocalLeader>` | Buffer-local leader                             |
| `<Plug>`     | Plugin-internal key (won't conflict)               |

### Map-arguments

Place these **before** `{lhs}` in a `:map` family command:

| Arg          | Effect                                                              |
|--------------|---------------------------------------------------------------------|
| `<silent>`   | Don't echo `{rhs}` in the cmdline (most user mappings want this)    |
| `<expr>`     | Evaluate `{rhs}` as a Vim expression; the resulting **string** becomes the keys to feed |
| `<buffer>`   | Mapping applies only to the current buffer (ftplugin / filetype-local) |
| `<nowait>`   | Match immediately without waiting for a longer prefix (avoids the `'timeoutlen'` pause when a shorter map is a prefix of a longer one) |
| `<unique>`   | Fail with an error if the mapping already exists (use in plugins to avoid clobbering) |
| `<script>`   | The `{rhs}` only uses mappings defined in the same script (sandboxing) |

```vim
nnoremap <silent> <Leader>/ :nohlsearch<CR>
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
nnoremap <buffer> q :bd<CR>
nnoremap <nowait> <Leader>x :Foo<CR>
```

### Leader

The `<Leader>` is a customizable prefix for personal mappings:

```vim
let mapleader = " "         " space as leader
nnoremap <Leader>w :w<CR>   " press space then w to save
```

## Choosing between

- **`:map` vs `:noremap`**: **Always `:noremap`**. The plain `:map` expands other mappings recursively — easy to create loops, hard to debug. `:noremap` is safe and what you want 99% of the time.
- **`:nmap` vs `:map`**: `:nmap` is Normal-only — predictable. `:map` applies to Normal + Visual + Operator-pending; can have unintended effects in Visual.
- **`:vmap` vs `:xmap`**: `:vmap` includes Select mode (which most plugins use for snippet placeholders); `:xmap` is Visual-only. Prefer `:xmap` unless you really want Select.
- **`<C-c>` vs `<Esc>` in mapping**: `<C-c>` returns to Normal as "interrupt"; in some Vim versions this skips or short-circuits `InsertLeave` and abbreviation expansion. `<Esc>` is the clean exit and keeps autocmd ordering predictable.
- **`<Leader>` vs hard-coded prefix**: `<Leader>` lets users override. If you're writing a plugin, use `<Plug>` mappings for actions and let users bind their own `<Leader>` to your `<Plug>`.
- **Mapping vs alias vs function**: For one-liners, map. For complex logic, define `:command` or write a function. For abbreviations (text expansion in Insert/Cmdline), see [abbreviations].

## Examples

```vim
" Quick save
nnoremap <Leader>w :w<CR>

" Clear search highlight
nnoremap <Leader>/ :nohlsearch<CR>

" Exit Insert with jk
inoremap jk <Esc>

" Yank to system clipboard
vnoremap <Leader>y "+y

" Move lines up/down
nnoremap <A-j> :m .+1<CR>==
nnoremap <A-k> :m .-2<CR>==

" Toggle relativenumber
nnoremap <Leader>r :set relativenumber!<CR>

" Open vimrc
nnoremap <Leader>ev :e $MYVIMRC<CR>
```

## Pitfalls

- Using `:map` instead of `:noremap` can cause infinite recursion if `{rhs}` contains a mapped key. Always start with `:noremap`.
- Insert-mode mappings can have **timeout** delays — `jk` to escape pauses briefly because Vim waits to see if you'll type `jl`/`ji` etc. Tune `'timeoutlen'`.
- Mode confusion: `:imap` doesn't affect Normal. `:map` doesn't affect Command-line. Be explicit.
- `<Leader>` is resolved to the **current value of `mapleader`** at the time the mapping is defined, then baked in. Changing `mapleader` later does **not** retroactively update existing mappings. Set `mapleader` once at the top of your vimrc, before any `<Leader>`-using mapping.
- Conflicts with built-ins: mapping a default key (like `<C-a>`) breaks its built-in behavior in that mode. Save a fallback (`nnoremap <Leader><C-a> <C-a>`).
- Plugin maps load **after** vimrc by default. To override, use `~/.vim/after/plugin/...` or `:autocmd VimEnter`.
- Defaults differ between Vim and Neovim: **Neovim 0.6+ ships with `Y` mapped to `y$`** (Vim keeps `Y` ≡ `yy`). If your muscle memory expects line-yank, add `nnoremap Y yy` to your Neovim config.

## See also

- 📖 Related: [settings], [abbreviations]
- 📚 `:h map.txt`, `:h :map`, `:h key-notation`, `:h <Leader>`
