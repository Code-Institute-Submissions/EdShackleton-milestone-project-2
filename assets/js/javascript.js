 //initialising map

 var geocoder;
 var map;
 var latlng;
 var marker;
 var latitude;
 var longitude;

 function initialize() {
     geocoder = new google.maps.Geocoder();
     latlng = new google.maps.LatLng(51.528, -0.381);
     var mapOptions = {
         zoom: 4,
         center: latlng,
         styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9c00b1"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eaebed"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d3f6db"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9c00b1"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dde7fb"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9c00b1"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ff8e00"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ffa100"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#75dcf6"
            }
        ]
    }
]
     }
     map = new google.maps.Map(document.getElementById('map'), mapOptions);
 }

 //adding geocoding

 function codeAddress() {
     var address = document.getElementById('address').value;
     geocoder.geocode({ 'address': address }, function(results, status) {
         if (status == 'OK') {
             map.setCenter(results[0].geometry.location);
             marker = new google.maps.Marker({
                 map: map,
                 position: results[0].geometry.location,
             });
             map.setZoom(15);
             longitude = marker.getPosition().lng();
             latitude = marker.getPosition().lat();
             console.log(results);
         }
         else {
             alert('Geocode was not successful for the following reason: ' + status);
         }
     });
 }

 //create marker to transfer latitude and longitude

 function createMarker(place) {
     var placeLoc = place.geometry.location;
     var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
     });
     google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(place.name);
         infowindow.open(map, this);
     });
 }

 //display hotels in area

 function getAccommodation() {

     var request = {
         location: { lat: latitude, lng: longitude },
         radius: '500',
         type: ['hotel']
     };
     document.getElementById("top-title").innerHTML = "Where will you sleep?";
     document.getElementById("sub-title").innerHTML = "Select a hotel";
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, callback);
     document.getElementById("next-button").onclick = getRestaurants;
 }

 function callback(results, status) {
     if (status == google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < results.length; i++) {
             var place = results[i];
             createMarker(results[i]);
         }
     }
 }

 //display restaurants in area

 function getRestaurants() {

     var request = {
         location: { lat: latitude, lng: longitude },
         radius: '500',
         type: ['restaurant']
     };
     document.getElementById("top-title").innerHTML = "Where will you eat?";
     document.getElementById("sub-title").innerHTML = "Select restaurants";
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, callback);
     document.getElementById("next-button").onclick = getSights;
 }

 function callback(results, status) {
     if (status == google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < results.length; i++) {
             var place = results[i];
             createMarker(results[i]);
         }
     }
 }

 //display sights in area

 function getSights() {

     var request = {
         location: { lat: latitude, lng: longitude },
         radius: '500',
         type: ['bar']
     };
     document.getElementById("top-title").innerHTML = "What will you see?";
     document.getElementById("sub-title").innerHTML = "Select attractions";
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, callback);
 }

 function callback(results, status) {
     if (status == google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < results.length; i++) {
             var place = results[i];
             createMarker(results[i]);
         }
     }
 }

 //Info window when marker clicked

 //Remove markers when next is pressed
 