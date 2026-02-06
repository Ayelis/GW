// js/engine/renderer.js
import { DEBUG, paths } from './index.js';

const canvas = document.getElementById("myCanvas");
let mapLayer, unitLayer; 
let unitTileset;
const TILE_W = 1000 / 6;
const TILE_H = 800 / 4;

// Make the paper scope global, by injecting it into window:
paper.install(window);

export function initRenderer(canvasId) {
    paper.setup(document.getElementById(canvasId));

    // Created first (index 0) = BOTTOM
    var mapLayer = new paper.Layer({ name: 'mapLayer' });
    mapLayer.name = 'mapLayer';
    var markerLayer = new paper.Layer({ name: 'markerLayer' });
    markerLayer.name = 'markerLayer';
    var unitLayer = new paper.Layer({ name: 'unitLayer' });
    unitLayer.name = 'unitLayer';
    console.log("Active Layer is now:", paper.project.activeLayer.name); 
    
    unitTileset = new paper.Raster('img/units/truck.gif');
    unitTileset.visible = false;
}

// Exportable events used in input functions
export function doCanvasResize() {
	if (DEBUG) console.log("Window size update!");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight);
}
export function drawUnitPoint(x, y, c) {
	let dp = new Path.Circle({
		position: [x, y],
		center: [0, 0],
		radius: 3,
		fillColor: c
	});
    const mLayer = paper.project.layers['markerLayer'];
    if (mLayer) {
        mLayer.addChild(dp);
    }
    return dp;
}
function getCroppedRaster(tileIndex){
    // 0. Calculate the sub-rectangle for the specific sprite
    const col = tileIndex % 6;           // 0 to 5
    const row = Math.floor(tileIndex / 6); // 0 to 3
    
    // 1. Define the tile size
    const rect = new paper.Rectangle(
        col * TILE_W, row * TILE_H+50,
        TILE_W, TILE_H-50
    );

    // 2. Extract
    const sprite = unitTileset.getSubRaster(rect);
    
    // 3. THE RESET: wipes the 'memory' of being at [1000, 800] on the sheet
    sprite.matrix = new paper.Matrix(); 

    // 4. Move the internal geometry so (0,0) is the center of the truck
    sprite.pivot = sprite.bounds.center; 
    sprite.position = new paper.Point(0, 0); 
    // 5. Set the game pivot (the "feet" of the truck)
    sprite.pivot = sprite.bounds.bottomCenter; 
    
    // 6. Move to the Unit Layer so it's above the map
    const uLayer = paper.project.layers['unitLayer'];
    if (uLayer) {
        uLayer.addChild(sprite);
    }
    
    return sprite;
}
export function drawUnitPic(x, y, destX = x, destY = y) {
    if (!unitTileset || !unitTileset.loaded) return;

    // 1. Define necessary variables
    const currentPos = new paper.Point(x, y);
    const destination = new paper.Point(destX, destY);
    const vector = destination.subtract(currentPos);

    const thisUnit = getCroppedRaster(0);
    thisUnit.visible = true;
    thisUnit.position = currentPos;

    return thisUnit; // Return the object so you can move or delete it later
}
// New function for the Unit class to call
export function updateUnitGraphic(unitObject, angle) {
    if (!unitObject.graphic) return;

    let standardAngle = (angle % 360 + 360) % 360;
    let rawFrame = Math.round((standardAngle - 135) / 15);
    let tileIndex = (24 - (rawFrame % 24 + 24) % 24) % 24;
    const currentPos = unitObject.graphic.position.clone();
    
    // Create new, remove old
    const newSprite = getCroppedRaster(tileIndex);
    unitObject.graphic.remove();
    
    // Assign and position
    unitObject.graphic = newSprite;
    unitObject.graphic.position = currentPos;
}
export function sortUnitsByDepth() {
    const uLayer = paper.project.layers['unitLayer'];
    if (!uLayer || uLayer.children.length < 2) return;

    // Sort the children array based on the y-coordinate
    // We use a clone of the array to determine the new order
    const sortedChildren = [...uLayer.children].sort((a, b) => a.position.y - b.position.y);

    // Re-insert them in the new order
    uLayer.addChildren(sortedChildren);
}
export function drawPath(a, b, c, d) {
	console.log("a,b",a,b);
	console.log("c,d",c,d);
	var pl = paths.length || 0;
	paths[pl] = new Path();
	paths[pl].strokeColor = 'gray';
	var start = new Point(a, b);
	var end = new Point(c, d);
	paths[pl].moveTo(start);
	paths[pl].lineTo(end);
}
export function translateView(delta) {
	//paper.view.translate(delta);// Translate the viewport
	paper.view.translate(new paper.Point(delta.x, delta.y));
}

// Only execute our code once the DOM is ready.
window.onload = function() {
	doCanvasResize(); // initial setup
	
  // 1. Load the unit tilesets once
  unitTileset = new paper.Raster('img/units/truck.gif');
  unitTileset.visible = false; // Hide the full sheet
}