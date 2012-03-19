$(function() {
  window.onpopstate = function (event) {
    // see what is available in the event object
    var current_path = event.state ? event.state.path : document.location.pathname
    // console.log(current_path)
  }
  
  if(Sector.current_player){
    Sector.System.fetch(function(){
      // console.log(System.systems)
    });
  
    console.log(Sector.current_player.name)    
  };

  
  
  // $('form.delete').live('submit', function(e){
  //   e.preventDefault();
  //   var path = $(this).attr('action');
  //   var id = path.split('/').last();
  // 
  //   $.ajax({
  //     url: path,
  //     type: 'DELETE',
  //     success: function(response){
  //       $('#planet_' + id).fadeOut('slow', function(){
  //         $(this).remove();
  //       });
  //       
  //       Sector.Planets.remove(function(p){
  //         return p._id == id;
  //       });
  //       
  //       history.pushState({ planet: 'index' }, "Systems", "/");
  //       $('#planet').fadeOut('slow',function(){
  //         $(this).html('').show();
  //       });
  //     }
  //   });
  // });
  
  $('form.create').submit(function(e){
    e.preventDefault();
    var form = $(this),
        target = $(this).data('target'),
        path = form.attr('action');

    $.ajax({
      url: path,
      data: form.serializeArray(),
      type: 'POST',
      success: function(response){
        var system_template = new Hogan.Template(Templates['systems/system']),
            html = system_template.render(response),
            system = new Sector.System(response);
        
        Sector.systems.push(system);
        form.find('input[type="text"]').val('');
        $(target).append(html);
      }
    });
  });
  
  // $('form.login').submit(function(e){
  //   e.preventDefault();
  //   var form = $(this);
  //   var target = $(this).attr('rel');
  //   var path = form.attr('action');
  // 
  //   $.ajax({
  //     url: path,
  //     data: form.serializeArray(),
  //     type: 'POST',
  //     success: function(response){
  //       alert(JSON.stringify(response));
  //       console.log(response)
  //     }
  //   });
  // });
  
  $('a.show-system').live('click', function(e){
    e.preventDefault();
    
    var id = $(this).attr('href').split('/').last(),
        system = Sector.systems.find(function(s){ return s._id == id }),
        data = { system: system };
        
    // history.pushState({ path: $(this).attr('href') }, "Planet", "/systems/" + system._id);

    Sector.render_system(data);
  });
  
  $('a.show-planet').live('click', function(e){
    e.preventDefault();
    
    var id = $(this).attr('href').split('/').last(),
        system = Sector.current_system,
        planet = system.planets.find(function(p){ return p._id == id });
        data = {
          system: system, 
          planet: planet
        }
    
    Sector.render_planet(data);
  });
  
  
});
