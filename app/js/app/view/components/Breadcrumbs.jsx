import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class Breadcrumbs extends React.Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		var event = this.props.model.get('event'),
			children = this.props.model.Children;

		// if no event or children return nothing, as
		// the data will not have loaded by this point
		if (!event && !children) return (<div></div>);

		return !_.has(this.props.model, 'Children') ?
			this.renderEvent(this.props.model.get('event')) :
			this.renderCompetition(this.props.model);
	}

	/**
	 * Renders event breadcrumbs
	 * @param model
	 * @returns {XML}
	 */
	renderEvent(event) {
		var sport = event.get('code').toLowerCase();
		var compSlug  = _.slugify(event.get('compName'));
		var eventSlug = _.slugify(event.get('name'));
		return (
			<span className="breadcrumbs">
				<a href="">Home</a> <i className="entypo-right-open"></i>
				<a href={sport}>{_.titleize(sport)}</a> <i className="entypo-right-open"></i>
				<a href={sport+'/competition/'+compSlug+'?id='+event.get('compId')}>{_.titleize(event.get('compName'))}</a> <i className="entypo-right-open"></i>
				<a href={sport+'/event/'+eventSlug+'?id='+event.id}>{_.titleize(event.get('name'))}</a>
			</span>
		);
	}

	/**
	 * Renders competition breadcrumbs
	 * @param model
	 * @returns {XML}
	 */
	renderCompetition(model) {
		var sport = model.get('code').toLowerCase();
		var country = model.get('parent');
		var compSlug = _.slugify(model.get('name'));
		var countrySlug = _.slugify(country.get('name'));
		return (
			<span className="breadcrumbs">
				<a href="">Home</a> <i className="entypo-right-open"></i>
				<a href={sport}>{_.titleize(sport)}</a> <i className="entypo-right-open"></i>
				<a href={sport+'/country/'+countrySlug+'?id='+country.id}>{_.titleize(country.get('name'))}</a> <i className="entypo-right-open"></i>
				<a href={sport+'/competition/'+compSlug+'?id='+model.id}>{_.titleize(model.get('name'))}</a>
			</span>
		);
	}
};
