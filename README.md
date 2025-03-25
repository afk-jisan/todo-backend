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
Replace `ENV` with **development** for testing and **production** for deployment.

### 4. Set Up Database
Run migrations:
```sh
npm run migrate
npm run seed
```
You can also run seed if you want to input dummy datas. You can configure this as you need.
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


---

## **MVC Architecture used in This Project**
The **MVC (Model-View-Controller)** pattern separates concerns in a web application, making it more modular and maintainable. My **Todo API backend** follows **MVC** as:

1. **Model (`models/`)**  
   - Handles data and database operations.
   - Example: `userModel.js` and `todoModel.js` interact with the database to fetch, create, update, or delete records.

2. **Controller (`controllers/`)**  
   - Contains business logic and handles requests from routes.
   - Example: `authController.js` processes user authentication, while `todoController.js` manages todo-related logic.

3. **View (N/A in this API backend)**  
   - Since this is a backend API, there is no traditional "View" layer.
   - The API responds with **JSON** instead of rendering HTML.

4. **Routes (`routes/`)**  
   - Defines endpoints for API interactions.
   - Example: `authRoutes.js` and `todoRoutes.js` define routes for authentication and todo operations, respectively.

5. **Middleware (`middleware/`)**  
   - Handles request processing before reaching controllers.
   - Example: `authMiddleware.js` verifies JWT tokens before allowing access to protected routes.

---

## **Project Structure**
```
Todo-Backend
├── README.md
├── api
│   └── index.js
├── api-test
│   ├── auth
│   │   ├── add-new-user.http
│   │   └── login-user.http
│   ├── delete-a-todo.http
│   ├── get-all-todos.http
│   ├── post-new-todo.http
│   └── update-a-todo.http
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   └── todoController.js
├── db
│   ├── schema.sql
│   └── seed.sql
├── middleware
│   └── authMiddleware.js
├── models
│   ├── todoModel.js
│   └── userModel.js
├── package-lock.json
├── package.json
├── routes
│   ├── authRoutes.js
│   └── todoRoutes.js
├── scripts
│   ├── migration.js
│   └── seed.js
├── server.js
└── vercel.json
```
---
## **API Testing with REST Client**  
This project includes `.http` files for testing API endpoints using the **REST Client** extension in **VS Code**.  

### **Setup**  
- Install [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).  
- Open any `.http` file and click **"Send Request"** to test an API endpoint.  

### **Test Files (`api-test/`)**  
```
├── auth/
│   ├── add-new-user.http   # Register user
│   ├── login-user.http     # Login user
├── delete-a-todo.http      # Delete todo
├── get-all-todos.http      # Get todos
├── post-new-todo.http      # Create todo
├── update-a-todo.http      # Update todo
```
This eliminates the need for **Postman**, making testing easier in VS Code. You can also use **swagger** if you want to test the API.




---

## **Acknowledgments**  

This project was developed as part of an assignment for the **ACS Bootcamp**. Special thanks to the bootcamp for providing structured learning and guidance.  

Inspired by the original assignment: [Todo App Backend](https://github.com/T-h-e-A-I/todo-app-backend)  

---