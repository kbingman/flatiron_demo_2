var Sector = {
  
  View: {},
  
  // Syncs a resourceful collection to the server with jQuery ajax
  sync: function(model, options){
    var ajax_options = {
      url: model.url,
      data: options.data,
      type: options.type,
      success: function(response){
        response.forEach(function(data){
          var instance = new model(data);
          instance.save();
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
    var html = Sector.render_html(options),
        method = options.method || 'append';

    $(options.target)[method](html);
    if(options.success){
      options.success();
    }
  },
  
  render_html: function(options){
    var template = new Hogan.Template(Templates[options.template]),
        partials = {};
        
    if(options.partials){
      options.partials.each(function(partial){ 
        partials[partial] = new Hogan.Template(Templates[partial]);
      });
    }
    return template.render(options.data, partials);
  }
  
};



  
