var System = require('../../app/models/system.js').System,
    should = require('should');

describe('System', function(){
  describe('#create()', function(){
    
    before(function(done){
      System.create({}, function(err, p){
        done();
      });
    });
      
    it('should create without error', function(done){
      System.create({});
      done();
    });
    
    it('should create a star for the system', function(done){
      System.create({}, function(err, system){
        system.stars.should.have.length(1);
        done();
      });
    });
    
    it('should create planets for the system', function(done){
      System.create({}, function(err, system){
        system.planets.length.should.be.above(0);
        done();
      });
    });
    
    it('should return a collection of planets', function(done){
      System.create({}, function(err, system){
        system.planets_collection().length.should.be.above(0);
        done();
      });
    });
    
    it('should return a json string', function(done){
      System.create({}, function(err, system){
        system.toJSON().planets.length.should.be.above(0);
        done();
      });
    });
    
    
  });
});