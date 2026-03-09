const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const gameState = require("./game/gameState");
const movePlayer = require("./game/movement");
const modifyWall = require("./game/walls");
const checkCollision = require("./game/collision");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const roles = {
  runner: null,
  chatcher: null,
  builder: null,
  eraser: null
};

io.on("connection", (socket) => {

  console.log("Client connected: ", socket.id);

  socket.emit("gameState", gameState);

  socket.on("joinRole", (role) => {
    if (!roles[role]) {
      roles[role] = socket.id;
      console.log(role + " joined with id: " + socket.id);
    }
  });

  socket.on("move", (data) => {
    
    if (roles[data.player] !== socket.id) return;

    movePlayer(gameState, data.player, data.dx, data.dy);

    checkCollision(gameState);

    io.emit("gameState", gameState);
  });

  socket.on("modifyWall", (data) => {

    if (roles[data.role] !== socket.id) return;

    modifyWall(gameState, data.player, data.dx, data.dy);

    checkCollision(gameState);

    io.emit("gameState", gameState);
  });

  socket.on("disconnect", () => {

    for (let role in roles) {
      if (roles[role] === socket.id) {
        roles[role] = null;
        console.log(role + " disconnected with id: " + socket.id);
      }
    }
  });

});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});