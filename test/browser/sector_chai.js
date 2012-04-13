var should = chai.should();

describe('Sector', function(){

  it('should be defined', function(){
    Sector.should.be.a('object');
  });
  
  it('should be have a systems array', function(){
    Sector.systems.should.be.a('array');
  });
  
  it('should render html', function(){
    var data = {
      template: 'test',
      data: { foo: 'bar' }
    };
    console.log(Sector.render_html(data))
    Sector.render_html(data).should.equal('');
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
