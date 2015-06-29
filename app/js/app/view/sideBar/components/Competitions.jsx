import React from 'react';
import moment from 'moment';

import Component from 'core/system/react/BackboneComponent';
import Collection from 'core/collection/CompetitionsCollection';
import MyCompetitions from './MyCompetitions.jsx!';
import factory from 'core/model/factory/CompetitionFactory';
import userModel from 'core/model/UserPreferencesModel';
import {TOGGLE_SIDE_BAR} from '../../../AppConstants';

export default class Competitions extends Component {
	constructor() {
		super();

		_.bindAll(this, 'renderCountry', 'renderLeague');
		var that = this;

		factory.fetch(function(comps) {
			that.props.collection.reset(comps.models);
		});
	}


	/**
	 *
	 */
	onHideSideBar() {
		App.bus.trigger(TOGGLE_SIDE_BAR);
	}


	/**
	 * @param e
	 */
	onExpandCollapse(e) {
		e.stopPropagation();
		$(e.currentTarget.parentElement).toggleClass('open');
	}


	/**
	 * Adds/removes a competition from users selected competitions
	 */
	onToggleCompetition(e) {
		e.stopPropagation();
		var compId = e.currentTarget.id,
			comp = factory.All[compId];
		userModel.toggleCompetition(comp);
		this.forceUpdate();
	}


	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		return (
			<div>
				<div className="sidebar-title" onClick={this.onHideSideBar.bind(this)}>
					<a href="#_"><i className="entypo-cancel"></i> <span>Close</span></a>
				</div>
				<MyCompetitions/>
				{this.props.collection.map(this.renderCountry)}
			</div>
		)
	}


	/**
	 * Renders a country group with it's competitions
	 * @param model
	 * @returns {XML}
	 */
	renderCountry(model) {
		var attribs = model.attributes,
			leagues = model.Children && model.Children.length ? model.Children.models : [];

		return (
			<div className="section header open">
				<h3 onClick={this.onExpandCollapse.bind(this)}><span className="flag-icon flag-icon-gb"></span> {attribs.name}</h3>
				<ul>
					{_.map(leagues, this.renderLeague)}
				</ul>
			</div>
		)
	}


	/**
	 * Outputs each league
	 */
	renderLeague(model) {
		var checked = userModel.hasCompetition(model.id);
		return (
			<li key={model.id}>
				<label htmlFor={model.get('id')}>
					<input id={model.get('id')} className="add" name={model.get('name')} type="checkbox" value="yes" checked={checked}
						   onChange={this.onToggleCompetition.bind(this)}
					/> {model.get('name')}
				</label>
			</li>
		)
	}
};

// set default props
Competitions.defaultProps = { collection: new Collection() };
