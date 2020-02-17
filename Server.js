var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('Klient'));
var socket = require('socket.io');
var io = socket(server);
var fs = require('fs');
var database = JSON.parse(fs.readFileSync('database.json', 'utf8'));

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("toget" + socket.id + "Har lige Connected");

    socket.on("idtilcheck", (data) => {
        for (let i = 0; i < database.ider.length; i++) {
            if (data.id == database.ider[i].id) {
                if (database.ider[i].ercheckin == false) {
                    socket.emit("acceptered",1);
                    database.ider[i].ercheckin = true;
                } else {
                    socket.emit("acceptered",2);
                    database.ider[i].ercheckin = false;
                }
            }
        }
    });
    socket.on("idtilregistering", (data) => {
        database.ider[database.ider.length] = { "id":data, "ercheckin":false };
        fs.writeFileSync("database.json",JSON.stringify(database));
    });
    socket.on('disconnect', newDisconnect);
}

function newDisconnect(socket) {
    console.log("toget " + socket.id + " har lige Disconnected");
    fs.writeFileSync("database.json",JSON.stringify(database));

}