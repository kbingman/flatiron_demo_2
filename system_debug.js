var System = require('./app/models/system').System;
var Sugar = require('sugar');
var counter = 0;
var test = function(){
  counter++
  if(counter < 42){
    System.generate({}, function(err, s){ 
      s.save(function(err, system){
        console.log(counter);
        test();
      }); 
    });
  } else {
    return false;
  }
}

var test = function(){
  counter++
  if(counter < 42){
    s = new System();
    s.save(function(err, system){
      console.log(counter);
      test();
    }); 
  } else {
    return false;
  }
}

