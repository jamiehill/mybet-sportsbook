import Marionette from 'marionette';
import AppView from 'app/view/AppView'

var App = new Marionette.Application();

App.addRegions({
    main: "#main"
});

App.on('start', function() {
    'use strict';
    App.main.show(new AppView());
});

App.start();