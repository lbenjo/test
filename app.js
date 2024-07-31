var express = require("express");
var app = express();

var server = app.listen(3000);
const {Server} = require("socket.io");
var path = require("path");
const { randomUUID } = require("crypto");

var io = new Server(server);

var clients = [];

app.use(express.static(path.join(__dirname,'/public')));

app.get("/", (req,res) => {
    res.sendFile(__dirname + '/htmls/main.html');
});


io.on('connection', (socket)=>{

    var userUUID = randomUUID();

    socket.emit("setUUID",userUUID);
    console.log('a user connected (' + userUUID + ')');
    
    socket.on("disconnect",()=>{
        console.log('user disconnected');
    });

    socket.on("message_sent", (name,msg)=>{
        console.log("[" + name + "]: " + msg);
        socket.broadcast.emit("s_send_message",name,msg);
    });
});



