const socket = io();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const cellSize = 30;

canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

let state;

socket.on("gameState", (gameState) => {

    state = gameState;

    draw();
});

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawWalls();

    drawPlayer(state.runner, "red");
    drawPlayer(state.chaser, "green");
}

function drawGrid() {

    for (let x = 0; x < gridSize; x++){
        for (let y = 0; y < gridSize; y++){

            ctx.strokeStyle = "#333";

            ctx.strokeRect(
                x * cellSize,
                y * cellSize,
                cellSize,
                cellSize
            );
        }
    }

}

function drawWalls() {

    for (let y = 0; y < gridSize; y++){
        for (let x = 0; x < gridSize; x++){

            const level = state.walls[y][x];

            if (level >  0) {
                if (level === 1) ctx.fillstyle = "#555";
                if (level === 2) ctx.fillstyle = "#888";
                if (level === 3) ctx.fillstyle = "#fff";
            }

            ctx.fillRect (
                x * cellSize,
                y * cellSize,
                cellSize,
                cellSize
            );
        }
    }
    
}

function drawPlayer(p, color) {

    ctx.fillstyle = color;

    ctx.beginPath();
    ctx.arc(
        p.x * cellSize + cellSize/2,
        p.y * cellSize + cellSize/2,
        cellSize/3,
        0,
        2 * Math.PI
    );
    ctx.fill();
    
}