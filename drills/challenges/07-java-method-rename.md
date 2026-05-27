---
id: challenge-07-java-method-rename
tier: 4
type: edit
target_time_ms: 45000
template:
  - kind: fixed
    lines:
      - 'public class UserService {'
      - '    public User fetchUser(int id) {'
      - '        return repo.findById(id);'
      - '    }'
      - ''
      - '    public List<User> fetchAllUsers() {'
      - '        return repo.findAll();'
      - '    }'
      - ''
      - '    public boolean removeUser(int id) {'
      - '        return repo.deleteById(id);'
      - '    }'
      - '}'
goal:
  type: text_equals
  content: |
    public class UserService {
        public User getUser(int id) {
            return repo.findById(id);
        }

        public List<User> getAllUsers() {
            return repo.findAll();
        }

        public boolean deleteUser(int id) {
            return repo.deleteById(id);
        }
    }
solution_keys:
  - '/fetchUser<Enter>ciwgetUser<Esc>/fetchAllUsers<Enter>ciwgetAllUsers<Esc>/removeUser<Enter>ciwdeleteUser<Esc>'
i18n:
  en:
    title: "Java Method Rename"
    description: "Rename three public methods to follow standard naming conventions."
    steps:
      - 'Rename "fetchUser" to "getUser"'
      - 'Rename "fetchAllUsers" to "getAllUsers"'
      - 'Rename "removeUser" to "deleteUser"'
  ja:
    title: "Java メソッドのリネーム"
    description: "3 つの public メソッドを標準的な命名規則にリネームせよ。"
    steps:
      - '"fetchUser" を "getUser" にリネーム'
      - '"fetchAllUsers" を "getAllUsers" にリネーム'
      - '"removeUser" を "deleteUser" にリネーム'
---
