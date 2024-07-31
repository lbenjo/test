
var socket = null;
var clientUUID = null;
var userName = "";

var nameText = document.getElementById("nameText");
var enterGameButton = document.getElementById("enterGame");

var chatText = document.getElementById("chatText");
var sendButton = document.getElementById("sendButton");
var chatBox = document.getElementById("chatBox");

function addMessage(name,msg){
    chatBox.innerHTML = chatBox.innerHTML + '<div class="messageBox">' + '[' + name + ']: ' + msg + '</div>'
}

function Connect(){

    if (nameText.value == "") {console.warn("You should write your nickname!"); return;}

    
    userName = nameText.value;
    nameText.style = "display:none;";
    enterGameButton.style = "display:none;";
    socket = io.connect();

    socket.on("connection_success",()=>{

        //ADDS MESSAGE TO CHAT

        socket.on("s_send_message", (name,msg)=>{
            addMessage(name,msg);
            console.log("[" + name + "]: " + msg);
        });
        
        socket.on("setUUID", (uuid)=>{
            clientUUID = uuid;
        });

    
        socket.emit("onJoin",userName);
        addMessage("Client","You are successfully connected!");

        chatText.style = "display: flex;";
        sendButton.style = "display: flex;";
    })
    

}


sendButton.onclick = ()=>{

    var message = chatText.value;

    if (message == "") return;

    chatText.value = "";
    console.log("[" + userName + "]: " + message);

    addMessage(userName,message);
    socket.emit("message_sent", userName, message);
};

