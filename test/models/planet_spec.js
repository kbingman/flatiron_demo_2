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
    
    // it('should be valid', function(done){
      // Planet.create({ zone: 'habitable', position: 1 }, function(err, planet){
      //  // console.log(planet)
      //  planet.isValid.should.equal(true);
      //  done();
      // });
    // });
    
    
    it('assigns an atmosphere', function(done){
      Planet.find({ name: 'tatooine' }, function(err, planets){
        var planet = planets.first();
        planet.should.have.property('atmosphere');
        done();
      });
    });
        
    it('assigns an atmosphere', function(done){
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
    
    it('creates with the correct radius', function(done){
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
        // console.log(planet.radius);
        planet.radius.should.be.within(0.6, 1.4);
        done();
      });
    });
    
    
  });
});