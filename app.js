var express = require("express");
var app = express();

var server = app.listen(3000);
const { Server } = require("socket.io");
var path = require("path");
const { randomUUID } = require("crypto");

var io = new Server(server);

var clients = [];

app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/htmls/main.html');
});



io.on('connection', (socket) => {

    var userUUID = randomUUID();
    var _userName = null;
    socket.emit("setUUID", userUUID);

    socket.on("disconnect", () => {

        console.log(clients);

       for(let i = 0; i < clients.length; i++) {

            if (clients[i]["UUID"] == userUUID) {
                clients.splice(i,1);
                console.log(_userName + " has disconnected!");
                socket.broadcast.emit("s_send_message","Server", _userName + " has disconnected!");
            }
        }

        console.log(clients);

    });

    socket.on("message_sent", (name, msg) => {
        console.log("[" + name + "]: " + msg);
        socket.broadcast.emit("s_send_message", name, msg);
    });



    socket.on("onJoin", (userName) => {
        _userName = userName

        clients.push({
            "UUID": userUUID,
            "username": userName,
        });

        console.log(userName + " has connected!");
        socket.broadcast.emit("s_send_message", "Server", userName + " has connected!");
    });

    socket.emit("connection_success");
});



