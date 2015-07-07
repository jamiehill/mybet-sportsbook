import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import {TOGGLE_SIDE_BAR} from '../../AppConstants';

export default class SubNavView extends Component {


	/**
	 * Show the sidebar
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
			<div className="container">
				<div id="sub-nav">
					<ul className="menu-links" onClick={this.onShowSideBar.bind(this)}>
						<li>
							<a href="javascript: void 0">
								<i className="entypo-menu"></i> Select Events
							</a>
						</li>
					</ul>
					<ul className="icon-links">
						<li className="float-left">
							<a className="btn " href="#_">
								Statistics
								<i className="entypo-chart-bar"></i>
							</a>
						</li>
						<li>
							<a href="#_" className="icon">
								<i className="entypo-search"></i>
							</a>
						</li>
						<li>
							<a href="#_" className="icon">
								<i className="entypo-star-empty"></i>
							</a>
						</li>
						<li>
							<a href="#_" className="icon">
								<i className="entypo-layout"></i>
							</a>
						</li>
					</ul>
					<ul className="text-links">
						<li>
							<a href="#_">
								Last Visits <i className="entypo-down-open"></i>
							</a>
						</li>
						<li>
							<a href="#_">
								Football
							</a>
						</li>
						<li>
							<a href="#_">
								Tennis
							</a>
						</li>
						<li>
							<a href="#_">
								Basketball
							</a>
						</li>
						<li>
							<a href="#_">
								More <i className="entypo-down-open"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
};
