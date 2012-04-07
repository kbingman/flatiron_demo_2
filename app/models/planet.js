var resourceful = require('resourceful-mongo'),
    sugar = require('sugar');

var Planet = resourceful.define('planet', function () {

  var self = this;
    
  self.prototype.zone = function(){
    var zone = orbital_zones.find(function(z){ 
      return z.name == self.zone;
    });
    return zone;
  }

  // Use Memory, as planets are save in the parent System document
  self.use('memory');
  
  // Properties and types
  // self.property('name', String);
  // self.property('slug', String);
  self.property('klass');
  self.property('zone');
  self.property('atmosphere');
  self.property('radius', Number);
  self.property('position', Number);
  // self.property('population', Number);
  // self.property('system_id', String);
  
  // Errors
  self.on('error', function() {
    console.log(arguments)
  });
  
  // Before Create 
  self.before('create', function(instance, callback) {
    var frequency = 0,
        zone = self.orbital_zones.find(function(z){ 
          return z.name == instance.zone;
        }),
        probability = Math.random();
        
    zone.planets.each(function(klass){
      var start = frequency; 
      
      frequency = frequency + parseFloat(klass.frequency);
            
      if(instance.klass == klass.name || (probability > start && probability < frequency)) {
        instance.klass      = klass.name;
        instance.radius     = self.types[klass.name].radius * ((Math.random() * .8) + .6);
        instance.atmosphere = self.types[klass.name].atmosphere;
        
        return false;
      }
    });
    callback();
  });
  
  // Before Save
  // self.before('save', function(instance, callback) {
  //   if(instance.name){
  //     instance.slug = instance.name.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
  //   }
  //   callback();
  // });
  
  self.types = { 
    'cerian': { radius: 0.5, atmosphere: 'none', moons: 0 },
    'hot gas giant': { radius: 10, atmosphere: 'Hydrogen / Methane', moons: 10, rings: 1 },
    'planetoids': { radius: 0.5, atmosphere: 'none', moons: 10 },
    'desert': { radius: 1, atmosphere: 'Oxygen / Nitrogen', moons: 1 },
    'terran': { radius: 1, atmosphere: 'Oxygen / Nitrogen', moons: 1 },
    'tundra': { radius: 1, atmosphere: 'Oxygen / Nitrogen', moons: 1 },
    'arid':  { radius: 1, atmosphere: 'Oxygen / Nitrogen', moons: 1 },
    'arean': { radius: 0.7, atmosphere: 'Carbon Dioxide', moons: 1 },
    'gas giant': { radius: 4, atmosphere: 'Hydrogen', moons: 10, rings: 1 },
    'ice giant': { radius: 4, atmosphere: 'Hydrogen / Methane', moons: 10, rings: 1 },
    'kuiper body': { radius: 0.1, atmosphere: '-' }
  };
  
  // Basic orbital slots, types, distribution and attributes
  self.orbital_zones = [ 
    { name: 'veryhot',
      planets: [  
        { name: 'cerian', frequency: .50 }, 
        { name: 'planetoids', frequency: .50 }
      ]
    },{
      name: 'hot',
      planets: [ 
        { name: 'hot gas giant', frequency: .10 },
        { name: 'planetoids', frequency: .38 },
        { name: 'cerian', frequency: .52 }
      ]
    },{
      name: 'habitable',
      planets: [ 
        { name: 'gas giant', frequency: .005 },
        { name: 'arean', frequency: .02  },
        { name: 'desert', frequency: .09 },
        { name: 'terran', frequency: .15 },
        { name: 'tundra', frequency: .20 },
        { name: 'planetoids', frequency: .22 },
        { name: 'arid', frequency: .30 }
      ]
    },{
      name: 'almosthabitable',
      planets: [ 
        { name: 'gas giant', frequency: .005 },
        { name: 'planetoid belt', frequency: .02 },
        { name: 'arean', frequency: .06 },
        { name: 'tundra', frequency: .07 }
      ],
    },{
      name: 'cold',
      planets: [ 
        { name: 'planetoids', frequency: .04 },
        { name: 'gas giant', frequency: .57 }
      ]
    },{
      name: 'verycold',
      planets: [ 
        { name: 'planetoids', frequency: .05 },
        { name: 'ice giant', frequency: .42 }
      ]
    },{
      name: 'kuiper',
      planets: [ 
        { name: 'cerian', frequency: '.10' },
        { name: 'dirty iceball', frequency: '.90' }
      ] 
    }
  ]
});

exports.Planet = Planet;
