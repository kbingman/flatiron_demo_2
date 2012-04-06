$(function() {
  window.onpopstate = function (event) {
    // see what is available in the event object
    var current_path = event.state ? event.state.path : document.location.pathname
    // console.log(current_path)
  }
  
  if(Sector.current_player){
    Sector.System.fetch(function(){
      var id = Sector.current_player.homeworld_id,
          homeworld = Sector.systems.find(function(s){ return s._id == id }),
          width = $(document).width() - 300,
          height = $(document).height(),
          x_offset = homeworld ? homeworld.x - (width / 2) : 0,
          y_offset = homeworld ? homeworld.y - (height / 2): 0;
      
      Sector.render({
        x: x_offset,
        y: y_offset,
        w: width,
        h: height
      });
      Sector.starfield.activate(id);
      Sector.homeworld = homeworld;
    });  
  };
  
  $(window).bind('resize', function(){
    clearTimeout(Sector.resize);
    Sector.resize = setTimeout(function(){
      Sector.render();
    }, 100);
  });
  
  $('#scale').bind('change', function(){
    var scale = this.value;
    Sector.starfield.resize(scale);
  });

  // $('#sector').bind('mousedown', function(){
  //   console.log('down')
  // })
  
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
        console.log(response)
        // var system_template = new Hogan.Template(Templates['systems/system']),
        //     html = system_template.render(response),
        //     system = new Sector.System(response);
        // 
        // Sector.systems.push(system);
        // form.find('input[type="text"]').val('');
        // $(target).append(html);
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
  
  Sector.socket = io.connect('http://localhost');
  var timestamp = 0;

  Sector.socket.emit('set player', { 
    player_id: Sector.current_player._id
  });
  
  Sector.socket.on('timestamp', function (data) {
    timestamp = data.time;
    set_timestamp(timestamp);
  
    // $('h1').html(data.time);
  });
  
  Sector.socket.on('player', function (data) {
    console.log(data)
  });
  
  
  var set_timestamp = function(time){
    var time = time / (3600 * 24),
        year = time.floor(),
        day = ((time - time.floor()) * 365),
        hour = (day - day.floor()) * 24,
        min = (hour - hour.floor()) * 60,
        string = 'Time: ' + year + ':' + day.floor().pad(3) + ':' + hour.ceil().pad(2);
    
    $('h4#timestamp').html(string);
  }
  
  setInterval(function(){
    timestamp = timestamp + 6;
    set_timestamp(timestamp);
    // console.log(timestamp);
  }, 6000)
  
  
  
});
