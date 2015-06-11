import 'marionette-shim';
import Marionette from 'marionette';
import AppLayout from 'app/view/app-layout';

var App = App || {};

App.core = new Marionette.Application();
App.core.addInitializer(function() {

	App.layout = new AppLayout({el: '#main'});
	App.layout.render();

});

export default App;
App.core.start();
