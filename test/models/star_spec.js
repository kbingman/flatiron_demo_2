var Star = require('../../app/models/star.js').Star,
    sugar = require('sugar'),
    should = require('should');

describe('Star', function(){
  describe('#create()', function(){
  
    before(function(done){
      Star.create({ klass: 'Yellow', name: 'Tatooine A' }, function(err, star){
        // console.log(star);
        done();
      });
    });
    
    it('should create without error', function(done){
      Star.create({});
      done();
    });
    
    it('should be valid'
    // , function(done){
    //  Star.create({}, function(err, star){
    //    console.log(star.isNewRecord)
    //    // star.isValid.should.equal(true);
    //    done();
    //  });
    //}
    );
    
    it('should have the specified class', function(done){      
      Star.find({ klass: 'Yellow', name: 'Tatooine A' }, function(err, stars){
        var star = stars.first();
        star.klass.should.equal('Yellow');
        done();
      });
    });
    
    it('should have the correct code', function(done){      
      Star.find({ klass: 'Yellow', name: 'Tatooine A' }, function(err, stars){
        var star = stars.first();
        star.code.should.equal('G');
        done();
      });
    });

    it('should have the correct color', function(done){      
      Star.find({ klass: 'Yellow', name: 'Tatooine A' }, function(err, stars){
        var star = stars.first();
        star.color.should.equal('#ffff62');
        done();
      });
    });
   
  });
});