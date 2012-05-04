// Main JS Object / Namespace
var Sector = {};
        
Systems = [];

Sector.render = function(options){
  console.log(options)
  Sector.starfield = new Starfield('sector', options);
  Sector.grid = new Grid('paper', $(document).width(), $(document).height());
}

Sector.render_planet = function(data){
  var show_template = new Hogan.Template(Templates['planets/show']),
      html = show_template.render(data);
   
  $('#system-info').html(html);
     
  System_renderer.paper.clear();
  System_renderer.draw_background();
  System_renderer.draw_planet_details(data.planet);
};

Sector.render_system = function(data){
  var width = 720,
      height = 306, 
      remove_template = new Hogan.Template(Templates['systems/remove']),
      show_template = new Hogan.Template(Templates['systems/show']),
      html = show_template.render(data, { remove: remove_template });
  
  $('#system-info').html(html);
  Sector.current_system = data.system;
      
  if(System_renderer){
    System_renderer.paper.remove();
  }
  System_renderer = new SystemRenderer('system', data.system, width, height);
};
