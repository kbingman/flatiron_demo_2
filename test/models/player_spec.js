var Player = require('../../app/models/player.js').Player,
    sugar = require('sugar'),
    should = require('should');

describe('Player', function(){
  describe('#create()', function(){
  
    before(function(done){
      Player.create({ name: 'fred' }, function(err, player){
        done();
      });
    });
    
    it('should create without error', function(done){
      Player.create({ name: 'barney' });
      done();
    });
    
    it('should create a bank account attribute', function(done){
      Player.find({ name: 'fred' }, function(err, players){
        var player = players[0];
        player.bank_account.should.equal(1000000000);
        done();
      });
    });
    
    it('should assign a homeworld', function(){
      Player.find({ name: 'fred' }, function(err, players){
        var player = players[0];
        player.homeworld(function(err, homeworld){
          console.log(homeworld)
          homeworld.klass.should.not.equal('terran');
          done();
        });
      });
      
    });
    // 
    // it('should assign a population');
    
    it('should create a ship', function(){
      Player.find({ name: 'fred' }, function(err, players){
        var player = players[0];
        player.ships.length.should.equal(1);
        done();
      });
    });
    
  });
});