/**
 * Created by Mark on 12/17/2016.
 */
function save(item){
    var playlistArray = getSavedSongs();
    playlistArray.push(item);
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function loadPlayList(){
    var playlistArray = getSavedSongs();
    var ul = document.getElementById("playlist");
    if(playlistArray != null){
        for (var i = 0; i < playlistArray.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = playlistArray[i];
            ul.appendChild(li);
        }
    }
}

function getSavedSongs(){
    return getStoreArray("playlist");
}

function getStoreArray(key){
    var playlistArray = localStorage.getItem(key);
    if( playlistArray == null ||
        playlistArray === ""){
        playlistArray = new Array();
    } else {
        playlistArray = JSON.parse(playlistArray);
    }
    return playlistArray;
}