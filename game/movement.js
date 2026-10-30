module.exports = function movePlayer(gameState, player, dx, dy) {
    const gridSize = 20;
    const p = gameState[player];

    if (!p) return false;

    const newX = p.x + dx;
    const newY = p.y + dy;

    if (
        newX >= 0 &&
        newX < gridSize &&
        newY >= 0 &&
        newY < gridSize &&
        gameState.walls[newY][newX] === 0
    ) {
        p.x = newX;
        p.y = newY;
        return true;
    }

    return false;
};