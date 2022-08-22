const Todo = require('../Model/Todo');
const mongoose = require('mongoose');
const AppError = require('../Error/appError');
const { StatusCodes } = require('http-status-codes');

exports.createTodo = async (req, res) => {
  const { user } = req.body;
  if (!mongoose.Types.ObjectId.isValid(user))
    throw new AppError('Invalid ID', StatusCodes.BAD_REQUEST);

  const todo = await Todo.create(req.body);

  res.status(StatusCodes.CREATED).json({
    todo,
  });
};

exports.getAllTodo = async (req, res) => {
  const todos = req.user.todos;

  res.status(StatusCodes.OK).json({
    todos,
  });
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({
    id: todo.id,
  });
};

exports.completeTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      completed: true,
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ todo });
};

exports.unCompleteTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      completed: false,
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ todo });
};
