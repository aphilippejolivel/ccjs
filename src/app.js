const http = require('http')
const lobbys = require('./lobbysController.js')
const { Server } = require("socket.io")
const fs = require('fs')

const PORT = process.env.PORT || 3000;

global.lobbysList = new Map();

const server = http.createServer(async (req, res) => {
    console.log(req.method + ' : ' + req.url)
    //set the request route
    if (req.url.match(/\/api\/lobbys\/([a-zA-Z0-9]{6})/) && req.method === "GET") {
        const id = req.url.split("/")[3];

        var lobby = lobbys.getLobby(id)
        if (lobby != undefined) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(lobby)
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Lobby not found" }));
        }
   
        //end the response
        res.end();
    }

    else if (req.url === "/api/lobbys" && req.method === "POST") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        res.write(lobbys.createLobby());
        //end the response
        res.end();
    }

    else if (req.url.match(/\/lobby\/([a-zA-Z0-9]{6})/) && req.method === "GET") {
        if (lobbysList.has(req.url.split("/")[2])) {
            res.writeHead(200, { 'content-type': 'text/html' })
            fs.createReadStream('./lobby.html').pipe(res)
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Lobby not found" }));
        }
    }

    else if (req.url === "/" && req.method === "GET") {
        fs.createReadStream('./index.html').pipe(res)
    }
    // If no route present
    else {
        if (fs.existsSync('.' + req.url)) {
            fs.createReadStream('.' + req.url).pipe(res)
        }
        else {        
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "File not found" }));
        }

    }
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
  });

io.sockets.on('connection', function(socket) {
    
    socket.on('create', function(room) {
      socket.join(room);
      io.in(room).emit('chat message', 'a user joined the room')
      console.log('a user joined the room: ' + room);
    });

    socket.on('chat message', function(msg,room) {
        io.in(room).emit('chat message', msg)
        console.log('room: '+ room + ' message: ' + msg);
      });
  });

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});