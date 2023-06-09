const socket = io();

const btnName = document.querySelector('.btn-name');
const inputName = document.querySelector('.user-name input');
const userLabel = document.querySelector('.form-msg label');
const login = document.querySelector('.login');
const formMsg = document.querySelector('.form-msg');
const chat = document.querySelector('.chat');
const msg = document.getElementById('msg');
const btnSave = document.querySelector('.btn-save');
let userName = '';

btnSave.addEventListener('click', () => {
    const message = msg.value.trim();
    socket.emit('save_message', { name: userName, msg: message });
    msg.value = '';
});

btnName.addEventListener('click', () => {
    userName = inputName.value;
    console.log(userName);
    userLabel.innerHTML = userName;
    login.style.display = 'none';
    socket.emit('user_connected', { name: userName });
});

formMsg.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msg.value.trim();
    if (message !== '') {
      socket.emit('send_msg', { name: userName, msg: message });
      msg.value = '';
    }
});

socket.on('new_msg', message => {
    const li = document.createElement('li')
    li.innerHTML = `
    <p class="name">${message.name}</p>
    <p class="message">${message.msg}</p>`;
    chat.appendChild(li);
});