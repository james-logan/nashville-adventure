
// these need to be put into the API queries to identify the desired datasets.
var artResourceName = "xakp-ess3";
var histResourceName = "vk65-u7my";
var beerResourceName = "3wb6-xy3j";

var apiUrl = 'https://data.nashville.gov/resource/';
var appToken = '$$app_token=rTyPnE0zIrcybTe9qcUwRufiQ';

var globalArtArr;
var globalHistArr;
var globalBeerArr;

// get global art installations data array
$.get(`${apiUrl}${artResourceName}.json?${appToken}`, function(data) {
  globalArtArr = data;
});

// get global historical markers data array
$.get(`${apiUrl}${histResourceName}.json?${appToken}`, function(data) {
  globalHistArr = data;
});

// get global beer permit holders data array
$.get(`${apiUrl}${beerResourceName}.json?${appToken}`, function(data) {
  globalBeerArr = data;
});



// grabbing the trail as user is clicking waypoints, the data for each waypoint will be added to the trail array

var trailArray = [];

window.onload = function () {
     getTrails();
}


function getTrails () {
     $.get("https://nashville-adventure.firebaseio.com/trails", function (data) {
          $(data).each(function (item) {
               $('trail-list-div').append("<div class='trail-box'>"+item[0]+"</div>");
          })
     })
}


function postTrail () {
     $.post('https://nashville-adventure.firebaseio.com/trails', trailArray, function (data) {
          //trail name div needs to be replaced with noah's
          $('trail-name-div').text(trailArray[0]);
     });
}

// Initialize Map Object and append to map-canvas
function initialize () {
var mapOptions = {
  center: new google.maps.LatLng(36.1565338, -86.7769905),
  zoom: 15
};
var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize)









