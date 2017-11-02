window.onload = function() {
    // set up the click handler for the form button
    var button = document.getElementById("submit");
    button.onclick = getTweets;
};

// when you click "Get Tweets" we call this function
function getTweets() {
    // set up a new XHR request
    var xhr = new XMLHttpRequest();
    // we're calling search.php and passing in a query string
    var url = "search.php?query=";
    var query = document.getElementById("query").value;
    if (!query) {
        query = "html5";
    }
    // we encode the query to handle any special characters properly
    url += encodeURIComponent(query);

    // this is the function that is called when the XHR request
    // to our search.php script is handled, and a response sent back
    xhr.onload = function() {
        // if everything went okay, then send the response data
        // to the displayTweets() function
        if (xhr.status == 200) {
            displayTweets(xhr.responseText);
        } else {
            var errorDiv = document.getElementById("error");
            errorDiv.innerHTML = "Error getting tweets: " + xhr.status;
        }
    };
    // make the request!
    xhr.open("GET", url);
    xhr.send(null);
}

function displayTweets(tweets) {
    // tweets is a big long string, so we need to parse it
    // into JSON first
    tweets = JSON.parse(tweets);
    var ul = document.querySelector("ul");
    // clear existing tweets from list
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.lastChild);
    }
    // add new tweets
    for (var i = 0; i < tweets.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = tweets[i].tweet;
        ul.appendChild(li);
    }
}