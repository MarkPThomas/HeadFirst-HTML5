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
        addStickyToDOM(key, value);
    }
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

function createSticky()
{
    var currentDate = new Date();
    var time = currentDate.getTime();
    var key = "sticky_" + time;
    var value = document.getElementById("note_text").value;
    localStorage.setItem(key, value);

    var stickiesArray = getStickiesArray();
    stickiesArray.push(key);
    addStickyToDOM(key, value);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
}

function deleteSticky(e)
{
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() === "span")
    { // Handle the case of clicking the span text rather than the sticky note div.
        key = e.target.parentNode.id;
    }

    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    if (stickiesArray)
    {
        for (var i = 0; i < stickiesArray.length; i++)
        {
            if (key === stickiesArray[i])
            {
                stickiesArray.splice(i, 1);
            }
            localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
            removeStickyFromDOM(key);
        }
    }
}

function addStickyToDOM(key, value)
{
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value;

    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);
    sticky.appendChild(span);
    sticky.onclick = deleteSticky;

    var stickies = document.getElementById("stickies");
    stickies.appendChild(sticky);
}

function removeStickyFromDOM(key)
{
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}

