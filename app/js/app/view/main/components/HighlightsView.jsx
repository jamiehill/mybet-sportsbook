import React from 'react';
import moment from 'moment';

import Component from 'core/system/react/BackboneComponent';
import factory from 'core/model/factory/EventFactory';

export default class HighlightsView extends Component {
	constructor() {
		super();

		factory.fetch('', 'SOCCER', '0,1,2,3,4,5,6,7,8,9');
		this.bind('renderEvent', 'renderPrice');
	}


	/**
	 * Handle price clicks
	 */
	onPriceSelect(e) {
		var blah = "blah";
	}


	/**
	 * Show event stats
	 * @param e
	 */
	onShowStats(e) {

	}


	/**
	 * Show all markets
	 * @param e
	 */
	onShowMarkets(model, e) {
		e.stopPropagation();
		var sport = model.get('code').toLowerCase(),
			eventName = model.slugify();
		App.navigate(sport+'/event/'+eventName+'?id='+model.id);
	}


	/**
	 * Subscribe to the events on collection update
	 * @param collection
	 */
	onCollectionUpdate(collection) {
		var eventIds = collection.pluck('id');
		App.bus.request('add:eventView', 'SOCCER', eventIds, 'MRES');
	}


	/**
	 * Renders grid or Event rows
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="row">
				<div className="cell cell-4 highlights">
					<div className="inner-cell">
						<h4>Highlights</h4>
						<div className="table regular-table">
							{this.props.collection.map(this.renderEvent)}
						</div>
					</div>
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
			market  = model.Markets.findWhere({type: 'MRES'}),
			styles  = {cursor:'pointer'};
		return (
			<div key={model.id} className="table-row">
				<div className="table-cell">
					<span className="date">{moment(attribs.eventTime).format('ddd')}</span>
					<span className="time">{moment(attribs.eventTime).format('HH:mmA')}</span>
				</div>
				<div className="table-cell align-right" onClick={this.onShowMarkets.bind(this, model)} style={styles}>
					{attribs.participantA}
				</div>
				{market.Selections.map(this.renderPrice)}
				<div className="table-cell align-left" onClick={this.onShowMarkets.bind(this, model)} style={styles}>
					{attribs.participantB}
				</div>
				<div className="table-cell align-center" onClick={this.onShowStats.bind(this)} style={styles}>
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center price" onClick={this.onShowMarkets.bind(this, model)} style={styles}>
					+{attribs.numMarkets}
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
		this.listenTo(model, 'change:rootIdx', true);
		return (
			<div key={model.id} className="table-cell align-center price" onClick={this.onPriceSelect.bind(this)}>
				{model.getOdds()}
			</div>
		)
	}
};

// set default props
HighlightsView.defaultProps = { collection: factory.collection };
