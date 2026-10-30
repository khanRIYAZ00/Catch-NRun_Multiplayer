const maxWallLevel = 3;

module.exports = function modifyWall(gameState, role, x, y) {
    if (x < 0 || y < 0 || x >= 20 || y >= 20) return false;

    if (role === "builder") {
        if (gameState.walls[y][x] < maxWallLevel) {
            gameState.walls[y][x]++;
            gameState.builderPoints = (gameState.builderPoints || 0) + 1;
            return true;
        }
        return false;
    }

    if (role === "eraser") {
        if (gameState.walls[y][x] > 0 && (gameState.eraserPoints || 0) > 0) {
            gameState.walls[y][x]--;
            gameState.eraserPoints = (gameState.eraserPoints || 0) - 1;
            return true;
        }
        return false;
    }

    return false;
};