var flatiron = require('flatiron'),
    session = require('connect').session,
    cookieParser = require('connect').cookieParser,  
    fs = require('fs'),
    path = require('path'),
    staticfiles = require('./app/controllers/staticfiles.js').staticfiles,
    templates = require('./app/controllers/templates.js'),
    systems = require('./app/controllers/systems.js').controllers,
    players = require('./app/controllers/players.js'),
    players_api = require('./app/controllers/players_api.js').api,
    systems_api = require('./app/controllers/systems_api.js').api,
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
app.use(flatiron.plugins.http);
app.use(require('./plugins/hogan_templates'));

app.http.before.push(cookieParser('todo list secret'));
app.http.before.push(session());

// homegrown helpers for using hogan templates and a 
// rails style layout / template / partial structure


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
app.router.get(/.+/, staticfiles);

app.start(8080, function () {
  console.log('flatiron with http running on 8080');
});
