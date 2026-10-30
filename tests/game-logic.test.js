const test = require('node:test');
const assert = require('node:assert/strict');

const { applyMove, applyWallModification } = require('../game/logic');
const gameState = require('../game/gameState');

test('applyMove moves a player within bounds and stops at walls', () => {
  const state = {
    runner: { x: 1, y: 1 },
    catcher: { x: 3, y: 3 },
    walls: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  };

  applyMove(state, 'runner', 1, 0);
  assert.deepEqual(state.runner, { x: 2, y: 1 });

  state.walls[1][3] = 1;
  applyMove(state, 'runner', 1, 0);
  assert.deepEqual(state.runner, { x: 2, y: 1 });
});

test('applyWallModification adds or removes wall cells with the correct role and coordinates', () => {
  const state = {
    runner: { x: 1, y: 1 },
    catcher: { x: 3, y: 3 },
    builderPoints: 0,
    eraserPoints: 0,
    walls: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  };

  applyWallModification(state, 'builder', 2, 1);
  assert.equal(state.walls[1][2], 1);
  assert.equal(state.builderPoints, 1);

  applyWallModification(state, 'eraser', 2, 1);
  assert.equal(state.walls[1][2], 0);
  assert.equal(state.eraserPoints, 1);
});
