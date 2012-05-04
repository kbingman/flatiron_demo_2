var flatiron = require('flatiron'),
    app = flatiron.app,
    Player = require('../models/player.js').Player,      
    Players = exports;

Players.new = function(name){
  var self = this;
  
  app.render('players/new', {}, function(template){
    app.render_layout(self, template);
  });
};
  
Players.authenticate = function(app, callback){
  console.log('player_id')
  var player_id = app.req.session.player_id;
  console.log(player_id)
  
  Player.get(player_id, function(error, player){
    console.log('error')
    console.log(player)
    if(error){
      console.log(error)
      app.res.writeHead(302, { 'Location': '/signup' });
      app.res.end();
      return; 
    }
    if(player){
      callback(null, player);
    } else {
      app.res.writeHead(302, { 'Location': '/signup' });
      app.res.end();
    }
  });
};
