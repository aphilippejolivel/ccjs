
socket.on('control message', function(type, value) {
    console.log(type + " " + value)
    var item = document.createElement('div');
    item.classList.add('test');
    playZone.appendChild(item);
  });