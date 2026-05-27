---
id: challenge-13-dotenv-api-config
tier: 4
type: edit
target_time_ms: 90000
template:
  - kind: fixed
    lines:
      - 'API_HOST=localhost'
      - 'API_PORT=8080'
      - 'API_VERSION=v1'
      - 'API_TIMEOUT=5000'
      - 'API_RATE_LIMIT=100'
      - 'CORS_ORIGIN=http://localhost:3000'
goal:
  type: text_equals
  content: |
    API_HOST=api.example.com
    API_PORT=443
    API_VERSION=v2
    API_TIMEOUT=10000
    API_RATE_LIMIT=1000
    CORS_ORIGIN=https://app.example.com
solution_keys:
  - '/=localhost<Enter>lciwapi.example.com<Esc>/=8080<Enter>lcw443<Esc>/=v1<Enter>wlr2/RATE_LIMIT=<Enter>wcw1000<Esc>/TIMEOUT=<Enter>wcw10000<Esc>/CORS_ORIGIN=<Enter>wc$https://app.example.com<Esc>'
i18n:
  en:
    title: ".env API Config Update"
    description: "Update all API and CORS settings for the production environment."
    steps:
      - 'Change API_HOST from "localhost" to "api.example.com"'
      - 'Change API_PORT from 8080 to 443'
      - 'Change API_VERSION from "v1" to "v2"'
      - 'Change API_RATE_LIMIT from 100 to 1000'
      - 'Change API_TIMEOUT from 5000 to 10000'
      - 'Change CORS_ORIGIN to "https://app.example.com"'
  ja:
    title: ".env API 設定の更新"
    description: "本番環境向けに API と CORS の設定をすべて書き換えよ。"
    steps:
      - 'API_HOST を "localhost" から "api.example.com" に変更'
      - 'API_PORT を 8080 から 443 に変更'
      - 'API_VERSION を "v1" から "v2" に変更'
      - 'API_RATE_LIMIT を 100 から 1000 に変更'
      - 'API_TIMEOUT を 5000 から 10000 に変更'
      - 'CORS_ORIGIN を "https://app.example.com" に変更'
---
