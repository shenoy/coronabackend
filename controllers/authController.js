const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

//==============================================CREATE SEND TOKEN =================================================================

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user
  });
};

//=============================================SIGNUP ================================================================

exports.signup = async (req, res, next) => {
  user = await User.create(req.body);

  createSendToken(user, 201, res);
};
//=======================================LOGIN===========================================================================

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: 'Please provide email and password'
    });
    return next();
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      message: 'Incorrect email or password'
    });
    return next();
  }

  createSendToken(user, 200, res);
};

//=====================================PROTECT ============================================================

exports.protect = async (req, res, next) => {
  //1)check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401).json({
      status: 'fail',
      message: ' You are not logged in. Please log in'
    });

    next();
  }

  //2)check if token is valid

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) check if user still exists

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      message: 'The user belonging to this token does not exist'
    });
  }

  //4) check if user changed password after jwt was issued

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    res.status(401).json({
      message: 'User recently changed password. Please log in again.'
    });
  }
  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

//=============================================IS LOGGED IN ==========================================

//ONLY FOR RENDERED PAGES ..NO ERRORS

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log(req.cookies.jwt);
      //2)check if user  exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      //3) check if user changed password after jwt was issued

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // 4) THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      console.log(err);
      return next();
    }
  }

  next();
};

//==========================================RESTRICT TO =========================================

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: 'You do not have permission to perform this action'
      });
      next();
    }
    next();
  };
};

//======================================FORGOT PASSWORD =========================================

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({
      message: 'There is no user with that email address'
    });
    next();
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3)send email to user
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to : ${resetURL}.\n If you didnt forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Your password reset token(valid for 10min)',
      message
    });
    res.status(200).json({
      status: 'success',
      statusmessage: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(err);
  }
  next();
};

//====================================RESET PASSWORD========================================================

exports.resetPassword = async (req, res, next) => {
  //1)get user

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  //2) check reset token is not expired, set new password

  if (!user) {
    res.status(400).json({
      message: 'Token is invalid or has expired'
    });
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3)update changed password time property in db
  //4)log the user in
  createSendToken(user, 200, res);
};

//===============================UPDATE PASSWORD==============================================================

exports.updatePassword = async (req, res, next) => {
  //1)Get user from the collection

  const user = await User.findById(req.user.id).select('+password');

  //2) Check if the password is correct

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    res.status(401).json({
      message: 'Incorrect email or password'
    });
    return next();
  }

  //3) if correct, update password

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //4) log user in sent jwt

  createSendToken(user, 200, res);
};

//=======================================LOGOUT=================================================

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

//===============================================================================================
