const gridSize = 20;

const gameState = {
    runner: { x:1, y:1 },
    catcher: { x:18, y:18 },
    builderPoints: 0,
    eraserPoints: 0,
    timeLeft: 120,
    walls: []
};

function createEmptyWalls() {
    const walls = [];

    for (let y = 0; y < gridSize; y++) {
        walls[y] = [];
        for (let x = 0; x < gridSize; x++) {
            walls[y][x] = 0;
        }
    }

    return walls;
}

function generateRandomWalls(density = 0.18) {
    const walls = createEmptyWalls();
    const blocked = new Set();

    blocked.add("1,1");
    blocked.add("18,18");

    const candidates = [];

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const key = `${x},${y}`;
            if (!blocked.has(key)) {
                candidates.push({ x, y });
            }
        }
    }

    const wallCount = Math.max(10, Math.floor(candidates.length * density));

    for (let i = 0; i < wallCount; i++) {
        const index = Math.floor(Math.random() * candidates.length);
        const cell = candidates.splice(index, 1)[0];
        walls[cell.y][cell.x] = Math.floor(Math.random() * 3) + 1;
    }

    return walls;
}

function resetGameState() {
    gameState.runner = { x: 1, y: 1 };
    gameState.catcher = { x: gridSize - 2, y: gridSize - 2 };
    gameState.builderPoints = 0;
    gameState.eraserPoints = 0;
    gameState.timeLeft = 120;
    gameState.walls = generateRandomWalls();
    return gameState;
}

gameState.walls = createEmptyWalls();
gameState.reset = resetGameState;
gameState.generateRandomWalls = generateRandomWalls;

module.exports = gameState;