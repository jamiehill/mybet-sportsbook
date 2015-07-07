import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import Breadcrumbs from '../../components/Breadcrumbs.jsx!';
import factory from 'core/model/factory/MarketFactory';
import {getParam} from 'core/utils/Href';

export default class EventView extends Component {
	constructor() {
		super();
		_.bindAll(this, 'renderMarkets');
		// get event id
		var eventId = getParam('id');
		// load and subscribe
		App.bus.request('add:eventDetails', [eventId]);
		factory.fetch(eventId);
	}


	/**
	 * Opens/closes the market
	 * @param e
	 */
	onToggleMarket(e) {
		e.stopPropagation();

		var target = $(e.currentTarget),
			icon = target.find('i.icon');

		icon.toggleClass('entypo-up-open').toggleClass('entypo-down-open');
		target.toggleClass('open');
	}


	/**
	 * Handle price clicks
	 */
	onPriceSelect(e) {
		e.stopPropagation();
		var blah = "blah";
	}



	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		var date = moment(this.props.model.get('eventTime'));
		return (
			<div className="cell cell-4 markets-cell">
				<div className="inner-cell">
					<h2>{this.props.model.get('name')}</h2>
					<h3>{date.format('dddd, Do MMMM, YYYY - h:mm a')}</h3>
					<Breadcrumbs model={this.props.model}/>
					{this.props.collection.map(this.renderMarkets.bind(this))}
				</div>
			</div>
		)
	}


	/**
	 * @param model
	 * @returns {XML}
	 */
	renderMarkets(model, index) {
		return (
			<div key={model.id} className="single-markets-table open" onClick={this.onToggleMarket.bind(this)}>
				<a className="market-title" href="javascript:void 0">{model.get('name')} <i className="icon entypo-up-open"></i></a>
				<div className="table">
					<div className="table-row">
						<div className="table-cell prices">
							<div className="table">
								<div className="table-row">
									{model.Selections.map(this.renderSelections.bind(this))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}


	/**
	 * @param model
	 * @returns {XML}
	 */
	renderSelections(model) {
		return (
			<div key={model.id} className="table-cell align-center">
				<a href="javascript:void 0" className="price"  onClick={this.onPriceSelect.bind(this)}>
					<span className="top">{model.get('name')}</span>
					<span className="bottom">{model.getOdds()}</span>
				</a>
			</div>
		)
	}
};

// set default props
EventView.defaultProps = { collection: factory.collection, model: factory.model };
