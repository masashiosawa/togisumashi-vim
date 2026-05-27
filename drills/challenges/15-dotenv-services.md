---
id: challenge-15-dotenv-services
tier: 4
type: edit
target_time_ms: 90000
template:
  - kind: fixed
    lines:
      - 'MAIL_HOST=localhost'
      - 'MAIL_PORT=1025'
      - 'MAIL_FROM=noreply@localhost'
      - ''
      - 'STORAGE_DRIVER=local'
      - 'STORAGE_BUCKET=dev-bucket'
      - ''
      - 'QUEUE_DRIVER=sync'
      - 'QUEUE_NAME=default'
goal:
  type: text_equals
  content: |
    MAIL_HOST=smtp.sendgrid.net
    MAIL_PORT=587
    MAIL_FROM=noreply@example.com

    STORAGE_DRIVER=s3
    STORAGE_BUCKET=prod-bucket

    QUEUE_DRIVER=redis
    QUEUE_NAME=production
solution_keys:
  - '/=localhost<Enter>lc$smtp.sendgrid.net<Esc>/1025<Enter>cw587<Esc>/@localhost<Enter>lc$example.com<Esc>/=local<Enter>lciws3<Esc>/dev-bucket<Enter>ciwprod<Esc>/sync<Enter>ciwredis<Esc>/default<Enter>ciwproduction<Esc>'
i18n:
  en:
    title: ".env Multi-Service Config"
    description: "Update mail, storage, and queue settings for production."
    steps:
      - 'Change MAIL_HOST to "smtp.sendgrid.net"'
      - 'Change MAIL_PORT from 1025 to 587'
      - 'Change MAIL_FROM domain from "localhost" to "example.com"'
      - 'Change STORAGE_DRIVER from "local" to "s3"'
      - 'Change STORAGE_BUCKET from "dev-bucket" to "prod-bucket"'
      - 'Change QUEUE_DRIVER from "sync" to "redis"'
      - 'Change QUEUE_NAME from "default" to "production"'
  ja:
    title: ".env マルチサービス設定"
    description: "メール・ストレージ・キューの設定を本番用に更新せよ。"
    steps:
      - 'MAIL_HOST を "smtp.sendgrid.net" に変更'
      - 'MAIL_PORT を 1025 から 587 に変更'
      - 'MAIL_FROM のドメインを "localhost" から "example.com" に変更'
      - 'STORAGE_DRIVER を "local" から "s3" に変更'
      - 'STORAGE_BUCKET を "dev-bucket" から "prod-bucket" に変更'
      - 'QUEUE_DRIVER を "sync" から "redis" に変更'
      - 'QUEUE_NAME を "default" から "production" に変更'
---
