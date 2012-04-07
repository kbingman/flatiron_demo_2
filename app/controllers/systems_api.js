var fs = require('fs'),
    path = require('path'),
    sugar = require('sugar'),
    async = require('async'),
    resourceful = require('resourceful'),
    players = require('./players.js'),
    System = require('../models/system.js').System;


var Api = {
  
  index: function(){
    var self = this;
    players.authenticate(self, function(err, player){ 
      console.log(System.protocol)
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
    var count = 0;
    var systems = []
    var quantity = this.req ? this.req.body.number : 1;
    
    players.authenticate(self, function(err, player){ 
      
      // TODO extract
      async.whilst(
        function () { return count < quantity; },
        function (callback) {
          count++;
          System.create({}, function(error, system){ 
            if(error) callback(error);
            setTimeout(function(){
              systems.push(system)
              callback(null, system);
            },1);
          });
        },
        function (error) {
          console.log('finished');
          console.log('Systems: ' + systems.length);
          if(error){
            self.res.json({ error: err });
          } else {
            self.res.json(systems.map(function(s){ return s.toJSON(); }));
          }
        }
      );
      
      
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
