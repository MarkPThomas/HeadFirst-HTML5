window.onload = function()
{
    var clearButton = document.getElementById("clear_button");
    clearButton.onclick = clearStorage;

    function clearStorage()
    {
        localStorage.clear();
    }
};