// Main JS Object / Namespace
var Sector = {};
        
Sector.systems = [];

Sector.render_planet = function(data){
  var show_template = new Hogan.Template(Templates['planets/show']),
      html = show_template.render(data);
   
  $('#system-info').html(html);
     
  Sector.system_renderer.paper.clear();
  Sector.system_renderer.draw_background();
  Sector.system_renderer.draw_planet_details(data.planet);
};

Sector.render_system = function(data){
  var width = $(document).width() - 16,
      height = 235, 
      remove_template = new Hogan.Template(Templates['systems/remove']),
      show_template = new Hogan.Template(Templates['systems/show']),
      html = show_template.render(data, { remove: remove_template });
  
  $('#system-info').html(html);
  Sector.current_system = data.system;
      
  if(Sector.system_renderer){
    Sector.system_renderer.paper.remove();
  }
  Sector.system_renderer = new SystemRenderer('system', data.system, width, height);
};
