var fs = require('fs');
    
exports.name = 'Loader';

exports.attach = function (options) {
  this.load = function(path, callback){
    fs.readFile(path , 'utf8', function(err, contents){
      if(err){
        callback(err);
      } else {
        callback(null, contents);
      }
    });
  };
};
