# Task Manager API

A RESTful API for managing tasks built with Node.js and Express.js, featuring CRUD operations, input validation, error handling, and filtering capabilities.

## 🚀 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- 🔍 **Advanced Filtering**: Filter tasks by completion status and priority level
- 🗂️ **Sorting**: Sort tasks by creation date
- ✨ **Input Validation**: Comprehensive validation for all task fields
- 🛡️ **Error Handling**: Robust error handling with meaningful error messages
- 💾 **In-Memory Storage**: File-based JSON storage for persistence
- 🧪 **Comprehensive Testing**: Full test suite with edge cases

## 📋 Task Schema

Each task contains the following fields:
- `id` (number): Unique identifier
- `title` (string): Task title (required)
- `description` (string): Task description (required)
- `completed` (boolean): Completion status (default: false)
- `priority` (string): Priority level - 'low', 'medium', or 'high' (default: 'medium')
- `createdAt` (string): ISO timestamp of creation

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📚 API Endpoints

### Base URL: `http://localhost:3000`

### Tasks

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/tasks` | Get all tasks with optional filtering | None |
| `GET` | `/tasks/:id` | Get a specific task by ID | None |
| `GET` | `/tasks/priority/:level` | Get tasks by priority level | None |
| `POST` | `/tasks` | Create a new task | Task object |
| `PUT` | `/tasks/:id` | Update an existing task | Task object |
| `DELETE` | `/tasks/:id` | Delete a task | None |

### Query Parameters

#### GET /tasks
- `completed` (boolean): Filter by completion status
  - Example: `/tasks?completed=true`
- `sort` (string): Sort tasks
  - `date`: Sort by creation date
  - Example: `/tasks?sort=date`

#### GET /tasks/priority/:level
- `level` (string): Priority level (`low`, `medium`, `high`)
  - Example: `/tasks/priority/high`

## 📝 Request/Response Examples

### Create a Task
```bash
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "priority": "high"
}
```

**Response:**
```json
{
  "id": 16,
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "completed": false,
  "priority": "high",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Get All Tasks with Filtering
```bash
GET /tasks?completed=false&sort=date
```

**Response:**
```json
[
  {
    "id": 4,
    "title": "Install Express",
    "description": "Install Express",
    "completed": false,
    "priority": "high",
    "createdAt": "2024-01-01T03:00:00.000Z"
  }
]
```

### Update a Task
```bash
PUT /tasks/4
Content-Type: application/json

{
  "title": "Install Express",
  "description": "Install Express framework for Node.js",
  "completed": true,
  "priority": "high"
}
```

## ⚠️ Error Handling

The API returns appropriate HTTP status codes and error messages:

### Common Error Responses

**400 Bad Request**
```json
{
  "error": {
    "message": "Title and description are required",
    "status": 400
  }
}
```

**404 Not Found**
```json
{
  "error": {
    "message": "Task not found",
    "status": 404
  }
}
```

**500 Internal Server Error**
```json
{
  "error": {
    "message": "Internal Server Error",
    "status": 500
  }
}
```

## 🧪 Testing

The project includes comprehensive tests covering:
- ✅ CRUD operations
- ✅ Input validation
- ✅ Error scenarios
- ✅ Edge cases

**Run all tests:**
```bash
npm test
```

**Test Coverage:**
- Creating tasks with valid and invalid data
- Retrieving tasks (all, by ID, by priority)
- Updating tasks with various scenarios
- Deleting tasks
- Error handling for non-existent resources

## 🏗️ Project Structure

```
task-manager-api/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── task.json             # In-memory data storage
├── routes/
│   └── tasks.js          # Task routes and business logic
└── test/
    └── server.test.js    # Test suite
```

## 🔧 Technology Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **File System**: JSON file for data persistence
- **Tap**: Testing framework
- **Supertest**: HTTP testing utility
- **Nodemon**: Development auto-reload

## 📊 Data Validation

### Required Fields
- `title`: Non-empty string
- `description`: Non-empty string

### Optional Fields
- `completed`: Boolean value (defaults to `false`)
- `priority`: Must be one of `['low', 'medium', 'high']` (defaults to `'medium'`)

### Validation Rules
- All fields are validated on creation and updates
- Invalid data types return appropriate error messages
- Missing required fields are rejected with descriptive errors

## 🚀 Development

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make changes** - The server will automatically restart on file changes

3. **Test your changes:**
   ```bash
   npm test
   ```

## 📈 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Advanced search and filtering
- [ ] Pagination for large datasets
- [ ] Rate limiting and security middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request
