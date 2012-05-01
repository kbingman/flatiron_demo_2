$(function() {

  // Create
  $('form.create').submit(function(e){
    e.preventDefault();
    var form = $(this);
    
    Sector.System.create({
      data: form.serializeArray(),
      success: function(response){ 
        Sector.System.all(function(err, systems){
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

  Sector.System.fetch({
    success:function(){
      Sector.View.show_planet_data();
      Sector.set_system_click();
      // shows map
      if(map.length){
        var scale = 0.5;
        Sector.View.systems_map(scale, function(){
          Sector.paper = Raphael('map', $(document).width(), $(document).height());
          Sector.grid = new Grid('map', $(document).width(), $(document).height(), scale);
          
          map.find('a.starlink').bind('click',function(e){
            e.preventDefault();

            var system_id = $(e.target).data('id');
            Sector.View.show_system_data(system_id);
          });
        });
  
        $(window).bind('resize', function(){
          Sector.grid.remove();
          Sector.grid.render();
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
  //   Sector.System.get(id, function(err, system){
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