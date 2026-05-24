---
id: special-inserts
category: insert
drillable: false
difficulty: advanced
frequency: low
related_drills: []
related_articles:
  - files
  - external-commands
  - digraphs
help_tags:
  - ":h :read"
  - ":h :read!"
---

# Special insertions — pulling content into the buffer

Insert content from **outside** the buffer without leaving Vim: another file, the output of a shell command, or a register's value.

## Commands

| Command            | Action                                              |
|--------------------|-----------------------------------------------------|
| `:r {file}`        | Read `{file}` and insert below current line         |
| `:r! {cmd}`        | Run `{cmd}` in shell, insert output below           |
| `:[line]r {file}`  | Insert file **after** line `[line]`. `:0r file` inserts before line 1 (top); `:1r file` inserts after line 1 |
| `:[line]r! {cmd}`  | Insert command output after line `[line]`           |
| `<C-r>{r}` (Insert)| Insert register `{r}` (see [insert-mode-keys])      |
| `:put {r}`         | Put register `{r}` below current line               |
| `:put! {r}`        | Put register `{r}` above current line               |
| `:put ={expr}`     | Put the result of evaluating `{expr}`                |

## Choosing between

- **`:r` vs `:e`**: `:r` **inserts** content of another file into the current buffer at the cursor's line. `:e` **replaces** the buffer with another file. Use `:r` to merge content, `:e` to switch focus.
- **`:r!` vs `:!`**: `:!` runs a shell command and shows its output in a pager. `:r!` runs the command and inserts the output into the buffer. Use `:r!` when you want the output as buffer content.
- **`:r!` vs `:[range]!`**: `:r!` inserts new output; `:[range]!{cmd}` **filters** existing lines through `{cmd}` (replaces). Use `:r!` for new content, `:.!` to transform a line in place.
- **`:put` vs `p`**: `:put` is the ex form, works with ranges and forces linewise paste. `p` is normal-mode paste, respects register type (charwise/linewise/block). Use `:put` when scripting or when you need linewise regardless of register type.
- **`:put =expr` vs `<C-r>=`**: Both evaluate Vim expressions. `:put =` puts the result on a new line in Normal mode. `<C-r>=` inserts inline in Insert mode.

## Examples

```text
Pull README into current doc:
  :r README.md

Insert current date:
  :r! date

Insert file listing:
  :r! ls -la

Insert at top of file:
  :0r template.txt

Insert sequence 1..10:
  :put =range(1,10)

Filter current paragraph through sort:
  vap  →  :'<,'>!sort
  or in Normal: !ap (opens cmdline for the range), then type sort<CR>

Insert register `a` linewise from current line:
  :put a
```

## Pitfalls

- `:r` inserts **after** the current line by default. Use `:0r` to insert at the very top.
- `:r!` runs in a shell — the command can fail silently if the shell isn't what you expect. Check `'shell'`.
- Command output is inserted **raw** including trailing newline. To strip, post-process or pipe through `sed`/`awk`.
- `:put` always operates **linewise** regardless of how the register was filled. To insert a register inline (charwise), use `<C-r>{r}` in Insert mode (or `"{r}p` in Normal with a charwise-yanked register).
- `:r! {cmd}` with a slow `{cmd}` blocks Vim — no async by default. Heavy commands belong in `:terminal` or `:!`+background.

## See also

- 📖 Related: [files], [external-commands], [digraphs]
- 📚 `:h :read`, `:h :read!`, `:h :put`
