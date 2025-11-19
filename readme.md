Todo App with JWT Authentication & Role-Based Access
Requirements:
• Build REST APIs using Node.js (Express) with MySQL or MongoDB.
• Implement user registration and login endpoints.
• Use JWT-based authentication for secure access.
• Add role-based access control (user/admin).
• Authenticated users can perform CRUD operations on their own todos.
• Admins can view or delete any user’s todos.
• Ensure input validation, error handling, and modular folder structure (routes, controllers, models, middleware).

- Tech Stack:
  • Node.js
  • Express.js
  • MongoDB + Mongoose
  • JWT
  • Bcrypt
  • Role-Based Access Middleware

- User Authentication:
  Register (role always assigned as user)
  Login with JWT

- Auth middleware for protected routes:
  • Role-Based Access
  • Users can only access their own todos
  • Admins can access & delete any user's todos

- First Admin Creation:

• If no admin exists:
/createAdmin is open (no token required)
If admin already exists:

Only authenticated admins can create new admins

- Todo Management
  • Users can create, update, delete their own todos
  • Duplicate todo validation (no repeated titles)
  • Admins can fetch or delete ANY todo
  • Users cannot access others’ todos

* Project Structure
  /controllers
  BaseController.js
  UserController.js
  AdminController.js
  TodoController.js

/middlewares
authenticate.js
validateSchema.js
authorize.js
adminProtection.js

/enumeration
UserRole.js

/helper
commonHelper.js

/models
userModel.js
todoListModel.js

/routes
userRoutes.js
adminRoutes.js
todoRoutes.js

/validator
schemas.js

/util
adminUtil.js
todoUtil.js
userUtil.js

app.js

readme.md
.gitIgnore

- Authentication:
  • Register User
  POST /api/user/register
  POST /api/user/login

* Admin Creation (Special Logic):
  POST /api/admin/createAdmin

* Todos API:
  - Create Todo (User Only)
    POST /api/todos/createTodo
    • Validation:
    Title required
    Duplicate titles blocked per user
    Admins cannot create todos.

- Get Single Todo:
  GET /api/todos/getTodoById?\_id=6
  Access rules:
  users: can view only their own todo
  Admins: can view ANY todo

- Update Todo
  PUT /api/todos/updateTodo?\_id=4
  Allowed:
  User: only if todo belongs to them
  Admin: not allowed to edit todos (recommended)

Delete Todo
DELETE /api/todos/deleteTodo?\_id=6
Allowed:
User: only if deleting their own todo
Admin: can delete ANY user's todo

Start the Server
npm install
npm start

Create .env:

PORT = 4000
MONGO_URI = mongodb://127.0.0.1:27017/todo_app
JWT_SECRET = kWjXyCXNQu0YQ89VEsMLQy9OAGYkeJU7
