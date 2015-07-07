define(function (require) {

    var Marionette = require('marionette');
    var BetSelection = require('app/model/bets/BetSelection');
    var BetTypeCalculator = require('app/model/bets/BetTypeCalculator');
    var BetJsonGenerator = require('app/model/bets/BetJsonGenerator');
    var BetsSummary = require('app/model/bets/BetsSummary');
    var BetPart = require('app/model/bets/BetPart');
    var SingleBet = require('app/model/bets/SingleBet');
    var SystemBet = require('app/model/bets/SystemBet');
    var Bet = require('app/model/bets/Bet');

    return Marionette.Controller.extend({
        dependencies: 'betsModel, vent, sessionModel, commands, oddsFactory, appController, eventCache',
        singles: [],
        priceChangeBetsDictionary: [],
        betSlipCookieName: 'betSlipCookie',
        placeBetButtonText: "SIGN_IN_AND_PLACE_BET",
        gotCookieData: false,

        /**
         * @param options
         */
        ready: function(options) {

            _.bindAll(this,'onLogin', 'onLogout', 'onSelectionRemove', 'onSelectionPriceChange','onSelectionPropertyChange',
                'onEventPropertyChange','onMarketPropertyChange','onLocaleChange', 'onBetPlacementSuccess','onCookieDataSuccess');

            this.vent.bind('session:loggedin', this.onLogin);
            this.vent.bind('session:loggedout', this.onLogout);
            this.vent.bind('selection:remove', this.onSelectionRemove);
            this.vent.bind('selection:priceChange', this.onSelectionPriceChange);

            this.vent.bind('event:propertyChange', this.onEventPropertyChange);
            this.vent.bind('market:propertyChange', this.onMarketPropertyChange);
            this.vent.bind('selection:stateChange', this.onSelectionPropertyChange);

            this.vent.on('globals:localeChange', this.onLocaleChange);
            this.vent.bind('bets:placementSuccess', this.onBetPlacementSuccess);

            this.listenTo(this.vent,"onAutoBetPlacementSuccess", this.onLoginAndBetPlacement);

            this.betsModel.on("bets:addSingleBet", this.addSingleBet, this);
            this.getDataForCookie();
        },

        onEventPropertyChange: function(changedObj) {
            var changed = changedObj.changed;
            var eventId = changedObj.id;
            this.updateBetByEventState(eventId,changed.state);
            this.checkCashoutBetsByEventState(eventId,changed.state);
        },

        onMarketPropertyChange: function(changedObj) {
            var changed = changedObj.changed;
            var eventId = changedObj.eventId;
            var marketId = changedObj.id;
            this.updateBetByMarketState(marketId,changed.state);
            this.checkCashoutBetsByMarketState(marketId,changed.state);
        },

        onSelectionPropertyChange: function(changedObj) {
            var changed = changedObj.changed;
            var selectionId = changedObj.id;
            this.updateBetBySelectionState(selectionId,changed.state);
            this.checkCashoutBetsBySelectionState(selectionId,changed.state);
        },

        checkCashoutBetsByEventState: function(eventId,state) {
            var cashoutCollection = this.betsModel.cashoutCollection;
            if (_.size(cashoutCollection) > 0) {
                for (var i=0;i<cashoutCollection.length;i++) {
                    var cashoutObj = cashoutCollection[i];
                    var bet = cashoutObj.bet;
                    for (var j=0; j<bet.parts.betPart.length;j++) {
                        var part = bet.parts.betPart[j];
                        if (_.has(part,'event')) {
                            var partEventId = part.event.id;
                            if (partEventId == eventId) {
                                if (state == 'ACTIVE') {
                                    var marketId = part.market.id;
                                    var selectionId  = part.selection.id;
                                    //Check parent attributes.
                                    if (!this.cashoutParentStatesOK(eventId,marketId,selectionId)) {
                                        state = 'SUSPENDED'
                                    }
                                }
                                cashoutObj.state = state;
                                this.trigger("bets:cashoutStateChange",cashoutObj);
                                break;
                            }
                        }
                    }
                }
            }
        },

        checkCashoutBetsByMarketState: function(marketId,state) {
            var cashoutCollection = this.betsModel.cashoutCollection;
            if (_.size(cashoutCollection) > 0) {
                for (var i=0;i<cashoutCollection.length;i++) {
                    var cashoutObj = cashoutCollection[i];
                    var bet = cashoutObj.bet;
                    for (var j=0; j<bet.parts.betPart.length;j++) {
                        var part = bet.parts.betPart[j];
                        if (_.has(part,'market')) {
                            var partMarketId = part.market.id;
                            if (partMarketId == marketId) {
                                if (state == 'ACTIVE') {
                                    var eventId = part.event.id;
                                    var selectionId  = part.selection.id;
                                    //Check parent attributes.
                                    if (!this.cashoutParentStatesOK(eventId,marketId,selectionId)) {
                                        state = 'SUSPENDED'
                                    }
                                }
                                cashoutObj.state = state;
                                this.trigger("bets:cashoutStateChange",cashoutObj);
                                break;
                            }
                        }
                    }
                }
            }
        },

        checkCashoutBetsBySelectionState: function(selectionId,state) {
            var cashoutCollection = this.betsModel.cashoutCollection;
            if (_.size(cashoutCollection) > 0) {
                for (var i=0;i<cashoutCollection.length;i++) {
                    var cashoutObj = cashoutCollection[i];
                    var bet = cashoutObj.bet;
                    for (var j=0; j<bet.parts.betPart.length;j++) {
                        var part = bet.parts.betPart[j];
                        if (_.has(part,'selection')) {
                            var partSelectionId = part.selection.id;
                            if (partSelectionId == selectionId) {
                                if (state == 'ACTIVE') {
                                    var eventId = part.event.id;
                                    var marketId = part.market.id;
                                    //Check parent attributes.
                                    if (!this.cashoutParentStatesOK(eventId,marketId,selectionId)) {
                                        state = 'SUSPENDED'
                                    }
                                }
                                cashoutObj.state = state;
                                this.trigger("bets:cashoutStateChange",cashoutObj);
                                break;
                            }
                        }
                    }
                }
            }
        },

        cashoutParentStatesOK: function(eventId, marketId, selectionId) {
            var event = this.eventCache.getEvent(eventId);
            if (_.isUndefined(event)){
                return false;
            }

            var market = event.findMarket(marketId);
            if (_.isUndefined(market)){
                return false;
            }

            var selection = event.findSelection(selectionId);
            if (_.isUndefined(selection)) {
                return false;
            }

            if (market.attributes.state == 'SUSPENDED'
                || event.attributes.state == 'SUSPENDED'
                || selection.attributes.state == 'SUSPENDED') {
                return false;
            }

            return true;
        },

        updateBetByEventState: function(eventId,state) {
            var hasSuspendedBet = false;
            for (var i=0;i<this.singles.length;i++) {
                var singleBet = this.singles[i];
                if (singleBet.eventId() == eventId) {
                    singleBet.setState(state);
                    this.trigger("bets:updateStateChange",singleBet);
                }
                if (singleBet.getState() == 'SUSPENDED') {
                    hasSuspendedBet = true;
                }
            }
            this.suspendedBetFound(hasSuspendedBet);
        },

        updateBetByMarketState: function(marketId,state) {
            var hasSuspendedBet = false;
            for (var i=0;i<this.singles.length;i++) {
                var singleBet = this.singles[i];
                if (singleBet.marketId() == marketId) {
                    singleBet.setState(state);
                    this.trigger("bets:updateStateChange",singleBet);
                }
                if (singleBet.getState() == 'SUSPENDED') {
                    hasSuspendedBet = true;
                }
            }
            this.suspendedBetFound(hasSuspendedBet);
        },

        updateBetBySelectionState: function(selectionId,state) {
            var hasSuspendedBet = false;
            for (var i=0;i<this.singles.length;i++) {
                var singleBet = this.singles[i];
                if (singleBet.selectionId() == selectionId) {
                    singleBet.setState(state);
                    this.trigger("bets:updateStateChange",singleBet);
                }
                if (singleBet.getState() == 'SUSPENDED') {
                    hasSuspendedBet = true;
                }
            }
            this.suspendedBetFound(hasSuspendedBet);
        },

        suspendedBetFound: function(value) {
            if (value == false) {
                //No suspended bets found.
                this.trigger("bets:removeSuspendedRejectionInfo");
            }
        },

        removePriceChangedBet: function(betId) {
            if (_.has(this.priceChangeBetsDictionary, betId)) {
                delete this.priceChangeBetsDictionary[betId];
            }
        },

        onSelectionPriceChange: function(s) {
            var priceUp  = (s._previousAttributes.decimalOdds > s.attributes.decimalOdds);
            var selectionId = s.id;
            var betId = 'bet-' + selectionId;

            if (_.has(this.betsModel.singleBets, betId)) {
                var singleBet = this.betsModel.singleBets[betId];
                var oddsObj = this.oddsFactory.getOddsByIndex(s.attributes.rootIdx);
                singleBet.setOdds(oddsObj);
                var priceChangeObj = {priceUp:priceUp, bet:singleBet};
                this.trigger("bets:updatePriceChange",priceChangeObj);
                this.trigger("bets:updateEstimatedReturns",singleBet);
                this.updateTotalStake(singleBet);

                if (!_.has(this.priceChangeBetsDictionary, betId)) {
                    var priceChangeObj = {};
                    priceChangeObj.originalOdds = s._previousAttributes.decimalOdds;
                    priceChangeObj.currentOdds = s.attributes.decimalOdds;
                    priceChangeObj.betId = betId;
                    this.priceChangeBetsDictionary[betId] = priceChangeObj;
                    this.trigger("bets:updateMultipleEstimatedReturns");
                }
                else {
                    //Found the singleBets now update the Multiple Estimated returns.
                    var priceChangeObj = this.priceChangeBetsDictionary[betId];
                    if ( priceChangeObj.originalOdds == s.attributes.decimalOdds ) {
                        //price is back to the original value so lets remove from lookup.
                        delete this.priceChangeBetsDictionary[betId];
                    }
                    else if (priceChangeObj.currentOdds != s.attributes.decimalOdds ) {
                        priceChangeObj.currentOdds = s.attributes.decimalOdds;
                        this.trigger("bets:updateMultipleEstimatedReturns");
                    }
                }
            }
        },


        onLogin: function() {
            this.trigger("onSessionLogin");
            this.changeCurrencySymbol();
        },

        onLogout: function() {
            this.trigger("onSessionLogout");
            this.changeCurrencySymbol();
        },

        getOpenBetsClick: function() {
            //FIXME ADD VALIDATION IS USER LOGGED IN
            this.betsModel.getOpenBets();
        },

        getClosedBetsClick: function() {
            //FIXME ADD VALIDATION IS USER LOGGED IN
            this.betsModel.getClosedBets();
        },

        onPlaceBetClick: _.debounce(function(event) {
            if (this.sessionModel.isLoggedIn()) {
                this.validateBetSelection();
                $('body').addClass('print_betslip');
            }
            else {
                this.requestUserLogin();
            }
        }, 2000, true),

        requestUserLogin: function() {
            this.vent.trigger('session:requestLogin');
        },

        onLoginAndBetPlacement: function() {
            this.validateBetSelection();
        },

        updateStake: function(betId, stake) {
            var bet = this.betsModel.updateStake(betId, stake);
            this.trigger("bets:updateEstimatedReturns",bet);
            this.updateTotalStake(bet);
        },

        updateTotalStake: function(bet) {
            this.trigger("bets:updateTotalStake", bet);
        },


        validateBetSelection: function() {
            var stake = this.betsModel.totalStake();
            var betsPriceChange = _.keys(this.priceChangeBetsDictionary).length > 0;
            var hasFreeBets = this.hasFreeBet();

            if (this.betsModel.selectionCount == 0) {
                this.throwBetValidationError('No bets selected.','');
            }
            else {
                this.betsModel.placeBet();
                return;
                //remove the above.

                if (this.hasSuspendedBets()) {
                    this.throwBetValidationError('Please remove suspended bets from the betslip before placing your bet.','UNAVAILABLE_SELECTION');
                }
                else if (stake <= 0 && hasFreeBets == false) {
                    this.throwBetValidationError('Please enter a stake','');
                }
                else if (betsPriceChange) {
                    this.displayBetsPriceChangeDetails();
                }
                else {
                    this.betsModel.placeBet();
                }
            }
        },

        displayBetsPriceChangeDetails: function() {
            var priceDetailsArray = this.getSelectionPriceChanged();
            if(priceDetailsArray.length > 0){
                this.trigger("bets:showBetPriceChange",priceDetailsArray)
            }else{
                this.betsModel.placeBet();
            }
        },

        getSelectionPriceChanged: function() {
            var priceChangeMap = _.values(this.priceChangeBetsDictionary);
            var priceChangeDetails = [];

            for (var i=0; i < priceChangeMap.length; i++) {
                var priceChangeObj =  priceChangeMap[i];
                if(priceChangeObj.currentOdds != priceChangeObj.originalOdds){
                    priceChangeDetails.push(priceChangeObj);
                }
            }
            return priceChangeDetails;
        },

        hasSuspendedBets: function() {
            var singles = _.values(this.betsModel.singleBets);
            for (var i=0;i<singles.length;i++) {
                var singleBet = singles[i];
                if (singleBet.getState() == 'SUSPENDED') {
                    return true;
                }
            }
            return false;
        },


        hasFreeBet: function() {
            var singles = _.values(this.betsModel.singleBets);
            for (var i=0;i<singles.length;i++) {
                var singleBet = singles[i];
                if (singleBet.redeemFreeBet == true && singleBet.isFreeBet == true) {
                    return true;
                }
            }
            return false;
        },


        throwBetValidationError: function(message, status) {
            var rejectionObj = {};
            rejectionObj.bets = [];
            rejectionObj.reasonCode = message;
            rejectionObj.status = status;

            this.betsModel.showRejection(rejectionObj);
        },

        onSelectionRemove: function(id) {
            var bet = _.find(this.singles, function(bet){
                return bet.betId() == 'bet-'+id;
            });

            this.removeSingleBet(bet);
        },

        clearAllBetsClick: function() {
            this.betsModel.clearAllBets();
            this.priceChangeBetsDictionary = [];
            this.updateCookie();
        },


        onLocaleChange: function() {
            if (!this.gotCookieData) {
                this.getDataForCookie();
            }
            this.changeCurrencySymbol();
        },

        getCurrencySymbol: function() {
            if (this.sessionModel.isLoggedIn()) {
                return App.translator.translateCurrency(this.sessionModel.getCurrency());
            }
            else {
                var localeCurrency = App.translator.translate("CURRENCY_NAME");
                return App.translator.translateCurrency(localeCurrency)
            }
        },

        changeCurrencySymbol: function() {
            $("span[name*='bet-currencySymbol']").html(this.getCurrencySymbol());
        },

        includeSingleFreeBet: function(bet) {
            this.betsModel.includeFreeBetSelection(bet);
        },

        excludeSingleFreeBet: function(bet) {
            this.betsModel.excludeFreeBetSelection(bet);
        },

        includeSingleBet: function(bet) {
            this.betsModel.includeBetSelection(bet);
        },

        excludeSingleBet: function(bet) {
            this.betsModel.excludeBetSelection(bet);
        },

        removeSingleBet: function(bet) {
            this.betsModel.removeBetSelection(bet);
            this.singles = _.without(this.singles, bet);
            this.changeCurrencySymbol();
            this.updateTotalStake();
            this.trigger("refreshView");
            this.trigger("updateBetsCount");
            this.updateCookie();
            if (!_.isUndefined(bet)) {
                this.removePriceChangedBet(bet.betId());
            }
        },

        removeSelectionState: function(betId) {
            this.vent.trigger('selectionState:remove',betId);
            this.removePriceChangedBet(betId);
        },

        getBetButtonText: function() {
            return this.placeBetButtonText;
        },

        setBetButtonText: function(value) {
            this.placeBetButtonText = value;
        },

        addSingleBet: function(bet) {
            this.singles.push(bet);
            this.singles = _.union(this.singles);
            this.trigger("updateBetsCount");
            this.updateCookie();
        },

        onBetPlacementSuccess: function() {
            this.removeCookie();
        },

        removeCookie: function() {
            $.removeCookie(this.betSlipCookieName);
        },


        updateCookie: function() {
            var cookieData = [];
            _.each(this.singles, function(val, key){
                var cookieObj = {};
                cookieObj.eventId = val.eventId();
                cookieObj.selectionId = val.selectionId();
                cookieData.push(cookieObj);
            });

            var data = JSON.stringify(cookieData);
            $.cookie(this.betSlipCookieName, data);
        },


        getDataForCookie: function() {
            this.gotCookieData = true;
            var betSlipData = $.cookie(this.betSlipCookieName);
            var that = this;
            if (betSlipData) {
                var data = JSON.parse(betSlipData);
                var selectionArray = [];
                _.each(data, function(val, key){
                    if (_.has(val, 'eventId') && _.has(val, 'selectionId')) {
                        var selectionId = val.selectionId;
                        selectionArray.push(selectionId);
                    }
                });

                var ids = selectionArray.join(',');
                if (_.size(selectionArray) >0 ) {
                    that.commands.execute('command:getSelectionEvents', ids)
                        .done(that.onCookieDataSuccess);
                }
            }
        },

        checkForBetSlipCookie: function() {
            var betSlipData = $.cookie(this.betSlipCookieName);
            var that = this;
            if (betSlipData) {
                var data = JSON.parse(betSlipData);
                _.each(data, function(val, key){
                    if (_.has(val, 'eventId') && _.has(val, 'selectionId'))
                        that.vent.trigger('cookie:addSelection',val);
                });
            }
        },

        onCookieDataSuccess: function(data, textStatus, jqXHR){
            this.checkForBetSlipCookie();
        },

        onMaxStakeRequest: function(bet) {
            this.betsModel.getMaxAllowedStake(bet);
            this.trigger('bets:maxStakeRequested');
        }

    });
});
