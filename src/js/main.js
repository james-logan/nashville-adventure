// Initialize Map Object and append to map-canvas
function initialize () {
var mapOptions = {
  center: new google.maps.LatLng(-34.397, 150.644),
  zoom: 8
};
var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
}

// Window Onload Listener
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;







