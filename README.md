# AnimeLab Picture-in-Picture Extension for Safari

![Screenshot](https://raw.githubusercontent.com/TimOliver/AnimeLabPiP/master/screenshot.jpg?token=AAaMP8cq2O5KMuobN48UB_IoGUxjlXHfks5Y8cm6wA%3D%3D)

> A Safari Extension to enable macOS Sierra's Picture-in-Picture feature with [AnimeLab](http://animelab.com)'s web player.



# Installation

1. [Download the Safari extension](https://github.com/TimOliver/AnimeLabPiP/releases/download/1.0.0/AnimeLabPiP.safariextz)
2. Open the extension on a Mac to install it in Safari.
3. Watch a video on AnimeLab using Safari.

# Features

* Enables the system level Picture-in-Picture mode when watching AnimeLab videos in Safari.
* Generates a visually appealing background for the Safari window when Picture-in-Picture is active.
* Executed entirely locally, using only resources already available in the player page.

# Requirements

* A Mac running macOS Sierra 10.12.
* Safari 10.0

# Known Issues

The following are known issues with the extension at the time of writing. Pull requests would be greatly appreciated.

* When a video finishes playback (or is skipped), this will cancel Picture-in-Picture mode. This is because the video player seems to be completely torn down and recreated for each video file, and it doesn't seem possible to easily 're-activate' the mode on the new player.
* Activating Picture-in-Picture mode, and then promptly clicking the fullscreen button may cause odd behaviour.

# License

This library is licensed under the MIT license. Please see [LICENSE](LICENSE) for more details.

Madman Entertainment Pty Ltd has full, unconditional permission to take possession of both the code and assets for this library, if they so desire.


# Legal

*AnimeLab* is a trademark of Madman Entertainment Pty Ltd, registered in Australia.

This is an unofficial third party modification, and is neither officially endorsed or acknowledged by the copyright holder.

*Attack on Titan* © Hajime Isayama, Kondansha Ltd. Usage of said imagery is for illustrative purposes and claimed under fair use pursuant to U.S. copyright law.