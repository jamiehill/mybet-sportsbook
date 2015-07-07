import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import Collection from 'core/collection/CompetitionsCollection';
import factory from 'core/model/factory/CompetitionFactory';
import userModel from 'core/model/UserPreferencesModel';
import {TOGGLE_SIDE_BAR} from '../../../AppConstants';

export default class Competitions extends Component {
	constructor(props) {
		super(props);

		this.bind('renderSelected', 'renderCountry', 'renderLeague', 'onToggle');
		var that = this;

		factory.fetch(function(comps) {
			that.props.collection.reset(comps.models);
		});

		this.state = {open: false};
		App.bus.on(TOGGLE_SIDE_BAR, this.onToggle);
	}


	/**
	 * toggle the side bar
	 */
	onToggle() {
		this.setState({open: !this.state.open});
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
	 * Adds/removes a competition from users selected competitions
	 */
	onRemoveCompetition(e) {
		var compId = e.currentTarget.id.replace("remove-", ""),
			comp = factory.All[compId];
		userModel.Competitions.remove(comp);
		this.forceUpdate();
	}

	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		if (!this.state.open) {
			return (<div></div>)
		}
		return (
			<div className="left-sidebar-container">
				<div className="sidebar-title" onClick={this.onToggle.bind(this)}>
					<a href="javascript: void 0"><i className="entypo-cancel"></i> <span>Close</span></a>
				</div>
				<div className="section highlighted open">
					<h3>My Competitions</h3>
					<ul>
						{this.props.selected.map(this.renderSelected)}
					</ul>
				</div>
				{this.props.collection.map(this.renderCountry)}
			</div>
		)
	}

	/**
	 * Outputs the 'removable' competition in 'My Competitions'
	 * @param model
	 * @returns {XML}
	 */
	renderSelected(model) {
		var id = "remove-"+model.id;
		return (
			<li key={model.id}><a className="remove" id={id} href="javascript: void 0" onClick={this.onRemoveCompetition.bind(this)}><i className="entypo-cancel"></i> {model.get('name')}</a></li>
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
			<div key={model.id} className="section header open">
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
Competitions.defaultProps = {collection: new Collection(), selected: userModel.Competitions};
