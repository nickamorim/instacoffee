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

var locations = [
    ['City Cafe and Bakery', 43.46210249999999,-80.5218567, 29],
    ['Matter of Taste', 43.46210249999999,-80.5218567, 28],
    ['Cafe Europe', 43.4485908,-80.48996110000002, 27],
    ['Serrinia Cafe', 43.4480556,-80.48356519999999, 26],
    ['Adventures Guild Cafe', 43.4509087,-80.49024350000002, 25],
    ['Cafe Joy', 43.4479026,-80.48574789999998, 24],
    ['Queen Street Commons Cafe',43.44926229999999,-80.489531, 23],
    ['Darlise Cafe',43.44925600000001,-80.48940299999998, 22],
    ['Mercury Cafe',43.4515954,-80.48914869999999, 21],
    ['Balzacs Coffee Roasters',43.4512677, -80.49864200000002 , 20],
    ['Teremok Cafe', 43.46516760000001, -80.5185131, 19],
    ['Coffee Culture', 43.46586300000001, -80.52281199999999, 18],
    ['Princess Cafe', 43.4665802, -80.52239159999999, 17],
    ['Cafe 22', 43.4647127, -80.52190610000002, 16],
    ['Seven Shores Cafe', 43.46602499999999, -80.52114360000002, 15],
    ['DVLB', 43.4680417, -80.52293889999999, 14],
    ['Settlement Co.', 43.46572810000001, -80.52277950000001, 13],
    ['Settlement Co.', 43.4524737, -80.49821789999999, 12],
    ['Smile Tiger Coffee Roasters', 43.456015, -80.49167549999999, 11],
    ['Starbucks: Waterloo Chapters', 43.4857912, -80.52630740000001, 10],
    ['Starbucks: Columbia Street', 43.4679668, -80.5680142, 9],
    ['Starbucks: Ira Needles', 43.42550929999999, -80.55363599999998, 8],
    ['Starbucks: Fairway Road', 43.4195716, -80.4474237, 7],
    ['Starbucks: Erb Street', 43.44648, -80.57195999999999, 6],
    ['Starbucks: University', 43.47368789999999, -80.52914149999998, 5],
    ['Starbucks: King Street', 43.4628277, -80.5219591, 4],
    ['Starbucks: Gateway', 43.4064339, -80.38819769999998, 3],
    ['Starbucks: Max Becker', 43.4073263, -80.5003059, 2],
    ['Starbucks: Fairview Park Mall', 43.4199808, -80.44665470000001, 1]
];

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

// Various error cases with corresponding messages to user if Geolocation is unavailable.

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        x.innerHTML = "User denied Geolocation request."
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