const db = require('../database/database.js');

const roomController = {};


roomController.getRooms = (req, res, next) => {
    // console.log("HELLO")

    const queryStr = 'SELECT * FROM rooms' 
    // retrieves rows in rooms table in database 
    db.query(queryStr, (err, data) => {
        if (err)  return next({
            log: 'error occured in getting room',
            status: 500,
            msg: {err: 'error occured in getting room'}
        });  
        console.log("data.rows:", data.rows)
        res.locals.rooms = data.rows;
        return next()
    })
}

module.exports = roomController;

   
