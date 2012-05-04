var flatiron = require('flatiron'),
    sugar = require('sugar'),
    ecstatic = require('ecstatic'),
    session = require('connect').cookieSession,
    cookieParser = require('connect').cookieParser,  
    fs = require('fs'),
    path = require('path'),
    staticfiles = require('./app/controllers/staticfiles.js').staticfiles,
    templates = require('./app/controllers/templates.js'),
    systems = require('./app/controllers/systems.js'),
    players = require('./app/controllers/players.js'),
    players_api = require('./app/controllers/players_api.js').api,
    systems_api = require('./app/controllers/systems_api.js').api,
    Player = require('./app/models/player.js').Player,
    io = require('socket.io'),
    // TODO move to config file
    epoch = new Date('Mar 22 2012'),
    app = flatiron.app;
    
  // this is a comment

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
app.use(flatiron.plugins.http);
app.use(require('./plugins/hogan_templates'));

app.http.before.push(cookieParser('todo list secret'));
app.http.before.push(session({ 
  cookie: { maxAge: 60 * 60 * 60 * 1000 }
}));
app.http.before.push(ecstatic(__dirname + '/public', { 
  autoIndex: false 
}));

app.routes = {
  '/': { 
    get: systems.index,
    '/signup': { 
      get: players.new
    },
    '/systems': { 
      get: systems.index,
      '/:id': { 
        get: systems.show
      }
    },
    // '/models/:name': { 
    //   get: systems.model
    // },
    '/admin':{
      get: systems.admin,
      '/map': { get: systems.map }
    },
    '/api':{
      // get: players.test,
      '/players': { 
        get: players_api.index,
        post: players_api.create
      },
      '/login': { 
        post: players_api.login
      },
      '/systems': { 
        get: systems_api.index,
        post: systems_api.create,
        '/:id': { 
          get: systems_api.show,
          put: systems_api.update,
          delete: systems_api.destroy
        }
      }
    },
    '/js/templates.js': { get: templates.templates }
  }
};

app.router.mount(app.routes);
// app.router.configure({ recurse: 'forward' });

app.start(8080, function () {
  console.log('flatiron with http running on 8080');
});

// This will be the real heart of the game
var io = require('socket.io').listen(app.server);
io.sockets.on('connection', function(socket) {
  // One day here equals a year of a game time, for now
  socket.emit('timestamp', { time: epoch.secondsAgo() });
  
  socket.on('set player', function (data) {
    Player.get(data.player_id, function(error, player){
      console.log('Player: ' + player);
      socket.set('player', player, function () { socket.emit('player', { player: player.toJSON() }); });
    });
  });

  socket.on('get player', function () {
    socket.get('player', function (err, player) {
      socket.emit('player', { player: player.toJSON() });
    });
  });
});




