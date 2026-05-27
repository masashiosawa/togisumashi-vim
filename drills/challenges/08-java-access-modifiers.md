---
id: challenge-08-java-access-modifiers
tier: 4
type: edit
target_time_ms: 45000
template:
  - kind: fixed
    lines:
      - 'class DatabaseConfig {'
      - '    public String host = "localhost";'
      - '    public int port = 5432;'
      - '    public String user = "admin";'
      - '    public String pass = "secret";'
      - '    public int maxPool = 10;'
      - '}'
goal:
  type: text_equals
  content: |
    class DatabaseConfig {
        private String host = "localhost";
        private int port = 5432;
        private String user = "admin";
        private String pass = "secret";
        private int maxPool = 10;
    }
solution_keys:
  - '/public<Enter>ciwprivate<Esc>n.n.n.n.'
i18n:
  en:
    title: "Java Access Modifiers"
    description: "Change all field access modifiers from public to private."
    steps:
      - 'Change "public" to "private" for all 5 fields'
  ja:
    title: "Java アクセス修飾子の変更"
    description: "全フィールドのアクセス修飾子を public から private に変更せよ。"
    steps:
      - '5 つのフィールドの "public" を "private" にすべて変更'
---
