var resourceful = require('resourceful'),
    Planet = require('../app/models/planet.js').Planet;


var Controllers = {

  helloWorld: function() {
    Controllers.render_html(this, '<h1>Hello World!</h1>');
  },
  
  goodByeWorld: function(){
    Controllers.render_html(this, '<h1>Good Bye World!</h1>');
  },
  
  mars: function(){
    var mars = new Planet({ name: 'Mars' });

    Controllers.render_html(this, '<h1>Hello ' + mars.name + '</h1>');
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
