---
id: challenge-06-java-constants
tier: 4
type: edit
target_time_ms: 60000
template:
  - kind: fixed
    lines:
      - 'public class AppConfig {'
      - '    public static final int MAX_RETRY = 3;'
      - '    public static final long TIMEOUT_MS = 1000;'
      - '    public static final int POOL_SIZE = 5;'
      - '    public static final boolean DEBUG = true;'
      - '    public static final String ENV = "development";'
      - '}'
goal:
  type: text_equals
  content: |
    public class AppConfig {
        public static final int MAX_RETRY = 5;
        public static final long TIMEOUT_MS = 5000;
        public static final int POOL_SIZE = 20;
        public static final boolean DEBUG = false;
        public static final String ENV = "production";
    }
solution_keys:
  - '/MAX_RETRY<Enter>f3r5/TIMEOUT_MS<Enter>f1cw5000<Esc>/POOL_SIZE<Enter>f5cw20<Esc>/true<Enter>ciwfalse<Esc>/development<Enter>ciwproduction<Esc>'
i18n:
  en:
    title: "Java Constants Update"
    description: "Update five static constants for production readiness."
    steps:
      - 'Change MAX_RETRY from 3 to 5'
      - 'Change TIMEOUT_MS from 1000 to 5000'
      - 'Change POOL_SIZE from 5 to 20'
      - 'Change DEBUG from true to false'
      - 'Change ENV from "development" to "production"'
  ja:
    title: "Java 定数を本番用に更新"
    description: "5 つの static 定数を本番環境向けに書き換えよ。"
    steps:
      - 'MAX_RETRY を 3 から 5 に変更'
      - 'TIMEOUT_MS を 1000 から 5000 に変更'
      - 'POOL_SIZE を 5 から 20 に変更'
      - 'DEBUG を true から false に変更'
      - 'ENV を "development" から "production" に変更'
---
