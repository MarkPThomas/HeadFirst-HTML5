/**
 * Created by Mark on 12/18/2016.
 */
window.onload = getMyLocation;

var watchId = null;
var options = {enableHighAccuracy: true, timeout:100, maximumAge: 0};
var prevCoords = null;
var minDistance = 20; // meters

function getMyLocation(){
    if(navigator.geolocation){
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support");
    }
}

function watchLocation(){
    watchId = navigator.geolocation.watchPosition(displayLocation,
                                                  displayError,
                                                  options);
}

function clearWatch(){
    if(watchId){
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

var radiusEarthKM = 6371;

function displayLocation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    div.innerHTML += " (found in " + options.timeout + " milliseconds)";
    div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    var km = computeDistance(position.coords, ourCoords, radiusEarthKM);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";

    if(map == null){
        showMap(position.coords);
        prevCoords = position.coords;
    } else {
        var meters = computeDistance(position.coords, prevCoords, radiusEarthKM) * 1000;
        if (meters > minDistance){
            scrollMapToPosition(position.coords);
            prevCoords = position.coords;
        }
    }
}

function displayError(error){
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if(error.code === 0 || error.code === 2){
        errorMessage += " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
    options.timeout += 100;
    navigator.geolocation.getCurrentPosition(
        displayLocation,
        displayError,
        options);
    div.innerHTML += " ... checking again with timeout=" + options.timeout;
}

function scrollMapToPosition(coords){
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);

    map.panTo(latlong);

    addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
}

/**
 * Uses Haversine equation to calculate distance between two coordinates.
 * It is a special case of a more general formula in spherical trigonometry, the law of haversines, relating the sides and angles of spherical triangles.
 * It is slightly inaccurate as the Earth is not a perfect sphere (can't be guaranteed correct to better than 0.5%).
 * @param startCoords 'latitude' and 'longitude' of the starting location.
 * @param destCoords 'latitude' and 'longitude' of the destination location.
 * @param radius Radius of the sphere.
 */
function computeDistance(startCoords, destCoords, radius){
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    return Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                     Math.cos(startLatRads) * Math.cos(destLatRads) *
                     Math.cos(startLongRads - destLongRads)) * radius;
}

function degreesToRadians(degrees){
    return (degrees * Math.PI) / 180;
}


var map;

function showMap(coords){
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,
                                                  coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeID: google.maps.MapTypeId.ROADMAP // Can also try SATELLITE and HYBRID
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    var title = "Your Location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content)
}


/**
 * From: https://developers.google.com/maps/documentation/javascript/geolocation
 */
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 10
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
            map.setMapTypeId('terrain');
            //map.setMapTypeId('satellite');
            //map.setMapTypeId('hybrid');
            //map.setMapTypeId('roadmap');

            var title = "Your Location";
            var content = "You are here: " + pos.lat + ", " + pos.lng;
            addMarker(map, pos, title, content)
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        },
            options);
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function addMarker(map, latlong, title, content){
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };

    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    })
}