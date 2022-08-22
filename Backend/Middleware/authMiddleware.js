const User = require('../Model/User');
const Todo = require('../Model/Todo');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const AppError = require('../Error/appError');

exports.authMiddleware = async (req, res, next) => {
  if (!req.headers?.authorization?.startsWith('Bearer'))
    throw new AppError('You are not authorized', StatusCodes.UNAUTHORIZED);

  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user)
    throw new AppError('NotFound Login again!', StatusCodes.UNAUTHORIZED);
  req.user = user;

  next();
};
