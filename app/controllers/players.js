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

// Players.test = function(next){
//   var self = this;
//   
//   Players.authenticate(self, function(err, player){ 
//     console.log('test');
//     next();
//   });
// 
// };
  
Players.authenticate = function(app, callback){
  var player_id = app.req.session.player_id;
  
  Player.get(player_id, function(error, player){
    // if(error) return callback(error);
    if(player){
      callback(null, player);
    } else {
      app.res.writeHead(302, { 'Location': '/signup' });
      app.res.end();
    }
  });
};
