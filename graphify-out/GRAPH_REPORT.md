# Graph Report - Catch-NRun_Multiplayer  (2026-09-20)

## Corpus Check
- 15 files · ~3,411 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 119 nodes · 136 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c3146755`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- qrcode.js
- server.js
- package.json
- controller.js
- display.js
- game-logic.test.js
- support.js
- dependencies
- qr.js

## God Nodes (most connected - your core abstractions)
1. `draw()` - 4 edges
2. `generateRandomWalls()` - 3 edges
3. `applyMove()` - 3 edges
4. `applyWallModification()` - 3 edges
5. `scripts` - 3 edges
6. `getLocalBaseUrl()` - 3 edges
7. `broadcast()` - 3 edges
8. `startTimer()` - 3 edges
9. `resetGame()` - 3 edges
10. `createEmptyWalls()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (11 total, 2 thin omitted)

### Community 0 - "qrcode.js"
Cohesion: 0.11
Nodes (19): home_riyaz_khan_desktop_catch_catch_nrun_multiplayer_public_vendor_can_promise, home_riyaz_khan_desktop_catch_catch_nrun_multiplayer_public_vendor_core_qrcode, home_riyaz_khan_desktop_catch_catch_nrun_multiplayer_public_vendor_renderer_canvas, home_riyaz_khan_desktop_catch_catch_nrun_multiplayer_public_vendor_renderer_svg_tag_js, canPromise, CanvasRenderer, QRCode, renderCanvas() (+11 more)

### Community 1 - "server.js"
Cohesion: 0.11
Nodes (19): applyMove(), applyWallModification(), ref_child_process, ref_http, ref_os, app, { applyMove, applyWallModification }, broadcast() (+11 more)

### Community 2 - "package.json"
Cohesion: 0.13
Nodes (14): author, description, keywords, license, main, name, scripts, start (+6 more)

### Community 3 - "controller.js"
Cohesion: 0.15
Nodes (8): editor, liveBoardCanvas, liveBoardWrap, movePad, params, role, roleLabel, socket

### Community 4 - "display.js"
Cohesion: 0.19
Nodes (11): builderCountEl, canvas, ctx, draw(), drawGrid(), drawPlayer(), drawWalls(), eraserCountEl (+3 more)

### Community 5 - "game-logic.test.js"
Cohesion: 0.20
Nodes (10): createEmptyWalls(), gameState, generateRandomWalls(), resetGameState(), ref_node_assert, ref_node_test, { applyMove, applyWallModification }, assert (+2 more)

### Community 6 - "support.js"
Cohesion: 0.33
Nodes (5): canvas, ctx, params, role, socket

### Community 7 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, express, qrcode, react-qr-code, socket.io

### Community 8 - "qr.js"
Cohesion: 0.60
Nodes (4): buildAppUrl(), getLocalBaseUrl(), renderQrCards(), roles

## Knowledge Gaps
- **61 isolated node(s):** `gameState`, `name`, `version`, `description`, `main` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 78 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `express` connect `package.json` to `server.js`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `socket.io` connect `package.json` to `server.js`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `gameState`, `name`, `version` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `qrcode.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `server.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1067193675889328 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._