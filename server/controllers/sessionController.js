const bcrypt = require('bcrypt');
const db = require('../database/database');

const sessionController = {};

sessionController.start = (req, res, next) => {
  const queryStr = `INSERT INTO sessions (sid, user_id)
                    VALUES ($1, $2)`;
  const queryArr = [res.locals.cookie, res.locals.user.id];
  db.query(queryStr, queryArr)
    .then(() => next())
    .catch((err) => next({
      log: 'A problem occured starting a session',
      status: 500,
      message: { err }
    }));
};

sessionController.verify = (req, res, next) => {
  const queryStr = `SELECT * FROM sessions
                    WHERE sid = $1`;
  const queryArr = [req.cookies.txtedssid];
  db.query(queryStr, queryArr)
    .then(() => {
      if (data.rows[0]) return next();
      return next({
        log: 'Session does not exist',
        status: 401,
        message: { err }
      });
    })
    .catch((err) => next({
      log: 'A problem occured verifying session',
      status: 500,
      message: { err }
    }));
};

sessionController.end = (req, res, next) => {
  const queryStr = `DELETE * FROM sessions
                    WHERE sid = $1`;
  const queryArr = [req.cookies.txtedssid];
  db.query(queryStr, queryArr)
    .then(() => next())
    .catch((err) => next({
      log: 'A problem occured ending the session',
      status: 500,
      message: { err }
    }));
};

sessionController.manage = (req, res, next) => {
  const queryStr = `SELECT id FROM sessions
                    WHERE user_id = $1
                    ORDER BY id DESC`;
  const delStr = `DELETE FROM sessions
                  WHERE user_id = $1
                  AND id <= $2`;

  db.query(queryStr, [res.locals.user.id])
    .then((data) => {
      if (data.rows.length > 3) {
        db.query(delStr, [res.locals.user.id, data.rows[3].id])
          .then(() => next())
          .catch((err) => next({
            log: 'A problem occured managing sessions',
            status: 500,
            message: { err }
          }));
      }
      return next();
    })
    .catch((err) => next({
      log: 'A problem occured managing sessions',
      status: 500,
      message: { err }
    }));
};
