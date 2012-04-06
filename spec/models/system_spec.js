var System = require('../../app/models/system.js').System,
    should = require('should');

describe('System', function(){
  describe('#create()', function(){
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
    
  });
});