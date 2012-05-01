Sector.System = resourceful.define('system', function () {
  
  var self = this; 
  
  self.string('name');
  self.number('planet_count');
  
  self.url = '/api/systems';

  // Fetches all systems
  self.fetch = function(options){
    options.type = 'GET';
    Sector.sync(self, options);
  };
  
  self.create = function(options){
    options.type = 'POST';
    Sector.sync(self, options);
  };
  
  // self.planets = function(){
  //   var planets = self.planets.map(function(p){
  //     var planet = new Sector.Planet(p);
  //     planet.save();
  //     return planets;
  //   });
  // }
  
  self.prototype.planets = function(){
    var system = this;
    
    return system.planets.map(function(p){
      p['radius'] = Math.round(p['radius'] * 20);
      return p;
    });
  };
  
  self.prototype.width = function(){
    var system = this;
    var width = 0;
    
    system.planets.forEach(function(p){
      width = width + 24 + Math.ceil(p.radius * 20)
    });
    return width;
  }
  
});
