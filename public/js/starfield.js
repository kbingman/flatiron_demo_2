function Starfield(domID, options){  
  
  if (!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
      
  var self = this;   
  
  self.init = function(){
    self.width = options['w'] ? options['w'] : 960;
    self.height = options['h'] ? options['h'] : 480;
    self.paper = Raphael(domID, self.width, self.height);
    
    self.gridColor = 'rgba(255,255,255,0.05)';
    self.scale = 1;
    self.x = options['x'] ? options['x'] : 0;
    self.y = options['y'] ? options['y'] : 0;
    self.baseSize = 3.5;
    self.plotStars(Sector.systems); 
  };
  
  self.resize = function(scale){
    self.scale = scale;
    self.paper.clear();
    self.plotStars(window.systems);
  };
  
  self.plotStars = function(systems){
    for (i in systems) {
      var system = systems[i];
      self.drawStar(system); 
    }
  };
  
  self.drawStar = function(system){
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
      'width': 5,
      'opacity': 0.3
    });
    
    // The clicker is transparent, but on top. All events are hooked to that
    var clicker = self.paper.circle(x, y, radius * 3);
    clicker.toFront();
    clicker.attr({
      'fill': 'transparent',
      'stroke-width': '0',   
      'stroke': star.color
    });
    $(clicker.node).css({
      'cursor':'pointer'  
    });
    // clicker.hover(function(){
    //   self.show_system(system);
    // });
    
    clicker.click(function(){
      self.show_system(system);
      if(clicker.active){
        clicker.attr({
          'fill': 'transparent',
          'stroke-width': '0'
        });
        clicker.active = false; 
      } else {
        clicker.attr({
          'stroke-width': '1px',
          'fill': 'rgba(255,255,255,0.2)'
          // 'stroke': 'rgba(255,255,255,0.5)'
        });
        clicker.active = true; 
      }
    });
  };
  
  self.pulsate = function(system){  
    var star = system.stars[0];    
    var radius = star.radius * self.baseSize * self.scale;    
    var x = (system.x - self.x) * self.scale;
    var y = (system.y - self.y) * self.scale;
    
    var background = self.paper.circle(x, y, radius * 2);
    background.attr({
      'stroke-width': 0,  
      'opacity': 0.27,
      'fill': '#fff'
    });
    background.toBack();
    background.glow({
      'color': '#fff',
      'width': 20,
      'opacity': 0.2
    });
    background.animate({
      'opacity': 0.1
    },1000);
    window.pulse = setInterval(function(){
      background.animate({
        'opacity': 0.0
      },1000);
      setTimeout(function(){
        background.animate({
          'opacity': 0.27
        },1000);
      }, 1000);
    }, 2000);

    // $(background.node).hide();
    // $(background.node).show();
  };
  
  self.sphere_of_knowledge = function(system){
    var x = (system.x - self.x) * self.scale;
    var y = (system.y - self.y) * self.scale;
    var circle = self.paper.circle(x, y, 300);
    var circle2 = self.paper.circle(x, y, 500);
    circle.attr({
      'stroke-width': '1px',
      'stroke': 'rgba(255,255,255,0.3)',
      'fill': 'rgba(255,255,255,0.015)'
    }); 
    circle2.translate(0.5, 0.5);
    circle.toBack();
    circle2.attr({
      'stroke-width': '1px',
      'stroke': 'rgba(255,255,255,0.3)',
      'fill': 'rgba(255,255,255,0.005)'
    });       
    circle2.translate(0.5, 0.5); 
    circle2.toBack();
  }
  
  self.show_system = function(system){
    // move this is a function?
    
    // var paper_node = $('#paper');
    // var system_node = $('#system');
    // var system = Sector.systems.find(function(s){ return s._id == system._id});

    Sector.system_portrait = Sector.render_system({ system: system })
    
    // paper_node.unbind('click');
    // system_node.show();
    
    
    
    // for(i in systems){
    //   var s = systems[i];
    //   if (system._id == s._id){
    //     window.system_portrait = new SystemPortrait('system', system, 720, 306);
    //     setTimeout(function(){
    //       paper_node.bind('click', function(){
    //         system_node.hide();
    //       })
    //     }, 100)
    //     break;
    //   }
    // }
  }    
  
  self.distance = function(system_1, system_2){
    var deltaX = system_1.x - system_2.x;
    var deltaY = system_1.y - system_2.y;
    var length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); 
    return Math.round(length);
  }
  
  self.init();
  
}
