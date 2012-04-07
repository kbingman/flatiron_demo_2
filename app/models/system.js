var resourceful = require('resourceful-mongo'),
    async = require('async'),
    sugar = require('sugar'),
    Star = require('./star').Star,
    Planet = require('./planet').Planet;
    
var System = resourceful.define('system', function () {
  var self = this;
  
  var start_x = 0; // options['start_x'] ? options['start_x'] : 
  var start_y = 0; // options['start_y'] ? options['start_y'] : 
  var start_z = 0; // options['start_z'] ? options['start_z'] :
  var width  = 1024; // options['width'] ? options['width'] : 
  var height = 1024; // options['height'] ? options['height']
  var depth  = 1024; // options['depth'] ? options['depth'] : 

  //
  // Storage engine and collection name
  //
  self.use('mongodb', {
    database: 'planetary', //required - databasename which contains collections
    collection: 'systems', // required - the collection to use for this resource
    safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  });
  
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
  
  // Hooks
  self.before('create', function(instance, callback) {
    instance.x = parseInt(Math.random() * width) + start_x;
    instance.y = parseInt(Math.random() * height) + start_y;
    instance.z = parseInt(Math.random() * depth) + start_z;
    instance.name = instance.x + ':' + instance.y + ':' + instance.z;
    instance.orbits = {};
    instance.clustered  = false;
    instance.stars = [];
    instance.planets = [];
    instance.mass = 0;
  
    // Stars
    // about 50% need to be multiple stars
    self.create_stars(instance, function(){
      self.create_planets(instance, callback);
    });
  });
  
  // self.after('create', function(err, instance, callback) {
  //   console.log('after create');
  //   callback();
  // });
  
  // Create Stars
  // ----------------------------------------------------------------
  self.create_stars = function(instance, callback){
    Star.create({}, function(err, star){
      instance.stars.push(star.toJSON());
      instance.mass = instance.mass + star.mass;
      
      callback();
    });
  };
  
  // Create Planets
  // ----------------------------------------------------------------
  self.create_planets = function(instance, callback){
    var zones = [],
        index = 0,
        star = instance.stars.first(),
        orbits = Star.types.find(function(type){
          return type.name == star.klass
        }).orbits,
        create_planet = function(zone, done){
          Planet.create({ zone: zone, position: index }, function(err, p){ 
            instance.planets.push(p.toJSON());
            done();
          });
          index++; 
        };
          
    // Calculates probability of planets in each zone
    Object.extended(orbits).each(function(key, value){
      var slot_probabilty = (Math.random() * 2) + .5;
      var slots = Math.round(value * Math.sqrt(instance.mass) * slot_probabilty);

      (slots).times(function(i){
        zones.push(key);
      })
      instance.orbits[key] = slots;    
    });
      
    async.forEach(zones, create_planet, function(err){
      if(err){ console.log(err); }
      callback();
    });
  };
  
  // Instance Methods
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
  
  
  // ----------------------------------------------------------------
  // TODO Move this to a maintainable place
  self.insert = function(documents, callback) {
    var config = this.config;
  
    self._connection.collection(function(err, collection) {
      collection.insert(documents, {safe: true}, callback);
    });
  };
  // ----------------------------------------------------------------
  

  
// self.prototype.cluster = function(callback){
//   
//   var instance = this;
//   
//   var star = instance.stars[0];
//   var mass = instance.mass;
//   var attraction_radius = mass * 72; 
//   
//   var x1 = instance.x - attraction_radius;
//   var x2 = instance.x + attraction_radius;
//   var y1 = instance.y - attraction_radius;
//   var y2 = instance.y + attraction_radius;
//   var conditions = { $and: [{'x':{ $gte: x1 }},  {'x':{ $lte: x2 }}, {'y':{ $gte: y1 }},  {'y':{ $lte: y2 }}, {'mass': { $lt: mass }}] };
//   // Needs to find nearby systems
//   // console.log('fuck')
//   self.find(conditions, function(err, systems){ 
//     if(err) callback.call(this, err, instance);
//     // console.log('you')
//     var clusterer = function(system, done){
//       var delta_x = instance.x - system.x;
//       var delta_y = instance.y - system.y;
//       var length = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2)); 
//       
//       // console.log("Delta X: " + delta_x)
//       // console.log("Delta Y: " + delta_y)
// 
//       // This is more or less arbitrary and I just made it up
//       // The equation, though, plots a point on the line between the two stars and
//       // returns its coordinates
//       var n = (Math.sqrt(length) * Math.sqrt(mass) * 1.3);
//       var m = length - n;
//       var x = ((m * instance.x) + (n * system.x))/(m + n);
//       var y = ((m * instance.y) + (n * system.y))/(m + n);
//         
//       instance.x = Math.round(x);
//       instance.y = Math.round(y);
//       done();
//     }
//     
//     if(systems && systems.length){
//       async.forEach(systems, clusterer, function(err){
//         // if(err) callback.call(this, err, instance);
//         instance.clustered = true; 
//         
//         // console.log('cluster')
//         callback.call(this, null, instance);
//       });
//     } else {
//       instance.clustered = true; 
//       callback.call(this, null, instance);
//     }
//   });    
// 
// } 
  
  
});

exports.System = System;
