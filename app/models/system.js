var resourceful = require('resourceful-mongo'),
    async = require('async'),
    sugar = require('sugar'),
    Star = require('./star').Star,
    Planet = require('./planet').Planet;

var System = resourceful.define('system', function () {
  var self = this;
	
  //
  // Storage engine and collection name
  //
  self.use('mongodb', {
    database: 'planetary', //required - databasename which contains collections
    collection: 'systems', // required - the collection to use for this resource
    safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  });
  
  
  //
  // Properties with validation
  self.property('name', String); // Defaults to String
  self.property('x', Number);
  self.property('y', Number);
  self.property('z', Number);
  self.property('orbits', Object);
  self.property('mass', Number); 
  self.property('planets', Array); 
  self.property('stars', Array); 
  self.property('nearby_stars', Array); 
  self.property('clustered', Boolean);
  
  self.prototype.toJSON = function(){
    var system = this;
    return {
      '_id': system._id,
      'name': system.name,
      'x': system.x,
      'y': system.y,
      'z': system.z,
      'stars': system.stars,
      'star_count': system.stars.length,
      'planets': system.planets,
      'planet_count': system.planets.length
    }
  };
  
  
  self.generate = function(options, callback){
    
    var self = this;
    var instance = new(self)();
    
    var start_x = options['start_x'] ? options['start_x'] : 0;
    var start_y = options['start_y'] ? options['start_y'] : 0;
    var start_z = options['start_z'] ? options['start_z'] : 0;
    
    var width = options['width'] ? options['width'] : 1024;
    var height = options['height'] ? options['height'] : 1024;
    var depth = options['depth'] ? options['depth'] : 1024;
    
    instance.x = parseInt(Math.random() * width) + start_x;
    instance.y = parseInt(Math.random() * height) + start_y;
    instance.z = parseInt(Math.random() * depth) + start_z;
  
    instance.name = instance.x + ':' + instance.y + ':' + instance.z,
    instance.orbits = {};
    instance.clustered  = false;
    // instance.orbital_slots = [];
    instance.mass = 0;

    // Needs to account for binary / trinary systems
    Star.generate({ name: instance.x + ':' + instance.y }, function(error, star){
      if( error ) {
        console.log(error);
        callback(error);
      } else {
        instance.stars.push(star);
        instance.mass = instance.mass + star.mass; 
        
        // Secondary stars go here

        // build planets here
        self.generate_orbits(instance, function(){
          instance.save(function(error, instance){
            if( error ) callback(error);
            else callback(null, instance);
          });
        });
      }
    
    });
  }
  
  
  //
  // Builds a planet for available orbits
  //
  self.generate_orbits = function(instance, callback){
    var star = instance.stars[0];
    var available_planets = []
    var orbits = Star.types.find(function(type){
          return type.name == star.klass
        }).orbits;
    var generate = function(zone, done){
          var attr = {
            name: instance.name,
            zone: zone
          }
          Planet.generate(instance, attr)
        };
        
    // The chance that a system has any planets
    // var percentage = .30;
    
    Object.extended(orbits).each(function(key, value){
      // console.log(key + ': ' + value);
      var slot_probabilty = (Math.random() * 2) + .5;
      var slots = Math.round(value * Math.sqrt(instance.mass) * slot_probabilty);
      (slots).times(function(i){
        available_planets.push(key);
      })
      instance.orbits[key] = slots;    
    });
    
    available_planets.forEach(function(zone){
      generate(zone);
    });
    
    callback(null, instance);
  }
  
});

exports.System = System;
