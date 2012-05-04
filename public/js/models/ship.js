var Ship = resourceful.define('ship', function () {

  var self = this;
  
  self.property('name', String);
  self.property('slug', String);
  self.property('player_id', String);
  self.property('paths', Array);
  self.property('speed', Number);
  

   
});

