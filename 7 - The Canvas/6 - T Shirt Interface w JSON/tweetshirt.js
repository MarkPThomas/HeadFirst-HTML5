/**
 * Created by Mark on 10/19/2017.
 */

window.onload = function(){
    var button = document.getElementById("previewButton");
    updateTweets();
    button.onclick = previewHandler;
};

function previewHandler(){
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas, context);

    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;

    if (shape == "squares"){
        for (var squares = 0; squares < 20; squares++){
            drawSquare(canvas, context);
        }
    }

    if (shape == "circles"){
        for (var circles = 0; circles < 20; circles++){
            drawCircle(canvas, context);
        }
    }
}

function drawSquare(canvas, context){
    // Calculate a random width for the square.
    var w = Math.floor(Math.random() * 40);

    // Calculate a random y position for the square inside the canvas.
    var x = Math.floor(Math.random() * canvas.width);

    // Calculate a random x position for the square inside the canvas.
    var y = Math.floor(Math.random() * canvas.height);

    // Set the fillstyle to "lightblue"
    context.fillStyle = "lightblue";

    // Draw a square at position x, y, with width w.
    context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context){
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.beginPath();
    context.arc(x, y, radius, 0, degreesToRadians(360), true);

    context.fillStyle = "lightblue";
    context.fill();
}

function fillBackgroundColor(canvas, context){
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj.options[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function degreesToRadians(degrees)
{
    return (degrees * Math.PI)/180;
}


//function updateTweets(tweets)
function updateTweets()
{
    var tweetsSelection = document.getElementById("tweets");

    // Twitter API no longer works with this. :-(
    // See: https://stackoverflow.com/questions/13454287/get-twitter-feed-as-json-without-authentication
    // for (var i = 0; i < tweets.length; i++)
    // {
    //     var tweet = tweets[i];
    //     var option = document.createElement("option");
    //     option.text = tweet.text;
    //     option.value = tweet.text.replace("\"", "'");
    //
    //     tweetsSelection.options.add(option);
    // }

    // Instead I will just add some text
    var option1 = document.createElement("option");
    option1.text = "When choosing between two evils, I always like to choose the one I haven't tried before.";
    tweetsSelection.options.add(option1);

    var option2 = document.createElement("option");
    option2.text = "'A successful man is one who makes more money than his wife can spend. A successful woman is one who can find such a man.'   --Lana Turner";
    tweetsSelection.options.add(option2);

    var option3 = document.createElement("option");
    option3.text = "'Brevity is the soul of wit.'   --W. Shaky";
    tweetsSelection.options.add(option3);

    tweetsSelection.selectedIndex = 0;
}