---
id: insert-mode-keys
category: insert
drillable: true
difficulty: intermediate
frequency: mid
related_drills:
  - tier-2-02-insert-mode-keys
related_articles:
  - insert-entry
  - registers
help_tags:
  - ":h ins-special-keys"
  - ":h i_CTRL-O"
  - ":h i_CTRL-R"
---

# Insert mode shortcuts

You spend half your editing time in Insert. These shortcuts let you fix mistakes, paste registers, and execute one-shot Normal commands without leaving Insert.

## Commands

### Mode exit

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `<Esc>`  | Exit to Normal mode                                 |
| `<C-c>`  | Exit to Normal (skips InsertLeave autocmds)         |
| `<C-[>`  | Same as `<Esc>` (same byte)                         |

### Delete back

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `<BS>`   | Delete previous character. Crossing into pre-existing text or line breaks depends on `'backspace'` (same constraint as `<C-w>` / `<C-u>`) |
| `<C-w>`  | Delete the previous **word** before the cursor. Crossing into pre-existing text (or line breaks) depends on `'backspace'` |
| `<C-u>`  | Delete characters **typed in this Insert session** before the cursor (not a full line delete; pre-existing text is preserved unless `'backspace'` permits crossing) |
| `<C-h>`  | Same as `<BS>`                                      |

### One-shot Normal command

| Key       | Action                                                      |
|-----------|-------------------------------------------------------------|
| `<C-o>{cmd}` | Execute one Normal-mode command then return to Insert    |

### Paste from register

| Key            | Action                                                |
|----------------|-------------------------------------------------------|
| `<C-r>{r}`      | Insert register `{r}` as if typed (special keys like `<BS>` are executed). Mappings and abbreviations are **not** applied. `'textwidth'`, `'formatoptions'`, auto-indent still apply |
| `<C-r><C-r>{r}` | Same as `<C-r>{r}` but **literal** — control chars in the register are inserted as data, not executed. `'textwidth'` / `'formatoptions'` / auto-indent **still apply** |
| `<C-r><C-o>{r}` | Literal + **suppresses auto-indent**. Linewise register is inserted **above** the current line (like `P`). Best for pasting code blocks |
| `<C-r><C-p>{r}` | Literal + **fixes indent** (`[<MiddleMouse>` equivalent) — preserves/aligns the pasted indent to the current line |
| `<C-r>=expr`    | Evaluate Vim expression, insert result                |
| `<C-r><C-w>`    | Insert word under cursor                              |
| `<C-r><C-a>`    | Insert WORD under cursor                              |

### Completion

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `<C-n>`  | Next keyword completion                             |
| `<C-p>`  | Previous keyword completion                         |
| `<C-x><C-o>` | Omni completion (filetype-aware)                |
| `<C-x><C-f>` | File path completion                            |
| `<C-x><C-l>` | Whole-line completion                           |
| `<C-x>s`     | Spelling suggestions                            |

### Copy from adjacent line

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `<C-y>`  | Insert the character from the line **above** at the same column |
| `<C-e>`  | Insert the character from the line **below** at the same column |

### Indentation

| Key      | Action                                              |
|----------|-----------------------------------------------------|
| `<C-t>`  | Indent line one shiftwidth                          |
| `<C-d>`  | Dedent line one shiftwidth                          |
| `0<C-d>` | Remove all indent (cursor must be at line start)    |
| `^<C-d>` | Remove indent, restore next line                    |

### Literal / special

| Key            | Action                                                  |
|----------------|---------------------------------------------------------|
| `<C-v>{char}`  | Insert character literally (e.g., `<C-v><Tab>` for raw tab) |
| `<C-k>{a}{b}`  | Insert digraph (see [digraphs](14-digraphs))            |
| `<C-q>`        | Same as `<C-v>` (when `<C-v>` is mapped to paste)       |

## Choosing between

- **`<BS>` vs `<C-w>` vs `<C-u>`**: `<BS>` = one char. `<C-w>` = one word. `<C-u>` = to line start. Use the largest unit available — typing 20 backspaces is a smell.
- **`<Esc>` vs `<C-c>`**: Identical for exit, but `<C-c>` **skips `InsertLeave` autocmds** (e.g., LSP, snippet finalization). Use `<C-c>` when you want to bail out fast.
- **`<C-o>` vs exit-and-return**: `<C-o>dd` deletes line and stays in Insert. Without `<C-o>`, you'd `<Esc>dda` — 4 keys vs 3 and a context switch. Use `<C-o>` for quick excursions (jump, search, delete) while typing.
- **`<C-r>"` vs Normal-mode `p`**: `<C-r>` pastes within Insert mode without leaving. Use `<C-r>0` to paste last yank without exit; use `p` when you've already left.
- **`<C-r>"` vs `<C-r><C-r>"`**: The double version pastes **literally** — control chars in the register are inserted as data, not executed (e.g., a literal `<Tab>` stays a Tab character). `'textwidth'` / `'formatoptions'` / auto-indent still apply to both. Use double for register content containing keystroke-like text.
- **`<C-r><C-o>` vs `<C-r><C-p>`**: Both insert literally; both bypass mappings. **`<C-r><C-o>` suppresses auto-indent** entirely (use when pasting code that already has its own indentation). **`<C-r><C-p>` fixes the indent** to align with the current line (use when you want the paste to inherit the surrounding indent level). When indent matters either way, prefer one of these over plain `<C-r>` / `<C-r><C-r>`.
- **`<C-n>` vs LSP completion**: `<C-n>` is built-in keyword completion from current buffer. LSP gives semantic completion. They coexist — many users map `<C-Space>` to LSP and keep `<C-n>` as fallback.

## Examples

```text
Fix the wrong word you just typed:
  ...typing... oh wait  →  <C-w>  →  retype

Insert a path in the middle of code:
  func("<C-x><C-f>...")    file completion

Paste the last yank inline:
  echo "<C-r>0";

Run one Normal command without exiting:
  ...typing...  →  <C-o>dd  →  keep typing

Evaluate math inline:
  pi = <C-r>=3.14*2<CR>
```

## Pitfalls

- `<C-c>` skips autocmds. If you rely on `InsertLeave` for snippets/LSP finalize, prefer `<C-Esc>` mappings or stick to `<Esc>`.
- `<C-r>` in Insert is **not** the same as `<C-r>` in Normal (which is redo). They share the keystroke but live in different modes.
- `<C-d>` in Insert is **dedent**. `<C-d>` in Normal is **scroll**. Same key, two worlds.
- `<C-u>` in Insert deletes to line start. In `:` cmdline it deletes the whole command. Don't conflate.
- `<C-r>=` evaluates Vim expression: `<C-r>=&shiftwidth<CR>` inserts your shiftwidth. Powerful but error-prone — single quotes escape weirdly.

## See also

- 🎯 Practice: [tier-2-02-insert-mode-keys]
- 📖 Related: [insert-entry], [registers]
- 📚 `:h ins-special-keys`, `:h i_CTRL-O`, `:h i_CTRL-R`, `:h i_CTRL-X`
