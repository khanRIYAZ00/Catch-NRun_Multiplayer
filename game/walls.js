const maxWallLevel = 3;

module.exports = function modifyWall(gameState, role, x, y) {

    if (role === "builder") {

        if (gameState.walls[y][x] < maxWallLevel) {

            gameState.walls[y][x]++;

            gameState.builderPoints++;
            gameState.eraserPoints++;
        }
    }

    if (role === "eraser") {

        if (gameState.walls[y][x] > 0 && gameState.eraserPoints > 0) {

            gameState.walls[y][x]--;
            gameState.eraserPoints--;
        }
    }

};