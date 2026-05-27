---
id: challenge-11-dotenv-dev-to-prod
tier: 4
type: edit
target_time_ms: 75000
template:
  - kind: fixed
    lines:
      - 'NODE_ENV=development'
      - 'DEBUG=true'
      - 'LOG_LEVEL=debug'
      - 'API_BASE_URL=http://localhost:3000'
      - 'DB_HOST=localhost'
goal:
  type: text_equals
  content: |
    NODE_ENV=production
    DEBUG=false
    LOG_LEVEL=error
    API_BASE_URL=https://api.example.com
    DB_HOST=db.example.com
solution_keys:
  - '/development<Enter>ciwproduction<Esc>/=true<Enter>lciwfalse<Esc>/=debug<Enter>lciwerror<Esc>/localhost:3000<Enter>c$https://api.example.com<Esc>/DB_HOST<Enter>f=lciwdb.example.com<Esc>'
i18n:
  en:
    title: ".env Dev to Production"
    description: "Switch all environment variables from development to production values."
    steps:
      - 'Change NODE_ENV from "development" to "production"'
      - 'Change DEBUG from "true" to "false"'
      - 'Change LOG_LEVEL from "debug" to "error"'
      - 'Change API_BASE_URL to "https://api.example.com"'
      - 'Change DB_HOST from "localhost" to "db.example.com"'
  ja:
    title: ".env 開発→本番切り替え"
    description: "全環境変数を開発用から本番用の値に切り替えよ。"
    steps:
      - 'NODE_ENV を "development" から "production" に変更'
      - 'DEBUG を "true" から "false" に変更'
      - 'LOG_LEVEL を "debug" から "error" に変更'
      - 'API_BASE_URL を "https://api.example.com" に変更'
      - 'DB_HOST を "localhost" から "db.example.com" に変更'
---
