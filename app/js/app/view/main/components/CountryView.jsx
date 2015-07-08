import React from 'react';
import moment from 'moment';

import Component from 'core/system/react/BackboneComponent';
import Competition from 'core/model/Competition';
import Collection from 'core/collection/CompetitionsCollection';
import Breadcrumbs from '../../components/Breadcrumbs.jsx!';
import factory from 'core/model/factory/CompetitionFactory';
import userModel from 'core/model/UserPreferencesModel';
import dataModel from 'core/model/SportDataModel';
import {getParam} from 'core/utils/Href';
import {abbr} from 'core/utils/AppUtil';

export default class CompetitionsView extends Component {
	constructor(props) {
		super(props);

		this.bind('renderLeague', 'renderEvent', 'renderMarkets', 'renderSelection');

		// get country id
		var countryId = getParam('id');
		var country = factory.getCompetition(countryId);

		this.props.country.set(country.attributes);
		this.props.collection.reset(country.Children.models);
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
		App.bus.request('add:eventSummaryAndSchedule', sport, eventIds, ['MRES']);
	}



	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="cell cell-4 markets-cell">
				<div className="inner-cell" key={this.props.country.id}>
					<h2>{this.props.country.get('name')}</h2>
					<div className="table markets-table">
						{this.props.collection.map(this.renderLeague)}
					</div>
				</div>
			</div>
		)
	}


	/**
	 * Renders a competition block
	 * @param model
	 * @param index
	 * @returns {XML}
	 */
	renderLeague(model, index) {
		return (
			<div className="inner-cell" key={model.id}>
				<h2>{index + 1}. {model.get('name')}</h2>
				<Breadcrumbs model={model}/>
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
		var markets = model.Markets.byTypes(['MRES']),
			attribs = model.attributes;

		var sport = model.get('code').toLowerCase(),
			eventName = _.slugify(attribs.name),
			compName = _.slugify(attribs.compName);

		var eventHref = sport+'/event/'+eventName+'?id='+model.id,
			compHref  = sport+'/competition/'+compName+'?id='+attribs.compId;

		var status = this.getStatus(model);
		return (
			<div key={model.id} className={"table-row "+ {status}}>
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
	 * @returns {*|{babel, babel-runtime, backbone, backbone.babysitter, backbone.marionette, backbone.radio, backbone.wreqr, carhartl/jquery-cookie, chai, core-js, di-lite, jquery, jquery-cookie, json, jsx, marionette-shim, marionettejs/backbone.marionette, moment, process, react, sinon, sinon-chai, systemjs/plugin-text, underscore, underscore.string, github:floatdrop/plugin-jsx@1.1.0, github:jspm/nodelibs-assert@0.1.0, github:jspm/nodelibs-buffer@0.1.0, github:jspm/nodelibs-constants@0.1.0, github:jspm/nodelibs-crypto@0.1.0, github:jspm/nodelibs-events@0.1.1, github:jspm/nodelibs-http@1.7.1, github:jspm/nodelibs-path@0.1.0, github:jspm/nodelibs-process@0.1.1, github:jspm/nodelibs-stream@0.1.0, github:jspm/nodelibs-string_decoder@0.1.0, github:jspm/nodelibs-url@0.1.0, github:jspm/nodelibs-util@0.1.0, github:jspm/nodelibs-vm@0.1.0, npm:amdefine@0.1.1, npm:asn1.js@2.0.4, npm:assert@1.3.0, npm:ast-types@0.6.16, npm:babel-runtime@5.6.4, npm:backbone.radio@0.9.0, npm:backbone@1.1.2, npm:browserify-aes@1.0.1, npm:browserify-rsa@2.0.1, npm:browserify-sign@3.0.2, npm:buffer@3.2.2, npm:chai@3.0.0, npm:commander@2.5.1, npm:commoner@0.10.1, npm:constants-browserify@0.0.1, npm:core-js@0.9.18, npm:core-util-is@1.0.1, npm:create-ecdh@2.0.1, npm:create-hash@1.1.1, npm:create-hmac@1.1.3, npm:crypto-browserify@3.9.14, npm:deep-eql@0.1.3, npm:di-lite@0.3.3, npm:diffie-hellman@3.0.2, npm:elliptic@3.1.0, npm:envify@3.4.0, npm:esprima-fb@10001.1.0-dev-harmony-fb, npm:esprima-fb@13001.1001.0-dev-harmony-fb, npm:formatio@1.1.1, npm:glob@4.2.2, npm:graceful-fs@3.0.8, npm:hash.js@1.0.3, npm:iconv-lite@0.4.10, npm:inflight@1.0.4, npm:inherits@2.0.1, npm:install@0.1.8, npm:jstransform@10.1.0, npm:lodash@3.9.3, npm:miller-rabin@2.0.1, npm:minimatch@1.0.0, npm:mkdirp@0.5.1, npm:once@1.3.2, npm:parse-asn1@3.0.1, npm:path-browserify@0.0.0, npm:pbkdf2@3.0.4, npm:process@0.11.1, npm:public-encrypt@2.0.1, npm:punycode@1.3.2, npm:q@1.1.2, npm:randombytes@2.0.1, npm:react-tools@0.13.3, npm:react@0.14.0-alpha3, npm:readable-stream@1.1.13, npm:recast@0.9.18, npm:ripemd160@1.0.1, npm:sha.js@2.4.2, npm:sigmund@1.0.1, npm:sinon-chai@2.8.0, npm:sinon@1.15.3, npm:source-map@0.1.31, npm:source-map@0.1.43, npm:stream-browserify@1.0.0, npm:string_decoder@0.10.31, npm:through@2.3.7, npm:underscore.string@3.1.1, npm:url@0.10.3, npm:util@0.10.3, npm:vm-browserify@0.0.4}|{babel, babel-runtime, backbone, backbone.babysitter, backbone.marionette, backbone.radio, backbone.wreqr, carhartl/jquery-cookie, chai, core-js, css, di-lite, image, jquery, jquery-cookie, jquery.nicescroll, json, jsx, marionette-shim, marionettejs/backbone.marionette, moment, process, react, sinon, sinon-chai, systemjs/plugin-text, text, underscore, underscore.string, github:floatdrop/plugin-jsx@1.1.0, github:jspm/nodelibs-assert@0.1.0, github:jspm/nodelibs-buffer@0.1.0, github:jspm/nodelibs-console@0.1.0, github:jspm/nodelibs-constants@0.1.0, github:jspm/nodelibs-crypto@0.1.0, github:jspm/nodelibs-events@0.1.1, github:jspm/nodelibs-http@1.7.1, github:jspm/nodelibs-https@0.1.0, github:jspm/nodelibs-net@0.1.2, github:jspm/nodelibs-os@0.1.0, github:jspm/nodelibs-path@0.1.0, github:jspm/nodelibs-process@0.1.1, github:jspm/nodelibs-punycode@0.1.0, github:jspm/nodelibs-querystring@0.1.0, github:jspm/nodelibs-stream@0.1.0, github:jspm/nodelibs-string_decoder@0.1.0, github:jspm/nodelibs-timers@0.1.0, github:jspm/nodelibs-url@0.1.0, github:jspm/nodelibs-util@0.1.0, github:jspm/nodelibs-vm@0.1.0, github:jspm/nodelibs-zlib@0.1.0, github:systemjs/plugin-css@0.1.12, npm:acorn-globals@1.0.4, npm:acorn@1.2.2, npm:amdefine@0.1.1, npm:asn1.js@2.0.4, npm:asn1@0.1.11, npm:assert-plus@0.1.5, npm:assert@1.3.0, npm:ast-types@0.6.16, npm:async@1.2.1, npm:aws-sign2@0.5.0, npm:babel-runtime@5.5.6, npm:backbone.radio@0.9.0, npm:backbone@1.1.2, npm:bl@0.9.4, npm:bluebird@2.9.30, npm:boom@2.8.0, npm:browser-request@0.3.3, npm:browserify-aes@1.0.1, npm:browserify-rsa@2.0.1, npm:browserify-sign@3.0.2, npm:browserify-zlib@0.1.4, npm:buffer@3.2.2, npm:chai@3.0.0, npm:chalk@1.0.0, npm:clean-css@3.1.9, npm:combined-stream@1.0.5, npm:commander@2.5.1, npm:commander@2.6.0, npm:commander@2.8.1, npm:commoner@0.10.1, npm:console-browserify@1.1.0, npm:constants-browserify@0.0.1, npm:core-js@0.9.15, npm:core-util-is@1.0.1, npm:create-ecdh@2.0.1, npm:create-hash@1.1.1, npm:create-hmac@1.1.3, npm:cryptiles@2.0.4, npm:crypto-browserify@3.9.14, npm:cssstyle@0.2.28, npm:ctype@0.5.3, npm:deep-eql@0.1.3, npm:delayed-stream@1.0.0, npm:di-lite@0.3.3, npm:diffie-hellman@3.0.2, npm:dom-serializer@0.1.0, npm:domhandler@2.3.0, npm:domutils@1.5.1, npm:elliptic@3.1.0, npm:entities@1.0.0, npm:entities@1.1.1, npm:envify@3.4.0, npm:escodegen@1.6.1, npm:esprima-fb@10001.1.0-dev-harmony-fb, npm:esprima-fb@13001.1001.0-dev-harmony-fb, npm:esprima@1.2.5, npm:forever-agent@0.6.1, npm:form-data@1.0.0-rc1, npm:formatio@1.1.1, npm:generate-function@2.0.0, npm:generate-object-property@1.2.0, npm:get-stdin@4.0.1, npm:glob@4.2.2, npm:graceful-fs@3.0.8, npm:graceful-readlink@1.0.1, npm:har-validator@1.7.1, npm:has-ansi@1.0.3, npm:hash.js@1.0.3, npm:hawk@2.3.1, npm:hoek@2.14.0, npm:htmlparser2@3.8.3, npm:http-signature@0.11.0, npm:https-browserify@0.0.0, npm:iconv-lite@0.4.10, npm:inflight@1.0.4, npm:inherits@2.0.1, npm:install@0.1.8, npm:is-my-json-valid@2.12.0, npm:isstream@0.1.2, npm:jsdom@5.4.3, npm:jsonpointer@1.1.0, npm:jstransform@10.1.0, npm:levn@0.2.5, npm:lodash@3.9.3, npm:miller-rabin@2.0.1, npm:mime-db@1.12.0, npm:mime-db@1.13.0, npm:mime-types@2.0.14, npm:mime-types@2.1.1, npm:minimatch@1.0.0, npm:mkdirp@0.5.1, npm:node-uuid@1.4.3, npm:nwmatcher@1.3.4, npm:oauth-sign@0.8.0, npm:once@1.3.2, npm:optionator@0.5.0, npm:os-browserify@0.1.2, npm:pako@0.2.7, npm:parse-asn1@3.0.1, npm:parse5@1.4.2, npm:path-browserify@0.0.0, npm:pbkdf2@3.0.4, npm:process@0.11.1, npm:public-encrypt@2.0.1, npm:punycode@1.3.2, npm:q@1.1.2, npm:randombytes@2.0.1, npm:react-tools@0.13.3, npm:react@0.14.0-alpha3, npm:readable-stream@1.0.33, npm:readable-stream@1.1.13, npm:recast@0.9.18, npm:request@2.58.0, npm:ripemd160@1.0.1, npm:sha.js@2.4.2, npm:sigmund@1.0.1, npm:sinon-chai@2.8.0, npm:sinon@1.15.3, npm:sntp@1.0.9, npm:source-map@0.1.31, npm:source-map@0.1.43, npm:stream-browserify@1.0.0, npm:string_decoder@0.10.31, npm:stringstream@0.0.4, npm:strip-ansi@2.0.1, npm:supports-color@1.3.1, npm:through@2.3.7, npm:timers-browserify@1.4.1, npm:tough-cookie@1.2.0, npm:tunnel-agent@0.4.0, npm:type-check@0.3.1, npm:underscore.string@3.1.1, npm:url@0.10.3, npm:util@0.10.3, npm:vm-browserify@0.0.4, npm:xmlhttprequest@1.7.0}|{}|Array}
	 */
	renderMarkets(markets) {
		var that = this;
		return _.map(markets, function(market) {
			return (
				<div key={market.id} className="table-cell prices">
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
CompetitionsView.defaultProps = { country: new Competition, collection: new Collection };
