const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Middleware/authMiddleware');

const {
  createTodo,
  getAllTodo,
  deleteTodo,
  completeTodo,
  unCompleteTodo,
} = require('../Controller/TodoController');

router
  .route('/')
  .post(authMiddleware, createTodo)
  .get(authMiddleware, getAllTodo);

router
  .route('/:id')
  .delete(authMiddleware, deleteTodo)
  .patch(authMiddleware, completeTodo);

router.patch('/unCompleteTodo/:id', unCompleteTodo);

module.exports = router;
