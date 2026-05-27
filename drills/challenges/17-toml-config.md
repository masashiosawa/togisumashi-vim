---
id: challenge-17-toml-config
tier: 4
type: edit
target_time_ms: 75000
template:
  - kind: fixed
    lines:
      - '[server]'
      - 'host = "127.0.0.1"'
      - 'port = 8080'
      - 'workers = 2'
      - ''
      - '[database]'
      - 'url = "sqlite://app.db"'
      - 'pool_size = 5'
      - 'timeout = 10'
goal:
  type: text_equals
  content: |
    [server]
    host = "0.0.0.0"
    port = 443
    workers = 8

    [database]
    url = "postgres://db.example.com/app"
    pool_size = 20
    timeout = 30
solution_keys:
  - '/127.0.0.1<Enter>ci"0.0.0.0<Esc>/8080<Enter>cw443<Esc>/workers<Enter>f2r8/sqlite<Enter>ci"postgres://db.example.com/app<Esc>/pool_size<Enter>f5cw20<Esc>/timeout<Enter>f1cw30<Esc>'
i18n:
  en:
    title: "TOML Config Update"
    description: "Update server and database settings in this TOML configuration."
    steps:
      - 'Change host from "127.0.0.1" to "0.0.0.0"'
      - 'Change port from 8080 to 443'
      - 'Change workers from 2 to 8'
      - 'Change database url to "postgres://db.example.com/app"'
      - 'Change pool_size from 5 to 20'
      - 'Change timeout from 10 to 30'
  ja:
    title: "TOML 設定の更新"
    description: "TOML 設定ファイルのサーバーとデータベース設定を更新せよ。"
    steps:
      - 'host を "127.0.0.1" から "0.0.0.0" に変更'
      - 'port を 8080 から 443 に変更'
      - 'workers を 2 から 8 に変更'
      - 'database url を "postgres://db.example.com/app" に変更'
      - 'pool_size を 5 から 20 に変更'
      - 'timeout を 10 から 30 に変更'
---
