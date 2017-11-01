var position = 0;
var playlist;
var video;

window.onload = function()
{
    playlist = ["../video/prerollfake",
                "../video/areyoupopularfake",
                "../video/destinationearthfake"];
    video = document.getElementById("video");
    video.addEventListener("ended", nextVideo, false);
    video.addEventListener("error", errorHandler, false);

    video.src = playlist[position] + getFormatExtension();
    video.load();
    video.play();
    alert("Playing " + video.currentSrc);
};

function errorHandler()
{
    var video = document.getElementById("video");
    if (video.error)
    {
        video.poster  ="../images/technicaldifficulties.jpg";
        var errorCode = video.error.code;
        alert("Error " + errorCode);

        var message;
        if (errorCode === 1)
        {
            message = "MEDIA ERR ABORTED=" + errorCode + "\nUsed any time the process of\n" +
                "getting the video over the network\n" +
                "is aborted by the browser\n" +
                "(possibly at a user’s request).";
        }
        else if (errorCode === 2)
        {
            message = "MEDIA ERR NETWORK=" + errorCode + "\nUsed whenever a network\n" +
                "retrieval of the video is\n" +
                "interrupted by a network error.";
        }
        else if (errorCode === 3)
        {
            message = "MEDIA ERR DECODE=" + errorCode + "\nUsed whenever the decoding of\n" +
                "a video fails. This could happen\n" +
                "because the encoding uses\n" +
                "features the browser can’t support\n" +
                "or because the file is corrupt.";
        }
        else if (errorCode === 4)
        {
            message = "MEDIA ERR SRC NOT SUPPORTED=" + errorCode + "\nUsed when the specified video source\n" +
                "cannot be supported because of a\n" +
                "bad URL or because the source type\n" +
                "isn’t decodable by the browser.";
        }
        if(message) alert(message);
    }
}

function nextVideo()
{
    position++;
    if(position >= playlist.length)
    {
        position = 0;
    }

    video.src = playlist[position] + getFormatExtension();
    video.load();
    video.play();
}

function getFormatExtension()
{
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
