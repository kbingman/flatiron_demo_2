var Planet = require('../../app/models/planet.js').Planet,
    should = require('should');

describe('Planet', function(){

  describe('#create()', function(){
  
    before(function(done){
      Planet.create({ zone: 'hot' }, function(err, p){
        done();
      });
    });
    
    it('should create without error', function(done){
      Planet.create({ zone: 'hot' }, function(err, planet){
        done();
      });
    });
    
    it('should assign an atmosphere', function(done){
      Planet.create({ zone: 'habitable' }, function(err, planet){
        planet.should.have.property('atmosphere');
        done();
      });
    });
        
    it('should assign an atmosphere', function(done){
      Planet.create({ zone: 'habitable' }, function(err, planet){
        planet.should.have.property('radius');
        done();
      });
    });
    
  });
});