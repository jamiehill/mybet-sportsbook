import React from 'react';
import moment from 'moment';

import Component from 'core/system/react/BackboneComponent';
import Breadcrumbs from '../../components/Breadcrumbs.jsx!';
import userModel from 'core/model/UserPreferencesModel';
import factory from 'core/model/factory/EventFactory';
import dataModel from 'core/model/SportDataModel';
import {abbr} from 'core/utils/AppUtil';
import {getParam} from 'core/utils/Href';

export default class CompetitionView extends Component {
	constructor() {
		super();
		this.bind('renderEvent', 'renderMarkets', 'renderSelection');

		// get competition id
		var compId = getParam('id');
		factory.fetchCompetition(compId);
	}


	/**
	 * Handle price clicks
	 */
	onPriceSelect(e) {
		var blah = "blah";
	}


	/**
	 * Show event
	 * @param e
	 */
	onShowMarkets(model, e) {
		e.stopPropagation();
		var sport = model.get('code').toLowerCase(),
			eventName = model.slugify();
		App.navigate(sport+'/event/'+eventName+'?id='+model.id);
	}


	/**
	 *
	 */
	onShowStats() {

	}


	/**
	 * Subscribe to the events on collection update
	 * @param collection
	 */
	onCollectionUpdate(collection) {
		var sport = App.Globals.sport,
			eventIds = collection.pluck('id'),
			markets = dataModel.getKeyMarket(sport);
		App.bus.request('add:eventSummaryAndSchedule', sport, eventIds, markets);
	}

	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		var comp = this.props.model.get('comp');
		if (comp == undefined) return (<div></div>);
		return (
			<div className="cell cell-4 markets-cell">
				<div className="inner-cell" key={comp.id}>
					<h2>{comp.get('name')}</h2>
					<Breadcrumbs model={comp}/>
					<div className="table markets-table">
						{this.props.collection.map(this.renderEvent)}
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
		var keyMarkets = dataModel.getKeyMarkets(),
			markets = model.Markets.byTypes(keyMarkets),
			attribs = model.attributes;

		var sport = model.get('code').toLowerCase(),
			eventName = _.slugify(attribs.name),
			compName = _.slugify(attribs.compName);

		var eventHref = sport+'/event/'+eventName+'?id='+model.id,
			compHref  = sport+'/competition/'+compName+'?id='+attribs.compId;

		var status = this.getStatus(model);
		return (
			<div className={"table-row "+ {status}}>
				<div className="table-cell">
					<span className="date">{moment(attribs.eventTime).format('ddd')}</span>
					<span className="time">{moment(attribs.eventTime).format('HH:mmA')}</span>
				</div>
				<div className="table-cell align-left teams">
					<a href={eventHref} className="top">{attribs.name}</a>
					<a href={compHref} className="bottom">{attribs.compName}</a>
				</div>
				{this.renderMarkets(markets.models)}
				<div className="table-cell align-center" onClick={this.onShowStats.bind(this)}>
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center more">
					<a href={eventHref} className="top">+{attribs.numMarkets}</a>
				</div>
			</div>
		)
	}


	/**
	 * @param markets
	 */
	renderMarkets(markets) {
		var that = this;
		return _.map(markets, function(market) {
			return (
				<div className="table-cell prices">
					<div className="market-title">{market.get('name')}</div>
					<div className="table">
						<div className="table-row">
							{market.Selections.map(that.renderSelection)}
						</div>
					</div>
				</div>
			)
		});
	}


	/**
	 * @param model
	 * @returns {XML}
	 */
	renderSelection(model) {
		this.listenTo(model, 'change:rootIdx', true);
		return (
			<div key={model.id} className="table-cell align-center" onClick={this.onPriceSelect.bind(this)}>
				<a href="javascript: void 0" className="price">
					<span className="top">{abbr(model.get('type'))}</span>
					<span className="bottom">{model.getOdds()}</span>
				</a>
			</div>
		)
	}


	/**
	 * @param model
	 * @returns {string}
	 */
	getStatus(model) {
		// check if event is inplay
		if (!!model.get('inplay')) {
			return 'live';
		}

		// check if event is today
		var time = model.get('eventTime'),
			isToday = moment(time).isSame(moment(), 'day');
		if (isToday) {
			return 'today';
		}

		return "";
	}
};

// set default props
CompetitionView.defaultProps = { collection: factory.collection, model: factory.model };
