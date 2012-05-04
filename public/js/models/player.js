Player = resourceful.define('player', function () {

  var self = this;
  
  self.property('name', String);
  self.property('slug', String);
  self.property('bank_account', Number);
  
  self.prototype.homeworld = function(callback){
    var id = this.homeworld_id;
    
    System.get(id, function(err, system){
      callback(null, system);
    });
  }
  
  self.prototype.ships = function(callback){
    var id = this.id;
    
    Ship.all(id, function(err, ships){
      callback(null, ships);
    });
  }
  
});
