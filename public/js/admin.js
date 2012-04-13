$(function() {

  // Create
  $('form.create').submit(function(e){
    e.preventDefault();
    var form = $(this);
    
    Sector.System.create({
      data: form.serializeArray(),
      success: function(response){        
        Sector.View.planets_table({ 
          systems: Sector.systems
        });
        
        Sector.View.messenger({
          message: 'systems created successfully', 
          count: response.length 
        });
        Sector.View.show_planet_data();
      }  
    });
  });
  
  Sector.System.fetch({
    success:function(){
      Sector.View.show_planet_data();
    }
  });
  
});