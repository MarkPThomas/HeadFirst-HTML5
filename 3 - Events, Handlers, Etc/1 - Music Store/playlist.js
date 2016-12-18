/**
 * Created by Mark on 12/17/2016.
 */
window.onload = init;

function init(){
    var button = document.getElementById("addButton");
    button.onclick = handleButtonClick;
    loadPlayList();
}

function handleButtonClick(){
    var textInput = document.getElementById("songTextInput");
    var songName = textInput.value;

    if(songName === "") {
        alert("Please enter a song");
    } else {
        alert("Adding " + songName);

        var li  = document.createElement("li");
        li.innerHTML = songName;

        var ul = document.getElementById("playlist");
        ul.appendChild(li);
        save(songName);
    }
}