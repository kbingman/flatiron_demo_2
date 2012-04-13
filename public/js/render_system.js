function SystemRenderer(domID, system, width, height){  
  
  if (!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
      
  var self = this;   
  
  self.init = function(){
    self.paper = Raphael(domID, width, height);
    self.fonts = "'Gotham-Book', 'Helvetica Neue', 'helvetica', 'arial', 'sans-serif'"
    self.paper.clear();
    self.set_styles();
    self.star = system.stars[0];
    self.size = 160;
    self.base_size = self.size;
    self.scale = 1;
    self.star_size = self.star.radius * self.base_size; 
    // if(window.starfield.distance(system, window.player.homeworld()) < 500){
      self.draw_planets();  
    // }
    self.draw_background();
    // self.draw_system_label();
    self.draw_main_star();
  };
  
  self.draw_main_star = function(){
    var star = self.star;
    var dot = self.paper.circle((self.star_size / 2 * -1), height / 2, self.star_size);
    dot.attr({
      'stroke-width': 0,   
      'fill': 'r#000-' + star.color
    });
    dot.glow({
      'color': star.color,
      'width': 25,
      'opacity': 0.5
    });
  };
  
  self.draw_planets = function(){
    var spacing = .25 * self.base_size;
    
    var x_base = (self.star_size / 2) + spacing;
    var index = 0;
    var render = function(){
      var planet = system.planets[p];
      var radius = 0.05 * self.base_size * Math.sqrt(planet.radius);
      index = index + 1;
      self.draw_planet(planet, radius, x_base, index);
      x_base = x_base + radius + spacing;
    }
    
    // calculates the total width
    system.planets.each(function(planet){
      var radius = 0.05 * self.base_size * Math.sqrt(planet.radius);
      x_base = x_base + radius + spacing;
    });

    // console.log(width / x_base)
    
    if( x_base < width ){
      x_base = (self.star_size / 2) + spacing;
      for(p in system.planets){
        render();
      }
    } else {
      self.base_size = self.size * width / x_base;
      spacing = .23 * self.base_size;
      x_base = (self.star_size / 2) + spacing;
      
      for(p in system.planets){
        render();
      }
      self.base_size = self.size;
    }
  };
  
  self.draw_planet = function(planet, radius, x_base, index, width){

    var dot = self.paper.circle(x_base, height / 2, radius);
    
    var label_height = index % 2 ? 42 : -42;
    
    dot.attr({
      'stroke-width': '0',   
      'stroke': '#fff', 
      'fill': 'r#000-#000:57-#a2bcd7',
      'opacity': '1'
    });
    
    dot.id = planet._id;
    dot.click(function(){
      Sector.render_planet({ planet: planet, system: system });
    });
    
    $(dot.node).css({
      'cursor':'pointer'  
    });
    
    label = self.paper.text(x_base, (height / 2) + label_height, planet.klass);
    label.attr({
      'fill': '#ffffff',
      'font-size': 12, 
      'font-family': self.fonts
    });
  };
  
  self.draw_system_label = function(){     
    var homeworld = ''; // window.player.homeworld()._id == system._id ? 'HOMEWORLD' : '' ; 
    var distance = ''; // window.starfield.distance(system, window.player.homeworld());
    var text = homeworld + ' ' + system.stars[0].code + ' ' + system.clustered + ' ' + system._id + ' ' + distance + 'px';
    var label = self.paper.text(width - 8, 14, text);
    label.attr({
      'fill': '#ffffff',
      'font-size': 14, 
      'font-family': self.fonts,
      'text-anchor': 'end'
    });
  };
  
  self.draw_planet_details = function(planet){
    var radius = 100 // 0.5 * self.base_size * Math.sqrt(planet.radius);
    var x_pos = radius + 23; // (Math.sqrt(planet.radius) * -1) + 23;
    var dot = self.paper.circle(x_pos, height / 2, radius);
    dot.attr({
      'stroke-width': 0,   
      'stroke': '#fff', 
      'fill': 'r#000-#000:72-#a2bcd7',
    });
    dot.glow({
      'color': '#a2bcd7',
      'width': 20,
      'opacity': 0.3
    });
    
    (5).times(function(i){
      var percent = 1 - ((i + 1) * .2)
      var dot2 = self.paper.ellipse(x_pos, height / 2, radius, radius * percent);
      
      dot2.attr({
        'stroke-width': '1',   
        'stroke': 'rgba(131, 153, 174, 0.7)', 
        'fill': 'transparent'
      });
    });
    
    (5).times(function(i){
      var percent = 1 - ((i + 1) * .2)
      var dot2 = self.paper.ellipse(x_pos, height / 2, radius * percent, radius);
      
      dot2.attr({
        'stroke-width': '1',   
        'stroke': 'rgba(131, 153, 174, 0.7)', 
        'fill': 'transparent'
      });
    });
  
    var dot2 = self.paper.ellipse(x_pos, height / 2, 0.5, radius);
    dot2.attr({
      'stroke-width': '1',   
      'stroke': 'rgba(131, 153, 174, 0.7)', 
      'fill': 'transparent'
    });
    
    var dot3 = self.paper.ellipse(x_pos, height / 2, radius, 0.5);  
    dot3.attr({
      'stroke-width': '1',   
      'stroke': 'rgba(131, 153, 174, 0.7)', 
      'fill': 'transparent'
    });
    
    
    // label = self.paper.text(width - 8, 14, system.stars[0].code + ' ' + system.name + ' ' + planet.klass + '\n Atmosphere: ' + planet.atmosphere );
    // label.attr({
    //   'fill': '#ffffff',
    //   'font-size': 12, 
    //   'font-family': self.fonts,
    //   'text-anchor': 'end'
    // });  
    // render_planet_info();
    // console.log(label);
  };
  
  self.draw_background = function(){
    var p = self.paper.path('M0 ' + (height / 2) + 'L' + width + ' ' + (height / 2) + '');
    p.attr({
      'stroke-width': '1px',   
      'stroke': '#a2bcd7'
    });
    p.toBack();
    p.translate(0.5, 0.5);
    p.glow({
      'color': 'rgba(255,255,255,1)',
      'width': 15,
      'opacity': 0.4
    });
  };
  
  self.set_styles = function(){
    var top = system.y - Sector.starfield.y - height - 20,
        left = system.x - Sector.starfield.x - (width / 2),
        offset_x = (width + left) - $(document).width();


    if(offset_x > 0){ left = left - offset_x - 20; }
    if(left < 0){ left = 20; }
    if(top < 0){ top = system.y - Sector.starfield.y + 20; }
    
    $('#' + domID).css({
      'background': 'rgba(0,0,0,0.7)',
      'width': width + 'px',
      'height': height + 'px',
      'border': '1px solid #bbe8fd',
      'top': top + 'px',
      'left': left + 'px'
    });
  };
  
  self.init();
  
}
