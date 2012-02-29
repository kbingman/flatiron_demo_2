var fs = require('fs');
    
exports.name = 'Load a file';

exports.attach = function (options) {
  this.load = function(path, next){
    fs.readFile(path , 'utf8', function(err, fileString){
      if(err){
        next(err);
      } else {
        next(null, fileString);
      }
    });
  };
};