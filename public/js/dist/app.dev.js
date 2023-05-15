"use strict";

var socket = io();
var btnName = document.querySelector('.btn-name');
var inputName = document.querySelector('.user-name input');
var userLabel = document.querySelector('.form-msg label');
var login = document.querySelector('.login');
var formMsg = document.querySelector('.form-msg');
var chat = document.querySelector('.chat');
var msg = document.getElementById('msg');
var btnSave = document.querySelector('.btn-save');
var userName = '';
btnSave.addEventListener('click', function () {
  var message = msg.value.trim();
  socket.emit('save_message', {
    name: userName,
    msg: message
  });
  msg.value = '';
});
btnName.addEventListener('click', function () {
  userName = inputName.value;
  console.log(userName);
  userLabel.innerHTML = userName;
  login.style.display = 'none';
  socket.emit('user_connected', {
    name: userName
  });
});
formMsg.addEventListener('submit', function (e) {
  e.preventDefault();
  var message = msg.value.trim();

  if (message !== '') {
    socket.emit('send_msg', {
      name: userName,
      msg: message
    });
    msg.value = '';
  }
});
socket.on('new_msg', function (message) {
  var li = document.createElement('li');
  li.innerHTML = "\n    <p class=\"name\">".concat(message.name, "</p>\n    <p class=\"message\">").concat(message.msg, "</p>");
  chat.appendChild(li);
});