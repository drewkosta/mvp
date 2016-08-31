var now = new Date();

var qData = {
  day: now.getDay(),
  hour: now.getHours() + 1,
  minute: now.getMinutes()
};

document.getElementById('day').options[qData.day].selected = true;
document.getElementById('hour').options[qData.hour].selected = true;
// document.getElementById('minute').options[qData.minute].selected = true;

var update = function (param) {
  console.log('update called');
  var unit = document.getElementById(param);
  qData[param] = unit.options[unit.selectedIndex].value;
  initmap();
};

var initmap = function () {
  $.ajax('/api/trucks', {
    type: 'GET',
    data: qData,
    success: function (data) {
      console.log(data);
      
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.783697, lng: -122.408966},
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      });
      
      for (var i = 0; i < data.length; i++) {
        (function (i) { 
          var contentString = '<h1>' + data[i].applicant + '</h1>' +
            '<h3>' + data[i].optionaltext + '</h3>' +
            '<p><strong>' + data[i].dayofweekstr + ' Hours: </strong>' + data[i].starttime + ' - ' + data[i].endtime + '</p>' + 
            '<p><strong>Location: </strong>' + data[i].location + '</p>' +
            '<p><strong>Details: </strong>' + data[i].locationdesc + '</p>'
          
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          
          var marker = new google.maps.Marker({
            position: {
              lat: +data[i].latitude,
              lng: +data[i].longitude
            },
            map: map,
            title: data[i].applicant
          });
          
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        })(i);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}