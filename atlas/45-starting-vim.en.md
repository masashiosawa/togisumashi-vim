---
id: starting-vim
category: environment
drillable: false
difficulty: beginner
frequency: mid
related_drills: []
related_articles:
  - argument-list
  - sessions
help_tags:
  - ":h starting"
  - ":h cmdline-options"
---

# Starting Vim — invocation options

Command-line flags that change how Vim launches: skip config, open at line, multiple files, restore session.

## Common flags

| Flag           | Action                                              |
|----------------|-----------------------------------------------------|
| `vim {file}`   | Open file                                           |
| `vim {file1} {file2}` | Open files into argument list                |
| `vim -O f1 f2` | Open in **vertical** splits                         |
| `vim -o f1 f2` | Open in **horizontal** splits                       |
| `vim -p f1 f2` | Open in tabs                                        |
| `vim +{N} file` | Open at line `N`                                   |
| `vim +/{pat} file` | Open at first match of `pat`                    |
| `vim -c {cmd}` | Run `{cmd}` after loading                           |
| `vim -u {vimrc}` | Use specified vimrc (or `-u NONE` for none)       |
| `vim -U {gvimrc}` | Vim only — specify gvimrc                        |
| `-N`           | Force `'nocompatible'` (Vim — meaningless on Neovim) |
| `-R`           | Read-only mode (recoverable)                        |
| `-M`           | Modifications disabled                              |
| `-n`           | No swap file (also sets `'updatecount'` to 0)       |
| `-e` / `-E`    | Ex mode / Improved Ex mode                          |
| `-s {scriptin}` | Read normal-mode commands from script (replay keystrokes) |
| `-S {session}` | Source session file (typically `Session.vim`)       |
| `--clean`      | Skip vimrc/plugins/shada. **Vim**: still loads `defaults.vim`. **Neovim**: applies its built-in defaults |
| `-d`           | diff mode (same as `vimdiff`)                       |
| `-Z`           | Restricted mode (no shell access)                   |
| `-V[N]`        | Verbose level `N` (1–15; higher = more sourcing/load trace) |
| `-D`           | Debug mode — break into debugger at first command in any sourced file |
| `-h` / `--help` | Print help                                         |
| `-v` / `--version` | Print version info                             |

## Choosing between

- **`-O` vs `-o` vs `-p`**: Vertical splits, horizontal splits, or tabs. Pick by how you'll use the files. `-O` works well for compare-style "view files side by side".
- **`-u NONE` vs `--clean`**: `-u NONE` skips vimrc entirely (vi-compatible defaults). `--clean` skips vimrc/plugins/shada but **does load `defaults.vim`** (sensible modern defaults). Use `--clean` for "is this a config issue?" debugging while keeping a usable editor.
- **`+{N}` vs `:e file | {N}G`**: `+{N}` is shell-level positioning, useful when launching from a compiler/linter that emits filename:line. Inside Vim, `{N}G` works on already-loaded buffers.
- **`vim +/pattern file`**: Opens file at first occurrence of pattern. Often combined with `+/<pat>` from grep output.
- **`-R` vs `-M`**: `-R` is read-only by warning — you can override. `-M` disables modification entirely.

## Examples

```text
Open file at line 42:           vim +42 main.c
Open at error:                  vim +/error main.log
Compare two files:              vim -d a b   (or vimdiff a b)
Multiple in vertical splits:    vim -O config.json schema.json
Skip all config (debug):        vim --clean
Use specific vimrc:             vim -u /tmp/test-vimrc file.txt
Run command after load:         vim -c "set number" -c "syntax on" file.c

Open with session:              vim -S Session.vim

Read-only quick look:           vim -R README.md
Don't create .swp file:         vim -n file.txt
```

## Web environment note

Web Vim emulations don't have command-line invocation. This article is for real Vim/Neovim.

## Startup file loading order

Simplified (`:h initialization`, `:h startup`):

**Vim** (`vim`)
1. Set `'shell'`, `'term'`
2. Run system gvimrc (if GUI)
3. Run `$MYVIMRC` — usually `~/.vimrc` (or `~/.vim/vimrc`); skip with `-u {file}` or `-u NONE`
4. Apply `defaults.vim` if no user vimrc and not `-u NONE`
5. Source `pack/*/start/*/plugin/**.vim` (native packages)
6. Source other plugin scripts on `'runtimepath'`
7. Process `-c` and `-S` arguments
8. Open files from argv into the argument list

**Neovim** (`nvim`)
1. Read `init.lua` if present (`$XDG_CONFIG_HOME/nvim/init.lua`, typically `~/.config/nvim/init.lua`); otherwise `init.vim`. Skip with `-u {file}` or `-u NONE`
2. Source `runtimepath` plugins (`pack/*/start/*/plugin/**`)
3. Process `-c` / `-S` / argv

The path Vim chose for the user vimrc is exposed as **`$MYVIMRC`** — `:e $MYVIMRC` opens whichever file is currently in effect.

## Pitfalls

- `-c` runs commands **after** sourcing vimrc. To override vimrc settings, `-c` is the right place.
- `-u NONE` produces a near-blank Vim — many users find it disorienting. Use it intentionally for debugging.
- Multiple `+` arguments: only the last `+{cmd}` takes effect. To run several commands, use `-c "{cmd1}" -c "{cmd2}"`.
- `-O` distributes file count across splits — opening 10 files with `-O` makes 10 splits, often too cramped. Practical for 2-4 files.
- `vim` vs `vi`: on many systems `vi` is a Vim alias in compatible mode. To force Vim behavior, run `vim` directly.
- **Neovim**: if **both** `init.lua` and `init.vim` exist under `$XDG_CONFIG_HOME/nvim/`, Neovim aborts with an "E5422" error rather than guessing. Keep exactly one. To migrate, rename the old one to `.bak` until the new file is verified.

## See also

- 📖 Related: [argument-list], [sessions]
- 📚 `:h starting`, `:h cmdline-options`, `:h initialization`
