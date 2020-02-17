var socket = io.connect('http://localhost:3000');

function setup() {
    createCanvas(200, 200);
    background(200);

    inp = createInput('');
    inp.size(100, 20);
    inp.position(60, 60);

    registrer = createInput('');
    registrer.size(100, 20);
    registrer.position(60, 160);

    text("Registrer", 60, 140);
    text("Check IND", 60, 40);

    socket.on("acceptered", (data) => {
        if(data == 1){
            alert("Checked ind");
        }
        if(data == 2){
            alert("Checked ud");
        }
    })

}
// rejsekortnummer = 6,3,3,3,1


function keyPressed() {
    if (keyCode === ENTER && inp.value().length == 16) {
        data = {
            id:inp.value(),
            time:
        }

        socket.emit("idtilcheck", data);
        console.log("Sendt");

    } else if (keyCode === ENTER && registrer.value().length == 16) {
        socket.emit("idtilregistering", registrer.value());
        console.log("Sendt");
    }
}