import React from 'react';
import moment from 'moment';

import Component from 'core/system/react/BackboneComponent';
import Collection from 'core/collection/CompetitionsCollection';
import factory from 'core/model/factory/CompetitionFactory';
import {TOGGLE_SIDE_BAR} from '../../AppConstants';

export default class SubNavView extends Component {


	/**
	 *
	 */
	onShowSideBar() {
		App.bus.trigger(TOGGLE_SIDE_BAR);
	}


	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		return (
			<div id="sub-nav">
				<ul className="menu-links" onClick={this.onShowSideBar.bind(this)}>
					<li>
						<a href="#_"><i className="entypo-menu"></i>	All Sports</a>
					</li>
				</ul>
				<ul className="icon-links">
					<li>
						<a href="#_" className="icon"><i className="entypo-search"></i></a>
					</li>
					<li>
						<a href="#_" className="icon"><i className="entypo-star-empty"></i></a>
					</li>
					<li>
						<a href="#_" className="icon"><i className="entypo-layout"></i></a>
					</li>
				</ul>
				<ul className="text-links">
					<li><a href="http://www.mybet.de/casino">Casino</a></li>
					<li><a href="http://www.mybet.de/livecasino">Live Casino</a></li>
					<li><a href="http://www.mybet.de/games">Games</a></li>
					<li><a href="/">Sports</a></li>
				</ul>
			</div>
		)
	}
};

// set default props
SubNavView.defaultProps = { collection: new Collection() };
