// js/engine/input-handler.js
import { 	DEBUG, touch, units, translateView, doCanvasResize,
			toggleSelect, buildUnit }
	from './engine.js';

let isPanning = false;
let startPoint = null;
let lastPanPoint = null;
let startZoom = 1;
let lastZoom = 1;
const panThreshold = 10; // Min pixels to trigger panning

function doTouch(point){
	if(DEBUG) console.log("TOUCHED at: " + point + " | TouchType(MSW): "+touch.mode+", "+touch.selected+", "+touch.which);
	switch(touch.mode){
		case 2: //move unit
			var id=touch.which;
			if(typeof(units[id]) != typeof(undefined)){
				if(touch.selected==1){
					units[id].destination = point; //move the 0th unit
					if(DEBUG) console.log("Unit "+touch.which+" moving to "+point);
				}else{
					if(DEBUG) console.log("Warning! Unit not selected!");						
				}
			}else{
				if(DEBUG) console.log("ERROR! Undefined ID: "+touch.which);
			}
			doModeSelect(); //and return to select mode
		break;
		case 1: //select object // TOGGLE!!
			toggleSelect(point); //interact.js
		break;
		default: //build unit // ANYWHERE!!
			let newguy = units.length||0;
			buildUnit(newguy,point,units);
			doModeSelect(); //and return to select mode
		break;
	}
}
function doModeBuild(){
	if(DEBUG) console.log("[Build Mode selected]");
	document.getElementById("build").innerHTML=("Build!");
	touch.mode=0;
}
function doModeSelect(){
	if(DEBUG) console.log("[Select Mode selected]");
	let move=document.getElementById("move");
	let build=document.getElementById("build");
	if(move) move.innerHTML=("Move");
	if(build) build.innerHTML=("Build");
	if(touch.mode!=1){
		touch.mode=1;
	}
	let point = {x:0,y:0};
}
function doModeMove(){
	if(DEBUG) console.log("[Move Mode selected]");
	if(units.length===0){
		if(DEBUG) console.log("No units to move! Canceling...");
		return;
	}
	if(touch.selected !== 1){
		if(DEBUG) console.log("Unit not selected! Canceling...");
		return;
	}
	document.getElementById("move").innerHTML=("Move!");
	touch.mode=2;
}
function onMouseWheel(event) {
    let newZoom;
	let additive = true;
    let zoomFactor = 1.05; // Zoom factor for each multiplicative scroll step
    let zoomStep = .05; // Zoom step for each additive scroll step

    let direction = event.tool.deltaY < 0 ? 1 : -1; // Scroll up: 1 (zoom in), scroll down: -1 (zoom out)

    // Calculate new zoom level based on current zoom and direction
    if(additive)
	    newZoom = view.zoom + (direction === 1 ? zoomStep : -1 * zoomStep);
    else
	    newZoom = view.zoom * (direction === 1 ? zoomFactor : 1 / zoomFactor);

    // Limit and round zoom range
    newZoom = Math.round( Math.max(0.5, Math.min(newZoom, 2.5)) * 100) / 100; // Min zoom: 0.5, Max zoom: 5

    // Get the mouse position in view coordinates
    let mousePos = new paper.Point(event.tool.x, event.tool.y);

    // Convert mouse position to project coordinates
    let mousePosProject = view.viewToProject(mousePos);

    // Calculate the delta needed to keep the mouse position fixed
    let zoomRatio = newZoom / view.zoom;
    let inverseZoom = 1 / zoomRatio; // Step 1: Calculate inverse zoom
    let scaleFactor = 1 - inverseZoom; // Step 2: Subtract from 1

	let delta = view.center.subtract(mousePosProject).multiply(1 - 1 / zoomRatio);
    view.zoom = newZoom;
    view.translate(delta); // Translate the view to keep the mouse position fixed

    lastZoom = newZoom;
	if (DEBUG) console.log("Z Level:", lastZoom);
}

export function setupInputHandlers(tool, button, touch) {
	//INPUTS
	tool.onMouseDown = function(event) {
		startPoint = event.point;
		isPanning = false; // Reset panning state
	}
    tool.onMouseDrag = function(event) {
	    if (!isPanning && startPoint) {
	        const currentPoint = event.point.clone();
	        const zoomAdjustedThreshold = panThreshold / paper.view.zoom;
	        let movedDistance = startPoint.getDistance(currentPoint);
	        
	        if (movedDistance > zoomAdjustedThreshold) {
	            isPanning = true;
	            if (DEBUG) console.log("panning!");
	            lastPanPoint = currentPoint;
	        }
	    }
	    
	    if (isPanning) {
	        // Use browser's native movementX/Y which is more reliable
			// Scale the movement by inverse zoom to compensate for zoom level
			const zoomFactor = 1.1 / paper.view.zoom;
			const delta = new paper.Point(
				event.event.movementX * zoomFactor,
				event.event.movementY * zoomFactor
			);
	        //const delta = new paper.Point(event.event.movementX, event.event.movementY);
	        translateView(delta);
	        
	        // Still update lastPanPoint for consistency
	        lastPanPoint = event.point.clone();
	    }
	};
    tool.onMouseUp = function(event) {
		if (!isPanning) {
			doTouch(event.point); // Call existing touch handler
		};
	}
	// Add a single event listener to the infoPanel
	const infoPanel = document.getElementById('infoPanel');
  function doInfoPanel(){
		if (event.target.id === 'build') {
			doModeBuild();
		} else if (event.target.id === 'move') {
			doModeMove();
		}
	};
	infoPanel.addEventListener('click', (event) => { doInfoPanel(event); });
	infoPanel.addEventListener('touch', (event) => { doInfoPanel(event); });

	window.addEventListener("resize", doCanvasResize); //renderer.js
	document.addEventListener("wheel", (event) => {
		onMouseWheel(new paper.ToolEvent(event));
	}, { passive: false });
	document.addEventListener("keydown", (event) => {
		switch (event.key.toLowerCase()) {
			case "m":doModeMove();break;
			case "s":doModeSelect();break;
			case "b":doModeBuild();break;
		}
	});

  function doNavButton(button){
		const windowId = button.getAttribute("data-window") + "-window";
		const windowPane = document.getElementById(windowId);
		const overlay = document.querySelector(".overlay");

			if (windowPane && overlay) {
			  windowPane.classList.add("active");
			  overlay.classList.add("active");
			} else if (overlay) {
			  console.error("window not found!");
			} else if (windowPane) {
			  console.error("overlay not found!");
			}
  }
	// Interface Button listeners
	// Show window when nav button is clicked
	document.querySelectorAll("nav button").forEach(button => {
	  button.addEventListener("click", () => { doNavButton(button); });
	  button.addEventListener("touch", () => { doNavButton(button); });
	});

	// Close panel window when close button is clicked or clicking outside
	function doCloseEvent(windowPane,event){
		if (event.target.classList.contains("close-btn") || event.target === window) {
		  if(windowPane.classList) windowPane.classList.remove("active");
		  document.querySelector(".overlay").classList.remove("active");
		  console.log(document.querySelector(".overlay").classList);
		}
  }
	document.querySelectorAll(".window").forEach(windowPane => {
	  windowPane.addEventListener("click", (event) => { doCloseEvent(windowPane,event); });
	  windowPane.addEventListener("touch", (event) => { doCloseEvent(windowPane,event); });
	});

	// Close panel window when clicking on the overlay
	function doOverlayClose(){
	  document.querySelectorAll(".window").forEach(windowPane => {
		windowPane.classList.remove("active");
	  });
	  document.querySelector(".overlay").classList.remove("active");
  }
	document.querySelector(".overlay").addEventListener("click", () => { doOverlayClose(); });
	document.querySelector(".overlay").addEventListener("touch", () => { doOverlayClose(); });

	// Close panel window and deselect objects when pressing escape
	$(document).on('keydown', function(event) {
    if (event.key === "Escape") {
  	  $('.window').removeClass("active");
		  $('.overlay').removeClass("active");
	  }
  });
}
