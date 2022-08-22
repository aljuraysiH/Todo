const User = require('../Model/User');
const AppError = require('../Error/appError');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail, htmlTemplate } = require('../Util/email');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.signupUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError(
      'Please provide email and password',
      StatusCodes.BAD_REQUEST
    );
  }

  const user = await User.create({ email: email.trim(), password });
  const token = createToken(user._id);

  user.password = undefined;

  res
    .status(StatusCodes.CREATED)
    .json({ token, user: { id: user._id, todos: user.todos } });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError(
      'Please provide email and password',
      StatusCodes.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email: email.trim() });

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }

  const token = createToken(user._id);
  user.password = undefined;

  res
    .status(StatusCodes.OK)
    .json({ token, user: { id: user._id, todos: user.todos } });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email.trim() });
  if (!user) {
    throw new AppError('This email does not exist', StatusCodes.NOT_FOUND);
  }

  const token = user.createPasswordResetToken();
  const html = htmlTemplate(token);
  await sendEmail({
    to: email,
    from: 'todo-hamad@hotmail.com',
    subject: 'Reset Password',
    html: html,
  });

  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ message: 'تم إرسال الايميل ، تحقق من البريد المهمل' });
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token: resetToken } = req.params;
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken,
  });

  if (!user) {
    throw new AppError(
      'انتهت صلاحية التوكن حاول مره ثانية',
      StatusCodes.NOT_FOUND
    );
  }
  if (user.passwordResetExpires < Date.now()) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    throw new AppError(
      'انتهت صلاحية التوكن حاول مره ثانية',
      StatusCodes.NOT_FOUND
    );
  }

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.password = password;
  await user.save();

  const token = createToken(user._id);

  res
    .status(StatusCodes.OK)
    .json({ token, user: { id: user._id, todos: user.todos } });
};

exports.checkResetToken = async (req, res) => {
  const { token } = req.params;
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({ passwordResetToken });

  if (!user)
    throw new AppError('No user with this token', StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json();
};
