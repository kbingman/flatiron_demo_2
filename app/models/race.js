var resourceful = require('resourceful-mongo'),
    sugar = require('sugar');
    
var Race = resourceful.define('player', function () {
  
  self.use('mongodb', {
    database: 'planetary', //required - databasename which contains collections
    collection: 'players', // required - the collection to use for this resource
    safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  });
  

  var self = this;

});

exports.Race = Race;