var should = chai.should();

describe('Sector', function(){

  it('should be defined', function(){
    Sector.should.be.a('object');
  });
  
  it('should have a systems array', function(){
    Sector.systems.should.be.a('array');
  });
  
  it('should find the template', function(){
    Templates['test'].render({ foo: 'bar' }).should.equal('<h1>bar</h1>');
  });
  
  it('should render html', function(){
    var data = {
      template: 'test',
      data: { foo: 'bar' }
    };
    Sector.render_html(data).should.equal('<h1>bar</h1>');
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
  //   Sector.Planet.create(function(error, planet){
  //     planet.should.be.an.instanceOf(Sector.Planet)
  //   });
  // });
  
});
