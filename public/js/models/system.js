Sector.System = resourceful.define('system', function () {
  
  var self = this; 
  
  self.string('name');
  self.number('planetCount');
  
  self.url = '/api/systems';

  self.fetch = function(callback){
    $.ajax({
      url: self.url,
      type: 'GET',
      success: function(response){
        response.forEach(function(s){
          var system = new Sector.System(s);
          system.save();
          // console.log(system)
          Sector.systems.push(system);
        });
        if(callback) callback.call(this);
      }
    });
  };
  
});
