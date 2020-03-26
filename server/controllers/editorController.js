const db = require('../database/database.js');

const editorController = {};

editorController.getCode = async (req, res, next) => {
  const { roomName } = req.body;
  const queryParamter = [roomName];
  const queryString =
    'SELECT room_name, contents FROM rooms WHERE room_name = $1';

  try {
    const queryResult = await db.query(queryString, queryParamter);
    // console.log(queryResult);
    res.locals.roomsData = queryResult.rows;
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'An error has occurred in editorConter.getCode',
        status: 400,
        message: { err }
      });
    }
  }
};

editorController.postCode = async (req, res, next) => {
  const { roomName, contents } = req.body;
  const queryParamter = [roomName, contents];
  const queryString = 'INSERT INTO rooms (room_name, contents) VALUES ($1, $2)';
  try {
    await db.query(queryString, queryParamter);
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'An error has occurred in editorConter.postCode',
        status: 400,
        message: { err }
      });
    }
  }
};

editorController.updateCode = async (req, res, next) => {
  const { roomName, contents } = req.body;
  const queryParamter = [roomName, contents];
  const queryString = 'UPDATE rooms SET contents = $2 WHERE room_name = $1';
  try {
    await db.query(queryString, queryParamter);
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'An error has occurred in editorConter.updateCode',
        status: 400,
        message: { err }
      });
    }
  }
};

editorController.deleteCode = async (req, res, next) => {
  const { roomName } = req.body;
  const queryParamter = [roomName];
  const queryString = 'DELETE FROM rooms WHERE room_name = $1';
  try {
    await db.query(queryString, queryParamter);
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'An error has occurred in editorConter.deleteCode',
        status: 400,
        message: { err }
      });
    }
  }
};

module.exports = editorController;
