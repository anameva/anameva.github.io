var map = null;
var geocoder = null;

//var previousid = 1;
 
function initialize() {
  //if (GBrowserIsCompatible()) {
    map = new GMap2(document.getElementById('map_canvas'));
    //map.enableScrollWheelZoom();
    map.addControl(new GSmallZoomControl());
    geocoder = new GClientGeocoder();
    plReset()
  //}
}

function showLocation(desc, lat, lng){
    var point = new GLatLng(lat, lng);
    var marker = new GMarker(point);
	GEvent.addListener(marker, "click", function() {
	  marker.openInfoWindowHtml(desc);
	  });
    map.addOverlay(marker);
    return marker;
}

function findAddress(address) {
  if (!address) {
    return;
  }
  if (geocoder) {
    geocoder.getLatLng(
      address,
      function(point) {
        if (!point) {
          alert("Impossible de trouver " + address);
        } else {
          map.setCenter(point, 12);
        }
      }
    );
  }
}



function showAddress(lat, lng){
    map.setCenter(new GLatLng(lat,lng), 15);
}

function showPhysician(id) {
    /*document.getElementById('physician_id'+previousid).style.backgroundColor = '#f8f8f8'; 
	document.getElementById('physician_id'+id).style.backgroundColor = '#e5e5ff';
	previousid = id;*/
    desc = physicians[id][1];
    lat = physicians[id][2];
    lng = physicians[id][3];
    showAddress(lat, lng);
    markers[id].openInfoWindowHtml(desc);
}

function showDesc(id) {
	elt = document.getElementById('physician_box_'+id)
	if (elt.style.display == "block") elt.style.display = "none";
	else elt.style.display = "block";
}

function plReset() {
    map.setCenter(new GLatLng(46.9, 2.0), 5);
}

function showAddresses() {
	initialize();
	tab = physicians;
	for (var id in tab) {
	    desc = tab[id][1];
	    lat = tab[id][2];
	    lng = tab[id][3];
        markers[id] = showLocation(desc, lat, lng);
	}
}


function locate(address) {
	alert(address);
    //document.getElementById('localization').src = 'http://localhost/anameva/wp-content/plugins/PhysicianLocation/gmap.php?address='+address;
}

function geolocalisation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      showAddress(pos.lat, pos.lng);

      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      //infoWindow.open(map);
      //map.setCenter(pos);
    }, function() {
      alert("Impossible de vous géolocaliser.");
    });
  } else {
    // Browser doesn't support Geolocation
    alert("Impossible de vous géolocaliser.");
  }
}
