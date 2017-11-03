window.onload = init;

function init()
{
    var button = document.getElementById("add_button");
    button.onclick = createSticky;

    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++)
    {
        var key = stickiesArray[i];
        var value = localStorage[key];
        addStickyToDOM(value);
    }
}

function createSticky()
{
    var currentDate = new Date();
    var time = currentDate.getTime();
    var key = "sticky_" + time;
    var value = document.getElementById("note_text").value;
    localStorage.setItem(key, value);

    var stickiesArray = getStickiesArray();
    stickiesArray.push(key);
    addStickyToDOM(value);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
}

function addStickyToDOM(value)
{
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value;

    var sticky = document.createElement("li");
    sticky.appendChild(span);

    var stickies = document.getElementById("stickies");
    stickies.appendChild(sticky);
}

function getStickiesArray()
{
    var stickiesArray = localStorage["stickiesArray"];
    if (!stickiesArray)
    {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray))
    }
    else
    {
        stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
}
