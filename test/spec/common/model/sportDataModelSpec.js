//import Model from '../../../../modules/core-module/src/js/core/model/SportDataModel';
import json from '../../../lib/data/sportData.json!';
import eventData from '../../../lib/data/event.json!';
import model from 'core/model/SportDataModel';
import Event from 'core/model/Event';
import Backbone from 'backbone';


describe('core/model/SportDataModel', function() {
	beforeEach(function() {
		model.set({sports: json});
	})

	var expectMarketObj = function(market) {
		expect(market).to.be.an('object');
		expect(market).to.have.property('name', 'Match Result');
		expect(market).to.have.property('outright', false);
		expect(market).to.have.property('key', true);
	}

	it('should have sport objects under root', function() {
		var sports = model.getSports();
		expect(sports.length).to.equal(1);
		expect(sports[0]).to.equal('SOCCER');
	})

	it("should return markets node for sport", function() {
		var markets = model.getMarkets('SOCCER'),
			mres = markets['MRES'];
		expectMarketObj(mres);
	})

	it("should return keyMarkets node for sport", function() {
		var sport = model.getSport('SOCCER'),
			keyMarkets = sport.keyMarkets;
		expect(keyMarkets).to.be.defined;
		expect(keyMarkets).to.be.an('array');
		expect(keyMarkets).to.have.length.of(2);
	})

	it("should return market groups node for sport - getGroups", function() {
		var sport = model.getSport('SOCCER'),
			groups = sport.groups;
		expect(groups).to.be.defined;
	})

	it("should return a market object when specifying a market type - getMarketByType", function() {
		var market = model.getMarketByType('MRES', 'SOCCER');
		expectMarketObj(market);
	})

	it("should return the key market type for a sport when returnType=true || undefined - getKeyMarket", function() {
		var keyMarket = model.getKeyMarket('SOCCER');
		expect(keyMarket).to.equal('MRES');
	})

	it("should return the market object for the key market when returnType=false - getKeyMarket", function() {
		var keyMarket = model.getKeyMarket('SOCCER', false);
		expectMarketObj(keyMarket);
	})

	it("should return an array of market objects for all keyMarkets for a particular sport", function() {
		var keyMarkets = model.getKeyMarkets('SOCCER');
		expect(keyMarkets).to.have.length.of(2);
		expect(keyMarkets).to.be.an('array');
		expectMarketObj(keyMarkets[0]);
	})

	it("should return relevant groups for specified event", function() {
		 var event = new Event(eventData, {parse: true}),
			 groups = model.getGroupsForEvent(event);

	})
});
