// these need to be put into the API queries to identify the desired datasets.
var artResourceName = "xakp-ess3";
var histResourceName = "vk65-u7my";
var beerResourceName = "3wb6-xy3j";
var artMarkerClick;
var histMarkerClick;
var waypts =[];

var apiUrl = 'https://data.nashville.gov/resource/';
var appToken = '$$app_token=rTyPnE0zIrcybTe9qcUwRufiQ';

var globalArtArr;
var globalHistArr;
var globalBeerArr;

var artIcon = "http://www.lavillita.com/wpimages/icon_art.png";
var histIcon = "http://tngenweb.org/carter/graphics/tnflag.gif";
var beerIcon = "https://cdn1.iconfinder.com/data/icons/Momentum_MatteEntireSet/32/beer.png";


// set up map, put on page
var center = new google.maps.LatLng(36.1565338,-86.7769905);
var mapOptions = {
  zoom: 14,
  center: center
}
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

var contentString = "<p>info window</p>"

var infowindow = new google.maps.InfoWindow({
    content: contentString
});

// get global art installations data array
$.get(`${apiUrl}${artResourceName}.json?${appToken}`, function(data) {
  globalArtArr = data;
  $.each(globalArtArr, function(i, entry) {
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(entry.latitude, entry.longitude),
                  map: map,
                  title: location.name,
                  icon: artIcon
              });
              marker.dataWeNeed = entry;
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(marker.dataWeNeed.description || "no description found");
                infowindow.open(map,marker);


              google.maps.event.addListener(marker, 'dblclick', function() {
              var latlong = "";
              latlong += marker.dataWeNeed.latitude;
              latlong += ',' + marker.dataWeNeed.longitude;
              var singleWayPt = {};
              singleWayPt.location = latlong;
              singleWayPt.stopover = true;
              waypts.push(singleWayPt);
              console.log(latlong);
              console.log(singleWayPt);
              if (waypts.length === 3) {
                routeMaker(); 
              }
              });

              });
          });
});

// get global historical markers data array
$.get(`${apiUrl}${histResourceName}.json?${appToken}`, function(data) {
  globalHistArr = data;
  $.each(globalHistArr, function(i, entry) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(entry.latitude, entry.longitude),
                map: map,
                title: location.name,
                icon: histIcon
            });
            marker.dataWeNeed = entry;
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(marker.dataWeNeed.marker_text || "no description found");
              infowindow.open(map,marker);

            google.maps.event.addListener(marker, 'dblclick', function() {
              var latlong = "";
              latlong += marker.dataWeNeed.latitude;
              latlong += ',' + marker.dataWeNeed.longitude;
              var singleWayPt = {};
              singleWayPt.location = latlong;
              singleWayPt.stopover = true;
              waypts.push(singleWayPt);
              console.log(latlong);
              console.log(singleWayPt);
              if (waypts.length === 3) {
                routeMaker(); 
              }
              });

            });
        });
});

// get global beer permit holders data array
// $.get(`${apiUrl}${beerResourceName}.json?${appToken}`, function(data) {
//   globalBeerArr = data;
//   console.log(globalBeerArr);
//   $.each(globalBeerArr, function(i, entry) {
//             var marker = new google.maps.Marker({
//                 position: new google.maps.LatLng(entry.latitude, entry.longitude),
//                 map: map,
//                 title: location.name,
//                 icon: beerIcon
//             });
//             google.maps.event.addListener(marker, 'click', function() {
//               infowindow.open(map,marker);
//             });
//         });
// });


// Dynamic Flux Capacitor Routing
var directionsDisplay 
var directionsService = new google.maps.DirectionsService();
var map;
directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map)


var routeMaker = function() {

  var request = {
      origin: waypts[0].location,
      destination: waypts[waypts.length-1].location,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      };
    });
}
