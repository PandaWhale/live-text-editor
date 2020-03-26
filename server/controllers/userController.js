const bcrypt = require('bcrypt');
const db = require('../database/database.js');

const userController = {};

userController.getUser = (req, res, next) => {
  const queryStr = `SELECT * FROM users
                    WHERE username = $1`;
  const queryArr = [req.body.username];
  db.query(queryStr, queryArr)
    .then((data) => {
      if (data.rows !== []) return next;
      return next({
        log: 'User does not exist',
        status: 404,
        message: { err }
      });
    })
    .catch((err) => next({
      log: 'There was a problem getting user information',
      status: 500,
      message: { err }
    }));
};

userController.encrypt = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      res.locals.user = { ...req.body, password: hash };
      return next();
    })
    .catch((err) => next({
      log: 'Input format incorrect',
      status: 400,
      message: { err }
    }));
};

userController.authenticate = (req, res, next) => {
  bcrypt.compare(res.locals.user.password, req.body.password)
    .then((result) => {
      if (result) return next();
      return next({
        log: 'Username or password incorrect',
        status: 401,
        message: { err }
      });
    })
    .catch((err) => next({
      log: 'There was a problem authenticating your login information',
      status: 500,
      message: { err }
    }));
};

userController.create = (req, res, next) => {
  const queryStr = `INSERT INTO users (firstname, lastname, username, password)
                    VALUES ($1, $2, $3, $4)`;
  const queryArr = Object.values(res.locals.user);
  db.query(queryStr, queryArr)
    .then(() => next())
    .catch((err) => next({
      log: 'Username already exists',
      status: 400,
      message: { err }
    }));
};

module.exports = userController;
