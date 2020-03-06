var socket = io.connect('http://localhost:3000');

function setup() {
    createCanvas(200, 200);

    inp = createInput('');
    inp.size(100, 20);
    inp.position(60, 60);

    registrer = createInput('');
    registrer.size(100, 20);
    registrer.position(60, 160);

    // hele socket acceptered eller ikke kommunikation
    socket.on("acceptered", (data) => {
        switch (data) {
            case 1:
                alert("Checked ind");
                break;
            case 2:
                alert("Checked ud");
                break;
            case 3:
                alert("Rejsekortet er lavet");
                break;
                case 4:
                    alert("rejsekortet er nu lavet");
                    break;
            default:
                console.log("dillermand");
                break;
        }
    })


   if(tognavn = prompt("Indsæt tog navn")){
    socket.emit("Tognavn",tognavn);
   }

}
// rejsekortnummer = 6,3,3,3,1

function draw() {
    background(200);
    text("Registrer", 60, 140);
    text("Check IND", 60, 40);
}

function keyPressed() {
    // sender bare de forskellige værdier
    if (keyCode === ENTER && inp.value().length == 16) {
        d = new Date();
        data = {
            id: inp.value(),
            time: d
        }
        socket.emit("idtilcheck", data);
        console.log("Sendt");

    } else if (keyCode === ENTER && registrer.value().length == 16) {
        socket.emit("idtilregistering", registrer.value());
        console.log("Sendt");
    }

}