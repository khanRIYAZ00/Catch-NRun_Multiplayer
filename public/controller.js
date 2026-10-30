const socket = io();

const params = new URLSearchParams(window.location.search);
const role = params.get("role");

const roleLabel = document.getElementById("role");
const movePad = document.getElementById("movePad");
const editor = document.getElementById("wallEditor");
const liveBoardWrap = document.getElementById("liveBoardWrap");
const liveBoardCanvas = document.getElementById("liveBoard");
const liveBoardCtx = liveBoardCanvas ? liveBoardCanvas.getContext("2d") : null;

if (roleLabel) roleLabel.textContent = "Role: " + role;

if (role) {
  socket.emit("joinRole", role);
}

function move(dx, dy) {
  if (!role) return;
  socket.emit("move", { player: role, dx, dy });
}

function modifyWallFromCell(x, y) {
  if (!role || !["builder", "eraser"].includes(role)) return;
  socket.emit("modifyWall", { role, x, y });
}

function drawLiveBoard(state) {
  if (!liveBoardCtx || !state || !liveBoardCanvas) return;

  const gridSize = 20;
  const cellSize = liveBoardCanvas.width / gridSize;

  liveBoardCtx.clearRect(0, 0, liveBoardCanvas.width, liveBoardCanvas.height);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      liveBoardCtx.strokeStyle = "#334155";
      liveBoardCtx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);

      const wallLevel = state.walls[y][x];
      if (wallLevel > 0) {
        if (wallLevel === 1) liveBoardCtx.fillStyle = "#475569";
        if (wallLevel === 2) liveBoardCtx.fillStyle = "#64748b";
        if (wallLevel === 3) liveBoardCtx.fillStyle = "#e2e8f0";
        liveBoardCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  const drawPlayer = (player, color) => {
    if (!player) return;
    liveBoardCtx.fillStyle = color;
    liveBoardCtx.beginPath();
    liveBoardCtx.arc(
      player.x * cellSize + cellSize / 2,
      player.y * cellSize + cellSize / 2,
      cellSize / 2.8,
      0,
      Math.PI * 2
    );
    liveBoardCtx.fill();
  };

  drawPlayer(state.runner, "#f87171");
  drawPlayer(state.catcher, "#4ade80");
}

function drawWallGrid(state) {
  const wallEditorCanvas = document.getElementById("wallGrid");
  if (!wallEditorCanvas || !state) return;

  const ctx = wallEditorCanvas.getContext("2d");
  const gridSize = 20;
  const cellSize = wallEditorCanvas.width / gridSize;

  ctx.clearRect(0, 0, wallEditorCanvas.width, wallEditorCanvas.height);

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      ctx.strokeStyle = "#475569";
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);

      const wallLevel = state.walls[y][x];
      if (wallLevel > 0) {
        if (wallLevel === 1) ctx.fillStyle = "#475569";
        if (wallLevel === 2) ctx.fillStyle = "#64748b";
        if (wallLevel === 3) ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }

  const drawPlayer = (player, color) => {
    if (!player) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
      player.x * cellSize + cellSize / 2,
      player.y * cellSize + cellSize / 2,
      cellSize / 2.7,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  drawPlayer(state.runner, "#f87171");
  drawPlayer(state.catcher, "#4ade80");
}

socket.on("gameState", (state) => {
  if (["runner", "catcher"].includes(role)) {
    drawLiveBoard(state);
    return;
  }

  if (["builder", "eraser"].includes(role)) {
    drawWallGrid(state);
  }
});

if (movePad && ["runner", "catcher"].includes(role)) {
  movePad.style.display = "block";
  if (liveBoardWrap) liveBoardWrap.style.display = "none";
  document.querySelectorAll("[data-move]").forEach((button) => {
    const [dx, dy] = button.dataset.move.split(",").map(Number);
    button.addEventListener("click", () => move(dx, dy));
  });
}

if (editor && ["builder", "eraser"].includes(role)) {
  editor.style.display = "block";
  if (liveBoardWrap) liveBoardWrap.style.display = "none";

  const gridSize = 20;
  const cellSize = 16;
  const canvas = document.getElementById("wallGrid");
  canvas.width = gridSize * cellSize;
  canvas.height = gridSize * cellSize;

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    modifyWallFromCell(x, y);
  });
}

window.addEventListener("keydown", (event) => {
  if (!["runner", "catcher"].includes(role)) return;

  if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") move(0, -1);
  if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") move(0, 1);
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") move(-1, 0);
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") move(1, 0);
});