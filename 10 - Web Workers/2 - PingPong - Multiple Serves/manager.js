window.onload = function()
{
    var worker = new Worker("worker.js");
    var message = "";

    worker.onmessage = function(event)
    {
        message += "Worker says " + event.data + "... ";
        document.getElementById("output").innerHTML = message;
    }

    for (var i = 0; i < 5; i++)
    {
        worker.postMessage("ping");
    }

    for (var i = 5; i > 0; i--)
    {
        worker.postMessage("pong");
    }
}