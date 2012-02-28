var resourceful = require('resourceful');

// In a real app, this would need a persistence layer, like MongoDB or CouchDB. 
// Right now, we just store the models in Memory for educational purposes.

var Planet = resourceful.define('planet', function () {
  var self = this;
  
  self.property('name');
  self.property('klass');
  self.property('zone');
  self.property('atmosphere');
  self.property('position', Number);
  self.property('population', Number);
  
  // Basic orbital slots, types, distribution and attributes
  self.orbital_zones = {  
    veryhot: [  
      { name: 'cerian', frequency: .02, atmosphere: '-', radius: 0.5 }, 
      { name: 'planetoid belt', frequency: .02, atmosphere: '-', radius: 0.5 }
    ],
    hot: [ 
      { name: 'boiling gas giant', frequency: .10, atmosphere: 'Hydrogen', radius: 10 },
      { name: 'cthonian', frequency: .30, atmosphere: '-', radius: 0.5 },
      { name: 'cerian', frequency: .42, atmosphere: '-', radius: 0.5 }
    ],
    habital: [ 
      { name: 'gas giant', frequency: .005, atmosphere: 'Hydrogen', radius: 4  },
      { name: 'ammonia', frequency: .01, atmosphere: 'Ammonia', radius: 1  },
      { name: 'terran', frequency: .05, atmosphere: 'Oxygen / Nitrogen', radius: 1 },
      { name: 'desert', frequency: .09, atmosphere: 'Oxygen / Nitrogen', radius: 1 },
      { name: 'planetoids', frequency: .10, atmosphere: '-', radius: 0.5 },
      { name: 'arid', frequency: .17, atmosphere: 'Oxygen / Nitrogen', radius: 1 },
      { name: 'arean', frequency: .21, atmosphere: 'Carbon Dioxide', radius: 0.7  }
    ],
    almosthabital: [ 
      { name: 'gas giant', frequency: .005, atmosphere: 'Hydrogen', radius: 4  },
      { name: 'planetoid belt', frequency: .02, atmosphere: '-', radius: 0.5 },
      { name: 'ammonia', frequency: .04, atmosphere: 'Ammonia', radius: 1  },
      { name: 'arean', frequency: .06, atmosphere: 'Carbon Dioxide', radius: 0.7  },
      { name: 'tundra', frequency: .07, atmosphere: 'Oxygen / Nitrogen', radius: 1 }
    ], 
    cold: [ 
      { name: 'planetoids', frequency: .04, atmosphere: '-', radius: 0.5 },
      { name: 'gas giant', frequency: .57, atmosphere: 'Hydrogen', radius: 10 }
    ],
    verycold: [ 
      { name: 'planetoids', frequency: .05, atmosphere: '-', radius: 0.5  },
      { name: 'ice giant', frequency: .42, atmosphere: 'Hydrogen / Methane', radius: 5 }
    ]
  }
});

exports.Planet = Planet;
