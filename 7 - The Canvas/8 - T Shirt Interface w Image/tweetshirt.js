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

    drawText(canvas, context);
    drawTwitterBird(context);
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

function drawText(canvas, context)
{
    // Set foreground color
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;
    context.fillStyle = fgColor;

    // Check if foreground color and background color are the same.
    // This needs special handling to keep it visible.
    selectObj = document.getElementById("backgroundColor");
    index = selectObj.selectedIndex;
    var bgColor = selectObj[index].value;
    var strokeText = (fgColor == bgColor);


    // Draw header
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    drawTextContrasting(context, strokeText, "I saw this tweet", 20, 40);
    //context.fillText("I saw this tweet", 20, 40);

    // Get the selected tweet from the tweets menu
    selectObj = document.getElementById("tweets");
    index = selectObj.selectedIndex;
    var tweet = selectObj[index].value;

    // Draw the tweet
    context.font = "italic 1.2em serif";
    drawTextContrasting(context, strokeText, tweet, 30, 100, canvas.width - 30 - 20 - 10);
    //context.fillText(tweet, 30, 100, canvas.width - 30 - 20 - 10);

    // Draw footer
    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    drawTextContrasting(context, strokeText, "and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
    //context.fillText("and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
}

// Very basic handling of matching colors. This will fail if background and foreground are both black.
function drawTextContrasting(context, strokeText, message, xStart, yStart, maxWidth)
{
    if (strokeText)
    {
        context.strokeText(message, xStart, yStart, maxWidth);
    }
    else
    {
        context.fillText(message, xStart, yStart, maxWidth);
    }
}


function drawTwitterBird(context)
{
    var twitterBird = new Image();
    twitterBird.src = "twitterBird.png";

    // Onload handler implemented to avoid drawing the image until it has fully loaded.
    twitterBird.onload = function()
    {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    };
}