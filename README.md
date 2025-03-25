# Todo API Backend

This is a simple Todo API built with Express.js, supporting user authentication, todo management, and Swagger documentation.

## Features
- User authentication (register, login, logout)
- CRUD operations for todos
- JWT-based authentication
- Swagger API documentation

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [PostgreSQL](https://www.postgresql.org/)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/afk-jisan/todo-backend.git
cd todo-backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the project root and add the following:
```
# Server Configuration
PORT=3001

# Database Configuration
DB_USER=root
DB_HOST=localhost
DB_PASSWORD=yourpassword
DB_NAME=postgres
DB_PORT=6543
NODE_ENV=ENV

# JWT Authentication
JWT_SECRET=your_jwt_secret_key
```
Replace `root`, `localhost`, `yourpassword` and `postgres` with your actual PostgreSQL credentials.
Replace `your_jwt_secret_key` with anything you want.
Replace `ENV` with development for testing and production for deployment.

### 4. Set Up Database
Run migrations and seed data:
```sh
npm run migrate
npm run seed
```

### 5. Start the Server
#### Development Mode (with auto-restart)
```sh
npm run dev
```
#### Production Mode
```sh
npm start
```

### 6. API Documentation
Once the server is running, access Swagger docs at:
```
http://localhost:3000/api-docs
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/logout` - Logout (handled client-side)

### Todos (Authenticated Users Only)
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
