var Planet = require('../../app/models/planet.js').Planet,
    sugar = require('sugar'),
    should = require('should');

describe('Planet', function(){

  describe('#create()', function(){
  
    before(function(done){
      Planet.create({ zone: 'habitable', name: 'tatooine' }, function(err, p){
        done();
      });
    });
        
    it('creates without error', function(done){
      Planet.create({ zone: 'habitable' }, function(err, planet){
        done();
      });
    });
    
    it('should be valid'
    // , function(done){
      // Planet.create({ zone: 'habitable', position: 1 }, function(err, planet){
      //  // console.log(planet)
      //  planet.isValid.should.equal(true);
      //  done();
      // });
    // }
    );
    
    it('assigns an atmosphere', function(done){
      Planet.find({ name: 'tatooine' }, function(err, planets){
        var planet = planets.first();
        planet.should.have.property('atmosphere');
        done();
      });
    });
        
    it('assigns an radius', function(done){
      Planet.find({ name: 'tatooine' }, function(err, planets){
        var planet = planets.first();
        planet.should.have.property('radius');
        done();
      });
    });

    
  });
  
  describe('#create with a specific class', function(){
    before(function(done){
      Planet.create({ zone: 'habitable', klass: 'terran', name: 'alderon' }, function(err, p){
        done();
      });
    });
    
    it('creates with the correct class', function(done){
      Planet.find({ name: 'alderon' }, function(err, planets){
        var planet = planets.first();
        planet.klass.should.equal('terran');
        done();
      });
    });
    
    it('creates with the correct zone', function(done){
      Planet.find({ name: 'alderon' }, function(err, planets){
        var planet = planets.first();
        planet.zone.should.equal('habitable');
        done();
      });
    });
    
    it('creates with the correct atmosphere', function(done){
      Planet.find({ name: 'alderon' }, function(err, planets){
        var planet = planets.first();
        // console.log(planet.radius);
        planet.atmosphere.should.equal('Oxygen / Nitrogen');
        done();
      });
    });
    
    it('creates with the correct radius', function(done){
      Planet.find({ name: 'alderon' }, function(err, planets){
        var planet = planets.first();
        planet.radius.should.be.within(0.6, 1.4);
        done();
      });
    });
    
    it('creates with the correct slug', function(done){
      Planet.find({ name: 'alderon' }, function(err, planets){
        var planet = planets.first();
        planet.slug.should.equal('alderon');
        done();
      });
    });
    
    it('should have with the correct klass slug', function(done){
      Planet.find({ name: 'alderon' }, function(err, planets){
        var planet = planets.first();
        planet.klass_slug().should.equal('terran');
        done();
      });
    });
    
    it('should return the correct radius in the json', function(done){
      Planet.find({ name: 'alderon' }, function(err, planets){
        var planet = planets.first();

        planet.toJSON().radius.should.be.within(0.6, 1.4);
        done();
      });
    });
    

  });
  
  describe('#types', function(){
    var frequency_total = function(name){
      var zone = Planet.zones.find(function(z){ return z.name == name }),
      total = 0; 
      
      zone.planets.each(function(p){
        total = total + p.frequency;
      });
      return total;
    };
    
    it('should have a total of 100% for the hot zone', function(done){
      frequency_total('hot').should.equal(1);
      done();
    });
    
    it('should have a total of 100% for the habitable zone', function(done){
      frequency_total('habitable').should.equal(1);
      done();
    });
    
    it('should have a total of 100% for the almosthabitable zone', function(done){
      frequency_total('almosthabitable').should.equal(1);
      done();
    });
    
    it('should have a total of 100% for the cold zone', function(done){
      frequency_total('cold').should.equal(1);
      done();
    });
    
    it('should have a total of 100% for the verycold zone', function(done){
      frequency_total('verycold').should.equal(1);
      done();
    });
    
    it('should have a total of 100% for the kuiper zone', function(done){
      frequency_total('kuiper').should.equal(1);
      done();
    });
  });
});