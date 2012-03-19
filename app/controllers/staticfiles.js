// static files
// Should this be middleware?
// or a plugin?

var fs = require('fs'),
    hogan = require('hogan.js'),
    async = require('async'),
    sugar = require('sugar');
    
var staticfiles, templates;

staticfiles = function () {
  var path = this.req.url,
      path_parts = path.split('.'),
      ext = path_parts[path_parts.length - 1],
      response = this.res,
      filetypes = {
	      js:  'text/javascript',
        css: 'text/css',
        png: 'image/png',
        jpg: 'image/jpg',
        jpeg: 'image/jpg'
      };

  fs.readFile(__dirname + '/../../public/' + path, 'utf8', function(error, file) {
    if (error) {
      response.writeHead(404);
      return response.end('File not found');
    }
    
    response.writeHead(200, { 
      'Content-Type': filetypes[ext], 
      'Cache-Control': 'max-age=300, public' 
    });
    response.end(file);
  });
}

exports.staticfiles = staticfiles;
