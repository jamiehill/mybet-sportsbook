import Module from '../BaseViewModule';
import HighlightsView from './components/HighlightsView.jsx!';
import EventView from './components/EventView.jsx!';
import CountryView from './components/CountryView.jsx!';
import CompetitionView from './components/CompetitionView.jsx!';
import CompetitionsView from './components/CompetitionsView.jsx!';

export default Module.extend({
	regionName: 'main',

	onHome: function() {
		this.showReact(HighlightsView);
	},


	onEvent: function() {
		this.showReact(EventView);
	},


	onCountry: function() {
		this.showReact(CountryView);
	},


	onCompetition: function() {
		this.showReact(CompetitionView);
	},


	onCompetitions: function() {
		this.showReact(CompetitionsView);
	},


	onNoMatch: function() {
		this.showReact();
	}

});
