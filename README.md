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
#### File structure
1. components
2. contexts
3. layouts
4. locales 
5. pages 
6. routes 
7. services 
8. styles

#### General
Frontend uses Vite for building.

### Backend: Node.js/Express (hosted on Render)
#### File structure
1. config
2. controllers - Handles incoming HTTP requests and sends responses
3. db - PostgreSQL connection, db setup
4. routes
5. services - Contains core business logic, reusable functions, DB calls
6. validation
#### General
Backend uses Prisma for db schema access and migration.

### Relational DB: PostgreSQL (for users, admin, auth)

### Host: Render
Secrets are stored on Render directly (JWT pw, DB URL, etc.)