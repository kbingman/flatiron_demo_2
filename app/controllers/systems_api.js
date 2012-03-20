var fs = require('fs'),
    path = require('path'),
    sugar = require('sugar'),
    resourceful = require('resourceful'),
    players = require('./players.js'),
    System = require('../models/system.js').System;


var Api = {
  
  index: function(){
    var self = this;
    players.authenticate(self, function(err, player){ 
      System.all(function(error, systems){
        self.res.json(systems.map(function(p){ return p.toJSON(); }));
      });
    });
  },
  
  show: function(id){
    var self = this;
    players.authenticate(self, function(err, player){ 
      System.get(id, function(error, system){
        if(system){
          self.res.json(system.toJSON());  
        } else {
          self.res.json({ error: 'not found' });  
        }
      });
    });
  },
  
  create: function(){
    var self = this;
    players.authenticate(self, function(err, player){ 
      System.generate({}, function(err, system){
        console.log(err)
        if(system){
          self.res.json(system.toJSON());
        }
      });
    });
  }
  
  // update: function(id){
  //   var self = this;
  // 
  //   System.get(id, function(error, system){
  //     if(system){
  //       system.update(function(){
  //         self.res.json(system.toJSON());
  //       });  
  //     } else {
  //       self.res.json({ error: 'not found' }); 
  //     }
  //   });
  // },
  // 
  // // Deathstar function...
  // destroy: function(id){
  //   var self = this;
  // 
  //   System.get(id, function(error, system){
  //     if(system){
  //       system.destroy(function(){
  //         self.res.json({ message: 'destroyed' }); 
  //       });  
  //     } else {
  //       self.res.json({ error: 'not found' }); 
  //     }
  //   });
  // }
  
}

exports.api = Api;
