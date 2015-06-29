import Module from '../BaseViewModule';
import MainView from './MainView';
import CompetitionsView from './components/CompetitionsView.jsx!';

export default Module.extend({
	viewClass: MainView,
	regionName: 'main',

	onHome: function() {
		this.showView();
	},


	onSportCompetitions: function() {
		this.showComponent(CompetitionsView);
	}

});
