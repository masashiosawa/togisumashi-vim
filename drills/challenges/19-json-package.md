---
id: challenge-19-json-package
tier: 4
type: edit
target_time_ms: 75000
template:
  - kind: fixed
    lines:
      - '{'
      - '  "name": "my-app",'
      - '  "version": "1.0.0",'
      - '  "scripts": {'
      - '    "start": "node server.js",'
      - '    "dev": "nodemon server.js",'
      - '    "test": "jest",'
      - '    "build": "webpack"'
      - '  }'
      - '}'
goal:
  type: text_equals
  content: |
    {
      "name": "my-app",
      "version": "2.0.0",
      "scripts": {
        "start": "node dist/server.js",
        "dev": "ts-node src/server.ts",
        "test": "vitest",
        "build": "tsc"
      }
    }
solution_keys:
  - '/1.0.0<Enter>ci"2.0.0<Esc>/node server<Enter>ci"node dist/server.js<Esc>/nodemon<Enter>ci"ts-node src/server.ts<Esc>/jest<Enter>ci"vitest<Esc>/webpack<Enter>ci"tsc<Esc>'
i18n:
  en:
    title: "package.json Scripts Update"
    description: "Bump the version and migrate all scripts to a TypeScript-based toolchain."
    steps:
      - 'Change version from "1.0.0" to "2.0.0"'
      - 'Change start script to "node dist/server.js"'
      - 'Change dev script to "ts-node src/server.ts"'
      - 'Change test runner from "jest" to "vitest"'
      - 'Change build tool from "webpack" to "tsc"'
  ja:
    title: "package.json スクリプトの更新"
    description: "バージョンを上げ、全スクリプトを TypeScript ベースのツールチェーンに移行せよ。"
    steps:
      - 'version を "1.0.0" から "2.0.0" に変更'
      - 'start スクリプトを "node dist/server.js" に変更'
      - 'dev スクリプトを "ts-node src/server.ts" に変更'
      - 'テストランナーを "jest" から "vitest" に変更'
      - 'ビルドツールを "webpack" から "tsc" に変更'
---
