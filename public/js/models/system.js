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
  
});
