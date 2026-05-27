---
id: challenge-20-dockerfile-update
tier: 4
type: edit
target_time_ms: 50000
template:
  - kind: fixed
    lines:
      - 'FROM node:16-alpine'
      - 'WORKDIR /app'
      - 'COPY package.json .'
      - 'RUN npm install'
      - 'COPY . .'
      - 'RUN npm run build'
      - 'EXPOSE 3000'
      - 'CMD ["node", "server.js"]'
goal:
  type: text_equals
  content: |
    FROM node:20-alpine
    WORKDIR /app
    COPY package.json .
    RUN npm ci
    COPY . .
    RUN npm run build
    EXPOSE 8080
    CMD ["node", "dist/server.js"]
solution_keys:
  - '/node:16<Enter>f1cw20<Esc>/install<Enter>ciwci<Esc>/3000<Enter>cw8080<Esc>/server.js<Enter>ci"dist/server.js<Esc>'
i18n:
  en:
    title: "Dockerfile Modernize"
    description: "Update the Node.js version, use npm ci, and fix the entry point."
    steps:
      - 'Change Node.js version from 16 to 20'
      - 'Change "npm install" to "npm ci"'
      - 'Change EXPOSE port from 3000 to 8080'
      - 'Change CMD entry point from "server.js" to "dist/server.js"'
  ja:
    title: "Dockerfile の近代化"
    description: "Node.js バージョンを上げ、npm ci を使い、エントリポイントを修正せよ。"
    steps:
      - 'Node.js バージョンを 16 から 20 に変更'
      - '"npm install" を "npm ci" に変更'
      - 'EXPOSE ポートを 3000 から 8080 に変更'
      - 'CMD のエントリポイントを "server.js" から "dist/server.js" に変更'
---
