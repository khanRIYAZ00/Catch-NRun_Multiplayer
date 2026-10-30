const socket = io();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const timerEl = document.getElementById("timer");
const builderCountEl = document.getElementById("builderCount");
const eraserCountEl = document.getElementById("eraserCount");
const newGameButton = document.getElementById("newGameButton");

const gridSize = 20;
const cellSize = 30;

canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

let state;

socket.on("gameState", (gameState) => {
    state = gameState;
    updateHud();
    draw();
});

function updateHud() {
    if (!state) return;

    if (timerEl) timerEl.textContent = `Time: ${state.timeLeft}`;
    if (builderCountEl) builderCountEl.textContent = `Builder: ${state.builderPoints ?? 0}`;
    if (eraserCountEl) eraserCountEl.textContent = `Eraser: ${state.eraserPoints ?? 0}`;
}

function draw() {
    if (!state) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawWalls();

    drawPlayer(state.runner, "red");
    drawPlayer(state.catcher, "green");
}

function drawGrid() {
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            ctx.strokeStyle = "#333";
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function drawWalls() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const level = state.walls[y][x];

            if (level > 0) {
                if (level === 1) ctx.fillStyle = "#555";
                if (level === 2) ctx.fillStyle = "#888";
                if (level === 3) ctx.fillStyle = "#fff";

                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

function drawPlayer(p, color) {
    if (!p) return;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
        p.x * cellSize + cellSize / 2,
        p.y * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        2 * Math.PI
    );
    ctx.fill();
}

if (newGameButton) {
    newGameButton.addEventListener("click", () => {
        socket.emit("newGame");
    });
}