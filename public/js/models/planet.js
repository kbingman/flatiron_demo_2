Sector.Planet = resourceful.define('planet', function () {
  
  var self = this; 
  
  self.string('name');
  self.property('name', String);
  self.property('slug', String);
  self.property('klass');
  self.property('zone');
  self.property('atmosphere');
  self.property('radius', Number);
  self.property('position', Number);
  self.property('population', Number);
  
  self.url = '/api/planets';
  
  self.fetch = function(callback){
    $.ajax({
      url: '/api/planets',
      type: 'GET',
      success: function(response){
        System.systems = []
        response.forEach(function(p){
          var planet = new System.Planet(p);
          planet.save();
          System.Planets.push(planet);
        });
        if(callback) callback.call(this);
      }
    });
  };
  
  self.prototype.zone_object = function(){
    var self = this;
    var zone = System.Planet.orbital_zones.find(function(z){ 
      return z.name == self.zone;
    });
    return zone;
  };
  
});
