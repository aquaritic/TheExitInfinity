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

    colors: [ //corner colors note to self:
        "#ff4444", //topleft
        "#44ff44", //topright
        "#4488ff", //bottomleft
        "#ffff44" //bottom right
    ]
};

function drawRoom(){
    const canvasX = canvas.width / 2;
    const canvasY = canvas.width / 2;
    const size = room.squareSize;
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
    ctx.fillRect(canvasX - 30, canvasY - halfSize - 70, 60, 50);
    ctx.fillRect(canvasX - 30, canvasY + halfSize + 20, 60, 50);
}

function update(){

}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoom();
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();