var should = chai.should();

describe('Sector', function(){

  it('should be defined', function(){
    Sector.should.be.a('object');
  });
  
  it('should be have a systems array', function(){
    Sector.systems.should.be.a('array');
  });
  
});

describe('System', function(){

  it('should exist', function(){
    Sector.System.should.exist;
  });
  
  it('should have a url',function(){
    Sector.System.url.should.equal('/api/systems');
  });
  
});


describe('Planet', function(){

  it('should exist', function(){
    Sector.Planet.should.exist;
  });
  
  it('should have a url',function(){
    Sector.Planet.url.should.equal('/api/planets');
  });  
  
  // it('should be an instance of Planet', function(){
  //   var planet = new Sector.Planet();
  //   planet.should.be.an.instanceOf(Sector.Planet)
  // })
  
});
