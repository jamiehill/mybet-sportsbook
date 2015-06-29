import React from 'react';
import moment from 'moment';

import Component from 'core/system/react/BackboneComponent';
import userModel from 'core/model/UserPreferencesModel';

export default class CompetitionsView extends Component {
	constructor() {
		super();

		_.bindAll(this, 'renderCompetition', 'renderEvent', 'renderPrice');
	}


	/**
	 * Handle price clicks
	 */
	onPriceSelect(e) {
		var blah = "blah";
	}


	/**
	 * Show all markets
	 * @param e
	 */
	onShowMarkets(e) {

	}


	/**
	 *
	 */
	onShowStats() {

	}


	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="cell cell-4 markets-cell">
				{this.props.collection.map(this.renderCompetition)}
			</div>
		)
	}


	/**
	 * Renders a competition block
	 * @param model
	 * @param index
	 * @returns {XML}
	 */
	renderCompetition(model, index) {
		//var breadcrumbs = [],
		//	level = model;
		//while(!!level) {
		//	breadcrumbs.unshift({name: level.get('name')})
		//	level = level.get('parent');
		//}
		return (
			<div className="inner-cell" key={model.id}>
				<h2>{index + 1}. {model.get('name')}</h2>
				<h3>Saturday 15th June, 2015</h3>
				<span className="breadcrumbs">
					<a href="#_">Home</a> <i className="entypo-right-open"></i>
					<a href="#_">Sports</a> <i className="entypo-right-open"></i>
					<a href="#_">Competitions</a> <i className="entypo-right-open"></i>
					<a href="#_">Bundesliga</a>
				</span>
				<div className="table markets-table">
					{_.map(model.Children.models, this.renderEvent)}
				</div>
			</div>
		)
	}


	/**
	 * Renders a single event row
	 * @param model
	 * @returns {XML}
	 */
	renderEvent(model) {
		var attribs = model.attributes,
			market  = model.Markets.findWhere({type: 'MRES'});

		return (
			<div className="table-row live">
				<div className="table-cell">
					<span className="date">{moment(attribs.eventTime).format('ddd')}</span>
					<span className="time">{moment(attribs.eventTime).format('HH:mmA')}</span>
				</div>
				<div className="table-cell align-left teams">
					<a href={App.Globals.sport+'/event/'+attribs.id} className="top">{attribs.name}</a>
					<a href={App.Globals.sport+'/competition/'+attribs.compId} className="bottom">{attribs.compName}</a>
				</div>
				<div className="table-cell prices">
					<div className="market-title">Match Result</div>
					<div className="table">
						<div className="table-row">
							<div className="table-cell align-center"><a href="#_" className="price"><span className="top">1</span><span className="bottom">1.2</span></a></div>
							<div className="table-cell align-center"><a href="#_" className="price"><span className="top">x</span><span className="bottom">2.1</span></a></div>
							<div className="table-cell align-center"><a href="#_" className="price"><span className="top">2</span><span className="bottom">3.2</span></a></div>
						</div>

					</div>
				</div>
				<div className="table-cell prices">
					<div className="market-title">Outcome</div>
					<div className="table">
						<div className="table-row">
							<div className="table-cell align-center"><a href="#_" className="price"><span className="top">1</span><span className="bottom">1.2</span></a></div>
							<div className="table-cell align-center"><a href="#_" className="price"><span className="top">x</span><span className="bottom">2.1</span></a></div>
							<div className="table-cell align-center"><a href="#_" className="price"><span className="top">2</span><span className="bottom">3.2</span></a></div>
						</div>

					</div>
				</div>
				<div className="table-cell align-center" onClick={this.onShowStats.bind(this)}>
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center more" onClick={this.onShowMarkets.bind(this)}>
					<a href={App.Globals.sport+'/event/'+attribs.id} className="top">+{attribs.numMarkets}</a>
				</div>
			</div>
		)
	}


	/**
	 * Renders the price display
	 * @param model
	 * @returns {XML}
	 */
	renderPrice(model) {
		return (
			<div key={model.id} className="table-cell align-center price" onClick={this.onPriceSelect.bind(this)}>
				{model.getOdds()}
			</div>
		)
	}
};

// set default props
CompetitionsView.defaultProps = { collection: userModel.Competitions };
