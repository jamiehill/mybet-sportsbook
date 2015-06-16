/**
 * Created by jamie on 2/7/15.
 */
/**
 * Created by Jamie on 27/10/2014.
 */
define([
        'common/collection/CompetitionsCollection',
        'common/model/Competition'
    ],
    function(CompetitionsCollection, Competition) {
        return Backbone.Model.extend({


            dependencies: 'cache=eventCache, vent',
            deferred: null,


            Sports: {},
            Countries: {},
            Leagues: {},
            All: {},


            /**
             *
             */
            initialize: function() {
                this.vent = ctx.get('vent');
                this.cache = ctx.get('eventCache');
                this.keyMarketsModel = ctx.get('keyMarketsModel');
            },


            /**
             * @param eventId
             */
            fetch: function(callback) {
                var sport = App.Globals.sport.toLowerCase(),
                    that = this;

                // if not loaded yet we need to get them
                if (!_.has(this.Sports, sport)) {

                    // if they're in the process of being loading, hijack the current
                    // deferred object and invoke the callback once resolved
                    if (this.deferred) {
                        this.deferred.done(function(){
                            var competitions = that.getSport(sport);
                            if (callback) callback(competitions);
                        });
                        return;
                    }

                    // otherwise initialise the load ourselves, and
                    // and invoke the callback once resolved
                    else {
                        this.loadCompetitions(sport)
                            .done(function() {
                                var competitions = that.getSport(sport);
                                if (callback) callback(competitions);
                            });
                        return;
                    }
                }

                // data already loaded so return it
                var competitions = that.getSport(sport);
                if (callback) callback(competitions);
            },


            /**
             * Loads the competitions for the specified sport
             * @param sport
             * @returns {*}
             */
            loadCompetitions: function(sport) {
                this.deferred = $.Deferred();
                var that = this,
                    mt = this.keyMarketsModel.getDefaultMarket();

                ctx.get('apiService')
                    .getSportTree(sport.toUpperCase(), true)
                    .done(function(resp){
                        if (_.has(resp, 'Sport') && _.has(resp.Sport, 'competitions')) {
                            that.parseCompetitions(resp.Sport.competitions.category);
                        }
                        that.deferred.resolve();
                        that.deferred = null;
                    });

                //ctx.get('apiService')
                //    .getSportSchedule(sport.toUpperCase(), '', 0, false, 0, 0)
                //    .done(function(resp){
                //        if (_.has(resp, 'Sport') && _.has(resp.Sport, 'competitions')) {
                //            that.parseCompetitions(resp.Sport.competitions.category);
                //        }
                //        that.deferred.resolve();
                //        that.deferred = null;
                //    });
                return that.deferred;
            },


            /**
             * @param countries
             */
            parseCompetitions: function(data, s) {
                var countries, leagues, country;
                var sport = this.getSport(s);

                // kill the comparator so that the competitions
                // maintain the sort order from the server
                sport.comparator = undefined;
                countries = _.map(data, function(cntry) {
                    _.extend(cntry, {level: 'country'});
                    country = this.store(cntry, this.Countries);

                    // map out the leagues for this country
                    leagues = _.map(cntry.competition, function(lg) {
                        _.extend(lg, {level: 'league', parent: country});
                        return this.store(lg, this.Leagues);

                    }, this);

                    // add the leagues to the country
                    country.Children.reset(leagues);
                    return country;

                }, this);

                sport.reset(countries);
                return sport;
            },


            /**
             * @param country
             */
            getCountries: function(spt) {
                spt = (spt || App.Globals.sport).toLowerCase();
                return this.getSport(spt);
            },


            /**
             * @param id
             */
            getCompetition: function(id) {
                if (!_.has(this.All, id)) {
                    return this.getDefaultCompetition(true);
                }
                return this.All[id];
            },


            /**
             * Returns the specified competitions parent
             * @param id
             * @returns {*}
             */
            getParent: function(id) {
                var comp = this.All[id];
                return comp ? comp.get('parent') : null;
            },


            /**
             * Adds the events ancestors to the event
             * @param event
             */
            addAncestors: function(event) {
                var parentId = event.get('compId'),
                    comp = this.getParent(parentId);
                if (comp) {
                    event.set({parent: comp});
                    var country = comp.get('parent');
                    if (country) event.set({country: country});
                }
            },


            /**
             * @param id
             * @returns {*}
             */
            getCountryForCompetition: function(compId) {
                if (!compId) return this.getDefaultCountry();
                var competition = this.All[compId];
                if (!competition) return this.getDefaultCompetition();
                return competition.get('parent');
            },


            /**
             * @param eventId
             * @returns {*}
             */
            getCountryForEvent: function(eventId) {
                if (!eventId) return this.getDefaultCountry();
                var event  = this.cache.getEvent(eventId),
                    compId = event.get('compId');
                return this.getCountryForCompetition(compId);
            },


            /**
             * @param event
             * @returns {*}
             */
            getCompetitionForEvent: function(event) {
                var competitionId = event.get('compId');
                return this.getCompetition(competitionId);
            },


            /**
             * @returns {*}
             */
            getDefaultCountry: function() {
                var sport = App.Globals.sport.toLowerCase(),
                    countries = this.getSport(sport);
                return _.first(countries.models).id;
            },


            /**
             * @param sport
             * @returns {*}
             */
            getDefaultCompetition: function(returnComp) {
                var sport = App.Globals.sport.toLowerCase(),
                    countries = this.getSport(sport),
                    country = countries.at(0);

                returnComp = returnComp || false;
                if(!_.isUndefined(country)) {
                    var comp = _.first(country.Children.models);
                    return returnComp ? comp : comp.id;
                }
                return '';
            },


            /**
             * @param sport
             * @returns {*}
             */
            getSport: function(sport) {
                sport = (sport || App.Globals.sport).toLowerCase();

                if (_.isUndefined(this.Sports))
                    this.Sports = {};

                if (!_.has(this.Sports, sport))
                    this.Sports[sport] = new CompetitionsCollection();

                return this.Sports[sport];
            },


            /**
             * @param sport
             * @returns {boolean}
             */
            hasSport: function(sport) {
                sport = (sport || App.Globals.sport).toLowerCase();
                return _.has(this.Sports, sport);
            },


            /**
             * Store the specified competition for easy lookup
             * @param data
             * @param obj
             * @returns {Competition}
             */
            store: function(data, obj) {
                // create the new Competition object
                var comp = new Competition(data);
                comp.Children = new CompetitionsCollection();
                comp.Children.comparator = undefined;
                // store the competition in general lookup hash,
                // and the appropriate sport/competition/league hash
                this.All[data.id] = comp;
                obj[data.id] = comp;
                // return comp
                return comp;
            }
        });
    });
