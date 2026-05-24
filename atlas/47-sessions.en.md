---
id: sessions
category: environment
drillable: false
difficulty: master
frequency: low
related_drills: []
related_articles:
  - starting-vim
  - argument-list
help_tags:
  - ":h sessions"
  - ":h :mksession"
---

# Sessions — save and restore editing state

A session captures windows, tabs, buffers, options, and mappings into a `.vim` script. Restore later to pick up exactly where you left off — including layout.

## Commands

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:mksession [{file}]` | Save session (default `Session.vim`)            |
| `:mksession!`     | Overwrite existing session file                     |
| `:source {file}`  | Load session                                        |
| `vim -S {file}`   | Launch with session                                 |
| `:mkview`         | Save the **view** of current window (folds, cursor) |
| `:loadview`       | Load saved view                                     |

## What's saved

Controlled by `'sessionoptions'`. ★ = on in **Vim 9 default** (`blank,buffers,curdir,folds,help,options,tabpages,winsize,terminal`). **Neovim 0.12 default**: `blank,buffers,curdir,folds,help,tabpages,winsize,terminal` — same as Vim **minus `options`** (Neovim doesn't roundtrip option values through sessions).

| Option         | ★ | Meaning                                            |
|----------------|---|----------------------------------------------------|
| `blank`        | ★ | Empty windows                                      |
| `buffers`      | ★ | Open buffers (even hidden)                         |
| `curdir`       | ★ | Current directory                                  |
| `folds`        | ★ | Folds                                              |
| `help`         | ★ | Help windows                                       |
| `options`      | ★ | All options and mappings (verbose; **Vim default on; Neovim default off**) |
| `tabpages`     | ★ | Tab pages                                          |
| `winsize`      | ★ | Window sizes                                       |
| `terminal`     | ★ | Terminal windows (default on in both Vim and Neovim) |
| `winpos`       |   | Vim window position on screen                      |
| `resize`       |   | Window lines/cols                                  |
| `sesdir`       |   | Use session-file directory as cwd (**don't combine with `curdir`** — they're mutually exclusive by convention, not enforced) |
| `slash`        |   | Convert `\` to `/` in filenames (Windows)          |
| `unix`         |   | Use Unix line endings in session file              |
| `globals`      |   | Global variables (uppercase-prefixed)              |
| `localoptions` |   | Window/buffer-local options                        |
| `skiprtp`      |   | Skip `'runtimepath'`/`'packpath'` save (Neovim)   |

Set `:set sessionoptions=buffers,tabpages,winsize` for a lean session. Use `sesdir` instead of `curdir` for portable sessions.

## Choosing between

- **Session vs view**: A **session** captures the entire Vim state (all windows, tabs, buffers). A **view** captures one window's state (folds, cursor, options). Sessions are heavyweight; views are surgical.
- **Session vs git**: Sessions save **editing state** (where you were). Git saves **content**. They complement — git tracks code, session tracks "I had these 4 files open in this layout".
- **`:mksession` vs `:mksession!`**: Plain refuses to overwrite. With `!`, it overwrites. Default to `:mksession!` once you've named the session.
- **Project session vs default `Session.vim`**: Per-project: `:mksession ~/.vim/sessions/project.vim`. Default: `Session.vim` in cwd. Naming makes multi-project workflows manageable.

## Examples

```text
Save session:                  :mksession
Save to named:                 :mksession ~/.vim/sessions/foo.vim
Restore on launch:             vim -S ~/.vim/sessions/foo.vim
Restore in running Vim:        :source ~/.vim/sessions/foo.vim

Lean session (just files+layout, no options):
  :set sessionoptions=blank,buffers,curdir,tabpages,winsize
  :mksession!

Map quick save/load (in vimrc):
  nnoremap <Leader>ss :mksession! ~/.vim/sessions/
  nnoremap <Leader>so :source ~/.vim/sessions/
```

## Pitfalls

- A session is a Vim script — if vimrc changes or plugins update, the session may fail to restore cleanly.
- Plugins that register state may not save into sessions automatically. Some (`vim-startify`, `vim-obsession`) handle this.
- `'sessionoptions'` defaults to a lot — restoring can be surprisingly noisy. Trim it.
- Sourcing a session inside an already-running Vim doesn't always cleanly wipe current state. Best to start fresh: `:qa` then `vim -S`.
- Long-lived sessions accumulate stale references — files that no longer exist cause errors on restore. Re-save periodically.
- **Session vs shada/viminfo**: sessions save **layout** (windows, tabs, buffer list, options). They do **not** save undo history, search/command history, registers, or marks across files — those live in `'shada'` (Neovim) / `'viminfo'` (Vim). For full state restoration you typically want both.

## See also

- 📖 Related: [starting-vim], [argument-list]
- 📚 `:h sessions`, `:h :mksession`, `:h 'sessionoptions'`
