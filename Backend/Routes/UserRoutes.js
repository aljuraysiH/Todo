const express = require('express');
const router = express.Router();

const {
  signupUser,
  loginUser,
  forgetPassword,
  resetPassword,
  checkResetToken,
} = require('../Controller/UserController');

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);

router.post('/forgetPassword', forgetPassword);

router.patch('/resetPassword/:token', resetPassword);

router.get('/checkResetToken/:token', checkResetToken);

module.exports = router;
