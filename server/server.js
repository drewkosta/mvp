var express = require('express');
var app = express();
var port = 1337;

app.use(express.static('compiled'));

app.listen(port, function () {
  console.log('listening on ' + port);
})