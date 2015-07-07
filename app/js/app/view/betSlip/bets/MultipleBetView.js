define([
        'marionette',
        'text!app/view/bets/MultipleBetView.tpl.html'
    ],
    function(Marionette,tpl) {
        return Marionette.View.extend({


            dependencies: 'betsModel, betSlipPM, vent , sessionModel',
            template: _.translateTemplate(tpl),
            className: "betslip-inner",
            multiples: [],
            systemBet: null,
            isUserLoggedIn:false,

            ui: {
                'input': '#bets-multiples label.stake input'
            },


            events: {
                'change #bets-multiples .row label.stake input': 'onStakeChange',
                'click .row.toggle': 'toggleRow',
                'click #multiple-show-all-btn':'onShowAllMultipleBets'
            },

            toggleRow: function(e) {

                $(e.currentTarget).next().toggleClass('open closed');
                $(e.currentTarget).find('i').toggleClass('icon-angle-down icon-angle-left')

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
                this.adjustMultipleNames();

                compiledTemplate = this.template({
                    bets: this.multiples,
                    totalStake:this.betsModel.totalStakeDisplayVal(),
                    currencySymbol:this.pm.getCurrencySymbol(),
                    format: App.globals.priceFormat,
                    isUserLoggedIn: this.isUserLoggedIn
                });


                this.$el.html(compiledTemplate);

                var singleCount = _.values(this.betsModel.singleBets).length;
                var displayMoreButton = this.betsModel.moreSystemBetsAvailable && singleCount >1;

                if (displayMoreButton) {
                    $('#multiple-show-all-btn').show();
                } else {
                    $('#multiple-show-all-btn').hide();
                }

                var that = this;
                this.updateTotalStake(); //will force translation change of currency symbol.

                $('#bets-multiples .stake a').unbind('click').click(function( event ) {
                    event.preventDefault();
                    that.onMaxStakeRequest(event);
                });

                // var stakeInputs = $('#bets-multiples .row label.stake input');
                var stakeInputs = $(this.ui.input);

                stakeInputs.each(function(){
                    var currentValue = $(this).val();

                    // if current value exists
                    if(currentValue != 0){
                        // add css helper class to indicate user has interacted with this stake field
                        $(this).closest('li').addClass('-stake-touched');
                    }
                });

                stakeInputs.unbind('focus').focus(function(event){
                    $(event.currentTarget).closest('li').addClass('-stake-touched'); // add css helper class to indicate user has interacted with this stake field
                });

                stakeInputs.unbind('click').click(function( event ) {
                    that.onStakeClick(event);
                });

                stakeInputs.unbind('change').change(function( event ) {
                    that.onStakeChange(event);
                });

                stakeInputs.unbind('keydown').keydown(function( event ) {
                    that.onKeyDown.call(that, event);
                });

                stakeInputs.unbind('blur').blur(function( event ) {
                    that.onStakeBlur(event);
                });

                this.delegateEvents();
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

            onStakeChange: function(event) {

                var betId = $(event.currentTarget).closest('li').attr('id');
                var newStake = parseFloat($(event.currentTarget).val()).toFixed(2);
                if (isNaN(newStake) || newStake == "") {
                    newStake = 0.00;
                    $(event.currentTarget).val("0.00");
                }else{
                    $(event.currentTarget).val(newStake.toString());
                }
                this.pm.updateStake(betId, newStake);
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
