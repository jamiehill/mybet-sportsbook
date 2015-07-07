import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import factory from 'core/model/factory/CompetitionFactory';
import userModel from 'core/model/UserPreferencesModel';

export default class MyCompetitions extends Component {
	constructor() {
		super();
		_.bindAll(this, 'renderItem');
	}

	/**
	 * Adds/removes a competition from users selected competitions
	 */
	onRemoveCompetition(e) {
		var compId = e.currentTarget.id.replace("remove-", ""),
			comp = factory.All[compId];
		userModel.Competitions.remove(comp);
	}


	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="section highlighted open">
				<h3>My Competitions</h3>
				<ul>
					{this.props.collection.map(this.renderItem)}
				</ul>
			</div>
		)
	}


	/**
	 * Outputs the 'removable' competition in 'My Competitions'
	 * @param model
	 * @returns {XML}
	 */
	renderItem(model) {
		var id = "remove-"+model.id;
		return (
			<li key={model.id}><a className="remove" id={id} href="javascript: void 0" onClick={this.onRemoveCompetition.bind(this)}><i className="entypo-cancel"></i> {model.get('name')}</a></li>
		)
	}
};

// set default props
MyCompetitions.defaultProps = { collection: userModel.Competitions };
