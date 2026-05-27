---
id: challenge-14-dotenv-redis
tier: 4
type: edit
target_time_ms: 75000
template:
  - kind: fixed
    lines:
      - 'REDIS_HOST=localhost'
      - 'REDIS_PORT=6379'
      - 'REDIS_DB=0'
      - 'REDIS_PASSWORD='
      - 'REDIS_TTL=3600'
      - 'REDIS_MAX_CONN=10'
goal:
  type: text_equals
  content: |
    REDIS_HOST=redis.prod.example.com
    REDIS_PORT=6380
    REDIS_DB=1
    REDIS_PASSWORD=r3d1sP@ss
    REDIS_TTL=86400
    REDIS_MAX_CONN=50
solution_keys:
  - '/=localhost<Enter>lc$redis.prod.example.com<Esc>/6379<Enter>cw6380<Esc>/REDIS_DB=<Enter>f0r1/REDIS_PASSWORD<Enter>Ar3d1sP@ss<Esc>/3600<Enter>cw86400<Esc>/MAX_CONN<Enter>f1cw50<Esc>'
i18n:
  en:
    title: ".env Redis Config"
    description: "Update Redis connection settings and enable authentication for production."
    steps:
      - 'Change REDIS_HOST to "redis.prod.example.com"'
      - 'Change REDIS_PORT from 6379 to 6380'
      - 'Change REDIS_DB from 0 to 1'
      - 'Set REDIS_PASSWORD to "r3d1sP@ss" (currently empty)'
      - 'Change REDIS_TTL from 3600 to 86400'
      - 'Change REDIS_MAX_CONN from 10 to 50'
  ja:
    title: ".env Redis 設定の更新"
    description: "本番用に Redis 接続設定と認証を設定せよ。"
    steps:
      - 'REDIS_HOST を "redis.prod.example.com" に変更'
      - 'REDIS_PORT を 6379 から 6380 に変更'
      - 'REDIS_DB を 0 から 1 に変更'
      - 'REDIS_PASSWORD を "r3d1sP@ss" に設定（現在空）'
      - 'REDIS_TTL を 3600 から 86400 に変更'
      - 'REDIS_MAX_CONN を 10 から 50 に変更'
---
