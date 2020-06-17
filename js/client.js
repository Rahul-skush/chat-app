
const socket = io('http://localhost:8000');
 const form = document.getElementById('send-container');
 const message = document.getElementById('messageinp');
 const messageContainer = document.querySelector('.container');
var audio = new Audio('/ring.mp3');
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}
form.addEventListener('submit', e=>{
    e.preventDefault();
   const message = messageinp.value;
  
   append(`You: ${message}`, 'right');
   socket.emit(`send`, message);
   messageinp.value = '';
})

 const name = prompt('Enter your name to join');
 socket.emit('new-user-joined', name);

 socket.on('user-joined', name=>{
 append(`${name}: joined the chat`, 'right');
 })

 socket.on('received', data=>{
     console.log(data);
    append(`${data.name}:${data.message}`, 'left');
    })

socket.on('left', name=>{
   append(`${name} left the chat`, 'right' );
    })