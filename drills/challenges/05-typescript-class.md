---
id: challenge-05-typescript-class
tier: 4
type: edit
target_time_ms: 75000
template:
  - kind: fixed
    lines:
      - 'class DataStore {'
      - '  private items: string[] = [];'
      - '  private capacity = 50;'
      - ''
      - '  add(item: string): boolean {'
      - '    if (this.items.length >= this.capacity) return false;'
      - '    this.items.push(item);'
      - '    return true;'
      - '  }'
      - ''
      - '  remove(item: string): boolean {'
      - '    const idx = this.items.indexOf(item);'
      - '    if (idx === -1) return false;'
      - '    this.items.splice(idx, 1);'
      - '    return true;'
      - '  }'
      - ''
      - '  size(): number {'
      - '    return this.items.length;'
      - '  }'
      - '}'
goal:
  type: text_equals
  content: |
    class DataStore {
      private items: string[] = [];
      private capacity = 100;

      add(item: string): boolean {
        if (this.items.length >= this.capacity) return false;
        this.items.push(item);
        return true;
      }

      delete(item: string): boolean {
        const index = this.items.indexOf(item);
        if (index === -1) return false;
        this.items.splice(index, 1);
        return true;
      }

      count(): number {
        return this.items.length;
      }
    }
solution_keys:
  - '/50<Enter>cw100<Esc>/remove<Enter>ciwdelete<Esc>/idx<Enter>ciwindex<Esc>n.n./ size<Enter>wciwcount<Esc>'
i18n:
  en:
    title: "TypeScript Class Refactor"
    description: "Update capacity, rename a method, and clean up identifiers."
    steps:
      - 'Change capacity from 50 to 100'
      - 'Rename method "remove" to "delete"'
      - 'Rename variable "idx" to "index" (3 occurrences)'
      - 'Rename method "size" to "count"'
  ja:
    title: "TypeScript クラスのリファクタ"
    description: "容量変更、メソッドリネーム、識別子の整理を行え。"
    steps:
      - 'capacity を 50 から 100 に変更'
      - 'メソッド "remove" を "delete" にリネーム'
      - '変数 "idx" を "index" にリネーム（3 箇所）'
      - 'メソッド "size" を "count" にリネーム'
---
