---
id: external-commands
category: composition
status: concept-only
related_drills: []
related_articles:
  - special-inserts
  - terminal-job
  - indent-format
help_tags:
  - ":h :!"
  - ":h !"
  - ":h filter"
---

# External commands and shell filters

Run shell commands from inside Vim. Pipe buffer content through shell programs. The bridge between editor and OS.

## Commands

| Form              | Effect                                                  |
|-------------------|---------------------------------------------------------|
| `:!{cmd}`         | Run `{cmd}` in shell, show output (pager-style)         |
| `:r!{cmd}`        | Run, insert output **below cursor line**                |
| `:[range]!{cmd}`  | **Filter** range through `{cmd}` (replace)              |
| `:.!{cmd}`        | Filter current line through `{cmd}`                     |
| `!{motion}{cmd}`  | (Normal) Filter motion-range through `{cmd}`            |
| `!!{cmd}`         | Filter current line through `{cmd}` (Normal form)       |
| `{visual}!{cmd}`  | Filter visual selection                                 |
| `:{cmd}`          | (Special chars) `%` = current filename, `#` = alt file  |
| `<C-z>`           | Suspend Vim (resume with `fg` in shell)                 |

## Choosing between

- **`:!` vs `:r!`**: `:!` shows output in a pager, then returns to Vim. `:r!` inserts output as buffer content. Use `:!` for one-shot info (`:!date`); use `:r!` when you want the output as text.
- **`:r!` vs `:[range]!`**: `:r!` **adds** new content. `:[range]!` **replaces** existing lines by filtering through a command. Use `:r!` for new content, `:.!sort` to sort an existing list.
- **`!{motion}` vs `:[range]!`**: Identical effect. Normal-mode `!{motion}` doesn't require thinking about line numbers; ex `:[range]!` is for scripted ranges.
- **`:!` vs `:terminal`**: `:!` runs once and shows output. `:terminal` opens a persistent shell buffer. For repeated work or interactive commands, use `:terminal`.
- **`:!{cmd}` vs system shell**: `:!` uses the shell from `'shell'` option (defaults to `$SHELL`). If you need a specific shell, set `'shell'` or use full paths.

## Special characters in `:!{cmd}`

| Char | Expansion                                                |
|------|----------------------------------------------------------|
| `%`  | Current filename                                         |
| `#`  | Alternate filename (previous buffer)                      |
| `##` | All files in argument list                                |
| `<cword>` | Word under cursor (via `expand('<cword>')`); in the cmdline, **`<C-r><C-w>`** inserts it directly |
| `<cWORD>` | WORD under cursor (`<C-r><C-a>` in cmdline)               |
| `<cfile>` | Filename under cursor (`<C-r><C-f>` in cmdline)           |
| `%:S`     | `'shellescape()'` modifier — quote/escape the filename for the shell (use this with `%`) |

## Examples

```text
Check current file with linter:    :!eslint %
Run current file:                  :!python %
Format JSON range:                 :'<,'>!python -m json.tool
Sort lines:                        :%!sort
Number lines:                      :%!nl
Word count of paragraph:           !ap, then type wc<CR>
                                   (Normal-mode `!ap` opens cmdline for the motion's range; type the shell command + <CR>)
Pipe through external tool:        :.!sed 's/foo/bar/'
Re-format Go file:                 :%!gofmt
List directory into buffer:        :r! ls -la
```

## Web environment note

In a CodeMirror-based web Vim (such as the drill on this site), `:!` and friends **don't run shell commands** — there's no shell. These features are documented here because they're essential to mastery in real Vim. To practice, use real Vim/Neovim locally.

## Pitfalls

- `:!{cmd}` blocks Vim until the command completes — no async by default. For long jobs, use `:!{cmd} &` (background) or `:terminal`.
- The `%` expansion is **unescaped**. Filenames with spaces break: use the `:S` modifier (`:!cmd %:S`) or `expand('%:p:S')`.
- Filtering with `:[range]!` **replaces** the lines with the command's stdout. If the command fails or produces no output, you lose the original content. Undo with `u`.
- `<C-z>` suspends Vim; you must `fg` in the shell to return. Newcomers often think Vim crashed.
- `:!{cmd}` output is in the terminal area below the buffer, separate from `:r!` (which writes to the buffer).

## See also

- 📖 Related: [special-inserts], [terminal-job], [indent-format]
- 📚 `:h :!`, `:h !`, `:h filter`, `:h :read!`
