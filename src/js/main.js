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
var histIcon = "http://i.imgur.com/re2hZxK.png";
var beerIcon = "https://cdn1.iconfinder.com/data/icons/Momentum_MatteEntireSet/32/beer.png";

var imageData = {
    "AndrewJacksonbronzestatue": "http://www.presidentsusa.net/jacksontncapitol3.jpg",
    "AerialInnovations": "http://www.explorenashvilleart.com/project-assets/1708/img/cc22af3227fb30a99a304b38c3d0a62eb2d864b96b6ff5db15558c9a.jpg.1000x750_q85.jpg",
    "AirportSunProject": "https://www.flynashville.com/PublishingImages/News-Media%20Detail%20Page%20Template/rainbow-art.jpg",
    "12thPorterMural": "http://www.explorenashvilleart.com/project-assets/1708/img/475a98f79d4f07ccfb5aae9c2735df446ada27a90e151848e2a6710e.jpg.960x643_q85.jpg",
    "Anticipation": "http://russfaxon.com/anticpns.jpg",
    "AthenaParthenos": "http://www.nashville.gov/portals/0/SiteContent/Parks/images/parthenon/athena/AthenaGilded.jpg",
    "BuildingaPositiveCommunity": "http://www.explorenashvilleart.com/project-assets/1708/img/fee8c94ab62581257065b9313105cd821fc6aad88d9cc9d341af87b7.jpg.1000x967_q85.jpg",
    "ChetAtkins": "http://musiccitymike.files.wordpress.com/2013/05/chet-atkins-statute-resize.jpg",
    "ChildrenChairsSeasons": "http://www.explorenashvilleart.com/project-assets/1708/img/afb3d2b40e9e2f2824bbfce085920ab4af10ef80f454dd460445bf0f.JPG.1000x1493_q85.jpg",
    "EdwardWardCarmack": "http://img1.photographersdirect.com/img/13886/wm/pd3207367.jpg",
    "FoundingofNashville": "http://n7.alamy.com/zooms/575788e47bd84190b9caeceb1343b679/the-founding-of-nashville-sculpture-featuring-james-robertson-and-c5rc7p.jpg",
    "InveterateComposition": "http://fristcenter.org/images/sized/content/uploads/exhibition_images/Owens_2011-Inveterate-Compo-400x450.jpg",
    "Johnw.Thomas": "http://farm1.static.flickr.com/209/500119599_26f80a8b86_z.jpg",
    "LaStoriadellaTerra": "http://img.groundspeak.com/waymarking/large/8898fd0a-6d86-4425-a5b6-952bc4cd4e93.jpg",
    "LaneMotorMuseum": "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Lane_Motor_Museum.jpg/1920px-Lane_Motor_Museum.jpg",
    "LesPaulGuitarMural": "http://www.explorenashvilleart.com/project-assets/1708/img/b8a4100f955072a54a8cf62775213f46ba571abf63f9990acc8b7ea2.jpg.1000x666_q85.jpg",
    "Nashville,MapsthroughAerialViews": "http://www.explorenashvilleart.com/project-assets/1708/img/5d055496f4f35014f79321acdb3179d0f770a0dbc7962d3f9f69da51.jpg.1000x666_q85.jpg",
    "Oh,Roy": "http://www.russfaxon.com/bigroy.jpg",
    "OrpheusandEurydice": "http://www.explorenashvilleart.com/project-assets/1708/img/27ed2741ec5acc68b75e3c337653378564396b00c684f3cb61985e4e.jpg.1000x750_q85.jpg",
    "Parthenon": "http://www.nashville.gov/portals/0/SiteContent/Parks/images/parthenon/Parthenon-Dusk.jpg",
    "RaccoonsandMagicHorseshoes": "http://www.schon.com/public/images/6racoons.jpg",
    "TennesseeConfederateWomen": "http://img.groundspeak.com/waymarking/large/79590e72-ecde-41ef-95dc-6290d1a82a2d.jpg",
    "TheFalls": "http://www.explorenashvilleart.com/project-assets/1708/img/22e0334a7f836fde03f469e2ea391f32a16dc70e1ecb23392a30dc6e.JPG.1000x1493_q85.jpg",
    "SeaSerpent": "http://www.nashville-vacation-fun.com/images/ParkDragonDragon.jpg"
};


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

//************ matt's code

// Initialize Map Object and append to map-canvas
// function initialize () {
// var mapOptions = {
//   center: new google.maps.LatLng(36.1565338, -86.7769905),
//   zoom: 15
// };
// var map = new google.maps.Map(document.getElementById("map-canvas"),
//     mapOptions);
// }

// google.maps.event.addDomListener(window, 'load', initialize)



//********************************** JOHN'S CODE

// set up map, put on page
var center = new google.maps.LatLng(36.1565338,-86.7769905);
var mapOptions = {
  zoom: 14,
  center: center
}
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

var infowindow = new google.maps.InfoWindow();

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
              google.maps.event.addListener(marker, 'mouseover', function() {
                //console.log(marker);
                infowindow.setContent("<div class='info-window-short'>" + (marker.dataWeNeed.description && marker.dataWeNeed.description.length > 50 ? marker.dataWeNeed.description.slice(0, 50) + "..." : marker.dataWeNeed.description) || "no description found") + "</div>";
                infowindow.open(map,marker);
              });
              google.maps.event.addListener(marker, 'click', function() {
                console.log(marker);
                infowindow.setContent(
                  ("<div class='info-window-full'>" + marker.dataWeNeed.description || "no description found")
                  + "<br><br>" + ((imageData[marker.dataWeNeed.title.split(" ").join("")] && ("<img src='" + imageData[marker.dataWeNeed.title.split(" ").join("")] + "'>")) || "") +
                  (marker.dataWeNeed.location || "no location found") + "</div>");

                infowindow.open(map,marker);
              });
              // google.maps.event.addListener(marker, 'dblclick', function() {
              //   console.log('double-click');
              // });
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
            google.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.setContent("<div class='info-window-short'>" + (marker.dataWeNeed.marker_text && marker.dataWeNeed.marker_text.length > 50 ? marker.dataWeNeed.marker_text.slice(0, 50) + "..." : marker.dataWeNeed.marker_text) || "no description found") + "</div>";
              infowindow.open(map,marker);
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent("<div class='info-window-full'>" + (marker.dataWeNeed.marker_text || "no description found") + "<br><br>" + (marker.dataWeNeed.location || "no location found") + "</div>");
              infowindow.open(map,marker);
            });
            // google.maps.event.addListener(marker, 'dblclick', function() {
            //   console.log('double-click');
            // });
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

