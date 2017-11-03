window.onload = init;

function init()
{
    var button = document.getElementById("add_button");
    button.onclick = createSticky;

    for (var i = 0; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        if (key.substring(0, 6) === "sticky")
        {
            var value = localStorage.getItem(key);
            addStickyToDOM(value);
        }
    }
}

function createSticky()
{
    var value = document.getElementById("note_text").value;
    var key = "sticky_" + localStorage.length;
    localStorage.setItem(key, value);

    addStickyToDOM(value);
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