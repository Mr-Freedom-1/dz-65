import express from 'express';
import fs from 'fs';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server)
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'pug');

app.get('/', (req, res) => {
      res.render('index');
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
})

io.on('connection', (socket) => {
  socket.on('user_connected', (data) => {
    const name = data.name;
    console.log(`System user ${name} is connected`);
    socket.on("disconnect", (reason) => {
      console.log(`System user ${name} is disconnected, reason: ${reason}`);
    });
    socket.on('send_msg', data =>{
      userMassage.push(data.msg)
      io.emit('new_msg', {name: data.name, msg: data.msg});
    })
  });
});


