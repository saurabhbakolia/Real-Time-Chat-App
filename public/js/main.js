const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


/* ----------------- Get the username and room from the URL ----------------- */
const { username, room } = Qs.parse(location.search, { 
  ignoreQueryPrefix: true
});

// Join chatRoom 
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({ room, users }) =>{
  outputRoomName(room);
  outputUsers(users);
});

// catching message from the server the client side
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


// on message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to the server
    socket.emit('chatMessage', msg);

    // Clear the input field after the message has been sent
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});


function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

// Add roomName to the DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users){
  userList.innerHTML = `
    ${users.map(user =>`<li>${user.username}</li>`).join("")}
  `
}


// Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', ()=>{
  window.location = './modal.html';
});

