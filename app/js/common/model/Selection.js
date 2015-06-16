define(['backbone'],
    function (Backbone) {
        return Backbone.Model.extend({

            defaults: {
                eventId:0,
                marketId:0,
                line:null,
                id : 0,
                state:'ACTIVE',
                suspended : false,
                displayed: true,
                name : "",
                type : "D",
                multipleKeys: 0,//34374,67110,

                pos: {
                    row : 1,
                    col : 1
                },

                //Flattened structure instead of the odds object below returned from the schedule.
                decimalOdds:  "0",
                fractionalOdds: "",
                americanOdds:'',
                rootIdx: 0,
                homeLineWithoutPlus:null,
                homeLine:null,
                awayLine:null,
                activeBet: false
            },


            initialize: function( data, options ) {
                this.populate(data);
            },

            populate: function(data){
                var scope = this;
                _.each(data, function(val, key){
                    if (_.has(scope.defaults, key)) {

                        if (key == 'displayed') {
                            if (val == 0) {
                                val = false;
                            }
                            if (val == 1) {
                                val = true;
                            }

                            scope.set(key, val);
                        }

                        if (scope.defaults[key] != val) {

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

                            if (key == 'suspended') {
                                if (val == true) {
                                    key = 'state';
                                    val = 'SUSPENDED';
                                }
                            }

                            if (key =='type') {
                                if (val == 'H') data.header = '1';
                                if (val == 'A') data.header = '2';
                                if (val == 'D') data.header = 'x';
                            }

                            if (key == 'name') {
                                if (_.includes(val, 'Under')) data.header = data.name.replace('Under', 'U');
                                if (_.includes(val, 'Over'))  data.header = data.name.replace('Over', 'O');

                                if (_.includes(val, '{homeLine}')) {
                                    scope.set('homeLine',true);
                                    var homeName = val.replace('{homeLine}', '');
                                    val = homeName;
                                }
                                else if (_.includes(val, '{Line}')) {
                                    scope.set('homeLineWithoutPlus',true);
                                    var homeName = val.replace('{Line}', '');
                                    val = homeName;
                                }
                                else if (_.includes(val, '{awayLine}')) {
                                    scope.set('awayLine',true);
                                    var awayName = val.replace('{awayLine}', '');
                                    val = awayName;
                                }

                            }

                            scope.set(key, val);
                        }
                    }
                });

                if (_.has(data, 'attributes')) {
                    if (_.has(data.attributes, 'attrib')) {
                        _.each(data.attributes.attrib, function(obj){
                            if (_.has(scope.defaults, obj.key)) {
                                if (scope.defaults[obj.key] != obj.value) {
                                    scope.set(obj.key, obj.value);
                                }
                            }
                        });
                    }
                }
            },

            getSelectionName: function() {
                var lineValue = "";
                if (!_.isNull(this.getLineValue())) {
                    lineValue = " "+this.getLineValue();
                }
                return _.titleize(this.get("name")+lineValue);
            },

            getLineValue: function() {
                if (!_.isNull(this.get("homeLine"))) {
                    var homeLine = this.get('line');
                    if (homeLine >0) {
                        if (!_.includes(homeLine, '+')) {
                            homeLine = '+'+homeLine;
                        }
                    }
                    return homeLine;
                }
                else if (!_.isNull(this.get("homeLineWithoutPlus"))) {
                    var homeLine = this.get('line');
                    return homeLine;
                }
                else if (!_.isNull(this.get("awayLine"))) {
                    var homeLine = this.get('line');
                    var awayLine = homeLine * -1;
                    if (awayLine >0) {
                        if (!_.includes(awayLine, '+')) {
                            awayLine = '+'+awayLine;
                        }
                    }
                    return awayLine;
                }
                else {
                    return null;
                }
            },

            getType: function() {
                return this.get('type');
            },


            /**
             * @returns {Mixed|*}
             */
            getOdds: function(format) {
                format = format || App.Globals.priceFormat;
                var oddsType = 'fractionalOdds';
                switch(format) {
                    case 'DECIMAL' : oddsType = 'decimalOdds'; break;
                    case 'AMERICAN' : oddsType = 'americanOdds'; break;
                }
                return this.get(oddsType);
            }
        });
    });
