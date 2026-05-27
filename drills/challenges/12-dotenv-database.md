---
id: challenge-12-dotenv-database
tier: 4
type: edit
target_time_ms: 60000
template:
  - kind: fixed
    lines:
      - 'DB_HOST=127.0.0.1'
      - 'DB_PORT=5432'
      - 'DB_NAME=myapp_dev'
      - 'DB_USER=root'
      - 'DB_PASS=password123'
      - 'DB_POOL=5'
goal:
  type: text_equals
  content: |
    DB_HOST=db.prod.example.com
    DB_PORT=5432
    DB_NAME=myapp_prod
    DB_USER=appuser
    DB_PASS=s3cur3P@ssw0rd
    DB_POOL=20
solution_keys:
  - '/127.0.0.1<Enter>c$db.prod.example.com<Esc>/_dev<Enter>cw_prod<Esc>/=root<Enter>lciwappuser<Esc>/=password123<Enter>lc$s3cur3P@ssw0rd<Esc>/DB_POOL<Enter>f5cw20<Esc>'
i18n:
  en:
    title: ".env Database Config"
    description: "Update the database connection settings for production."
    steps:
      - 'Change DB_HOST to "db.prod.example.com"'
      - 'Change DB_NAME from "myapp_dev" to "myapp_prod"'
      - 'Change DB_USER from "root" to "appuser"'
      - 'Change DB_PASS to "s3cur3P@ssw0rd"'
      - 'Change DB_POOL from 5 to 20'
  ja:
    title: ".env データベース設定の更新"
    description: "本番用のデータベース接続設定に書き換えよ。"
    steps:
      - 'DB_HOST を "db.prod.example.com" に変更'
      - 'DB_NAME を "myapp_dev" から "myapp_prod" に変更'
      - 'DB_USER を "root" から "appuser" に変更'
      - 'DB_PASS を "s3cur3P@ssw0rd" に変更'
      - 'DB_POOL を 5 から 20 に変更'
---
