const db = require("../config/db");

// Create a new todo
async function createTodo(userId, title, description) {
    return db.query(
        "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
        [userId, title, description]
    );
}

// Get todos for a user
async function getTodosByUserId(userId) {
    const result = await db.query("SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
    return result.rows;
}

// Get a single todo by ID and user ID
async function getTodoById(todoId, userId) {
    const result = await db.query("SELECT * FROM todos WHERE id = $1 AND user_id = $2", [todoId, userId]);
    return result.rows[0];
}

// Update a todo
async function updateTodo(todoId, userId, title, description, isCompleted) {
    return db.query(
        "UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
        [title, description, isCompleted, todoId, userId]
    );
}

// Delete a todo
async function deleteTodo(todoId, userId) {
    return db.query("DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *", [todoId, userId]);
}

module.exports = { createTodo, getTodosByUserId, getTodoById, updateTodo, deleteTodo };
