const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const room = {
    squareSize: 250,
    cornerSize: 50,

    normalColors: [ //corner colors note to self:
        "#ff4444", //topleft
        "#44ff44", //topright
        "#4488ff", //bottomleft
        "#ffff44" //bottom right
    ]

};

const stats = {
    rooms: 0,
    caught: 0,
    missed: 0
};

const game = {
    hasAnomaly: false,
    anomalyChance: .5
};

function getAccuracy(){
    const total = stats.caught + stats.missed;

    if(total === 0){
        return 100;
    }

    return Math.round((stats.caught / total) * 100);
}

function generateRoom(){
    room.colors = [room.normalColors];
    game.hasAnomaly = Math.random() < game.anomalyChance;

    if(game.hasAnomaly){
        const corner = Math.floor(Math.random() * 4);
        const anomalyColors = [
            "#ff00ff",
            "#00ffff",
            "#ffffff",
            "#ff8800",
            "#00ff88"
        ];
        const randomColor = anomalyColors[Math.floor(Math.random() * anomalyColors.length)];

        room.colors[corner] = randomColor;
    }

    stats.rooms++;
};

function makeChoice(playerThinksAnomaly){
    if(playerThinksAnomaly === game.hasAnomaly){
        stats.caught++;
    } else {
        stats.missed++;
    }

    generateRoom();
}

function drawRoom(){
    const canvasX = canvas.width / 2;
    const canvasY = canvas.width / 2;
    const size = Math.min(room.squareSize, canvas.height * .45);
    const halfSize = size/2;

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 4;
    ctx.strokeRect(canvasX - halfSize, canvasY - halfSize, size, size);

    const corner = room.cornerSize;
    const left = canvasX - halfSize;
    const right = canvasX + halfSize - corner;
    const top = canvasY - halfSize;
    const bottom = canvasY + halfSize - corner;
    const positions = [
        {x: left, y: top},
        {x: right, y: top},
        {x: left, y: bottom},
        {x: right, y: bottom}
    ];

    for(let i = 0; i < 4; i++){
        ctx.fillStyle = room.colors[i];
        ctx.fillRect(positions[i].x, positions[i].y, corner, corner);
    }

    ctx.fillStyle = "#3e2c04"
    ctx.fillRect(canvasX - 30, canvasY - halfSize - 50, 60, 50);
    ctx.fillRect(canvasX - 30, canvasY + halfSize + 10, 60, 50);
}

window.addEventListener("keydown", e => {
    if(e.repeat){
        return;
    }

    if(e.key === "w"){
        makeChoice(false);
    }
    if(e.key === "s"){
        makeChoice(true);
    }
});

function update(){

}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoom();

    ctx.fillStyle = "white";
    ctx.font = "24px sans serif";
    ctx.fillText(
        "Rooms: " + stats.rooms,
        30,
        40
    );

    ctx.fillStyle = "white";
    ctx.font = "22px sans serif";
    ctx.fillText(
        "Caught: " + stats.caught,
        30,
        130
    );

    ctx.fillText(
        "Missed: " + stats.missed,
        30, 160
    );

    ctx.fillText(
        "Accuracy: " + getAccuracy() + "%",
        30,
        190
    );
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

generateRoom();
loop();