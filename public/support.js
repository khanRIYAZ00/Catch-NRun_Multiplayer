const socket = io();

const params = new URLSearchParams(window.location.search);
const role = params.get("role");

socket.emmit("joinRole", role);

const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const cellSize = 20;

canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

canvas.addEventListener("click", (e) => {

    const rect = canvas.getBoundingClientRect();

    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);

    socket.emmit("modifyWall", { role, x, y} );
})