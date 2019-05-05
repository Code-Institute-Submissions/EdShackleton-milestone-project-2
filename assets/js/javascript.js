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
     var autocomplete = new google.maps.places.Autocomplete(address);
     
     function myFunction(x) {
    if (x.matches) {
        document.getElementById("sub-title").style.display = "none";
        }
    }
    
    var x = window.matchMedia("(max-width: 330px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction)
 }

 //adding geocoding

var stringPlaceSelection = "";

 function codeAddress() {
     var address = document.getElementById('address').value;
     
     hotelSelection = [];
    restaurantSelections = [];
    sightSelections = [];

     
     function capitalize_Words(str)
     {
     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
     }
     placeSelection = `<strong>` + capitalize_Words(address) + '</strong>';
     stringPlaceSelection += placeSelection;
     window.localStorage.setItem('stringPlaceSelection', JSON.stringify(placeSelection));
     console.log(stringPlaceSelection);

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
             $('#next-button').fadeIn("slow");
             $('#reset-button').fadeIn("slow");
             getAccommodation();
         }
         else {
             alert('Please enter a destination');
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


//enter press to select

var input = document.getElementById("address");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("go-button").click();
  }
});

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

//Start Again

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


//display results

function getFinalResults() {
    
    sightSelections = temporarySelection;
    temporarySelection = [];
    console.log("Sight Selection: " + sightSelections);
    $('#selection-section').hide(1000);
    
    document.getElementById("top-title").innerHTML = "Your Holiday";
    document.getElementById("sub-title").innerHTML = "Here's what you selected";
    
    function myFunction(x) {
    if (x.matches) {
        document.getElementById("top-title").style.display = "none";
        document.getElementById("sub-title").style.display = "none";
        }
    }
    
    var x = window.matchMedia("(max-width: 769px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction)
    
    document.getElementById("place-results").innerHTML = placeSelection;
    document.getElementById("hotel-results").innerHTML = hotelSelection.join ("<br> <br><hr><br>");
    document.getElementById("restaurant-results").innerHTML = restaurantSelections.join ("<br> <br><hr><br>");
    document.getElementById("sights-results").innerHTML = sightSelections.join ("<br> <br><hr><br>");
    
    $('#results-section').show(1000);

}