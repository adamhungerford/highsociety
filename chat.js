const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
   app.use(express.static(__dirname));
   res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit("connection");
  socket.on('disconnect', () => {
    io.emit("disconnection");
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});