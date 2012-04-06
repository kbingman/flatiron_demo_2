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
    var systems_array = []
    var quantity = this.req.body.number || 1;
    
    players.authenticate(self, function(err, player){ 
      // var generate = function(callback){
      //   System.generate({}, function(err, system){
      //     console.log(err);
      //     if(system){
      //       callback
      //     }
      //   });
      // }
      
      async.whilst(
        function () { return count < quantity; },
        function (callback) {
          count++;
          System.generate({}, function(err, system){
            if(err) callback(err)
            if(system){
              setTimeout(function(){

                system.save(function(err, system){
                  console.log(count)
                  systems_array.push(system)
                  callback(null, system)
                })
                
              }, 10)
            }
          });
        },
        function (err) {
          console.log('finished');
          console.log('Systems: ' + systems_array.length);
          // System.insert(systems_array, function(error, systems){
          //   if(error){
          //     self.res.json({ error: error });
          //   }
          //   self.res.json(systems.map(function(p){ return p.toJSON(); }));
          // });
          
          
          // self.res.json({ systems: [] });
          System.all(function(error, systems){
            if(error){
              self.res.json({ error: error });
            }
            self.res.json(systems.map(function(p){ return p.toJSON(); }));
          });
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
