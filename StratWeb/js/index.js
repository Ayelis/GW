// Core imports
import { initializeGame, gameLoop, initializeTerritories }
	from './engine/index.js';

// Debug mode
export const DEBUG = true;

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM fully loaded"); // Debugging

	if (!paper.view) {
		paper.setup('myCanvas');
	}
	console.log("paper.view:", paper.view); // Debugging

  function loadGame(){
		// Initialize the game
		initializeGame(); //js/engine/init.js
		// Add the map
		initializeTerritories(); //js/engine/state.js

		// Start the game loop
		paper.view.onFrame = (event) => {
			gameLoop(event.delta); //js/engine/loop.js
		};
    
    // Hide panels [title screen/etc] and show game [game screen]
		console.log("hiding panels, showing game");
		$(".panel").hide();
    $("#game").show();
  }
  $("#joinGameButton").click(loadGame);
});