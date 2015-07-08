import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import HighlightsView from './components/HighlightsView.jsx!';
import PossessionWidget from './widgets/PossessionWidget.jsx!';
import ComingUpWidget from './widgets/ComingUpWidget.jsx!';
import LeagueWidget from './widgets/LeagueWidget.jsx!';
import InplayWidget from './widgets/InplayWidget.jsx!';
import LeagueView from './components/LeagueView.jsx!';

export default class MainView extends Component {
	constructor() {
		super();
	}


	/**
	 * @returns {XML}
	 */
	render() {
		return (
			<div>
				<div className="row">
					<HighlightsView/>
				</div>
				<div className="row">
					<PossessionWidget/>
					<ComingUpWidget/>
					<LeagueWidget/>
				</div>
				<div className="row">
					<ComingUpWidget/>
					<InplayWidget/>
					<LeagueWidget/>
				</div>
			</div>
		)
	}
};
