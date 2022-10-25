const socket = io.connect("https://websocket1233.herokuapp.com");

var message = document.querySelector('.message');
var username = document.querySelector('.username');

var messages = document.querySelector('.messages');
var btn = document.querySelector('.submit');
var feedback = document.querySelector('.feedback');


message.addEventListener('keypress', (e) => {
    socket.emit('typing', {
        username : username.value
    })
})

socket.on('feedback', (data) => {
    feedback.innerHTML = `${data.username} is typing`
})

btn.addEventListener('click', () => {
    socket.emit('chat', {
        username : username.value,
        message : message.value
    })
})

socket.on('chat',(data) => {
    feedback.innerHTML = ''
    messages.innerHTML += `<span style="display:block;">${data.username} : ${data.message}</span>`
})