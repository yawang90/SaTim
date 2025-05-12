# SaTim Projekt
## 0. Quick Start
### Start Frontend
1. npm install in satim-app client folder
2. npm run start

### Start Backend
1. npm install in satim-app server folder
2. npm run start

### Browser view
1. Local development configured at: http://localhost:3000/

## 1. Architektur
### Frontend: React

### Backend: Node.js/Express (hosted on Render)
#### File structure
1. config
2. controllers - Handles incoming HTTP requests and sends responses
3. db - PostgreSQL connection, db setup
4. routes
5. services - Contains core business logic, reusable functions, DB calls
6. validation

### Relational DB: PostgreSQL (for users, admin, auth)

### Graph DB: Neo4j 

### Graph DB Host: Aura 

### Genereller Host: Render

## 2. Dokumentation