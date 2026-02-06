// js/engine/init.js
import {	DEBUG, setupInputHandlers, drawPath,
          player, tool, touch, paths }
	from './index.js';
import {	initRenderer }
	from './renderer.js';

export function initializeGame() {
  // Initialize renderer
	initRenderer('myCanvas'); //js/engine/renderer.js
	// Set up input handlers
	setupInputHandlers(tool, touch); //js/engine/input-handler.js

	if(DEBUG) console.log("Game initialized!");
}
