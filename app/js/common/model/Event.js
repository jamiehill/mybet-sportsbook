define([
	'common/model/Market',
	'common/collection/MarketsCollection'
],
function (Market, MarketsCollection) {
    return Backbone.Model.extend({

        Markets:null,

        defaults: {
            id : 0,
            path:'',
            code:'', //SOCCER
            compId : 0,
            compName:'',
            compWeighting: -1,
            name : "",
            state : "ACTIVE",
            displayed : true,
            offeredInplay : false,
            formattedEventTime:'',
            eventTime : 0,
            numMarkets : 0,
            inplay: false,
            watchAndBetId: "",//data
            watchAndBetId2: "", //video
            streamingVideoUrl:"",
            betradarId:null,
            hasNewMarkets: false,

            score:'0-0',
            period:'',
            clock:'',
            participantA:'',
            participantB:'',
            bestOf: null,

            eventDataSync: null,
            cashoutAvailable:false,
            scorecastAvailable:false,
            timecastAvailable:false,
            wincastAvailable:false,
            isOutRight:false

        },

        initialize: function( options ) {
            this.populate(options);
        },

        populateDefaults: function(data) {
            var scope = this;
            _.each(data, function(val, key){
                if (key == 'id') scope.set('id', val);
                if (_.has(scope.defaults, key)) {
                        if (key == 'state') {
                            if (val == 'S') {
                                val = 'SUSPENDED';
                            }
                            if (val == 'A' || val == 'O') {
                                val = 'ACTIVE';
                            }
                            if (val == 'V') {
                                val = 'VOID';
                            }
                        }

                        if (key == 'inplay' || key == 'displayed' || key == 'offeredInplay') {

                            if (val == 0) {
                                val = false;
                            }
                            if (val == 1) {
                                val = true;
                            }
                        }

                    scope.set(key, val);
                }
            });
        },

        populate: function(data){
            var scope = this;

            // we sometimes get a collection of markets, incorrectly named
            // 'market'.  to rectify this, we will simply rename it.
            if (_.has(data, 'market')) {
                data.markets = data.market;
                delete data.market;
            }

            if (_.has(data, 'markets')) {
                var changed = this.parseMarkets(data.markets, this.id);
                delete data.markets;
            }

            if (_.has(data, 'sport') && !_.has(data, 'code')) {
                data.code = data.sport;
            }


            if (_.has(data, 'compWeighting') && parseInt(data.compWeighting) == -1) {
                data.compWeighting = 99999;
            }

            this.populateDefaults(data);

            if (_.has(data, 'attributes')) {
                _.each(data.attributes.attrib, function(obj){
                    if (_.has(scope.defaults, obj.key)) {
                        scope.set(obj.key, obj.value);
                        if (obj.key == 'clock' || obj.key == 'period' || obj.key == 'score') {
                            if (_.has(data,'offeredInplay')) {
                                if (data.offeredInplay == true) {
                                    scope.set('inplay', true);
                                }
                            }
                        }
                    }
                });
            }

            if (_.has(data, 'participants')) {
                _.each(data.participants.participant, function(participant){
                    if (participant.type == 'HOME') {
                        scope.set('participantA',participant.name);
                    }
                    else if (participant.type == 'AWAY') {
                        scope.set('participantB',participant.name);
                    }
                });
            }

        },

        populateFromEventTradingState: function(data) {
            var scope = this;
            this.populateDefaults(data);

            if (_.has(data, 'prices')) {
                var marketsArray = data.prices.market;
                _.each(marketsArray, function(marketObj){

                    var market = scope.findMarket(marketObj.id);
                    if (_.has(marketObj, 'channel')) {
                        if ( marketObj.channel.length >0 ) {
                            marketObj.selection = marketObj.channel[0].selection;
                        }
                        else {
                            if (_.has(marketObj, 'line')) {
                                var line = marketObj.line;
                                if (!_.isUndefined(market)) {
                                    if (market.attributes.line != line) {
                                        //EventTradingState Line Change. Update the selections.
                                        market.updateSelectionsWithLine(line);
                                    }
                                }
                            }
                            else if (_.has(marketObj, 'subType')) {
                                var subType = marketObj.subType;
                                if (!_.isUndefined(market)) {
                                    if (market.attributes.subType != subType) {
                                        market.updateSelectionsWithLine(subType);
                                    }
                                }
                            }
                        }
                    }

                    if (!_.isUndefined(market)) {
                        scope.listenToOnce(market,"change", scope.onMarketPropertyChange);
                        market.populate(marketObj,false);
                    }

                });
            }
        },

        onMarketPropertyChange: function(market) {
            var changedObj = {};
            changedObj.eventId = market.attributes.eventId;
            changedObj.id = market.id;
            changedObj.changed = market.changed;
            App.vent.trigger('market:propertyChange', changedObj);
        },

        setInplay: function(isInplay) {
            this.set('inplay',isInplay);
        },

        getInplay: function(isInplay) {
            return this.get('inplay');
        },

        getParticipantA: function() {
            return this.get('participantA');
        },

        getParticipantB: function() {
            return this.get('participantB');
        },

        setInplayScore: function(value) {
            this.set('score',value,{"silent":true});
            this.trigger("change:inplayScore", this);
        },

        getInplayScore: function() {
            return this.get('score');
        },

        getInplayScoreToArray: function() {
            var score = this.get('score');
            var scoreArray = [0,0];

            if (score.indexOf('-') > -1) {
                scoreArray = score.split("-");
            } else if (score.indexOf(':') > -1) {
                scoreArray = score.split(":");
            }

            return scoreArray;
        },

        getInplayClock: function() {
            return this.get('clock');
        },

        setInplayClock: function(value) {
            this.set('clock',value);
        },

        findMarket: function(id){
            return this.Markets.get(id);
        },

        /**
         * @param type
         * @returns {*}
         */
        findMarketByType: function(type, mostBalanced) {
            if (!!mostBalanced) {
                // if most balanced, get all markets that match the type
                var markets = this.Markets.byType(type);

                // if only one found, return that market
                if (markets.length == 1) return markets.at(0);

                // if more than one found, attempt to select the mostBalanced
                if (markets.length > 1) {
                    var mostBalanced = markets.findWhere({mostBalanced: true});
                    if (mostBalanced) return mostBalanced;
                }
            }

            // otherwise just find the first market that matches
            return this.Markets.findWhere({type: type});
        },


        /**
         * @param type
         * @returns {*}
         */
        findMarketsByTypes: function(types, mostBalanced) {
            if (!!mostBalanced) {
                // if most balanced, get all markets that match the type
                var markets = this.Markets.byTypes(types);

                // if only one found, return that market
                if (markets.length == 1) return markets.at(0);

                // if more than one found, attempt to select the mostBalanced
                if (markets.length > 1) {
                    var groups = _.groupBy(markets.models, function(market) {
                        return market.get('type');
                    });

                    return _.reduce(groups, function(memo, group) {
                        var mostBalanced = _.find(group, function(market) {
                            return market.get('mostBalanced') == true;
                        });

                        // if most balanced found just push that
                        if (mostBalanced) {
                            memo.push(mostBalanced);
                        }
                        // push all markets from the group into memo
                        else {
                            Array.prototype.push.apply(memo, group);
                        }
                        return memo;
                    }, [], this);
                }
            }

            // otherwise just find the first market that matches
            return this.Markets.byTypes(types).models;
        },


        /**
         * @param id
         * @returns {exports.Selections|*|Selections}
         */
        findMarketSelections: function(id){
            var mkt = this.findMarket(id);
            return mkt.Selections;
        },


        /**
         * @param selectionId
         * @returns {*}
         */
        findSelection: function(selectionId){
            var selection;
            _.find(this.Markets.models, function(market) {
                var s = market.findSelection(selectionId);
                if (!_.isUndefined(s)) {
                    selection = s;
                }
            });
            return selection;
        },


        /**
         * @param mkts
         * @param eventId
         * @returns {boolean}
         */
        parseMarkets: function(mkts, eventId){
            if (_.isNull(this.Markets))
                this.Markets = new MarketsCollection();

            var that = this, changed = false;
            _.each(mkts, function(m) {
                // ensure parent ids are set
                _.defaults(m, {eventId: eventId, parent: that});

                // if market doesn't already exist, create with the new market data
                if (that.findMarket(m.id) == null) {
                    that.Markets.add(new Market(m, {parse: true}));
                    changed = true;
                    return;
                }

                // otherwise update the existing market
                that.findMarket(m.id).populate(m);
            });
            return changed;
        },


        getWatchAndBetId: function() {
            return this.get('watchAndBetId');
        },

        getWatchAndBetId: function() {
            return this.get('watchAndBetId');
        },

        setStreamingVideoUrl: function(url) {
            this.set('streamingVideoUrl',url);
        },

        getStreamingVideoUrl: function() {
            return this.get('streamingVideoUrl');
        }

    });
});

