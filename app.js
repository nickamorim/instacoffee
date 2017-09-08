// call-back function (getLocation) that runs after we click getLocation.
// Gets users location and runs showPosition if supported, or showError if not.
// If Geolocation is not supported by the browser, display the message that it is not supported.

function getLocation() {
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// showPosition determines the exact geographical coordinates (long & lat) and appends it to the Google Maps.
// Sets the dimensions of the map (width & height).

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var latlon = new google.maps.LatLng(lat, lon)
    var mapholder = document.getElementById('mapholder')
    mapholder.style.height = '500px';
    mapholder.style.width = '750px';
    var locations = [
    ['Starbucks: Waterloo Chapters', 43.4856177,-80.5263767, 9]
    ['Starbucks: Fischer Hallman & Max Becker', 43.407281,-80.5004275, 8],
    ['Starbucks: Uptown-Waterloo', 43.462827,-80.5222796, 7],
    ['Starbucks: King & University', 43.4762724,-80.5252764, 6],
    ['Starbucks: UW STC', 43.4708997, -80.545619, 5],
    ['Stabucks: Colombia Street', 43.4677333, -80.6037212, 4],
    ['Starbucks: Ira Needles (Erb Street)', 43.4465971,-80.5719525, 3],
    ['Starbucks: The BoardWalk', 43.4266183,-80.5532513, 2],
    ['Starbucks: Sunrise Plaza', 43.4152555,-80.515119, 1]
    ];


43.407281,-80.5004275
var myOptions = {
    center:latlon,zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
}

    // Creates a map variable and appends to mapholder div.

    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);

    // Pinpoints and marks exactly the position of the user

    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});

    var infowindow = new google.maps.InfoWindow();

    var i;

    for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}

// Various cases of errors and corresponding messages to user if Geolocation is not working.

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
        case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
}   


