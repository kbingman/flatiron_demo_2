var resourceful = require('resourceful'),
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
  
  render_html: function(http, html){
    http.res.writeHead(200, { 'Content-Type': 'text/html' });
    http.res.end(html);
  }
  
}

exports.controllers = Controllers;
