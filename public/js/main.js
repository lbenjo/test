var socket = io.connect();

var clientUUID = null;

var nameText = document.getElementById("nameText");
var chatText = document.getElementById("chatText");
var sendButton = document.getElementById("sendButton");
var chatBox = document.getElementById("chatBox");

function addMessage(name,msg){
    chatBox.innerHTML = chatBox.innerHTML + '<div class="messageBox">' + '[' + name + ']: ' + msg + '</div>'
}

sendButton.onclick = ()=>{


    var name = nameText.value;
    var message = chatText.value;
    if (name == "") {console.warn("You should write your nickname!"); return;}

    
    console.log("[" + name + "]: " + message);

    addMessage(name,message);
    socket.emit("message_sent", name, message);
};

socket.on("s_send_message", (name,msg)=>{
    addMessage(name,msg);
    console.log("[" + name + "]: " + msg);
});

socket.on("setUUID", (uuid)=>{
    clientUUID = uuid;
});