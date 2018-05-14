minimized = true;
firstMaximize = true;


function maximize() {
    document.getElementById("minimized-support").setAttribute("style", "visibility: hidden;")
    document.getElementById("maximized-support").setAttribute("style", "visibility: visible;")
    if (firstMaximize) {
        firstMaximize = false;
        firstLoad();
        setInterval(fetch, 3000);
    }
    minimized = !minimized;
}

function minimize() {
    document.getElementById("minimized-support").setAttribute("style", "visibility: visible;")
    document.getElementById("maximized-support").setAttribute("style", "visibility: hidden;")
    minimized = !minimized;
}

function firstLoad() {
    var initialRequest = new XMLHttpRequest();
    initialRequest.open("GET", "http://51.15.59.130:46260/start", true);
    initialRequest.send();
    initialRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };

    var supporterRequest = new XMLHttpRequest();
    supporterRequest.open("GET", "http://51.15.59.130:46260/support", true);
    supporterRequest.send();
    supporterRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            document.getElementById("supporter-name").innerHTML = myObj.support.first + " " + myObj.support.last;
            document.getElementById("supporter-picture-link").src = myObj.support.picture;
            pictureSrc = myObj.support.picture;
        }
    };
}

function sendMessage() {

    //updating page
    var message = document.getElementById("chat-text-area").value;
    var myMessage = document.createElement("div");
    var myAvatar = document.createElement("img");
    var messageText = document.createElement("span");
    messageText.innerHTML = message;
    messageText.setAttribute("class", "my-message-text");
    myAvatar.setAttribute("class", "my-avatar");
    myAvatar.setAttribute("src", "icons/anonymous.png")
    myMessage.setAttribute("class", "my-message");
    myMessage.appendChild(myAvatar);
    myMessage.appendChild(messageText);
    document.getElementById("chatbox").appendChild(myMessage);
    document.getElementById("chat-text-area").value = "";

    //send message to server
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", "http://51.15.59.130:46260/send", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jsonString = "{\"message\":" + "\"" + message + "\"}";
    xhttp.send(jsonString);
    return false;
}

function fetch() {
    var fetchRequest = new XMLHttpRequest();
    fetchRequest.open("GET", "http://51.15.59.130:46260/fetch", true);
    fetchRequest.send();
    fetchRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var myObj = JSON.parse(this.responseText);
            var message = myObj.responses[0].message;
            var myMessage = document.createElement("div");
            var myAvatar = document.createElement("img");
            var messageText = document.createElement("span");
            messageText.innerHTML = message;
            messageText.setAttribute("class", "supporter-message-text");
            myAvatar.setAttribute("class", "supporter-avatar");
            myAvatar.setAttribute("src", pictureSrc)
            myMessage.setAttribute("class", "supporter-message");
            myMessage.appendChild(messageText);

            myMessage.appendChild(myAvatar);
            document.getElementById("chatbox").appendChild(myMessage);
            document.getElementById("chat-text-area").value = "";
        }
    };


    return false;
}