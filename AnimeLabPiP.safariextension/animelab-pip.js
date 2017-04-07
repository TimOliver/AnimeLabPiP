
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

	var didLoadDomContent = function(event) {
		// Confirm we're on the player page before proceeding
		if (!/animelab\.com\/player\//i.test(window.location.href)) { return; }

		// Test to see if video tags in this version of Safari support PiP
		var video = document.createElement("video");
		if (!video.webkitSupportsPresentationMode) { return; }

		// Create a PiP button and attach it to the player controls
		setUpPiPButton();
	};

	// Detect when the HTML content has completed loading
	document.addEventListener("DOMContentLoaded", didLoadDomContent);
}());
