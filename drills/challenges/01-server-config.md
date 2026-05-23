---
id: challenge-01-server-config
tier: 4
type: edit
target_time_ms: 45000
template:
  - kind: fixed
    lines:
      - 'const serverConfig = {'
      - '  host: "localhost",'
      - '  port: 3000,'
      - '  maxConnections: 10,'
      - '  timeout: 30,'
      - '  debug: true,'
      - '  logLevel: "info",'
      - '};'
goal:
  type: text_equals
  content: |
    const serverConfig = {
      host: "0.0.0.0",
      port: 8080,
      maxConnections: 100,
      timeout: 30,
      debug: false,
      logLevel: "warn",
    };
solution_keys:
  - '/localhost<Enter>ci"0.0.0.0<Esc>/3000<Enter>cw8080<Esc>/: 10<Enter>wcw100<Esc>/true<Enter>ciwfalse<Esc>/info<Enter>ci"warn<Esc>'
i18n:
  en:
    title: "Server Config Update"
    description: "Prepare this config for production deployment."
    steps:
      - 'Change host from "localhost" to "0.0.0.0"'
      - 'Change port from 3000 to 8080'
      - 'Change maxConnections from 10 to 100'
      - 'Change debug from true to false'
      - 'Change logLevel from "info" to "warn"'
  ja:
    title: "サーバー設定を本番用に更新"
    description: "このコンフィグを本番デプロイ用に更新せよ。"
    steps:
      - 'host を "localhost" から "0.0.0.0" に変更'
      - 'port を 3000 から 8080 に変更'
      - 'maxConnections を 10 から 100 に変更'
      - 'debug を true から false に変更'
      - 'logLevel を "info" から "warn" に変更'
---
