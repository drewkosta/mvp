var mongoose = require('mongoose');

var truckSchema = new mongoose.Schema({
  applicant: String,
  dayofweekstr: String,
  dayorder: String,
  eHour: Number,
  eMin: Number,
  endtime: String,
  latitude: Number,
  location: String,
  locationdesc: String,
  longitude: Number,
  optionaltext: String,
  sHour: Number,
  sMin: Number,
  starttime: String
});

mongoose.model('Truck', truckSchema);