"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _http = _interopRequireDefault(require("http"));

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var io = new _socket.Server(server);
var PORT = 3000;
app.use(_express["default"]["static"]('public'));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index');
});
server.listen(PORT, function () {
  console.log("Server started on http://localhost:".concat(PORT));
});
var userMessages = [];
io.on('connection', function (socket) {
  socket.on('user_connected', function (data) {
    var name = data.name;
    console.log("System user ".concat(name, " is connected"));
    socket.on('disconnect', function (reason) {
      console.log("System user ".concat(name, " is disconnected, reason: ").concat(reason));
    });
    socket.on('send_msg', function (data) {
      userMessages.push({
        name: data.name,
        msg: data.msg
      });
      io.emit('new_msg', {
        name: data.name,
        msg: data.msg
      });
    });
    socket.on('save_message', function () {
      var messagesToSave = userMessages.map(function (message) {
        return "".concat(message.name, ": ").concat(message.msg);
      });
      var messagesString = messagesToSave.join('\n');

      _fs["default"].writeFile('message.txt', messagesString, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log('Messages saved to message.txt');
        }
      });
    });
  });
});