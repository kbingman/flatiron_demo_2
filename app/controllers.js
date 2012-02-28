var fs = require('fs'),
    resourceful = require('resourceful'),
    plates = require('plates'),
    Planet = require('../app/models/planet.js').Planet;


var Controllers = {

  helloWorld: function() {
    Controllers.render_html(this, '<h1>Hello World!</h1>');
  },
  
  goodByeWorld: function(){
    Controllers.render_html(this, '<h1>Good Bye World!</h1>');
  },
  
  planets: function(name){
    var planet = new Planet({ name: name });

    Controllers.render_html(this, '<h1>Hello ' + planet.name + '</h1>');
  },
  
  wtf: function(){
    Controllers.render_html(this, '<h1>Hello whoever the f*#k you are.');
  },
  
  render_html: function(http, content, template){
    var template = template ? template : 'index';
    var path = __dirname + '/templates/index.html';
    
    fs.readFile(path , 'utf8', function(error, html){
      if(error){
        next(error);
      } else {
        var data = { 'content': content };
        var output = plates.bind(html, data);
       
        http.res.writeHead(200, { 'Content-Type': 'text/html' });
        http.res.end(plates.bind(html, data));
      }
    });
  
  }
  
}

exports.controllers = Controllers;
