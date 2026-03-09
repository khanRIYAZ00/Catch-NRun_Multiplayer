module.exports = function checkCollision(gameState) {

    if (
        gameState.runner.x === gameState.catcher.x &&
        gameState.runner.y === gameState.catcher.y
    ){
        console.log("CATCHER WINS");
    }

};