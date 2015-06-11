import Marionette from 'marionette';
import AppLayout from 'app/view/app-layout';

// shims marionette with backbone/jquery
import 'marionette-shim';

var App = new Marionette.Application();
App.addInitializer(function() {

	// attach main layout on start
	App.layout = new AppLayout({el: '#main'});
	App.layout.render();

});

// export the application
export default App;
App.start();
