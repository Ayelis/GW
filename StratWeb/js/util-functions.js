// Override addEventListener to force passive for touchstart and touchmove
const originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, options) {
  if (type === "touchstart" || type === "touchmove") {
    options = { passive: true, ...options };
  }
  originalAddEventListener.call(this, type, listener, options);
};

$(document).ready(function() {
	// Music functionality
  muteButton = document.getElementById("muteMusic");
  muteButton.addEventListener("click", () => {
      document.getElementById("backgroundMusic").muted = !document.getElementById("backgroundMusic").muted;
			document.getElementById("backgroundMusic").play();
  });

  // Hide panels initially
	$(".panel").hide();
	$("#title").show(); //show title screen

});

//Prevent rightclick menu
const preventMenu = (e) => false;// => e.preventDefault();
if (document.readyState !== 'loading') {
  // Document is already ready
  document.addEventListener("contextmenu", preventMenu);
} else {
  // Wait for the DOM to be ready
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("contextmenu", preventMenu);
  });
}