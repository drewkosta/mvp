var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var port = 1337;
var truckData

app.use(express.static('compiled'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// var getTrucks = function () {
//   request('https://data.sfgov.org/resource/bbb8-hzi6.json', function (err, res, body) {
    
//   })
// }

app.get('/api/trucks', function (req, res) {
  request('https://data.sfgov.org/resource/bbb8-hzi6.json', function (err, res, body) {
    // console.log('RES', res);
    console.log('BODY', body);
  })
  
  // console.log(req.query);
  // res.send('goddit');
});

app.listen(port, function () {
  console.log('listening on ' + port);
});