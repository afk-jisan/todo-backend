const { createTodo, getTodosByUserId, getTodoById, updateTodoModel, deleteTodoModel } = require("../models/todoModel");

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

async function updateTodo(req, res) {
    const { title, description, is_completed } = req.body;
    const { id } = req.params;

    try {
        // Use the renamed updateTodoModel function from the model
        const updatedTodo = await updateTodoModel(id, req.user.id, title, description, is_completed);
        if (!updatedTodo.rows.length) return res.status(404).json({ message: "Todo not found" });

        res.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteTodo(req, res) {
    const { id } = req.params;

    try {
        // Use the renamed deleteTodoModel function from the model
        const deletedTodo = await deleteTodoModel(id, req.user.id);
        if (!deletedTodo.rows.length) return res.status(404).json({ message: "Todo not found" });

        res.json(deletedTodo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
