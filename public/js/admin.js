$(function() {

  // Create
  $('form.create').submit(function(e){
    e.preventDefault();
    var form = $(this);
    
    System.create({
      data: form.serializeArray(),
      success: function(response){ 
        System.all(function(err, systems){
          Sector.View.planets_table({ 
            systems: systems
          });
          Sector.View.messenger({
            message: 'systems created successfully', 
            count: response.length 
          });
          Sector.View.show_planet_data();
          Sector.set_system_click();
          
        });    
      }  
    });
  });
  var map = $('#map');

  System.fetch({
    success:function(){
      Sector.View.show_planet_data();
      Sector.set_system_click();
      // shows map
      if(map.length){
        var scale = 0.75;
        System.get(Sector.homeworld_id, function(err,s){ 
          var offset_x = $(document).width() / 2 - (s.x * scale) - 24;
          var offset_y = $(document).height() / 2 - (s.y * scale) - 24;
          
          console.log(offset_x % 128)
          console.log(offset_y % 128)
          
          Sector.View.systems_map(scale, function(){
            Sector.paper = Raphael('sector', $(document).width(), $(document).height());
            Sector.grid = new Grid('map', $(document).width(), $(document).height(), scale);
            map.css({
              'top': offset_y + 'px',
              'left': offset_x + 'px'
            })
            var star = map.find('a.starlink')
            star.popover({ 
              placement: 'top' 
            });
            star.bind('click', function(){
              alert('set path')
            })
          });
        });
        

        
        key('space', function(event, handler){
          console.log(handler.shortcut, handler.scope);
        });
  
        $(window).bind('resize', function(){
          Sector.paper.clear();
          Sector.grid = new Grid('map', $(document).width(), $(document).height(), scale);
        });
        
        Sector.socket = io.connect('http://localhost');
        var timestamp = 0;

        Sector.socket.emit('set player', { 
          player_id: Sector.id
        });
        
        Sector.socket.on('player', function (data) {
          Sector.current_player = new Player(data.player);
          Sector.current_player.save();
          $('div#system_' + Sector.current_player.homeworld_id).css({
            'border': '3px solid red'
          })
        });
        
      }
    }
  });
  
  // Events 
  Sector.set_system_click = function(){
    $('td.name a').bind('click',function(e){
      e.preventDefault();
      var system_id = $(this).parents('tr:first').attr('id').split('_').last();
      Sector.View.show_system_data(system_id);
    });
  }
   

  // map.find('div.system').bind('click', function(e){
  //   e.preventDefault();
  //   var id = $(this).attr('id').split('_').last();
  //   var node = $(this);
  //   
  //   System.get(id, function(err, system){
  //     var x = system.x + 12;
  //     var y = system.y + 12;
  // 
  //     $(document).bind('mousemove', function(e) {
  //       var event = e || window.event;
  //       Sector.mouseX = event.clientX;
  //       Sector.mouseY = event.clientY;
  //     });
  //     
  //     if(!Sector.setDestination){
  //       var line = Sector.paper.path('M' + x + ' ' + y);
  //       
  //       Sector.setDestination = true;
  //       Sector.lineUpdate = setInterval(function(){
  //         var x1 = Sector.mouseX;
  //         var y1 = Sector.mouseY - 42;
  //       
  //         line.remove();
  //         line = Sector.paper.path('M' + x + ' ' + y + 'L' + x1 + ' ' + y1);
  //         line.attr({ stroke: '#fff' });
  //         // line.translate(0.5, 0.5);
  //       }, 100);
  //     } else {
  //       $(document).unbind('mousemove');
  //       clearInterval(Sector.lineUpdate);
  //       Sector.setDestination = false;
  //     }
  //   });
  // });
  
});