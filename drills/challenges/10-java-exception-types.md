---
id: challenge-10-java-exception-types
tier: 4
type: edit
target_time_ms: 45000
template:
  - kind: fixed
    lines:
      - 'public class OrderValidator {'
      - '    public void validate(Order order) throws Exception {'
      - '        if (order == null) {'
      - '            throw new Exception("null order");'
      - '        }'
      - '        if (order.items == null) {'
      - '            throw new Exception("null items");'
      - '        }'
      - '        if (order.total < 0) {'
      - '            throw new Exception("negative total");'
      - '        }'
      - '    }'
      - '}'
goal:
  type: text_equals
  content: |
    public class OrderValidator {
        public void validate(Order order) throws IllegalArgumentException {
            if (order == null) {
                throw new IllegalArgumentException("null order");
            }
            if (order.items == null) {
                throw new IllegalArgumentException("null items");
            }
            if (order.total < 0) {
                throw new IllegalArgumentException("negative total");
            }
        }
    }
solution_keys:
  - ':%s/Exception/IllegalArgumentException/g<Enter>'
i18n:
  en:
    title: "Java Exception Type Refactor"
    description: "Replace all bare Exception uses with IllegalArgumentException."
    steps:
      - 'Change "throws Exception" to "throws IllegalArgumentException"'
      - 'Change all "new Exception(...)" to "new IllegalArgumentException(...)" (3 occurrences)'
  ja:
    title: "Java 例外型のリファクタ"
    description: "すべての Exception を IllegalArgumentException に置き換えよ。"
    steps:
      - '"throws Exception" を "throws IllegalArgumentException" に変更'
      - '"new Exception(...)" を "new IllegalArgumentException(...)" に変更（3 箇所）'
---
