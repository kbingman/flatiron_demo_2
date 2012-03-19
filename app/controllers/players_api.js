var flatiron = require('flatiron'),
    app = flatiron.app,
    session = require('connect').session,
    cookieParser = require('connect').cookieParser,
    sugar = require('sugar'),
    Player = require('../../app/models/player.js').Player;

var Api = {
  
  index: function(){
    var self = this;
    
    Player.all(function(error, players){
      if(error) return callback(error);
      
      self.res.writeHead(200, { 'Content-Type': 'text/json' });
      self.res.json(players);
    });
    
  },
  
  // current: function(){
  //   Player.get()
  // }
  
  create: function(){
    var self = this;
    var params = self.req.body;

    Player.create(params, function(error, player){
      //  if(error) return error;
      if(error) console.log(error);
      self.res.json(player);
    });
  },
  
  login: function(){
    var self = this;
    var params = self.req.body;
    
    Player.find({ email: params.email }, function(error, players){
      if(error) return callback(error);
      
      var player = players.first();
      
      if(player && player.password === params.password){
        self.req.session.player_id = player._id;
        self.req.connection = { encrypted: false }; 
        self.res.emit('header');
        self.res.writeHead(302, { 'Location': '/' });
        self.res.end();
        // self.res.json(player);
      } else {
        self.res.writeHead(403, { 'Content-Type': 'text/json' });
        self.res.json({ error: 'not authorized'});
      }
    });
  }

}

exports.api = Api;

