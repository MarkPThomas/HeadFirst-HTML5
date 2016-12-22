/**
 * Created by Mark on 12/21/2016.
 */
window.onload = function(){
    var url = "http://wickedlysmart.com/ifeelluckytoday/";
    var request = new XMLHttpRequest();
    request.onload = function(){
        if (request.status == 200){ // Note: Code 200 means that a successful GET was achieved
            displayLuck(request.responseText);
        } else {
            displayFailure(request);
        }
    };
    request.open("GET", url);
    request.send(null); // null is sent because data is only being requested from the server, and not sent to it.

    request.onerror = function() {
        alert('Woops, there was an error making the request.');
    };
};

function displayLuck(luck){
    var p = document.getElementById("luck");
    p.innerHTML = "Today you are " + luck;
}

function displayFailure(request){
    var p = document.getElementById("luck");
    p.innerHTML = "Failed. Request status was " + request.status + " with response " + request.responseText;
}