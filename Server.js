var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('Klient'));

var socket = require('socket.io'); 
var io = socket(server);


io.sockets.on('connection', newConnection);
io.sockets.on('disconnection', newDisconnect);


function newConnection(socket){
    console.log(socket.id + "Har lige Connected");
    // sockets.on('Nyspiller', () =>{
    
    // });
}

function newDisconnect(socket){
console.log(socket.id + "Har lige disconnected");
}


