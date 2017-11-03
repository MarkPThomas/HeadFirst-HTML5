window.onload = function()
{
    var message = "";
    var numberOfWorkers = 3;
    var workerNumber = 1;
    var workers = [];
    for (var i = 0; i < numberOfWorkers; i++)
    {
        var worker = new Worker("worker.js");
        worker.onmessage = function(event)
        {
            message += "Worker " + workerNumber + " says " + event.data + "... ";
            document.getElementById("output").innerHTML = message;
            workerNumber++;
        }
        workers.push(worker);
    }
    for (var i = 0; i < numberOfWorkers; i++)
    {
        worker.postMessage("ping");
    }
}