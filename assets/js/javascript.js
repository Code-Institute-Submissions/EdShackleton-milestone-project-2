//initialising map and style

 var geocoder;
 var map;
 var latlng;
 var marker;
 var latitude;
 var longitude;
 var currentMarkers = [];

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
     
     function capitalize_Words(str)
     {
     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
     }
     placeSelection = capitalize_Words(address);
     console.log(placeSelection);
     localStorage.setItem("placeSelection", placeSelection);
     
     geocoder.geocode({ 'address': address }, function(results, status) {
         if (status == 'OK') {
             map.setCenter(results[0].geometry.location);
             var marker = createMarker(results[0]);
             currentMarkers.push(marker);
            //  marker = new google.maps.Marker({
            //      map: map,
            //      position: results[0].geometry.location,
            //  });
             map.setZoom(15);
             longitude = marker.getPosition().lng();
             latitude = marker.getPosition().lat();
             $('#selection-box-title').fadeIn("fast");
             $('#next-button').fadeIn("slow");
             $('#reset-button').fadeIn("slow");
             
         }
         else {
             alert('Geocode was not successful for the following reason: ' + status);
         }
     });
 }

 //create marker to transfer latitude and longitude

 function createMarker(place) {
     var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
     });
     google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(place.name);
         infowindow.open(map, this);
     });
     
     return marker;
 }

 //display hotels in area

 function getAccommodation() {
     
     $('#selection-box').fadeIn("slow");
     var request = {
         location: { lat: latitude, lng: longitude },
         radius: '500',
         type: ['hotel']
     };
     document.getElementById("top-title").innerHTML = "Where will you sleep?";
     document.getElementById("sub-title").innerHTML = "Select a hotel";
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, function(results, status) {
         customCallback(results, status, getRestaurants, map);
     });
 }
 
 //displaying the information

 var htmlString = "";
 
 function customCallback(results, status, nextFunction, map=null) {
     
     document.getElementById("selection-box").innerHTML = htmlString;
     htmlString = "";
     if (status == google.maps.places.PlacesServiceStatus.OK) {
         for (var i=0; i<currentMarkers.length; i++) {
             currentMarkers[i].setMap(null);
         };
         
         for (var i = 0; i < results.length; i++) {
             var place = results[i];
             var LocationString = "";
             var LocationName = "";
             
             if(place['rating']) {
                 LocationName = place['name'];
                 LocationString += `<div class="input-group" id="Location-checkbox-${[i]}">
                                    <span value=${[i]} class="input-group-addon">
                                        <input type="checkbox" name="choice" id="checkboxes" onclick="chooseSelection(${[i]})">
                                    </span>
                                    <li id="Location-${[i]}" class="list-group-item"><strong id="locationName-${[i]}">${LocationName}</strong><br>`;
             if(place['rating']) {
             var LocationRating = place['rating'];
             LocationString += `rating: <span id="locationRating-${[i]}">${LocationRating}</span><br>`;
             } else {
             var LocationRating = 'This place has no rating';
             LocationString += LocationRating;
             }
            
             if(place['user_ratings_total']) {
             var LocationUsers = place['user_ratings_total'];
             LocationString += `based on ${LocationUsers} reviews</li></div>`;
             } else {
             var LocationUsers = '</li></div>';
             LocationString += LocationUsers;
             }
             
             htmlString += LocationString;
            
             var marker = createMarker(results[i]);
             currentMarkers.push(marker);
             }
         }
         
        document.getElementById("selection-box").innerHTML = htmlString;
        document.getElementById("next-button").onclick = nextFunction;
        
     }
 }

 //display restaurants in area

 function getRestaurants() {
     
     var request = {
         location: { lat: latitude, lng: longitude },
         radius: '500',
         type: ['restaurant']
     };
     
     hotelSelection = temporarySelection;
     temporarySelection = [];
     console.log("Hotel Selection: " + hotelSelection);
     
     document.getElementById("top-title").innerHTML = "Where will you eat?";
     document.getElementById("sub-title").innerHTML = "Select restaurants";
     document.getElementById("sub-title").innerHTML = "Select restaurants";

     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, function(results, status) {
         customCallback(results, status, getSights);
     
     });
 }

 //display sights in area

 function getSights() {
     
     var request = {
         location: { lat: latitude, lng: longitude },
         radius: '500',
         type: ['attractions']
     };
     
     restaurantSelections = temporarySelection;
     temporarySelection = [];
     console.log("Restaurant Selection: " + restaurantSelections);
     
     document.getElementById("top-title").innerHTML = "What will you see?";
     document.getElementById("sub-title").innerHTML = "Select attractions";
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, function(results, status) {
         customCallback(results, status, getFinalResults);
     });
     
 }


//displayresults

function getFinalResults() {
    window.location.href = "/results.html";
    
    sightSelections = temporarySelection;
    temporarySelection = [];
    console.log("Sight Selection: " + sightSelections);

    document.getElementById("hotel-results").innerHTML = hotelSelection;
    document.getElementById("place-results").innerHTML = placeSelection;
}

function startAgain() {
    window.location.href = "/index.html";
}

//Remove markers when next is pressed

function clearMarkers() {
    setMapOnAll(null);
    console.log("clearMarkers")
}
      
function setMapOnAll(map) {
  for (var i = 0; i < marker.length; i++) {
    marker[i].setMap(map);
    console.log("setMapOnAll")
  }
}

//Add selection to memory

var temporarySelection = [];
var placeSelection = [];
var hotelSelection = [];
var restaurantSelections = [];
var sightSelections = [];

function chooseSelection(resultIndex) {
    
    var locationName = document.getElementById('locationName-' + resultIndex);
    
    if(!temporarySelection.includes(locationName.innerHTML)) {
        console.log('pushing ' + locationName.innerHTML + ' into temporarySelection')
        temporarySelection.push(locationName.innerHTML);
    } else {
        var index = temporarySelection.indexOf(locationName.innerHTML);
        console.log('Removing index number: ', index)
        temporarySelection.splice(index, 1);
    }
    
    console.log(temporarySelection)
    

}

//display results on new page

function displayResults() {
    localStorage.getItem("placeSelection");
    document.getElementById("place-results").innerHTML = placeSelection;
    console.log(placeSelection)
}
