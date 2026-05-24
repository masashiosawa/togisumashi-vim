---
id: files
category: environment
status: concept-only
related_drills: []
related_articles:
  - buffers
  - special-inserts
help_tags:
  - ":h edit-files"
  - ":h :write"
  - ":h gf"
---

# Files — open, save, navigate

Real Vim manages files via the filesystem. Web-based Vim emulations don't have files, so these commands are **mastery knowledge** rather than drill territory.

## Commands

### Open / read

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:e {file}`       | Edit `{file}` (current buffer)                      |
| `:e!`             | Reload current file, discarding changes             |
| `:e .`            | Open netrw (built-in file browser) at cwd           |
| `:e ++enc=utf-8 {file}` | Open with specified encoding                  |
| `:find {name}`    | Search `'path'` for file matching `{name}`          |
| `:browse e`       | Open file picker dialog (GUI)                       |
| `gf`              | Open file under cursor (uses `'path'`, `'suffixesadd'`) |
| `<C-w>f`          | Open file under cursor in a horizontal split        |
| `<C-w>gf`         | Open file under cursor in a new tab                 |

### Save / write

| Command           | Action                                              |
|-------------------|-----------------------------------------------------|
| `:w`              | Write current buffer                                |
| `:w {file}`       | Write buffer to `{file}` (doesn't change current name) |
| `:saveas {file}`  | Write to `{file}` AND switch current name to it     |
| `:[range]w {file}` | Write range to `{file}`                            |
| `:[range]w >> {file}` | Append range to `{file}`                        |
| `:wa`             | Write all modified buffers                          |
| `:wq`             | Write and quit                                      |

### Quit

| Command   | Action                                              |
|-----------|-----------------------------------------------------|
| `:q`      | Quit (refuses if unsaved changes)                   |
| `:q!`     | Force quit, discarding changes                      |
| `:qa`     | Quit all                                            |
| `:qa!`    | Force quit all                                      |
| `ZZ`      | Same as `:wq` (write + quit)                        |
| `ZQ`      | Same as `:q!` (quit without saving)                 |

### Reference current file

| Char in cmdline | Expansion                                       |
|-----------------|-------------------------------------------------|
| `%`             | Current filename                                |
| `%:p`           | Full path                                       |
| `%:h`           | Directory (head)                                |
| `%:t`           | Filename only (tail)                            |
| `%:e`           | Extension                                       |
| `%:r`           | Filename without extension (root)               |
| `#`             | Alternate file                                  |

## Choosing between

- **`:e` vs `:r`**: `:e` switches buffer to another file (replaces view). `:r` inserts file content into current buffer. Use `:e` to navigate, `:r` to merge.
- **`:w` vs `:saveas`**: `:w {file}` writes to `{file}` but stays editing the current buffer's name. `:saveas {file}` writes **and** switches the buffer's identity to `{file}`. Use `:saveas` for "rename and continue editing".
- **`:wq` vs `ZZ`**: Identical effect. `ZZ` is two keys; `:wq` is four. Use `ZZ`.
- **`:q!` vs `ZQ`**: Identical. `ZQ` is two keys. Use `ZQ` when discarding.
- **`gf` vs `:e %:h/{file}`**: `gf` resolves the path automatically using `'path'`. Set `'path'=.,**` to search recursively. Useful for `import 'foo'` style references.
- **`:e .` vs file plugin**: Built-in netrw works without plugins. Plugins like `nerdtree`, `nvim-tree`, or `oil.nvim` are nicer but require setup.

## Examples

```text
Open recent file:               :e #
Reload from disk:               :e!
Save copy to backup:            :w %.bak
Rename current file:            :saveas newname.txt
Open file under cursor:         gf
Open header file:               :exe 'e' expand('%:r').'.h'    (foo.c → foo.h. Use `:exe` because cmdline parsing of `%:r.h` is ambiguous — `expand()` concatenates reliably.)
Path to current dir:            :e %:h/
Find by partial name:           :find foo*
```

## Web environment note

In the drill on this site (CodeMirror-based), there is **no filesystem**. `:e` `:w` etc. don't work. This article covers real Vim usage for when you transition off the drill site.

## Pitfalls

- `:w` without arguments writes the **current buffer's name**. To save to a different file: `:w other.txt`. Don't confuse with `:saveas`.
- `:wq` will refuse if the file has read-only flag. Use `:wq!` or `:w !sudo tee %` to bypass.
- `gf` requires the file to exist. To create a non-existent file under cursor, use `:e <cfile>` then `:w`.
- `%` in `:!` is **unescaped** — filenames with spaces break: use `:!cmd "%"` or `expand('%:S')`.
- Quitting with unsaved changes loses your work permanently if the buffer isn't backed by undo files.

## See also

- 📖 Related: [buffers], [special-inserts]
- 📚 `:h edit-files`, `:h :write`, `:h gf`, `:h cmdline-special`
