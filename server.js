const express = require("express");
const http = require("http");
const os = require("os");
const { execSync } = require("child_process");
const { Server } = require("socket.io");

const gameState = require("./game/gameState");
const { applyMove, applyWallModification } = require("./game/logic");
const checkCollision = require("./game/collision");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

function getLocalIp() {
  try {
    const output = execSync("hostname -I", { encoding: "utf8" }).trim();
    const first = output.split(/\s+/).find((ip) => ip.includes("."));
    if (first) return first;
  } catch (error) {
    // fallback below
  }

  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const config of interfaces[name] || []) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }

  return "localhost";
}

app.use(express.static("public"));
app.get("/api/network-ip", (_req, res) => {
  res.json({ ip: getLocalIp() });
});

const roles = {
  runner: null,
  catcher: null,
  builder: null,
  eraser: null
};

let timerId = null;

function broadcast() {
  io.emit("gameState", gameState);
}

function startTimer() {
  if (timerId) clearInterval(timerId);

  timerId = setInterval(() => {
    if (gameState.timeLeft > 0) {
      gameState.timeLeft -= 1;
      broadcast();
    } else {
      clearInterval(timerId);
      timerId = null;
    }
  }, 1000);
}

function resetGame() {
  gameState.reset();
  broadcast();
  startTimer();
}

io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);
  socket.emit("gameState", gameState);

  socket.on("joinRole", (role) => {
    if (!role || !Object.prototype.hasOwnProperty.call(roles, role)) {
      return;
    }

    roles[role] = socket.id;
    console.log(role + " joined with id: " + socket.id);
  });

  socket.on("move", (data) => {
    if (!data || !data.player || roles[data.player] !== socket.id) {
      return;
    }

    if (!["runner", "catcher"].includes(data.player)) {
      return;
    }

    applyMove(gameState, data.player, Number(data.dx) || 0, Number(data.dy) || 0);
    checkCollision(gameState);
    broadcast();
  });

  socket.on("modifyWall", (data) => {
    if (!data || !data.role || roles[data.role] !== socket.id) {
      return;
    }

    if (!["builder", "eraser"].includes(data.role)) {
      return;
    }

    const x = Number(data.x);
    const y = Number(data.y);

    if (Number.isInteger(x) && Number.isInteger(y)) {
      applyWallModification(gameState, data.role, x, y);
      checkCollision(gameState);
      broadcast();
    }
  });

  socket.on("newGame", () => {
    resetGame();
  });

  socket.on("disconnect", () => {
    for (const role in roles) {
      if (roles[role] === socket.id) {
        roles[role] = null;
        console.log(role + " disconnected with id: " + socket.id);
      }
    }
  });
});

gameState.reset();
startTimer();

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});