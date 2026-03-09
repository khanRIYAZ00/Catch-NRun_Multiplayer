const gridSize = 20;

const gameState = {

    runner: { x:1, y:1 },
    catcher: { x:18, y:18 },

    builderPoints: 0,
    eraserPoints: 0,

    timeLeft: 120,

    walls: []
};

for (let y = 0; y < gridSize; y++) {
    gameState.walls[y] = [];

    for (let x = 0; x < gridSize; x++) {
        gameState.walls[y][x] = 0;
    }
}

module.exports = gameState;