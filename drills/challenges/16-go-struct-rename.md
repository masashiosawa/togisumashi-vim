---
id: challenge-16-go-struct-rename
tier: 4
type: edit
target_time_ms: 75000
template:
  - kind: fixed
    lines:
      - 'type UserRecord struct {'
      - '    uid      int'
      - '    uname    string'
      - '    pwd      string'
      - '    grp      string'
      - '    isActive bool'
      - '}'
      - ''
      - 'func newRecord(uid int, uname string) UserRecord {'
      - '    return UserRecord{uid: uid, uname: uname, isActive: true}'
      - '}'
goal:
  type: text_equals
  content: |
    type User struct {
        id       int
        username string
        password string
        group    string
        isActive bool
    }

    func newUser(id int, username string) User {
        return User{id: id, username: username, isActive: true}
    }
solution_keys:
  - '/UserRecord<Enter>ciwUser<Esc>n.n./uid<Enter>ciwid<Esc>n.n./uname<Enter>ciwusername<Esc>n./pwd<Enter>ciwpassword<Esc>/grp<Enter>ciwgroup<Esc>/newRecord<Enter>ciwnewUser<Esc>'
i18n:
  en:
    title: "Go Struct Rename"
    description: "Rename the struct type and clean up all field names."
    steps:
      - 'Rename "UserRecord" to "User" (3 occurrences)'
      - 'Rename field "uid" to "id" (3 occurrences)'
      - 'Rename field "uname" to "username" (3 occurrences)'
      - 'Rename field "pwd" to "password"'
      - 'Rename field "grp" to "group"'
      - 'Rename function "newRecord" to "newUser"'
  ja:
    title: "Go 構造体のリネーム"
    description: "構造体型名とフィールド名をすべてリネームせよ。"
    steps:
      - '"UserRecord" を "User" にリネーム（3 箇所）'
      - 'フィールド "uid" を "id" にリネーム（3 箇所）'
      - 'フィールド "uname" を "username" にリネーム（3 箇所）'
      - 'フィールド "pwd" を "password" にリネーム'
      - 'フィールド "grp" を "group" にリネーム'
      - '関数 "newRecord" を "newUser" にリネーム'
---
