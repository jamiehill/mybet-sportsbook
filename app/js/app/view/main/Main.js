import Module from '../BaseViewModule';
import MainView from './MainView.jsx!';
import EventView from './components/EventView.jsx!';
import CountryView from './components/CountryView.jsx!';
import CompetitionView from './components/CompetitionView.jsx!';
import CompetitionsView from './components/CompetitionsView.jsx!';

export default Module.extend({
	regionName: 'main',

	/**
	 * All routes should show MainView except those defined below
	 */
	onNoMatch: function() {
		this.showReact(MainView);
	},

	/**
	 * Show a single event
	 */
	onEvent: function() {
		this.showReact(EventView);
	},

	/**
	 * Show competitions for a country
	 */
	onCountry: function() {
		this.showReact(CountryView);
	},

	/**
	 * Show a singel comeptition
	 */
	onCompetition: function() {
		this.showReact(CompetitionView);
	},

	/**
	 * Show competitions
	 */
	onCompetitions: function() {
		this.showReact(CompetitionsView);
	},

	/**
	 * Hide for all static routes
	 */
	onStaticRoute: function() {
		this.showReact();
	}

});
