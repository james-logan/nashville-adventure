// Initialize Map Object
var mapOptions = {
  center: new google.maps.LatLng(-34.397, 150.644),
  zoom: 8
};

// Creates new map inside div map-canvas node
var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

// Window Onload Listener
google.maps.event.addDomListener(window, 'load', initialize);







