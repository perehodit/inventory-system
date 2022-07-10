# System design

## Requirements

- import `xlsx` files (exceljs);
- merge tables with new `xlsx` files (exceljs);
- filtering and searching by table (client or server?);
- generating reports in docx (reportjs);

Database structure:

```mermaid
erDiagram
  User {
    string id pk "uuid"
    string name
    string surname
    string email "unique"
    string password
  }

  Sheet {
    string id pk "uuid"
    string authorId fk "author id"
    string name
    string description
    jsonObject metadata "unique, name, count columns"
    jsonArray columns
    jsonArray rows
  }

  User |o--o{ Sheet : author
```
