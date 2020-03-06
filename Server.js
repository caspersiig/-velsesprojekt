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
    

    socket.on("idtilcheck", (data) => {
        // kontrollere om idet er i systemet og hvis den er så ser den checkin statuset på kortet og gør det sætter den til det omvendte :D
        for (let i = 0; i < database.ider.length; i++) {
            if (data.id == database.ider[i].id) {
                if (database.ider[i].ercheckin == false) {
                    socket.emit("acceptered", 1);
                    database.ider[i].ercheckin = true;
                    database.ider[i].historie[database.ider[i].historie.length] = "Checkedind "+socket.id+"  "+data.time;
                    
                } else {
                    socket.emit("acceptered", 2);
                    database.ider[i].ercheckin = false;
                    database.ider[i].historie[database.ider[i].historie.length] = "Checkedout "+socket.id+"  "+data.time;                
                }
                
            }
        }
    });
    socket.on("idtilregistering", (data) => {
        //kontrollere om idet er taget hvis ikke så laver den ny id hvis den er så skriver det som en fejl
        let erbrugt = false;
        for (let i = 0; i < database.ider.length; i++) {
            if (database.ider[i].id == data) {
                erbrugt = true;
            }
        }
        if (erbrugt == false) {
            database.ider[database.ider.length] = {
                "id": data,
                "ercheckin": false,
                "historie":[] 
            }
            socket.emit("acceptered",4);

        }else{
            socket.emit("acceptered",3);
        }

    });
    // er functionen der bliver kaldt når klientet laver sit navn
    // det er mening navnt/id'et skal være tog strækning efterfølgt af hvilken et af togende
    socket.on("Tognavn", (data) => {
    socket.id = data;
    console.log("toget" + socket.id + "Har lige Connected");
    })

    socket.on('disconnect', newDisconnect);
}

function newDisconnect(socket) {
    console.log("toget " + socket.id + " har lige Disconnected");

}