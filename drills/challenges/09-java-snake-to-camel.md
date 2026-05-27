---
id: challenge-09-java-snake-to-camel
tier: 4
type: edit
target_time_ms: 60000
template:
  - kind: fixed
    lines:
      - 'public int calculate(int num_items, int unit_price) {'
      - '    int total_cost = num_items * unit_price;'
      - '    int tax_amount = total_cost / 10;'
      - '    return total_cost + tax_amount;'
      - '}'
goal:
  type: text_equals
  content: |
    public int calculate(int numItems, int unitPrice) {
        int totalCost = numItems * unitPrice;
        int taxAmount = totalCost / 10;
        return totalCost + taxAmount;
    }
solution_keys:
  - ':%s/num_items/numItems/g<Enter>:%s/unit_price/unitPrice/g<Enter>:%s/total_cost/totalCost/g<Enter>:%s/tax_amount/taxAmount/g<Enter>'
i18n:
  en:
    title: "Java snake_case to camelCase"
    description: "Convert four snake_case identifiers to camelCase throughout the method."
    steps:
      - 'Rename "num_items" to "numItems" (2 occurrences)'
      - 'Rename "unit_price" to "unitPrice" (2 occurrences)'
      - 'Rename "total_cost" to "totalCost" (3 occurrences)'
      - 'Rename "tax_amount" to "taxAmount" (2 occurrences)'
  ja:
    title: "Java snake_case → camelCase 変換"
    description: "4 つの snake_case 識別子をメソッド全体で camelCase に変換せよ。"
    steps:
      - '"num_items" を "numItems" にリネーム（2 箇所）'
      - '"unit_price" を "unitPrice" にリネーム（2 箇所）'
      - '"total_cost" を "totalCost" にリネーム（3 箇所）'
      - '"tax_amount" を "taxAmount" にリネーム（2 箇所）'
---
