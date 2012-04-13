var flatiron = require('flatiron'),
    app = flatiron.app,
    fs = require('fs'),
    players = require('./players.js'),
    jsdom = require('jsdom'),
    System = require('../../app/models/system.js').System,
    Systems = exports;
    
Systems.index = function(name){
  var self = this;
  
  players.authenticate(self, function(err, player){  
    if(err) return callback(err); 
        
    
    System.all(function(err, systems){ 
      if(err) return callback(err); 
      var data = {
            systems: systems.map(function(s){ return s.toJSON(); }),
            player: player.toJSON()
          };
      app.render('systems/index', data, function(template){
        app.render_layout(self, template);
      }); 
    });
  });
};
  
Systems.show = function(id){
  var self = this;
  
  players.authenticate(self, function(err, player){
    // if(err) return callback(err); 
    System.all(function(err, systems){
      // if(err) return callback(err);
      if(systems.length){
        var system = systems.find(function(s){ return s._id == id }),
            data = {
              system: system,
              systems: systems
            }
        app.render('systems/index', data, function(template){
          app.render_layout(self, template);
        });   
      } else {
        app.render_layout('<h1>' + slug + ' is not a planet.</h1>');
      }
    });
  });
}

Systems.admin = function(name){
  var self = this;
  
  players.authenticate(self, function(err, player){  
    if(err) return callback(err); 
        
    jsdom.env({
        html: "<html><body></body></html>", 
        scripts: [
         'http://code.jquery.com/jquery-1.5.min.js'
        ]
      }, function(errors, window) {
    	if (errors) {
    		console.error(errors);
    		return;
    	}
      console.log('argh')
      window.$('body').append("<div class='testing'>Hello World, fuck you!</div>");
      console.log(window.$(".testing").text());
    });
        
    
    System.all(function(err, systems){ 
      if(err) return callback(err); 
      var data = {
            systems: systems.map(function(p){ return p.toJSON(); }),
            player: player.toJSON()
          };
      app.render('admin/index', data, function(template){
        app.render_layout(self, template, 'admin');
      }); 
    });
  });
};

Systems.model = function(name){
  var self = this;
  var response = this.res;
    
  fs.readFile(__dirname + '/../models/' + name, 'utf8', function(error, file) {
    if (error) {
      console.log(error)
      response.writeHead(404);
      return response.end('File not found');
    }
    
    response.writeHead(200, { 
      'Content-Type': 'text/javascript', 
      'Cache-Control': 'max-age=300, public' 
    });
    response.end(file);
  });
  
};



