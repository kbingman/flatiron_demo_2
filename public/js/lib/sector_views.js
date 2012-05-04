// Show System
Sector.View.show_system_data = function(system_id){
        
  System.get(system_id, function(error, system){       
    Sector.View.modal({
      template: 'admin/_system_modal',
      data: {
        system: system.toJSON(),
        width: system.width(),
        planets: system.planets.map(function(p){
          p['dRadius'] = Math.round(p['radius'] * 20);
          p['margin'] = -Math.round(p['dRadius'] / 2);
          return p;
        })
      }
    });
  }); 
      
};


// Show Planet
Sector.View.show_planet_data = function(){
  $('td.planets .badge').click(function(e){
    e.preventDefault();
    var planet_id = $(this).data('id'),
        system_id = $(this).parents('tr:first').attr('id').split('_').last();
        
    System.get(system_id, function(error, system){ 
      planet = system.planets.find(function(p){
        return p._id == planet_id;
      });
      
      Sector.View.modal({
        template: 'admin/_planet_modal',
        data: {
          system: system.toJSON(),
          display_radius: Math.round(planet.radius * 42),
          planet: planet
        }
      });
    }); 
  });
};

Sector.View.systems_map = function(scale, callback){
  System.all(function(err, systems){
    var data = {
      systems: systems.map(function(s){ 
        return {
          slug : s.klass.parameterize(),
          klass: s.klass,
          planet_count: s.planets.length,
          _id  : s._id,
          x    : s.x * scale - 24,
          y    : s.y * scale - 24
        }
      })
    };
    
    Sector.render_template({
      template: 'systems/starmap',
      data: data,
      target: '#map',
      method: 'html',
      success: function(){
        if (callback) {
          callback();
        }
      }
    });
  });
};

Sector.View.planets_table = function(data){
  Sector.render_template({
    template: 'admin/_systems',
    partials: ['admin/_system'],
    data: {
      systems: data.systems.sortBy(function(s){ return -s.ctime })
    },
    target: '#systems',
    method: 'html'
  });
}

Sector.View.modal = function(options){
  Sector.render_template({
    template: options.template,
    data: options.data,
    target: '#modal',
    method: 'html'
  });

  var modal = $('#modal').find('.modal');
  modal.modal();

  // Centers window
  modal.css({
    'margin-left': -1 * (modal.width() / 2) + 'px'
  });  
}

Sector.View.messenger = function(data){
  Sector.render_template({
    template: 'admin/_message',
    data: data,
    target: '.jumbotron'
  });
};


