var socket = io.connect();
var currentLocation = window.location;
var isUserSet = 0
var currentUsername = ''
var modal = document.getElementById("nameModal");
var gameModal = document.getElementById("gameModal");
var gameModalBtn = document.getElementById("createGameBtn");
var gameSubmitBtn = document.getElementById("gameBtn");
var gameCancelBtn = document.getElementById("gameCancel");
var playZone = document.getElementById("playZone");

const id =  window.location.toString().split("/")[4];
socket.emit('create', id);

socket.on('chat message', function(msg, username) {
  if (username === currentUsername) {
    var item = document.createElement('li');
    item.classList.add('own-message');
    var p = document.createElement('p');
    var c = document.createElement('cite');
    p.textContent = msg;
    c.textContent = username
    item.appendChild(p);
    item.appendChild(c);
  }
  else {
    var item = document.createElement('li');
    var item = document.createElement('li');
    item.classList.add('others-message');
    var p = document.createElement('p');
    var c = document.createElement('cite');
    p.textContent = msg;
    c.textContent = username
    item.appendChild(p);
    item.appendChild(c);
  }
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('join message', function(msg) {
    var item = document.createElement('li');
    item.classList.add('join-message');
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  });


var usernameInput = document.getElementById('firstname');
var usernameButton = document.getElementById('usernameButton');
usernameButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (usernameInput.value) {
        currentUsername = usernameInput.value
        modal.style.display = "none";
    }
  });

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value, id, currentUsername);
    input.value = '';
  }
});


gameModalBtn.onclick = function() {
  gameModal.style.display = "flex";
}

gameCancelBtn.onclick = function() {
  gameModal.style.display = "none";
}

gameSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  gameModal.style.display = "none";
  socket.emit('control message', 'start', id, "cross_clues");
});