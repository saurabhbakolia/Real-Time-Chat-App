const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeaves, getRoomUsers } = require('./utils/users');


/* ---------------------------- Basic Connections --------------------------- */
const app = express();
const server = http.createServer(app);
const io = socketio(server);


/* ---------------------------- Set static folder --------------------------- */
app.use(express.static(path.join(__dirname, 'public')));


/* ------------------------ Run when client Connects ------------------------ */
io.on('connection', (socket) => {
  console.log("User connected");

  const botName = 'Scrollme Chat Bot';

  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Server is sending message to the client 
    socket.emit('message', formatMessage(botName, `${username}, Welcome to the Scrollme Chat App`));

    // Broadcast when a uer connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${username} has joined the chat`));

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });


  // Listen for ChatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when the user disconnects
  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);

    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});