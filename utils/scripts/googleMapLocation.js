function myMap() {
  var myCenter = new google.maps.LatLng(14.559048920791787,121.02393021586909);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 14};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);

  var infowindow = new google.maps.InfoWindow({
    content: "<strong>Aekie Home Furnitures - Main Office</strong><br>Unit 33, Silica St., GreenDays, Makati City<br>"
  });
  infowindow.open(map,marker);
}