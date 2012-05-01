function Starfield(domID, options){  
  
  if (!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
      
  var self = this;   
  
  self.init = function(){
    self.width = options['w'] ? options['w'] : 960;
    self.height = options['h'] ? options['h'] : 480;
    self.paper = Raphael(domID, self.width, self.height);
    
    console.log(options['x']);
    
    self.gridColor = 'rgba(255,255,255,0.05)';
    self.scale = 1;
    self.x = options['x'] ? options['x'] : 0;
    self.y = options['y'] ? options['y'] : 0;
    self.baseSize = 3.5;
    self.plot_stars(Sector.systems); 
  };
  
  self.resize = function(scale){
    self.scale = scale;
    self.paper.clear();
    Sector.grid = new Grid('paper', $(document).width(), $(document).height(), scale);
    self.plot_stars(Sector.systems);
  };
  
  self.plot_stars = function(systems){
    for (i in systems) {
      var system = systems[i];
      self.draw_star(system); 
    }
  };
  
  self.draw_star = function(system){
    var star = system.stars[0];
    var radius = star.radius * self.baseSize * self.scale;    
    var x = (system.x - self.x) * self.scale;
    var y = (system.y - self.y) * self.scale;
  
    var dot = self.paper.circle(x, y, radius);

    dot.attr({
      'stroke-width': 0,   
      'fill': star.color
    });    
    
    dot.id = system._id;   
    // console.log(dot.id)
    
    dot.glow({
      'color': star.color,
      'width': 10 * self.scale,
      'opacity': 0.3
    });
    
    // The clicker is transparent, but on top. All events are hooked to that
    var clicker = self.paper.circle(x, y, radius * 3);
    clicker.toFront();
    clicker.id = 'clicker_' + system.id;
    clicker.attr({
      'fill': 'transparent',
      'stroke-width': '0',   
      'stroke': star.color
    });
    $(clicker.node).css({
      'cursor':'pointer'  
    });
    
    clicker.click(function(){
      if(Sector.current_system) self.deactivate(Sector.current_system._id);
      
      self.show_system(system);
      if(clicker.active){
        self.deactivate(system._id);
      } else {
        self.activate(system._id);
      }
    });
  };
  
  self.activate = function(id){
    var clicker = self.paper.getById('clicker_' + id);
    clicker.attr({
      'stroke-width': '1px',
      'fill': 'rgba(255,255,255,0.2)'
      // 'stroke': 'rgba(255,255,255,0.5)'
    });
    clicker.active = true; 
  };
  
  
  self.deactivate = function(id){
    var clicker = self.paper.getById('clicker_' + id);
    clicker.attr({
      'stroke-width': '0',
      'fill': 'transparent'
    });  
    clicker.active = false; 
  };
  
  self.show_system = function(system){
    var sector = $('#sector');
    var system_node = $('#system');
    
    sector.unbind('click');
    
    Sector.system_portrait = Sector.render_system({ system: system });
    system_node.fadeIn('fast', function(){
      setTimeout(function(){
        sector.bind('click', function(){
          system_node.fadeOut('fast');
        })
      }, 100);
    }); 
  }    
  
  self.distance = function(system_1, system_2){
    var deltaX = system_1.x - system_2.x;
    var deltaY = system_1.y - system_2.y;
    var length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); 
    return Math.round(length);
  }
  
  self.init();
  
}
