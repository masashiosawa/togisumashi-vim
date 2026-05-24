---
id: global-command
category: repeat
drillable: false
difficulty: advanced
frequency: mid
related_drills: []
related_articles:
  - substitute
  - macros
  - regex-patterns
help_tags:
  - ":h :global"
  - ":h :vglobal"
---

# Global コマンド — `:g`

パターンにマッチする全行で ex コマンドを実行する。`:s` `:d` `:m` `:normal @a` と組み合わせると強烈。

## コマンド一覧

| 形式                       | 効果                                                |
|----------------------------|-----------------------------------------------------|
| `:g/{pat}/{cmd}`           | マッチ行ごとに `{cmd}` 実行                          |
| `:g!/{pat}/{cmd}`          | **非マッチ**行ごとに実行（`:v` と同じ）              |
| `:v/{pat}/{cmd}`           | inverse global（マッチしない行）                     |
| `:[range]g/{pat}/{cmd}`    | range 内に限定                                      |
| `:g/{pat}/d`               | マッチ行を削除                                      |
| `:g/{pat}/m$`              | マッチ行をファイル末尾へ移動                        |
| `:g/{pat}/s/foo/bar/g`     | マッチ行内のみで置換                                |
| `:g/{pat}/normal @a`       | 各マッチ行でマクロ `a` 実行                          |
| `:g/{pat}/.,/end/d`        | マッチから "end" パターンまで削除                    |

## 使い分け

- **`:g` vs `:s`**: `:s` は行内パターン置換、`:g` は「行を見つけて X する」。組合せ — `:g/pat/s/.../.../g` でフィルタしてから置換
- **`:g` vs `:v`**: `:g` はマッチ、`:v`（または `:g!`）は反転。コメント以外を全削除なら `:v/^#/d`
- **`:g/...d` vs `:%s/.../\r/g`**: 両者とも行単位操作。`:g/...d` はマッチ行を削除、`:s` は行内書換。操作単位が「行」なら `:g`
- **`:g/.../normal @a` vs macro 単独**: `@a` はその場で 1 回実行、`:g/pat/normal @a` は**全マッチ行**で自動実行
- **`:g` vs visual + operator**: `:g` はパターン駆動（宣言的）、visual は範囲駆動（手動）。「X を含む全行」には `:g` の方が速く確実

## 実例

```text
空行削除:
  :g/^$/d

TODO を含む行を削除:
  :g/TODO/d

import で始まる行だけ残す:
  :v/^import/d

コメントを末尾に集める:
  :g/^#/m$

マッチ行内のみで置換:
  :g/^class/s/foo/bar/g

各マッチ行でマクロ実行:
  :g/^def /normal @a

非空行に下線（複製して `-` 行化）:
  :v/^$/normal! YpVr-      （ばかげているが合成を示す）

マッチ行を表示:
  :g/error/p
```

## 落とし穴

- `:g` はまずマッチ行に**内部マーク**を付けてから、各行に対して `{cmd}` を実行する — `:g/pat/d` のような削除でもマークが正しい行を追従するため確実に動く
- `:v` と `:g!` は同義。意味を明確にするなら `:v`
- 区切り文字は 2 文字目: `pat` に `/` を含むなら `:g#path#d`
- `:g//d`（空パターン）は**最後の検索または `:s` パターン**を再利用する — `/pat<CR>` の後の `:g//d` で直近検索を削除
- `:normal @a` は**マッピングを解釈する**。マップ回避には `:normal! @a`（`!` で bypass）。行ごとの出力を抑えたいなら `:silent` を前置（`:silent g/pat/normal! @a`）。事前に 1 行でテスト推奨

## See also

- 📖 Related: [substitute], [macros], [regex-patterns]
- 📚 `:h :global`, `:h :vglobal`, `:h :g//`
