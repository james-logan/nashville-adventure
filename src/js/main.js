// these need to be put into the API queries to identify the desired datasets.
var artResourceName = "xakp-ess3";
var histResourceName = "vk65-u7my";
var beerResourceName = "3wb6-xy3j";

var apiUrl = 'https://data.nashville.gov/resource/';
var appToken = '$$app_token=rTyPnE0zIrcybTe9qcUwRufiQ';

var globalArtArr;
var globalHistArr;
var globalBeerArr;


// set up map, put on page
var center = new google.maps.LatLng(36.1565338,-86.7769905);
var mapOptions = {
  zoom: 14,
  center: center
}
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

// // get global art installations data array
// $.get(`${apiUrl}${artResourceName}.json?${appToken}`, function(data) {
//   globalArtArr = data;
//   $.each(globalArtArr, function(i, entry) {
//               var marker = new google.maps.Marker({
//                   position: new google.maps.LatLng(entry.latitude, entry.longitude),
//                   map: map,
//                   title: location.name
//               });
//           });
// });

// // get global historical markers data array
// $.get(`${apiUrl}${histResourceName}.json?${appToken}`, function(data) {
//   globalHistArr = data;
// });

// // get global beer permit holders data array
// $.get(`${apiUrl}${beerResourceName}.json?${appToken}`, function(data) {
//   globalBeerArr = data;
// });

plotPoints(artResourceName);
plotPoints(histResourceName);
plotPoints(beerResourceName, "http://www.nowplayingnashville.com/sites/nowplayingnashville.com/images/org/220173834/yazoo_small.png");
function plotPoints(resourceName, iconName) {
  $.get(`${apiUrl}${resourceName}.json?${appToken}`, function(data) {
    $.each(data, function(i, entry) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(entry.latitude, entry.longitude),
                    map: map,
                    title: location.name,
                    icon: iconName
                });
            });
  });
}
