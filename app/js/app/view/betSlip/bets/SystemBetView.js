/**
 * Created by ianrotherham on 19/06/2015.
 */
define([
        'marionette',
        'text!app/view/bets/SystemBetView.tpl.html'
    ],
    function(Marionette,tpl) {
        return Marionette.View.extend({


            dependencies: 'betsModel, betSlipPM, vent , sessionModel',
            template: _.translateTemplate(tpl),
            className: "betslip-inner",
            multiples: [],
            systemBet: null,
            isUserLoggedIn:false,
            showBankerCBSelected:false,

            ui: {
                'input': '#bets-multiples label.stake input'
            },


            events: {
                'change #bets-multiples .row label.stake input': 'onStakeChange',
                'click #multiple-show-all-btn':'onShowAllMultipleBets',
                'click #showBankerCB':'onShowBankerBets',
                'click .selection__banker input':'onBankerBetSelected'

            },


            /**
             * @param options
             */
            ready: function() {
                _.bindAll(this, 'onLocaleChange', 'onPriceFormatChange');
                this.pm = this.betSlipPM;
                this.betsModel.on("bets:addMultipleBet", this.addMultipleBet, this);
                this.pm.on("onSessionLogin", this.onSessionLogin, this);
                this.pm.on("onSessionLogout", this.onSessionLogout, this);
                this.pm.on("bets:updateTotalStake", this.updateTotalStake, this);
                this.vent.on('globals:localeChange', this.onLocaleChange, this);
                this.listenTo(this.vent, 'globals:priceFormatChange', this.onPriceFormatChange);
                this.betsModel.on("bets:setMaxStake", this.setMaxStake, this);
                this.betsModel.on("bets:addRejections", this.onAddRejectionsToMultiples, this);
            },

            onBankerBetSelected: function(event) {
                var checked = event.currentTarget.checked;
                var betId = $(event.currentTarget).attr('betId');

                var singleBets = _.values(this.betsModel.singleBets);
                for (var i=0;i<singleBets.length;i++) {
                    var single = singleBets[i];
                    if (single.betId() == betId) {
                        single.isBankerBet = checked;
                    }
                }

                this.betsModel.calculateSystemBets();
            },

            onShowBankerBets: function(e) {
                var checked = e.currentTarget.checked;
                this.showBankerCBSelected = checked;

                var singleBets = _.values(this.betsModel.singleBets);
                for (var i=0;i<singleBets.length;i++) {
                    var single = singleBets[i];
                    single.displayBankerBetOption = checked;
                }
                this.betsModel.calculateBankerBets = checked;
                this.onShow();
            },

            onShowAllMultipleBets: function(e) {
                this.betsModel.calculateSystemBets();
            },


            onAddRejectionsToMultiples: function(rejectionObj) {

                $("div[id*='multiple-selection-error-']").hide();

                var collection = rejectionObj.bets;
                var that = this;
                var rejectedMultiples = this.betsModel.rejectedMultiplesCount;
                var rejectedSingles = this.betsModel.rejectedSinglesCount;
                var highlightMultiples = this.betsModel.highlightMultiples;

                if (highlightMultiples || rejectedMultiples > 1 || rejectedSingles > 0) {
                    for (var i=0;i<collection.length;i++) {
                        var wrapper = collection[i];
                        if (wrapper.type == 'MULTIPLE') {
                            var systemBet = wrapper.bet;
                            var selectionMessage = wrapper.reasonCodeForSelection;

                            var betId = systemBet.betId();
                            $("#multiple-selection-error-"+betId).show();
                            $("#multiple-selection-error-"+betId+" p").html(selectionMessage);
                        }
                    }
                }
            },


            onPriceFormatChange: function() {
                this.onShow();
            },

            /**
             *
             */
            onShow: function() {
                var compiledTemplate;

                var eventCount = this.betsModel.getUniqueEventCount();
                var selectionCount = this.betsModel.singleBetCount;

                var standardCombiArray = this.betsModel.getStandardCombi(this.multiples);
                var combiBet = null;
                var systemCollection = [];

                if (standardCombiArray.length >0) {
                    combiBet = standardCombiArray[0]
                }

                var scope = this;
                if (!_.isNull(combiBet)) {
                    systemCollection = _.filter(this.multiples,
                        function(systemBet) {
                            var partsPerBet = scope.betsModel.getValueByMultipleName(systemBet.name);
                            if (!_.isUndefined(partsPerBet)) {
                                systemBet.description = ' '+partsPerBet+' out of '+eventCount+' ('+systemBet.betCount()+' bets)';
                            }
                            else {
                                systemBet.description = ' '+systemBet.name+' ('+systemBet.betCount()+' bets)';
                            }
                            return systemBet.name != combiBet.name;
                        });

                    combiBet.description = ' Standard Combi ('+combiBet.betCount()+' bets)';
                }
                else {
                    systemCollection = this.multiples;
                }

                var selectAllSinglesObj = {};
                selectAllSinglesObj.description = ' 1 out of '+eventCount+' ('+selectionCount+' bets)';

                var singleBets = _.values(this.betsModel.singleBets);

                compiledTemplate = this.template({
                    singles: singleBets,
                    selectAllSingles:selectAllSinglesObj,
                    combi:combiBet,
                    bets: systemCollection,
                    totalStake:this.betsModel.totalStakeDisplayVal(),
                    currencySymbol:this.pm.getCurrencySymbol(),
                    format: App.globals.priceFormat,
                    isUserLoggedIn: this.isUserLoggedIn
                });


                this.$el.html(compiledTemplate);

                var singleCount = _.values(this.betsModel.singleBets).length;

                var that = this;
                this.updateTotalStake(); //will force translation change of currency symbol.

                $("#showBankerCB").prop("checked", this.showBankerCBSelected);

                $("input[id*='system-bet-radio-']").unbind('click').click(function(event) {
                    that.onBetTypeChange(event);
                });

                $('#bets-system a.remove').unbind('click').click(function( event ) {
                    event.preventDefault();
                    that.onRemoveSingle(event);
                });

                this.delegateEvents();
            },

            onRemoveSingle: function(event) {
                var singles = _.values(this.betsModel.singleBets);

                var betId = $(event.currentTarget).closest('li').attr('betId');
                var bet = _.find(singles, function(bet){
                    return bet.betId() == betId;
                });

                this.pm.removeSingleBet(bet);
                this.pm.removeSelectionState(betId);
            },

            onStakeBlur: function(event) {
                if ($(event.currentTarget).val() == 0) {
                    $(event.currentTarget).closest('li').removeClass('-stake-touched'); // add css helper class to indicate user has interacted with this stake field
                }
            },

            onStakeClick: function(event) {
                if ($(event.currentTarget).val() == "0.00") {
                    $(event.currentTarget).val("");
                }else{
                    $(event.currentTarget).val(newStake.toString());
                }
            },

            onBetTypeChange: function(event) {
                var betId = $(event.currentTarget).attr( "betId" );
                this.betsModel.setSelectedMultiOrSystemBet(betId);
            },

            onStakeChange: function(event) {
                //var betId = $(event.currentTarget).closest('li').attr('id');
                var newStake = parseFloat($(event.currentTarget).val()).toFixed(2);
                if (isNaN(newStake) || newStake == "") {
                    newStake = 0.00;
                    $(event.currentTarget).val("0.00");
                }

                //GET BetId from the checkboxes.
                //this.pm.updateStake(betId, newStake);
            },

            onKeyDown: function(event) {
                var charCode = (event.which) ? event.which : event.keyCode;
                if(charCode <48 || charCode >58){
                    //stop anything that isn't 13=enter  8=backspace, delete=46 ,  110+ 190=fullstop , 37 thru 40 arrow keys.
                    if((charCode <96 || charCode>105) && charCode !=13 && charCode !=8  && charCode !=46 && charCode !=110 && charCode !=190 && charCode !=37 && charCode !=38 && charCode !=39 && charCode !=40){
                        event.preventDefault();
                    }
                }
                this.updateStakefromInput(event);
            },

            updateStakefromInput: function(event) {
                var target = $(event.target)[0];
                var that = this;

                setTimeout(function() {
                    var betId = $(event.currentTarget).closest('li').attr('id');
                    var newStake = $(event.currentTarget).val();
                    that.pm.updateStake(betId, newStake);
                }, 50);
            },

            // This updates the value displayed in the bet slip for the current multiple
            updateTotalStake: function(bet) {

                var totalReturns, betId;

                if(!_.isUndefined(bet)) {
                    totalReturns = bet.estimatedReturns();
                    betId = bet.betId();
                    $('#'+betId).find('.returns span').html(totalReturns.toFixed(2));
                }
            },

            /**
             * @param newBet
             */
            addMultipleBet: function(multiples) {
                this.multiples = multiples;
                this.onShow();
            },

            onLocaleChange: function(locale) {
                this.updateTotalStake();
            },

            onSessionLogin: function() {
                this.updateTotalStake();
                this.isUserLoggedIn = true;
                this.$el.find('.labelInner').show();
                this.$el.find('.maxStakeLink').show();
            },

            onSessionLogout: function() {
                this.isUserLoggedIn = false;
                this.$el.find('.maxStakeLink').hide();

                var totalStake = this.betsModel.totalStake();
                if (isNaN(totalStake)) {
                    totalStake = '0.00';
                }
                var localeCurrency = App.translator.translate("CURRENCY_NAME");
                $('.bet-total-stake').find('em').html(App.translator.translateCurrency(localeCurrency) + ' ' + totalStake.toFixed(2));
            },

            // Customize multiples' names to match a particular client's requirements
            adjustMultipleNames: function(){
                var hasOneBet, isMultiFold, bet, multiFoldIndex;

                if (this.multiples.length){
                    _.each(this.multiples, function(systemBet, index){
                        var displayName, alias;
                        hasOneBet = (systemBet.bets.length === 1);

                        // Specific conditions under which the default name provided
                        // needs to be tweaked for the client
                        isMultiFold = hasOneBet && (systemBet.bets[0].parts.length > 3);

                        if (isMultiFold){
                            multiFoldIndex = index;
                            alias = 'ACCUMULATOR (' + systemBet.bets[0].parts.length + ')';
                        }

                        // Multifolds are to be rendered open by default
                        systemBet.defaultRendering = isMultiFold ? 'open' : 'closed';
                        // TO-DO: There is no need to have the logic for the chevron here
                        // it should be handled via CSS
                        systemBet.defaultChevron = isMultiFold ? 'icon-angle-down' : 'icon-angle-left';

                        // We translate the name here because currently there is no easy
                        // way to translate variables within templates
                        // If there is an alias, we use it, otherwise we use the bet's name
                        displayName = alias || systemBet.name;
                        systemBet.displayName = App.translator.currentLocaleTranslations[(displayName)] || displayName;

                    });


                    // If the multiFoldIndex is not undefined and greater than 0,
                    // it means there is a multiFold that needs to be relocated
                    // to the top of the array
                    if (multiFoldIndex){
                        this.multiples.splice(0,0, this.multiples.splice(multiFoldIndex,1)[0]);
                    }
                }
            },

            setMaxStake: function(data){
                var isValidStake = data.Double && _.isNumber(data.Double) && data.betRef;
                var inputBox, stake;

                if (isValidStake){
                    inputBox =  $('#' + data.betRef + ' .stake input');

                    if (inputBox.length){
                        stake = data.Double.toFixed(2);
                        inputBox.val(stake).change();
                    }
                }
            },

            onMaxStakeRequest: function(event) {
                $(event.currentTarget).closest('li').addClass('-stake-touched');
                var betId = $(event.currentTarget).closest('li').attr('betId');
                var systemBets = this.betsModel.getSystemBets();
                var bet = _.find(systemBets, function(bet){
                    return bet.betId() == betId;
                });

                if (!_.isUndefined(bet)) {
                    this.pm.onMaxStakeRequest(bet);
                }
            }


        });
    });