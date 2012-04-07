var Star = require('../../app/models/system.js').System,
    sugar = require('sugar'),
    should = require('should');

describe('Star', function(){
  describe('#create()', function(){
    it('should create without error', function(done){
      Star.create({});
      done();
    });
    
    // it('should create a star for the system', function(done){
    //   Star.create({}, function(err, system){
    //     system.stars.should.have.length(1);
    //     done();
    //   });
    // });
    
  });
});