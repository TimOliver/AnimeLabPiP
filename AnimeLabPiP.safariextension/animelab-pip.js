
(function () {
	var setUpBackgroundOverlay = function() {
		var backgroundContainer = document.querySelector("#pip-background-overlay-container");
		if (backgroundContainer != null) { return; }

		backgroundContainer = document.createElement("div");
		backgroundContainer.id = "pip-background-overlay-container";
		document.querySelector("#video-component-wrapper").appendChild(backgroundContainer);

		var imageElement = document.createElement("div");
		imageElement.id = "pip-background-iamge";
		var overlayElement = document.createElement("div");
		overlayElement.id = "pip-background-filter";

		backgroundContainer.appendChild(imageElement);
		backgroundContainer.appendChild(overlayElement);
		
		// Grab the metadata image for this episode and attach it to the overlay
		// (This should preload the image data so it'll be ready by the time we need it)
		var thumbnailElement = document.querySelector('[property="og:image"]');
		if (thumbnailElement == null) { return; }
		var thumbnailURL = 'http:' + thumbnailElement.content;
		
		// Apply the thumbnail image to our image element
		imageElement.style.backgroundImage = "url('" + thumbnailURL + "')";
	};

	var contentLoadedCallback = function(event) {
		// Confirm we're on the player page before proceeding
		if (!/animelab\.com\/player\//i.test(window.location.href)) { return; }

		// Create a dummy video element to test if we can indeed do PiP mode
		var video = document.createElement("video");
		if (!video.webkitSupportsPresentationMode) { return; }

		// Find the player container
		var container = document.querySelector('.video-controls');
		if (!container) { return; }

		// Create the PiP Button
		var pipButton = document.createElement("div");
		pipButton.className = "video-pip control-btn must-show has-tooltip";
		pipButton.setAttribute("data-toggle", "tooltip");
		pipButton.setAttribute("data-title", "Toggle PiP");
		pipButton.setAttribute("data-placement", "top");
		pipButton.addEventListener("click", function(event) {
			var video = document.querySelector(".jw-video");
			var inPiP = (video.webkitPresentationMode === "picture-in-picture");
        	video.webkitSetPresentationMode(inPiP ? "inline" : "picture-in-picture");
   		});

		// Append to the container controller
		container.appendChild(pipButton);

		// Set up the background view visible while PiP is active
		setUpBackgroundOverlay();
	};

	// Detect when the HTML content has completed loading (but don't wait for images/media etc)
	document.addEventListener("DOMContentLoaded", contentLoadedCallback);
}());
