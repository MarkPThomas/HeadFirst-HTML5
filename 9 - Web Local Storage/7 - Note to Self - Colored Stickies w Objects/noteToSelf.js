// NOTE: The sessionStorage object supports exactly the same API as localStorage.
// The difference is sessionStorage only maintains the data while the browser window is open.

window.onload = init;

function init()
{
    var button = document.getElementById("add_button");
    button.onclick = createSticky;

    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++)
    {
        var key = stickiesArray[i];
        var value = JSON.parse(localStorage[key]);
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
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;
    var value = document.getElementById("note_text").value;
    var stickyObj =
        {
            "value": value,
            "color": color
        };

    localStorage.setItem(key, JSON.stringify(stickyObj));

    var stickiesArray = getStickiesArray();
    stickiesArray.push(key);
    addStickyToDOM(key, stickyObj);
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

function addStickyToDOM(key, stickyObj)
{
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = stickyObj.value;

    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);
    sticky.style.backgroundColor = stickyObj.color;
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

