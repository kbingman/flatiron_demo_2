var resourceful = require('resourceful-mongo'),
    sugar = require('sugar'),
    System = require('./system').System;;

var Player = resourceful.define('player', function () {

  var self = this;
  
  self.use('mongodb', {
    database: 'planetary', //required - databasename which contains collections
    collection: 'players', // required - the collection to use for this resource
    safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  });
  
  self.property('name', String);
  self.property('slug', String);
  self.property('homeworld_id', String);
  self.property('systems', Array);
  self.property('bank_account', Number);
  
  self.prototype.toJSON = function(){
    var player = this;
    return {
      '_id': player._id,
      'name': player.name,
      'email': player.email,
      'bank_account': player.bank_account,
      'homeworld_id': player.homeworld_id
    }
  };
  
  // Before Create 
  self.before('create', function(player, callback) {
    player.bank_account = 1000000000;
    player.slug = player.name.toLowerCase().replace(/ /g, '-');

    System.find({'planets.klass':/terran/i}, function(err, systems){ 
      var index = Math.ceil(Math.random() * systems.length);
      var system = systems[index];

      player.homeworld_id = system._id.toString();
      system.player_id = player._id;
      callback();
    });
  });
   
});

exports.Player = Player;


