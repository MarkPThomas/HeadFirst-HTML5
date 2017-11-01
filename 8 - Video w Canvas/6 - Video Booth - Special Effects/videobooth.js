var videos = {video1: "../video/demovideo1", video2: "../video/demovideo2"};
var effectFunction = null;

window.onload = function()
{
    var video = document.getElementById("video");
    video.src = videos.video1 + getFormatExtension();
    video.load();

    var controlLinks = document.querySelectorAll("a.control");
    for (var i = 0; i < controlLinks.length; i++)
    {
        controlLinks[i].onclick = handleControl;
    }

    var effectLinks = document.querySelectorAll("a.effect");
    for (var i = 0; i < effectLinks.length; i++)
    {
        effectLinks[i].onclick = setEffect;
    }

    var videoLinks = document.querySelectorAll("a.videoSelection");
    for (var i = 0; i < videoLinks.length; i++)
    {
        videoLinks[i].onclick = setVideo;
    }

    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);

    video.addEventListener("play", processFrame, false);

    // This will cause the play button to pop back up when the video has ended.
    video.addEventListener("ended", endedHandler, false);
};


function endedHandler()
{
    pushUnpushButtons("", ["play"]);
}

function getFormatExtension()
{
    var video = document.getElementById("video");
    if(video.canPlayType("video/mp4") !== "")
    {
        return ".mp4";
    }
    else if (video.canPlayType("video/webm") !== "")
    {
        return ".webm";
    }
    else if (video.canPlayType("video/pgg") !== "")
    {
        return ".ogv";
    }
}

function handleControl(e)
{
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");

    if (id === "play")
    {
        pushUnpushButtons("play", ["pause"]);

        // If we've played a video and let the video play to the end, then to start playing it again
        // we have to load it again first.
        // We check to make sure the video ran through to the end (and wasn't just paused),
        // because we want to load again in that case.
        // If it's paused, we can just play without loading.
        if (video.ended)
        {
            video.load();
        }
        video.play();
    }
    else if (id === "pause")
    {
        pushUnpushButtons("pause", ["play"]);
        video.pause();
    }
    else if (id === "loop")
    {
        if (isButtonPushed("loop"))
        {
            pushUnpushButtons("", ["loop"]);
        }
        else
        {
            pushUnpushButtons("loop", []);
        }
        video.loop = !video.loop;
    }
    else if (id === "mute")
    {
        if (isButtonPushed("mute"))
        {
            pushUnpushButtons("", ["mute"]);
        }
        else
        {
            pushUnpushButtons("mute", []);
        }
        video.muted = !video.muted;
    }
}

function setEffect(e)
{
    var id = e.target.getAttribute("id");

    if (id === "normal")
    {
        pushUnpushButtons("normal", ["western", "noir", "scifi"]);
        effectFunction = null;
    }
    else if (id === "western")
    {
        pushUnpushButtons("western", ["normal", "noir", "scifi"]);
        effectFunction = western;
    }
    else if (id === "noir")
    {
        pushUnpushButtons("noir", ["western", "normal", "scifi"]);
        effectFunction = noir;
    }
    else if (id === "scifi")
    {
        pushUnpushButtons("scifi", ["western", "noir", "normal"]);
        effectFunction = scifi;
    }
}

function setVideo(e)
{
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");

    if (id === "video1")
    {
        pushUnpushButtons("video1", ["video2"])
    }
    else if (id === "video2")
    {
        pushUnpushButtons("video2", ["video1"])
    }

    video.src = videos[id] + getFormatExtension();
    video.load();
    video.play();

    // We make sure the play button is pushed in because we start the video playing when the user clicks
    // on a new video selection.
    pushUnpushButtons("play", ["pause"]);
}

function pushUnpushButtons(idToPush, idArrayToUnpush)
{
    if (idToPush !== "")
    {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute("class")
        if (!theClass.indexOf("selected") >= 0)
        {
            theClass = theClass + " selected";
            anchor.setAttribute("class", theClass);
            var newImage = "url(../images/" + idToPush + "pressed.png";
            anchor.style.backgroundImage = newImage;
        }
    }

    for (var i = 0; i < idArrayToUnpush.length; i++)
    {
        var anchor = document.getElementById(idArrayToUnpush[i]);
        var theClass = anchor.getAttribute("class");
        if (theClass.indexOf("selected") >= 0)
        {
            theClass = theClass.replace("selected", "");
            anchor.setAttribute("class", theClass);
            anchor.style.backgroundImage = "";
        }
    }
}

function isButtonPushed(id)
{
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");
    return (theClass.indexOf("selected") >= 0)
}

function processFrame()
{
    var video = document.getElementById("video");
    if (video.paused || video.ended)
    {
        return;
    }

    var displayCanvas = document.getElementById("display");
    var display = displayCanvas.getContext("2d");
    var bufferCanvas = document.getElementById("buffer");
    var buffer = bufferCanvas.getContext("2d");
    buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);

    // Getting all image data in the canvas.
    var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

    // 4x longer than the size of the canvas because each pixel has 4 values: R, G, B, A
    var length = frame.data.length / 4;

    for (var i = 0; i < length; i++)
    {
        if (effectFunction)
        {
            // Each pixel takes up 4 spaces in the array (R,G,B,A)
            var r = frame.data[i * 4 + 0];
            var g = frame.data[i * 4 + 1];
            var b = frame.data[i * 4 + 2];
            effectFunction(i, r, g, b, frame.data);
        }

        // Writes the processed buffer canvas onto the visible display canvas.
        //var displayCanvas = document.getElementById("display");
        //var display = displayCanvas.getContext("2d");
        display.putImageData(frame, 0, 0);
    }

    // Tells JavaScript to run processFrame again as soon as possible.
    // Chrome does not work with this:
    //setTimeout(processFrame, 0);
    // try this line instead of the setTimeout above if you are on Chrome
    requestAnimationFrame(processFrame);
}

// Pass in the pixel position, r g, b values, and frame data array
function noir(position, r, g, b, data)
{
    var brightness = (3*r + 4*g + b) >>> 3;
    if (brightness < 0) brightness = 0;
    data[position * 4 + 0] = brightness;
    data[position * 4 + 1] = brightness;
    data[position * 4 + 2] = brightness;
}

function western(position, r, g, b, data)
{
    var brightness = (3*r + 4*g + b) >>> 3;
    data[position * 4 + 0] = brightness + 40;
    data[position * 4 + 1] = brightness + 20;
    data[position * 4 + 2] = brightness - 20;
}

function scifi(position, r, g, b, data)
{
    var offset = position * 4;
    data[offset + 0] = Math.round(255 - r);
    data[offset + 1] = Math.round(255 - g);
    data[offset + 2] = Math.round(255 - b);
}

/*
 * bwcartoon is an extra filter for an exercise
 */
function bwcartoon(position, r, g, b, outputData)
{
    var offset = position * 4;
    if (outputData[offset] < 120)
    {
        outputData[offset] = 80;
        outputData[++offset] = 80;
        outputData[++offset] = 80;
    }
    else
    {
        outputData[offset] = 255;
        outputData[++offset] = 255;
        outputData[++offset] = 255;
    }
    outputData[++offset] = 255;
    ++ offset;
}