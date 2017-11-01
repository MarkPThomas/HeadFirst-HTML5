var videos = {video1: "../video/demovideo1", video2: "../video/demovideo2"};

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
    }
    else if (id === "western")
    {
        pushUnpushButtons("western", ["normal", "noir", "scifi"]);
    }
    else if (id === "noir")
    {
        pushUnpushButtons("noir", ["western", "normal", "scifi"]);
    }
    else if (id === "scifi")
    {
        pushUnpushButtons("scifi", ["western", "noir", "normal"]);
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