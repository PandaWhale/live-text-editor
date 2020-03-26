const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

// test for connection
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Join room when 'room' event is emitted
  socket.on('room', (data) => {
    socket.join(data.room, (err) => {
      if (err) console.error(err);
    });
    console.log(`User ${socket.id} joined room ${data.room}`);
    console.log(io.sockets.adapter.rooms);
  });

  // TODO: Handle leave room event when user switches room

  // handle coding event
  socket.on('coding', (data) => {
    console.log(data);
    socket.broadcast.to(data.room).emit('code sent from server', data);
  });
});

// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle requests for client files
// app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
// serve build files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../index.html'));
//   });
// }

// Define route handlers
app.get('/secret', (req, res) => res.status(418).send('The password is potato'));

app.post('/register',
  userController.encrypt,
  userController.create,
  (req, res) => res.redirect(307, './login'));

app.post('/login',
  userController.getUser,
  userController.authenticate,
  cookieController.encrypt,
  cookieController.setSSID,
  sessionController.start,
  sessionController.manage,
  (req, res) => res.status(204));

app.post('/logout',
  sessionController.verify,
  sessionController.end,
  cookieController.removeSSID,
  (req, res) => res.status(204));

// Global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' }
    };
    const errorObj = { ...defaultErr, ...err };
    res.status(errorObj.status).json(errorObj.message);
  }
});
