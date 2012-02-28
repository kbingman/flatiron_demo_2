var flatiron = require('flatiron'),
    fs = require('fs'),
    path = require('path'),
    staticfiles = require('./lib/staticfiles.js').staticfiles,
    controllers = require('./app/controllers.js').controllers,
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
app.use(flatiron.plugins.http);

app.routes = {
  '/': { 
    get: controllers.helloWorld,
    '/mars': { get: controllers.mars },
    '/hello': { get: controllers.helloWorld },
    '/bye': { get: controllers.goodByeWorld },
    '/*': { get: controllers.wtf }
  }
};

app.router.mount(app.routes);
app.router.get(/.+/, staticfiles)


app.start(8080, function () {
  console.log('flatiron with http running on 8080');
});
