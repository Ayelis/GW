import { units } from './index.js';
import { sortUnitsByDepth } from './renderer.js';

export function gameLoop(delta) {
  // Update all units movements
  units.forEach(unit => unit.update(delta)); //js/class/unit.js
  // Sort them so they overlap correctly
  sortUnitsByDepth();
  // Move NPCs
  // Check for Units collide/attack
  // Check for Research complete
  // Check for Build/Training complete
  // Check for Spawn insurgents/zombies/npcs
}