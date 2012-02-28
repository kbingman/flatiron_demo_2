var controllers = {

  helloWorld: function() {
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    this.res.end('<h1>Hello World!</h1>');
  },
  
  goodByeWorld: function(){
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    this.res.end('<h1>Good Bye World!</h1>');
  }
  
}

exports.Controllers = Controllers;
