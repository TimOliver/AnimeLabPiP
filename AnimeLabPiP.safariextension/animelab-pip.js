
//
//  animelab-pip.js
//
//  Copyright 2017 Timothy Oliver. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to
//  deal in the Software without restriction, including without limitation the
//  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
//  sell copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
//  IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {

	var previousVideoThumbnailURL = "";
	var currentVideoThumbnailURL = "";
	var nextVideoThumbnailURL = "";

	var videoInPiP = false;

	var setUpBackgroundOverlay = function() {
		var backgroundContainer = document.querySelector("#pip-background-overlay-container");
		if (backgroundContainer != null) { return; }

		backgroundContainer = document.createElement("div");
		backgroundContainer.id = "pip-background-overlay-container";
		document.querySelector("#video-component-wrapper").appendChild(backgroundContainer);

		var imageElement = document.createElement("div");
		imageElement.id = "pip-background-image";
		var overlayElement = document.createElement("div");
		overlayElement.id = "pip-background-filter";

		backgroundContainer.appendChild(imageElement);
		backgroundContainer.appendChild(overlayElement);
	};

	var videoPresentationDidChange = function(event) {
		var video = document.querySelector("video.jw-video");
		videoInPiP = video.webkitPresentationMode == "picture-in-picture";

		// Update overlay view as needed
		var overlayView = document.querySelector("#pip-background-overlay-container");
		if (overlayView) {
			overlayView.style.display = videoInPiP ? "block" : "none";
		}
	}

	// Take an image URL, and isolate the first group of numbers in
	// the file name component.
	var getImageID = function(url) {
		var firstIndex = url.lastIndexOf('/');	 // Get to the file portion of the URL
		var imageID = url.substring(firstIndex); // Isolate the file portion
		var lastIndex = imageID.indexOf('_'); // Isolate the portion up to the first underscore
		return imageID.substring(0, lastIndex);  // Isolate just that part of the file na,m
	}

	var compareImageIDsInURLs = function(url1, url2) {
		return (getImageID(url1) == getImageID(url2));
	};

	var updateBackgroundOverlayImages = function() {
		// Set up the initial thumbnail on page load
		if (currentVideoThumbnailURL == "") {
			currentVideoThumbnailURL = 'https:' + document.querySelector('[property="og:image"]').content;
		}

		var nextImage = document.querySelector("#next-video-container img");
		var prevImage = document.querySelector("#prev-video-container img");

		var nextURL = (nextImage != null) ? nextImage.src : "";
		var previousURL = (prevImage != null) ? prevImage.src : "";
		
		// Check to see if we moved forward or backward in video progression
		if (compareImageIDsInURLs(currentVideoThumbnailURL, previousURL)) {
			currentVideoThumbnailURL = nextVideoThumbnailURL;
		}

		if (compareImageIDsInURLs(currentVideoThumbnailURL, nextURL)) {
			currentVideoThumbnailURL = previousVideoThumbnailURL;
		}

		previousVideoThumbnailURL = previousURL;
		nextVideoThumbnailURL = nextURL;

		// Apply the thumbnail image to our image element
		document.querySelector("#pip-background-image").style.backgroundImage = "url('" + currentVideoThumbnailURL + "')";
	};

	var setUpPiPButton = function() {
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
			var video = document.querySelector("video.jw-video");
			video.webkitSetPresentationMode(video.webkitPresentationMode == "inline" ? "picture-in-picture" : "inline");
   		});

		// Append to the container controller
		container.appendChild(pipButton);
	};

	var videoContainerDidMutate = function(mutations) {
		mutations.forEach(function(mutation) {
    		var node = mutation.addedNodes.item(0);
    		if (node == null) { return; }
    		if (node.className != '') {
    			var video = document.querySelector("video.jw-video");
    			video.addEventListener("webkitpresentationmodechanged", videoPresentationDidChange);
    		}
  		});
	};

	var setUpMutationObservers = function() {
		var observer = new MutationObserver(videoContainerDidMutate);
		observer.observe(document.querySelector("#video-component-wrapper"), {childList: true});

		observer = new MutationObserver(updateBackgroundOverlayImages);
		observer.observe(document.querySelector("#next-video-container"), {childList: true, subtree: true});

		observer = new MutationObserver(updateBackgroundOverlayImages);
		observer.observe(document.querySelector("#prev-video-container"), {childList: true, subtree: true});
	};

	var didLoadDomContent = function(event) {
		// Confirm we're on the player page before proceeding
		if (!/animelab\.com\/player\//i.test(window.location.href)) { return; }

		// Create a PiP button and attach it to the player controls
		setUpPiPButton();

		// Set up the background view visible while PiP is active
		setUpBackgroundOverlay();

		// Set up the video container observer
		setUpMutationObservers();
	};

	// Detect when the HTML content has completed loading
	document.addEventListener("DOMContentLoaded", didLoadDomContent);
}());
