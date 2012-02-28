var flatiron = require('flatiron'),
    path = require('path'),
    controllers = require('./lib/controllers.js').controllers,
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);

var routes = {
  '/': { get: controllers.helloWorld },
  '/hello': { get: controllers.helloWorld },
  '/bye': { get: controllers.goodByeWorld }
};

app.router.mount(routes);
app.start(3000);
