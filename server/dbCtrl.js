var mongoose = require('mongoose');

exports.addTruck = function (obj) {
  mongoose.model('Truck').create({
    applicant: obj.applicant,
    dayofweekstr: obj.dayofweekstr,
    day: obj.dayorder,
    eHour: +obj.end24.slice(0, 2),
    eMin: +obj.end24.slice(3),
    endtime: obj.endtime,
    latitude: obj.latitude,
    location: obj.location,
    locationdesc: obj.locationdesc,
    longitude: obj.longitude,
    optionaltext: obj.optionaltext,
    sHour: obj.start24.slice(0, 2),
    sMin: obj.start24.slice(3),
    starttime: obj.starttime
  }).then(console.log('added to db'));
};

exports.getTrucks = function (day, hour, minute) {
  mongoose.model('Truck').find({
    $and: {
      day: day,
      $and: {
        $or: {
          $and: {
            $or: {
              sHour: { $lt: hour },
              $and: {
                sHour: hour,
                sMin: { $lt: min}
              }
            },
            $or: {
              eHour: { $gt: hour },
              $and: {
                eHour: hour,
                eMin: { $gt: min }
              }
            }
          }
        }
      }
    }
    
  })
}