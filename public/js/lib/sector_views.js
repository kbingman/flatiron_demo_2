// Show Planet
Sector.View.show_planet_data = function(){
  $('td.planets .badge').click(function(p){
    var planet_id = $(this).data('id'),
        system_id = $(this).parents('tr:first').attr('id').split('_').last(),
        system = Sector.systems.find(function(s){ 
          return s._id == system_id;
        }),
        planet = system.planets.find(function(p){
          return p._id == planet_id;
        });
        
    Sector.View.modal({
      template: 'admin/_planet_modal',
      data: {
        system: system.toJSON(),
        planet: planet
      }
    });
  });
};

Sector.View.modal = function(options){
  Sector.render_template({
    template: options.template,
    data: options.data,
    target: '#modal',
    method: 'html'
  });

  $('#modal').find('.modal').modal();
  // .unbind('show')
  // .on('show', function(){
  //   console.log('show event handler')
  // })   
}

Sector.View.messenger = function(data){
  Sector.render_template({
    template: 'admin/_message',
    data: data,
    target: '.jumbotron'
  });
};

Sector.View.planets_table = function(data){
  Sector.render_template({
    template: 'admin/_systems',
    partials: ['admin/_system'],
    data: data,
    target: '#systems',
    method: 'html'
  });
}
