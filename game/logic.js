const GRID_SIZE = 20;
const MAX_WALL_LEVEL = 3;

function applyMove(gameState, player, dx, dy, gridSize = GRID_SIZE) {
  const p = gameState[player];

  if (!p) return false;

  const nextX = p.x + dx;
  const nextY = p.y + dy;

  if (
    nextX < 0 ||
    nextX >= gridSize ||
    nextY < 0 ||
    nextY >= gridSize
  ) {
    return false;
  }

  if (gameState.walls[nextY] && gameState.walls[nextY][nextX] > 0) {
    return false;
  }

  p.x = nextX;
  p.y = nextY;
  return true;
}

function applyWallModification(gameState, role, x, y) {
  if (
    x < 0 ||
    y < 0 ||
    x >= GRID_SIZE ||
    y >= GRID_SIZE ||
    !gameState.walls ||
    !gameState.walls[y]
  ) {
    return false;
  }

  if (role === 'builder') {
    if (gameState.walls[y][x] < MAX_WALL_LEVEL) {
      gameState.walls[y][x] += 1;
      gameState.builderPoints = (gameState.builderPoints || 0) + 1;
      return true;
    }
    return false;
  }

  if (role === 'eraser') {
    if (gameState.walls[y][x] > 0) {
      gameState.walls[y][x] -= 1;
      gameState.eraserPoints = (gameState.eraserPoints || 0) + 1;
      return true;
    }
    return false;
  }

  return false;
}

module.exports = {
  GRID_SIZE,
  MAX_WALL_LEVEL,
  applyMove,
  applyWallModification
};
