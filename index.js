const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const port = 4000;
const server = app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', socket => {
  console.log('Socket connection started', socket.id);
  socket.on('chat', data => {
    console.log(data);
    io.sockets.emit('chat', data);
  });

  socket.on('typing', name => {
    console.log(name);
    socket.broadcast.emit('typing', name);
  })
});