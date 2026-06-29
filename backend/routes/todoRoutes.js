const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo, validateId } = require('../middleware/validation');

router.get('/', todoController.getAllTodos);
router.get('/:id', validateId, todoController.getTodoById);
router.post('/', validateTodo, todoController.createTodo);
router.put('/:id', validateId, validateTodo, todoController.updateTodo);
router.delete('/:id', validateId, todoController.deleteTodo);
router.patch('/:id/complete', validateId, todoController.markComplete);
router.patch('/:id/incomplete', validateId, todoController.markIncomplete);

module.exports = router;
