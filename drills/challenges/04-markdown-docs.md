---
id: challenge-04-markdown-docs
tier: 4
type: edit
target_time_ms: 60000
template:
  - kind: fixed
    lines:
      - '# Getting Started'
      - ''
      - 'This guide explains how to install and configure the project.'
      - ''
      - '## Requirements'
      - ''
      - '- Node 18 or higher'
      - '- npm 8 or higher'
      - '- PostgreSQL 14'
      - ''
      - '## Installation'
      - ''
      - 'Run the following command to install dependencies:'
      - ''
      - '    npm install'
      - ''
      - 'Then copy the example env file:'
      - ''
      - '    cp .env.example .env'
goal:
  type: text_equals
  content: |
    # Quick Start

    This guide explains how to install and configure the project.

    ## Prerequisites

    - Node 20 or higher
    - pnpm 8 or higher
    - PostgreSQL 15

    ## Installation

    Run the following command to install dependencies:

        pnpm install

    Then copy the example env file:

        cp .env.example .env
solution_keys:
  - '/Getting<Enter>c2wQuick Start<Esc>/Requirements<Enter>ciwPrerequisites<Esc>/18<Enter>cw20<Esc>/npm 8<Enter>cwpnpm<Esc>/14<Enter>cw15<Esc>/npm install<Enter>cwpnpm<Esc>'
i18n:
  en:
    title: "Documentation Update"
    description: "Modernize this README for the new tech stack."
    steps:
      - 'Change heading "Getting Started" to "Quick Start"'
      - 'Change "Requirements" to "Prerequisites"'
      - 'Change Node version from 18 to 20'
      - 'Change "npm" to "pnpm" (2 occurrences)'
      - 'Change PostgreSQL version from 14 to 15'
  ja:
    title: "ドキュメント更新"
    description: "このREADMEを新しい技術スタック向けに更新せよ。"
    steps:
      - '"Getting Started" を "Quick Start" に変更'
      - '"Requirements" を "Prerequisites" に変更'
      - 'Node のバージョンを 18 から 20 に変更'
      - '"npm" を "pnpm" に変更（2 箇所）'
      - 'PostgreSQL のバージョンを 14 から 15 に変更'
---
