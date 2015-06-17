define(['common/model/Selection',
        'common/collection/SelectionsCollection'
],
function (Selection, SelectionsCollection) {
    return Backbone.Model.extend({

        Selections: null,

        defaults: {
          eventId:0,
          id : 0,
          name : "",
          type : "MRES",
          subtype : '',
          displayOrder : -500,
          columnCount : 0,
          suspended : false,
          state : 'OPEN',
          displayed : true,
          mostBalanced : false,
          line : null
        },


        initialize: function(data) {
            this.populate(data,true);
        },

        populate: function(data,forceUpdate){
            var scope = this;

            // parse selections
            if (_.has(data, 'selection')) {
                var line = this.get('line');
                if (_.has(data, 'line')) {
                    line = data.line;
                }
                else if (_.has(data, 'subtype')) {
                    line = data.subtype;
                }
                this.parseSelections(data.selection, this.get('id'), this.get('eventId'), line);
                delete data.selection;
            }

            _.each(data, function(val, key){
                if (key == 'id' || key == 'eventId') {
                    scope.set(key, val);
                }

                if (_.has(scope.defaults, key)) {
                    if (scope.attributes[key] != val || forceUpdate) {
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
                            if (val == 'C') {
                                val = 'CLOSED';
                            }
                        }

                        if (key == 'displayed' || key == 'mostBalanced') {
                            if (val == 0) {
                                val = false;
                            }
                            if (val == 1) {
                                val = true;
                            }
                        }

                        if (key == 'suspended') {
                            if (val == true) {
                                key = 'state';
                                val = 'SUSPENDED';
                            }
                        }

                        scope.set(key, val);
                    }
                }
            });
        },


        /**
         * @param selections
         * @param marketId
         * @param eventId
         */
        parseSelections: function(selections, marketId, eventId, line){
            if (_.isNull(this.Selections))
                this.Selections = new SelectionsCollection();


            var that = this;
            _.each(selections, function(s) {
                // ensure parent ids are set
                _.defaults(s, {marketId: marketId, eventId: eventId, parent: that, line:line});

                // if market doesn't already exist, create with the new market data

                if (that.findSelection(s.id) == null) {

                    if (_.has(s, 'odds')) {
                        s.rootIdx = s.odds.rootIdx;

                        if (s.rootIdx > -1) {
                            var oddsFactory = ctx.get("oddsFactory");
                            var oddsObj = oddsFactory.getOddsByIndex(s.rootIdx);
                            s.decimalOdds = oddsObj.decimal;
                            s.fractionalOdds = oddsObj.fractional;
                            s.americanOdds = oddsObj.american;
                        }
                        else {
                            s.americanOdds = '-';
                        }
                    }

                    that.Selections.add(new Selection(s, {parse: true}));
                    return;
                }

                // otherwise update the existing market
                var selection = that.findSelection(s.id);
                that.listenToOnce(selection,"change:rootIdx", that.onSelectionPriceChange);
                that.listenToOnce(selection,"change:line", that.onSelectionLineChange);

                that.listenToOnce(selection,"change:displayed", that.onSelectionDisplayedChange);
                that.listenToOnce(selection,"change:state", that.onSelectionStateChange);
                selection.populate(s);
            });
        },


        updateSelectionsWithLine: function(line) {
            var that = this;
            if (_.has(this.Selections,'models')) {
                _.each(this.Selections.models, function(s) {
                    that.listenToOnce(s,"change:line", that.onSelectionLineChange);
                    s.set('line',line);
                });
            }
        },

        /**
         * @param id
         * @returns {*}
         */
        findSelection: function(id){
            return this.Selections.get(id);
        },

        onSelectionStateChange: function(event) {
            var vent = ctx.get("vent");
            vent.trigger('selection:stateChange', event);
        },

        onSelectionDisplayedChange: function(event) {
            var vent = ctx.get("vent");
            vent.trigger('selection:displayedChange', event);
        },

        /**
         * @param event
         */
        onSelectionPriceChange: function(event) {
            var vent = ctx.get("vent");
            var oddsFactory = ctx.get("oddsFactory");
            var oddsObj = oddsFactory.getOddsByIndex(event.attributes.rootIdx);
            if (oddsObj) {
                event.set('decimalOdds',oddsObj.decimal);
                event.set('fractionalOdds',oddsObj.fractional);
                event.set('americanOdds',oddsObj.american);
            }

            vent.trigger('selection:priceChange', event);
        },

        /**
         * @param event
         */
        onSelectionLineChange: function(s) {
            var line = s.attributes.line;
            var lineHasChanged = s._previousAttributes.line != line;

            if (!_.isNull(line) && lineHasChanged) {
                var vent = ctx.get("vent");
                vent.trigger('selection:lineChange', s);
            }
        }



    });
});

