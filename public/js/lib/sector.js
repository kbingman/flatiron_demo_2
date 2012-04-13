var Sector = {
  
  View: {},
  
  systems: [],
  
  // Syncs a resourceful collection to the server with jQuery ajax
  sync: function(model, options){
    var ajax_options = {
      url: model.url,
      data: options.data,
      type: options.type,
      success: function(response){
        response.each(function(data){
          var instance = new model(data),
              collection = instance.resource.toLowerCase().pluralize();
          
          instance.save();
          Sector[collection].push(instance);
        });
        
        if(options.success) options.success.call(this, response);
      },
      error: function(response){
        console.log(response)
      }
    }
    $.ajax(ajax_options);
  },
  
  // Renders a hogan template. Takes template, data, partials options.
  // 'method' is the jQuery method used to render, i.e. 'append', 'prepend', 'html', etc.
  // If this option is left blank, 'append' will be used.
  render_template: function(options){
    var template = new Hogan.Template(Templates[options.template]),
        partials = {},
        method = options.method || 'append';
        
    if(options.partials){
      options.partials.each(function(partial){ 
        partials[partial] = new Hogan.Template(Templates[partial]);
      });
    }

    $(options.target)[method](template.render(options.data, partials));
  }
  
};



  
