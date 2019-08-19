const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authChecker");
const TodosController = require("../controllers/todos");

// @route   GET /
// @desc    Get all todos
// @access  Private
router.get("/", checkAuth, TodosController.todos_get);

// @route   POST /
// @desc    Create new todo
// @access  Private
router.post("/", checkAuth, TodosController.todos_post);

// @route   PUT /
// @desc    update the todo
// @access  Private
router.put("/", checkAuth, TodosController.todos_put);

// @route   DELETE /:id
// @desc    Delete todo
// @access  Private
router.delete("/:id", checkAuth, TodosController.todos_delete);

module.exports = router;
