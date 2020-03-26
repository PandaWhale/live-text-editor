const bcrypt = require('bcrypt');
const db = require('../database/database');

cookieController = {};

cookieController.encrypt = (req, res, next) => {
  bcrypt.hash(res.locals.user.id, 10)
    .then((hash) => {
      res.locals.cookie = hash;
      return next();
    })
    .catch ((err) => next({
      log('A problem occured encrypting authentication cookie'),
      status: 500,
      message: { err }
    }));
};

cookieController.setSSID = (req, res, next) => {
  try {
    res.cookie('txtedssid', res.locals.cookie);
    return next();
  } catch(err) {
    return next ({
      log('A problem occured setting authentication cookie'),
      status: 500,
      message: { err }
    });
  }
};

cookieController.removeSSID = (req, res, next) => {
  try {
    res.clearCookie('txtedssid');
    return next();
  } catch(err) {
    return next ({
      log('A problem occured removing authentication cookie'),
      status: 500,
      message: { err }
    });
  }
};
