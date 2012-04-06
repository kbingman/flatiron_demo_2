var resourceful = require('resourceful-mongo'),
    sugar = require('sugar'),
    System = require('./system').System;;

// In a real app, this would need a persistence layer, 
// that is a database like MongoDB or CouchDB. 
// Right now, we just store the models in Memory for educational purposes.

var Player = resourceful.define('player', function () {

  var self = this;
  
  self.use('mongodb', {
    database: 'planetary', //required - databasename which contains collections
    collection: 'players', // required - the collection to use for this resource
    safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  });
  
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
  
  // Haven't  figured this out, but when I do, need to move everything here...
  // self.before('save', function(player, callback){
  //   console.log(player);
  //   console.log(callback);
  //   callback;
  // });
  
  
  // Overwrites the save method
  // allowing something to happen before it..
  self.prototype.save = function(callback){
    var player = this;
    player.slug = this.name.toLowerCase().replace(/ /g, '-');
    if(player.isNewRecord){
      player.bank_account = 1000000000;
      System.find({'planets.klass':/terran/i}, function(err, systems){ 
        var index = Math.ceil(Math.random() * systems.length);
        var system = systems[index];

        player.homeworld_id = system._id.toString();
        system.player_id = player._id;

        Player.save(player, function(err, player){
          if(err){ callback(err); }
          system.save(function(err, system){
            // console.log('hey!');
          });
          callback.call(this, player);
        });
      });
    }
  };
  
  self.property('name', String);
  self.property('slug', String);
  self.property('homeworld_id', String);
  self.property('bank_account', Number);
  
});

exports.Player = Player;


