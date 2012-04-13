var Templates = {},
    template = 'TEST<h1>{{ foo }}</h1>';

Templates['test'] = Hogan.compile(template);