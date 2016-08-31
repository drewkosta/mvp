var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
// var mongoose = require('mongoose');
var dbCtrl = require('./dbCtrl');
var port = 1337;
var truckData;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost/wherethetruck');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected to db')
// });

request('https://data.sfgov.org/resource/bbb8-hzi6.json', function (err, result, body) {
  truckData = JSON.parse(body);
  console.log('records in memory: ' + truckData.length);
});

app.get('/api/trucks', function (req, res) {
  var sHour, sMin, eHour, eMin, sDay;
  var matching = [];
  var day = +req.query.day;
  var hour = +req.query.hour;
  var minute = +req.query.minute;  
  
  if (!truckData) {
    request('https://data.sfgov.org/resource/bbb8-hzi6.json', function (err, result, body) {
      // console.log('LENGTH', body.length);
      truckData = JSON.parse(body);
      for (var i = 0; i < truckData.length; i++) {
        sHour = +truckData[i].start24.slice(0, 2);
        sMin = +truckData[i].start24.slice(3);
        eHour = +truckData[i].end24.slice(0, 2);
        eMin = +truckData[i].end24.slice(3);
        sDay = +truckData[i].dayorder;
        // console.log(day, hour, minute);
        // console.log(truckData[i].dayorder, sHour, sMin, eHour, eMin);
        if (day == sDay && (((hour > sHour || (hour == sHour && minute > sMin)) && (hour < eHour || (hour == eHour && minute < eMin))) || (eHour < sHour && ((hour < eHour || (hour == eHour && minute < eMin)) || (hour > sHour || hour == sHour && minute > sMin))))) {
          // console.log(true);
          matching.push(truckData[i]);
        }
      }
      res.send(matching);
    });
  } else {
    
      for (var i = 0; i < truckData.length; i++) {
        sHour = +truckData[i].start24.slice(0, 2);
        sMin = +truckData[i].start24.slice(3);
        eHour = +truckData[i].end24.slice(0, 2);
        eMin = +truckData[i].end24.slice(3);
        sDay = +truckData[i].dayorder;
        // console.log(day, hour, minute);
        // console.log(truckData[i].dayorder, sHour, sMin, eHour, eMin);
        if (day == sDay && (((hour > sHour || (hour == sHour && minute > sMin)) && (hour < eHour || (hour == eHour && minute < eMin))) || (eHour < sHour && ((hour < eHour || (hour == eHour && minute < eMin)) || (hour > sHour || hour == sHour && minute > sMin))))) {
          // console.log(true);
          matching.push(truckData[i]);
        }
      }
      res.send(matching);
  //   res.send(matching);
  }
  // console.log(req.query);
});

app.listen(port, function () {
  console.log('listening on ' + port);
});