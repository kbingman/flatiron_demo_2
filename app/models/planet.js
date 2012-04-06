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
  self.property('name', String);
  self.property('slug', String);
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
            
      if(probability > start && probability < frequency) {
        instance.klass      = klass.name;
        instance.radius     = klass.radius * ((Math.random() * .8) + .6);
        instance.atmosphere = klass.atmosphere;
        
        return false;
      }
    });
    callback.call(this);
  });
  
  // Before Save
  self.before('save', function(instance, callback) {
    if(instance.name){
      instance.slug = instance.name.toLowerCase().replace(/ /g, '-').replace(/:/g, '');
    }
    callback.call(this);
  });
  
  self.types = { 
    'cerian': { radius: 0.5, atmosphere: 'none', moons: 0 },
    'planetoid belt': { radius: 0.5, atmosphere: 'none', moons: 10 },
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
        { name: 'cerian', frequency: .02, atmosphere: '-', radius: 0.5 }, 
        { name: 'planetoid belt', frequency: .02, atmosphere: '-', radius: 0.5 }
      ]
    },{
      name: 'hot',
      planets: [ 
        { name: 'boiling gas giant', frequency: .10, atmosphere: 'Hydrogen', radius: 10 },
        { name: 'planetoid belt', frequency: .38, atmosphere: '-', radius: 0.5 },
        { name: 'cerian', frequency: .52, atmosphere: '-', radius: 0.5 }
      ]
    },{
      name: 'habitable',
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
      name: 'almosthabitable',
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
