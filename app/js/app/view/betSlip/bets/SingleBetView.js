define([
        'marionette',
        'text!app/view/bets/SingleBetView.tpl.html'
    ],
    function(Marionette, tpl) {
        return Marionette.View.extend({

            dependencies: 'betsModel, pm=betSlipPM, vent',
            template: _.translateTemplate(tpl),
            className: "betslip-inner",

            /**
             * @param options
             */
            ready: function() {

                _.bindAll(this, 'onShow', 'onPriceFormatChange','onTranslationComplete');

                this.betsModel.on("bets:addSingleBet", this.addSingleBet, this);
                this.betsModel.on("bets:clearSingleBets", this.clearSingleBets, this);
                this.betsModel.on("bets:addLoader", this.addLoader, this);
                this.betsModel.on("bets:removeLoader", this.removeLoader, this);
                this.betsModel.on("bets:setMaxStake", this.setMaxStake, this);
                this.betsModel.on("bets:addRejections", this.onAddRejectionsToSingles, this);

                this.betsModel.on("bets:translationComplete", this.onTranslationComplete, this);

                this.pm.on("bets:updateEstimatedReturns", this.updateEstimatedReturns, this);
                this.pm.on("bets:updatePriceChange", this.updatePriceChange, this);
                this.pm.on("bets:updateStateChange", this.updateStateChange, this);
                this.pm.on("bets:showBetPriceChange", this.onShowBetPriceWarnings, this);

                this.pm.on("onSessionLogin", this.onLogin, this);
                this.pm.on("onSessionLogout", this.onLogout, this);

                this.pm.on("refreshView", this.onRefreshView, this);

                this.listenTo(this.vent, 'globals:priceFormatChange', this.onPriceFormatChange);
                this.listenTo(this.vent, 'globals:localeChange', this.onShow, this);

            },

            onTranslationComplete: function() {
                this.pm.singles = _.values(this.betsModel.singleBets);
                this.onShow();
            },

            onLogout: function(){
                this.isUserLoggedIn = false;
                this.$el.find('.maxStakeLink').hide();
            },

            onLogin: function(){
                this.isUserLoggedIn = true;
                this.$el.find('.maxStakeLink').show();
            },

            onAddRejectionsToSingles: function(rejectionObj) {
                var collection = rejectionObj.bets;
                var that = this;
                $("div[id*='price-changed-tag-']").hide();

                for (var i=0;i<collection.length;i++) {
                    var wrapper = collection[i];
                    var singleBet = wrapper.bet;
                    var selectionMessage = wrapper.reasonCodeForSelection;
                    if (wrapper.type == 'SINGLE') {
                        if (_.has(wrapper,'newOdds')) {
                            //A price change and this is the new value.
                            var betId = singleBet.betId();
                            $("#price-changed-tag-"+betId).show();
                            $("#price-changed-checkbox-tag-"+betId).show();

                            $('#bets-singles .selectionError .squaredThree input').unbind('click').click(function( event ) {
                                that.toggleAcceptPriceChangeRejection(event);
                            });

                            var priceChangeDescription = selectionMessage;
                            var oddsObj = wrapper.newOdds;
                            var decimalOdds = oddsObj.decimal;
                            var acceptPriceTranslation = App.translator.translateAndReplaceToken("ACCEPT_NEW_PRICE" , decimalOdds);
                            priceChangeDescription += " " +  acceptPriceTranslation;
                            $("#price-changed-tag-"+betId+" p").html(priceChangeDescription);
                        }
                        else {
                            var betId = singleBet.betId();
                            $("#price-changed-tag-"+betId).show();
                            $("#price-changed-checkbox-tag-"+betId).hide();
                            $("#price-changed-tag-"+betId+" p").html(selectionMessage);
                        }
                    }
                }
            },

            toggleAcceptPriceChangeRejection: function(e) {
                var betId = $(e.currentTarget).closest('li').attr('betId');
                var checked = e.currentTarget.checked;
                if (checked) {
                    //Set Odds so the bet can be placed.
                    var rejections = this.betsModel.rejectedBetsCollection;
                    for (var i=0; i<rejections.length;i++) {
                        var wrapper = rejections[i];
                        if (wrapper.bet.betId() == betId) {
                            var singleBet = wrapper.bet;
                            var oddsObj = wrapper.newOdds;
                            singleBet.setOdds(oddsObj);
                            var element = $("#single-bet-price-"+singleBet.betId());
                            element.html(oddsObj.decimal);
                            this.updateEstimatedReturns(singleBet);
                            this.betsModel.setAcceptPriceChange(true);
                            break;
                        }
                    }
                    $("#price-changed-tag-"+betId).hide();
                }
            },

            toggleIncludePriceChange: function(e) {
                var betId = $(e.currentTarget).closest('li').attr('betId');
                var checked = e.currentTarget.checked;
                if (checked) {
                    this.pm.removePriceChangedBet(betId);
                    this.betsModel.setAcceptPriceChange(true);
                    $("#price-changed-tag-"+betId).hide();
                }
            },

            toggleIncludeFreeBet: function(e) {
                var betId = $(e.currentTarget).closest('li').attr('betId');

                var bet = _.find(this.pm.singles, function(bet){
                    return bet.betId() == betId;
                });

                var stakeInput = $('#stake-input-'+betId);

                var checked = e.currentTarget.checked;
                if (checked) {
                    stakeInput.prop('disabled', true);
                    this.pm.includeSingleFreeBet(bet);
                    var freeBetStake = bet.freeBet.bonusStakes[0].amount;
                    this.pm.updateStake(betId, freeBetStake);
                    stakeInput.val(freeBetStake);
                    this.excludeOtherFreeBets(betId);
                }
                else {
                    stakeInput.prop('disabled', false);
                    this.pm.updateStake(betId, 0);
                    stakeInput.val(0);
                    this.pm.excludeSingleFreeBet(bet);
                    $('.-free-bet-selected').removeClass('-free-bet-selected');
                    $('.-free-bet-not-selected').removeClass('-free-bet-not-selected');
                }
            },


            excludeOtherFreeBets: function(betIdToExclude) {
                var singles = _.values(this.betsModel.singleBets);
                for (var i=0;i<singles.length;i++) {
                    var single = singles[i];
                    var betId = single.betId();
                    var stakeInput = $('#stake-input-'+betId);
                    if (single.betId() != betIdToExclude) {
                        $('#freebet-checkbox-'+betId).prop('checked',false);
                        $('#single-bet-li-'+betId).removeClass('-free-bet-selected').addClass('-free-bet-not-selected');
                        stakeInput.prop('disabled', false);
                        if (single.redeemFreeBet == true) {
                            stakeInput.val(0);
                            this.pm.updateStake(betId, 0);
                        }
                        this.pm.excludeSingleFreeBet(single);
                    } else{
                        $('#single-bet-li-'+betId).removeClass('-free-bet-not-selected').addClass('-free-bet-selected');
                    }
                }
            },

            toggleInclude: function(e) {
                $(e.currentTarget).parent().toggleClass('active inactive');
                var betId = $(e.currentTarget).closest('li').attr('betId');

                var bet = _.find(this.pm.singles, function(bet){
                    return bet.betId() == betId;
                });
                var checked = e.currentTarget.checked;
                if (checked) {
                    this.pm.includeSingleBet(bet);
                }
                else {
                    this.pm.excludeSingleBet(bet);
                }
            },

            addLoader: function() {
                $('.loadingOverlay').fadeIn(200);
                $('.loadingOverlay__msg').html(App.translator.translate("BET_BEING_PLACED"));
            },

            removeLoader: function(response) {
                $('.loadingOverlay').fadeOut(200);
            },

            onShow: function() {

                var args = {
                    bets: this.pm.singles,
                    format: App.globals.priceFormat,
                    currencySymbol:this.pm.getCurrencySymbol(),
                    isUserLoggedIn: this.isUserLoggedIn
                };

                this.$el.html(this.template(args));

                var that = this;

                $('#bets-singles .stake a').unbind('click').click(function( event ) {
                    event.preventDefault();
                    that.onMaxStakeRequest(event);
                });

                $('#bets-singles a.remove').unbind('click').click(function( event ) {
                    event.preventDefault();
                    that.onRemoveSingle(event);
                });

                $('#bets-singles a.remove-all').unbind('click').click(function( event ) {
                    event.preventDefault();
                    that.onRemoveAllClick(event);
                });

                $('#bets-singles .toggle-include').unbind('click').click(function( event ) {
                    that.toggleInclude(event);
                });

                $('#bets-singles .freebet .squaredThree input').unbind('click').click(function( event ) {
                    that.toggleIncludeFreeBet(event);
                });

                $('#bets-singles .selectionError .squaredThree input').unbind('click').click(function( event ) {
                    that.toggleIncludePriceChange(event);
                });

                var stakeInputs = $('#bets-singles .row label.stake input');

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
            },

            updateStakefromInput: function(event) {

                var target = $(event.target)[0];
                var that = this;

                setTimeout(function() {
                    var betId = $(event.currentTarget).closest('li').attr('betId');
                    var newStake = $(event.currentTarget).val();
                    that.pm.updateStake(betId, newStake);
                }, 50);

            },

            onStakeBlur: function(event) {

                if ($(event.currentTarget).val() == 0) {
                    $(event.currentTarget).closest('li').removeClass('-stake-touched'); // add css helper class to indicate user has interacted with this stake field
                }
            },

            onStakeClick: function(event) {
                var newStake = parseFloat($(event.currentTarget).val()).toFixed(2);

                // JC - Commented out because it was causing a '0' to be added ahead of the caret cursor
                /*if (isNaN(newStake) || newStake == "") {
                 newStake = 0.00;
                 $(event.currentTarget).val("0.00");
                 }
                 else if(newStake == '0.00'){
                 $(event.currentTarget).val("");
                 }*/
            },

            onStakeChange: function(event) {

                var betId = $(event.currentTarget).closest('li').attr('betId');
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
                    //stop anything that isn't 13=enter  8=backspace, delete=46 ,  110+ 190=fullstop , 37 thru 40 arrow keys, 9 tab or shift+tab 9+16
                    if((charCode <96 || charCode>105) && charCode !=13 && charCode !=8  && charCode !=46 && charCode !=110 && charCode !=190 && charCode !=37 && charCode !=38 && charCode !=39 && charCode !=40 && charCode !=9){
                        event.preventDefault();
                    }
                }

                this.updateStakefromInput(event);
            },

            onMaxStakeRequest: function(event) {

                $(event.currentTarget).closest('li').addClass('-stake-touched');

                var betId = $(event.currentTarget).closest('li').attr('betId');

                var bet = _.find(this.pm.singles, function(bet){
                    return bet.betId() == betId;
                });

                this.pm.onMaxStakeRequest(bet);
            },
            /**
             */
            onRemoveSingle: function(event) {
                var betId = $(event.currentTarget).closest('li').attr('betId');
                var bet = _.find(this.pm.singles, function(bet){
                    return bet.betId() == betId;
                });

                if (bet.isFreeBet) {
                    this.pm.updateStake(bet.betId(), 0);
                }
                this.pm.removeSingleBet(bet);
                this.pm.removeSelectionState(betId);
            },

            onRemoveAllClick: function(event) {
                this.pm.clearAllBetsClick();
            },


            onRefreshView: function() {
                this.onShow();
            },

            /**
             * @param newBet
             */
            addSingleBet: function(bet) {
                this.onShow();
            },

            clearSingleBets: function() {
                this.pm.singles = [];
                this.onShow();
            },

            updateStateChange: function(singleBet) {
                var betId= singleBet.betId();
                var element = $("#single-bet-li-"+betId);
                if (singleBet.getState() == 'SUSPENDED') {
                    element.removeClass("suspended").addClass("suspended");
                }
                else {
                    $("#price-changed-tag-"+betId).hide();
                    $("#price-changed-checkbox-tag-"+betId).hide();
                    element.removeClass("suspended");
                }
            },

            updatePriceChange: function(priceChangeObj) {
                var priceUp = priceChangeObj.priceUp;
                var singleBet = priceChangeObj.bet;
                var element = $("#single-bet-price-"+singleBet.betId()),
                    clazz = (!priceUp) ? "priceUp" : "priceDown";

                var newOdds = singleBet.getOdds(App.globals.priceFormat);
                element.html(newOdds);
                element.addClass(clazz);
                _.delay(function() { element.removeClass(clazz); }, 10000);
            },

            onShowBetPriceWarnings: function(selections) {
                for (var i=0;i<selections.length;i++) {
                    var priceChangeObj = selections[i];

                    var betId = priceChangeObj.betId;
                    var originalOdds = priceChangeObj.originalOdds;
                    var currentOdds = priceChangeObj.currentOdds;
                    $("#price-changed-tag-"+betId).show();
                    $("#price-changed-checkbox-tag-"+betId).show();
                    $("#price-changed-tag-"+betId+" p").text(App.translator.translateAndReplaceToken('PRICE_CHANGE_FROM',originalOdds,currentOdds));
                }
            },

            updateEstimatedReturns: function(bet) {
                var betId = bet.betId();
                var estimatedValue = bet.estimatedReturnsDisplayVal();
                $('#single-bet-li-'+betId).find('.returns span').html(' ' + estimatedValue);
            },

            onPriceFormatChange: function() {
                this.onShow();
            },

            setMaxStake: function(data){
                var isValidStake = data.Double && _.isNumber(data.Double) && data.betRef;
                var inputBox, stake;

                if (isValidStake){
                    inputBox =  $('#single-bet-li-bet-' + data.betRef + ' .stake input');

                    if (inputBox.length){
                        stake = data.Double.toFixed(2);
                        inputBox.val(stake).change();
                    }
                }
            }
        });
    });