var mongoose = require('mongoose');
var dbCtrl = require('./dbCtrl');
var request = require('request');
require('./dbSchema');

mongoose.connect('mongodb://localhost/wherethetruck');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  request('https://data.sfgov.org/resource/bbb8-hzi6.json', function (err, result, body) {
    body = JSON.parse(body)
    for (var i = 0; i < body.length; i++) {
      dbCtrl.addTruck(body[i]);
      console.log(i);
    }
  });
});