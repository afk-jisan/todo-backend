const { createTodo, getTodosByUserId, getTodoById, updateTodo, deleteTodo } = require("../models/todoModel");

async function getTodos(req, res) {
    try {
        const todos = await getTodosByUserId(req.user.id);
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function addTodo(req, res) {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
        const newTodo = await createTodo(req.user.id, title, description);
        res.status(201).json(newTodo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateTodoItem(req, res) {
    const { title, description, is_completed } = req.body;
    const { id } = req.params;

    try {
        const updatedTodo = await updateTodo(id, req.user.id, title, description, is_completed);
        if (!updatedTodo.rows.length) return res.status(404).json({ message: "Todo not found" });

        res.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteTodoItem(req, res) {
    const { id } = req.params;

    try {
        const deletedTodo = await deleteTodo(id, req.user.id);
        if (!deletedTodo.rows.length) return res.status(404).json({ message: "Todo not found" });

        res.json(deletedTodo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getTodos, addTodo, updateTodoItem, deleteTodoItem };
