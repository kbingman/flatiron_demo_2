var resourceful = require('resourceful-mongo'),
    sugar = require('sugar');

// In a real app, this would need a persistence layer, 
// that is a database like MongoDB or CouchDB. 
// Right now, we just store the models in Memory for educational purposes.

var Player = resourceful.define('player', function () {

  var self = this;
  
  self.prototype.toJSON = function(){
    var player = this;
    return {
      '_id': player._id,
      'name': player.name,
      'email': player.email,
      'bank_account': player.bank_account
    }
  };
  
  // Overwrites the save method
  // allowing something to happen before it..
  self.prototype.save = function(callback){
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
    if(this.isNewRecord){
      this.bank_account = 1000000000
    }
    Player.save(this, callback)
  }
  
  self.use('mongodb', {
    database: 'planetary', //required - databasename which contains collections
    collection: 'players', // required - the collection to use for this resource
    safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  });
  
  self.property('name', String);
  self.property('slug', String);
  self.property('bank_account', Number);
  
});

exports.Player = Player;


