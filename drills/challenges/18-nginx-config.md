---
id: challenge-18-nginx-config
tier: 4
type: edit
target_time_ms: 40000
template:
  - kind: fixed
    lines:
      - 'server {'
      - '    listen 80;'
      - '    server_name localhost;'
      - '    root /var/www/html;'
      - '    index index.html;'
      - ''
      - '    location / {'
      - '        try_files $uri $uri/ =404;'
      - '    }'
      - '}'
goal:
  type: text_equals
  content: |
    server {
        listen 443 ssl;
        server_name example.com;
        root /var/www/app;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
solution_keys:
  - '/80<Enter>cw443 ssl<Esc>/localhost<Enter>ciwexample.com<Esc>/html<Enter>ciwapp<Esc>'
i18n:
  en:
    title: "Nginx Config Update"
    description: "Update this Nginx server block for HTTPS production hosting."
    steps:
      - 'Change listen port from "80" to "443 ssl"'
      - 'Change server_name from "localhost" to "example.com"'
      - 'Change root path from "/var/www/html" to "/var/www/app"'
  ja:
    title: "Nginx 設定の更新"
    description: "Nginx の server ブロックを HTTPS 本番ホスティング用に更新せよ。"
    steps:
      - 'listen ポートを "80" から "443 ssl" に変更'
      - 'server_name を "localhost" から "example.com" に変更'
      - 'root パスを "/var/www/html" から "/var/www/app" に変更'
---
