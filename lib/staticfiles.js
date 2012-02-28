// static files
// Should this be middleware?

var fs = require('fs'),
    staticfiles;

staticfiles = function () {
  var path = this.req.url,
      ext = path.split('.')[1],
      response = this.res,
      filetypes = {
	      js:  'text/javascript',
        css: 'text/css',
        png: 'image/png',
        jpg: 'image/jpg',
        jpeg: 'image/jpg'
      };

  fs.readFile(__dirname + '/../public/' + path, function(error, file) {
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
