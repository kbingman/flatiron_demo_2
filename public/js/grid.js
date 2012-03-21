// var _ = require('underscore');

function Grid(domID, width, height, scale){  
  
  if (!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
      
  var self = this;   
  
  self.init = function(){
    self.paper = Sector.starfield.paper;
    // self.paper = Raphael(domID, width, height);
    self.gridColor = 'rgba(255,255,255,0.21)';
    self.textColor = 'rgba(255,255,255,0.27)';
    self.scale = scale || 1;
    self.fonts = "'Gotham-Book', 'Helvetica Neue', 'helvetica', 'arial', 'sans-serif'"
    self.gridWidth = 256 * self.scale;
    self.gridHeight = 256 * self.scale;
    self.plotGrid(); 
  };
  
  self.plotGrid = function(){
    // console.log(width)
    var x_units = width / self.gridWidth;
    var y_units =  height / self.gridHeight;
  
    x_units.times(function(i){
      var line = self.paper.path('M' + (i * self.gridWidth) + ' 0L' + (i * self.gridWidth) + ' ' +  height);
      line.attr({
        'stroke-width': '1px',   
        'stroke': self.gridColor
      });
      line.translate(0.5, 0.5);
      
      if(scale >= 0.5){
        y_units.times(function(y_i){
          var x_label = (i * self.gridWidth);
          var y_label = (y_i * self.gridWidth) + Sector.starfield.y;
          var label = self.paper.text(x_label + 8,y_label + 12, (x_label + Sector.starfield.x) + ' : ' + (y_label  + Sector.starfield.y));
          label.attr({
            'fill': self.textColor,
            'font-size': 11, 
            'text-anchor': 'start',
            'font-family': self.fonts
          });
        });
      }
    });
    
    y_units.times(function(i){
      var line = self.paper.path('M0 ' + (i * self.gridHeight) +'L' +  width + ' ' + (i * self.gridHeight));
      line.attr({
        'stroke-width': '1px',   
        'stroke': self.gridColor
      });
      line.translate(0.5, 0.5);
    });
    

    self.paper.renderfix();
  };
  
  self.init();
  
};
