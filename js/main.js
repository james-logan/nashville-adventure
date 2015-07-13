"use strict";var artResourceName="xakp-ess3",histResourceName="vk65-u7my",beerResourceName="3wb6-xy3j",artMarkerClick,histMarkerClick,waypts=[],apiUrl="https://data.nashville.gov/resource/",appToken="$$app_token=rTyPnE0zIrcybTe9qcUwRufiQ",globalArtArr,globalHistArr,globalBeerArr,artIcon="http://www.lavillita.com/wpimages/icon_art.png",histIcon="http://i.imgur.com/re2hZxK.png",beerIcon="https://cdn1.iconfinder.com/data/icons/Momentum_MatteEntireSet/32/beer.png",imageData={AndrewJacksonbronzestatue:"http://www.presidentsusa.net/jacksontncapitol3.jpg",AerialInnovations:"http://www.explorenashvilleart.com/project-assets/1708/img/cc22af3227fb30a99a304b38c3d0a62eb2d864b96b6ff5db15558c9a.jpg.1000x750_q85.jpg",AirportSunProject:"https://www.flynashville.com/PublishingImages/News-Media%20Detail%20Page%20Template/rainbow-art.jpg","12thPorterMural":"http://www.explorenashvilleart.com/project-assets/1708/img/475a98f79d4f07ccfb5aae9c2735df446ada27a90e151848e2a6710e.jpg.960x643_q85.jpg",Anticipation:"http://russfaxon.com/anticpns.jpg",AthenaParthenos:"http://www.nashville.gov/portals/0/SiteContent/Parks/images/parthenon/athena/AthenaGilded.jpg",BuildingaPositiveCommunity:"http://www.explorenashvilleart.com/project-assets/1708/img/fee8c94ab62581257065b9313105cd821fc6aad88d9cc9d341af87b7.jpg.1000x967_q85.jpg",ChetAtkins:"http://musiccitymike.files.wordpress.com/2013/05/chet-atkins-statute-resize.jpg",ChildrenChairsSeasons:"http://www.explorenashvilleart.com/project-assets/1708/img/afb3d2b40e9e2f2824bbfce085920ab4af10ef80f454dd460445bf0f.JPG.1000x1493_q85.jpg",EdwardWardCarmack:"http://img1.photographersdirect.com/img/13886/wm/pd3207367.jpg",FoundingofNashville:"http://n7.alamy.com/zooms/575788e47bd84190b9caeceb1343b679/the-founding-of-nashville-sculpture-featuring-james-robertson-and-c5rc7p.jpg",InveterateComposition:"http://fristcenter.org/images/sized/content/uploads/exhibition_images/Owens_2011-Inveterate-Compo-400x450.jpg","Johnw.Thomas":"http://farm1.static.flickr.com/209/500119599_26f80a8b86_z.jpg",LaStoriadellaTerra:"http://img.groundspeak.com/waymarking/large/8898fd0a-6d86-4425-a5b6-952bc4cd4e93.jpg",LaneMotorMuseum:"http://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Lane_Motor_Museum.jpg/1920px-Lane_Motor_Museum.jpg",LesPaulGuitarMural:"http://www.explorenashvilleart.com/project-assets/1708/img/b8a4100f955072a54a8cf62775213f46ba571abf63f9990acc8b7ea2.jpg.1000x666_q85.jpg","Nashville,MapsthroughAerialViews":"http://www.explorenashvilleart.com/project-assets/1708/img/5d055496f4f35014f79321acdb3179d0f770a0dbc7962d3f9f69da51.jpg.1000x666_q85.jpg","Oh,Roy":"http://www.russfaxon.com/bigroy.jpg",OrpheusandEurydice:"http://www.explorenashvilleart.com/project-assets/1708/img/27ed2741ec5acc68b75e3c337653378564396b00c684f3cb61985e4e.jpg.1000x750_q85.jpg",Parthenon:"http://www.nashville.gov/portals/0/SiteContent/Parks/images/parthenon/Parthenon-Dusk.jpg",RaccoonsandMagicHorseshoes:"http://www.schon.com/public/images/6racoons.jpg",TennesseeConfederateWomen:"http://img.groundspeak.com/waymarking/large/79590e72-ecde-41ef-95dc-6290d1a82a2d.jpg",TheFalls:"http://www.explorenashvilleart.com/project-assets/1708/img/22e0334a7f836fde03f469e2ea391f32a16dc70e1ecb23392a30dc6e.JPG.1000x1493_q85.jpg",SeaSerpent:"http://www.nashville-vacation-fun.com/images/ParkDragonDragon.jpg"},center=new google.maps.LatLng(36.1565338,-86.7769905),mapOptions={zoom:14,center:center},map=new google.maps.Map(document.getElementById("map-canvas"),mapOptions),contentString="<p>info window</p>",infowindow=new google.maps.InfoWindow({content:contentString});$.get(""+apiUrl+artResourceName+".json?"+appToken,function(a){globalArtArr=a,$.each(globalArtArr,function(a,b){var c=new google.maps.Marker({position:new google.maps.LatLng(b.latitude,b.longitude),map:map,title:location.name,icon:artIcon});c.dataWeNeed=b,google.maps.event.addListener(c,"mouseover",function(){infowindow.setContent("<div class='info-window-short'>"+(c.dataWeNeed.description&&c.dataWeNeed.description.length>50?c.dataWeNeed.description.slice(0,50)+"...":c.dataWeNeed.description)||"no description found")+"</div>",infowindow.open(map,c)}),google.maps.event.addListener(c,"click",function(){console.log(c),infowindow.setContent(("<div class='info-window-full'>"+c.dataWeNeed.description||"no description found")+"<br><br>"+(imageData[c.dataWeNeed.title.split(" ").join("")]&&"<img src='"+imageData[c.dataWeNeed.title.split(" ").join("")]+"'>"||"")+(c.dataWeNeed.location||"no location found")+"</div>"),infowindow.open(map,c)}),google.maps.event.addListener(c,"dblclick",function(){console.log("dog-console");var a="";a+=c.dataWeNeed.latitude,a+=","+c.dataWeNeed.longitude;var b={};b.location=a,b.stopover=!0,waypts.push(b),3===waypts.length&&routeMaker()})})}),$.get(""+apiUrl+histResourceName+".json?"+appToken,function(a){globalHistArr=a,$.each(globalHistArr,function(a,b){var c=new google.maps.Marker({position:new google.maps.LatLng(b.latitude,b.longitude),map:map,title:location.name,icon:histIcon});c.dataWeNeed=b,google.maps.event.addListener(c,"mouseover",function(){infowindow.setContent("<div class='info-window-short'>"+(c.dataWeNeed.marker_text&&c.dataWeNeed.marker_text.length>50?c.dataWeNeed.marker_text.slice(0,50)+"...":c.dataWeNeed.marker_text)||"no description found")+"</div>",infowindow.open(map,c)}),google.maps.event.addListener(c,"click",function(){infowindow.setContent("<div class='info-window-full'>"+(c.dataWeNeed.marker_text||"no description found")+"<br><br>"+(c.dataWeNeed.location||"no location found")+"</div>"),infowindow.open(map,c)}),google.maps.event.addListener(c,"dblclick",function(){console.log("dog-food");var a="";a+=c.dataWeNeed.latitude,a+=","+c.dataWeNeed.longitude;var b={};b.location=a,b.stopover=!0,waypts.push(b),console.log(a),console.log(b),3===waypts.length&&routeMaker()})})});var directionsDisplay,directionsService=new google.maps.DirectionsService,map;directionsDisplay=new google.maps.DirectionsRenderer,directionsDisplay.setMap(map);var routeMaker=function(){var a={origin:waypts[0].location,destination:waypts[waypts.length-1].location,waypoints:waypts,optimizeWaypoints:!0,travelMode:google.maps.TravelMode.WALKING};directionsService.route(a,function(a,b){if(b==google.maps.DirectionsStatus.OK){directionsDisplay.setDirections(a);a.routes[0]}})};