var resourceful = require('resourceful-mongo'),
    sugar = require('sugar'),
    Player = require('./system').Player;

var Ship = resourceful.define('ship', function () {

  var self = this;
  
  // self.use('mongodb', {
  //   database: 'planetary', //required - databasename which contains collections
  //   collection: 'ships', // required - the collection to use for this resource
  //   safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  // });
  
  self.property('name', String);
  self.property('slug', String);
  self.property('player_id', String);
  self.property('paths', Array);
  self.property('speed', Number);
   
});

exports.Ship = Ship;
