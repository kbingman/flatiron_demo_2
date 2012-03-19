var resourceful = require('resourceful-mongo'),
    sugar = require('sugar');

// In a real app, this would need a persistence layer, 
// that is a database like MongoDB or CouchDB. 
// Right now, we just store the models in Memory for educational purposes.

var Planet = resourceful.define('planet', function () {

  var self = this;
  
  // Overwrites the save method
  // allowing something to happen before it..
  // self.prototype.save = function(callback){
  //   this.slug = this.name.toLowerCase().replace(/ /g, '-');
  // 
  //   Planet.save(this, callback)
  // }
  
  self.prototype.zone = function(){
    var zone = orbital_zones.find(function(z){ 
      return z.name == self.zone;
    });
    return zone;
  }
  
  // self.prototype.toJSON = function(){
  //   return Planet.toJSON(this)
  // }
  
  
  //
  // Specify use of the mongodb engine
  //
  self.use('memory');
  // self.use('mongodb', {
  //   database: 'planetary', //required - databasename which contains collections
  //   collection: 'planets', // required - the collection to use for this resource
  //   safe : true // optional - run the driver in safe mode to ensure that the update succeeded. Defaults to false
  // });
  
  self.property('name', String);
  self.property('slug', String);
  self.property('klass');
  self.property('zone');
  self.property('atmosphere');
  self.property('radius', Number);
  self.property('position', Number);
  self.property('population', Number);
  self.property('system_id', String);
  
  // Builds a planet with random attributes, but that follow the basic distribution
  self.generate = function (system, attr, callback) {
        
    var self = this;
    var frequency = 0;
    var zone = self.orbital_zones.find(function(z){ 
      return z.name == attr.zone;
    });
    
    var probability = Math.random();
   
    for (p in zone.planets) {
      
      var klass = zone.planets[p];
      var start = frequency; 
      var frequency = frequency + klass.frequency;
      
      // console.log('frequency: ' + frequency)
      // console.log('start: ' + start)
      // console.log('probability: ' + probability)
      
      if(probability > start && probability < frequency) {
        var planet = new Planet(attr);
  
        // planet.position   = index;
        // planet.name      =  planet.name + '-' + index;
        planet.klass      = klass.name;
        planet.slug       = planet.name.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
        planet.radius     = klass.radius * ((Math.random() * .8) + .6);
        planet.atmosphere = klass.atmosphere;
        // planet.system_id  = system._id.toString();
        
        planet.save(function(err, planet){
          if(err){
            console.log(err)
            return
          }
          system.planets.push(planet);
          if(callback) callback.call(null, planet);
        });
        
        break;
      }
    }
    
  };
  
  
  // Basic orbital slots, types, distribution and attributes
  self.orbital_zones = [ 
    { name: 'veryhot',
      planets: [  
        { name: 'cerian', frequency: .02, atmosphere: '-', radius: 0.5 }, 
        { name: 'planetoid belt', frequency: .02, atmosphere: '-', radius: 0.5 }
      ]
    },{
      name: 'hot',
      planets: [ 
        { name: 'boiling gas giant', frequency: .10, atmosphere: 'Hydrogen', radius: 10 },
        { name: 'cthonian', frequency: .30, atmosphere: '-', radius: 0.5 },
        { name: 'cerian', frequency: .42, atmosphere: '-', radius: 0.5 }
      ]
    },{
      name: 'habital',
      planets: [ 
        { name: 'gas giant', frequency: .005, atmosphere: 'Hydrogen', radius: 4  },
        { name: 'ammonia', frequency: .015, atmosphere: 'Ammonia', radius: 1  },
        { name: 'arean', frequency: .02, atmosphere: 'Carbon Dioxide', radius: 0.7  },
        { name: 'desert', frequency: .09, atmosphere: 'Oxygen / Nitrogen', radius: 1 },
        { name: 'terran', frequency: .15, atmosphere: 'Oxygen / Nitrogen', radius: 1 },
        { name: 'tundra', frequency: .20, atmosphere: 'Oxygen / Nitrogen', radius: 1 },
        { name: 'planetoids', frequency: .22, atmosphere: '-', radius: 0.5 },
        { name: 'arid', frequency: .30, atmosphere: 'Oxygen / Nitrogen', radius: 1 }
      ]
    },{
      name: 'almosthabital',
      planets: [ 
        { name: 'gas giant', frequency: .005, atmosphere: 'Hydrogen', radius: 4  },
        { name: 'planetoid belt', frequency: .02, atmosphere: '-', radius: 0.5 },
        { name: 'ammonia', frequency: .04, atmosphere: 'Ammonia', radius: 1  },
        { name: 'arean', frequency: .06, atmosphere: 'Carbon Dioxide', radius: 0.7  },
        { name: 'tundra', frequency: .07, atmosphere: 'Oxygen / Nitrogen', radius: 1 }
      ],
    },{
      name: 'cold',
      planets: [ 
        { name: 'planetoids', frequency: .04, atmosphere: '-', radius: 0.5 },
        { name: 'gas giant', frequency: .57, atmosphere: 'Hydrogen', radius: 10 }
      ]
    },{
      name: 'verycold',
      planets: [ 
        { name: 'planetoids', frequency: .05, atmosphere: '-', radius: 0.5  },
        { name: 'ice giant', frequency: .42, atmosphere: 'Hydrogen / Methane', radius: 5 }
      ]
    },{
      name: 'kuiper',
      planets: [ 
        { name: 'rocky', frequency: '.10', atmosphere: '-', radius: 0.1 },
        { name: 'dirty iceball', frequency: '.90', atmosphere: '-', radius: 0.1 }
      ] 
    }
  ]
});

exports.Planet = Planet;
