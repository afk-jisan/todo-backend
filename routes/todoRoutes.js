const express = require("express");
const { getTodos, addTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos for the authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved todos
 */
router.get("/", authMiddleware, getTodos);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Add a new todo
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo added successfully
 */
router.post("/", authMiddleware, addTodo);

module.exports = router;
