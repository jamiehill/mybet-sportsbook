define([
    'marionette',
    'text!app/view/bets/ActionBetView.tpl.html'
],
function(Marionette,tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel, betSlipPM, vent , sessionModel',
        template: _.translateTemplate(tpl),
        multiples: [],
        systemBet: null,
        displayMaxStakeInfo: true,

        events: {
            'change #bets-multiples .row label.stake input': 'onStakeChange',
            'click .row.toggle': 'toggleRow',
            'click .cta .remove-all' : 'clearSingleBets'
        },

        toggleRow: function(e) {
            $(e.currentTarget).next().toggleClass('open closed');
            $(e.currentTarget).find('i').toggleClass('icon-angle-down icon-angle-left')
        },

        /**
         * @param options
         */
        ready: function() {
            _.bindAll(this, 'onLocaleChange', 'onPriceFormatChange','onMaxStakeRequested');
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:addMultipleBet", this.addMultipleBet, this);
            this.betsModel.on("bets:setMaxStake", this.onMaxStakeChosen, this);
            this.betsModel.on("bets:hideMaxStakeInfo", this.onHideMaxStakeInfo, this);

            this.betsModel.on("bets:updateTotalNumberOfBets", this.onUpdateTotalNumberOfBets, this);

            this.pm.on("onSessionLogin", this.onSessionLogin, this);
            this.pm.on("onSessionLogout", this.onSessionLogout, this);
            this.pm.on("bets:updateTotalStake", this.updateTotalStake, this);
            this.vent.on('globals:localeChange', this.onLocaleChange, this);
            this.pm.on("bets:maxStakeRequested", this.onMaxStakeRequested, this);


            this.listenTo(this.vent, 'globals:priceFormatChange', this.onPriceFormatChange);
        },


        onPriceFormatChange: function() {
            this.onShow();
        },

        onMaxStakeRequested: function() {
            this.displayMaxStakeInfo =true;
        },

        onHideMaxStakeInfo: function() {
            var infoEl = this.$el.find('.bet-total-info');
            infoEl.hide();
            this.displayMaxStakeInfo = false;
        },

        onMaxStakeChosen: function(){
            if (this.displayMaxStakeInfo == true) {
                var infoEl = this.$el.find('.bet-total-info');
                if (infoEl.length){
                    // For the moment we will not show a message upon clicking "Max Stake"
                    // However, this functionality is expected to be re-enabled in
                    // the future. Hence, it is just commented out
                    //
                    // infoEl.show();
                }
            }
        },

        clearSingleBets: function(e) {
            e.preventDefault();
            this.betsModel.clearAllBets();
            this.pm.singles = [];
            this.onShow();
        },


        /**
         *
         */
        onShow: function() {

            this.$el.html(this.template({
                totalBets: this.betsModel.getTotalNumberOfBets(),
                totalStake:this.betsModel.totalStakeDisplayVal(),
                currencySymbol:this.pm.getCurrencySymbol(),
                format: App.globals.priceFormat

            }));


            var that = this;
            this.updateTotalStake();//will force translation change of currency symbol.

            var stakeInputs = $('#bets-multiples label.stake input');

                stakeInputs.unbind('click').click(function( event ) {
                    that.onStakeClick(event);
                });

                stakeInputs.unbind('change').change(function( event ) {
                    that.onStakeChange(event);
                });

                stakeInputs.unbind('blur').blur(function( event ) {
                    that.onStakeBlur(event);
                });
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
                var newStake = parseFloat($(event.currentTarget).val()).toFixed(2);
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
        },

        onUpdateTotalNumberOfBets: function(totalBets) {
            $('.bet-total-bets').find('em').html(totalBets);
        },


        updateTotalStake: function() {

            var totalStake = this.betsModel.totalStake();
            var totalReturns = this.betsModel.estimatedReturns();
            if (isNaN(totalStake)) {
                totalStake = '0.00';
            }
            if(this.sessionModel.isLoggedIn()){
                $('.bet-total-stake').find('em').html(App.translator.translateCurrency(this.sessionModel.getCurrency()) + ' ' + totalStake.toFixed(2));
                $('#bet-total-returns em').html(App.translator.translateCurrency(this.sessionModel.getCurrency()) + ' ' + totalReturns.toFixed(2));
            }else{
                var localeCurrency = App.translator.translate("CURRENCY_NAME");
                $('.bet-total-stake').find('em').html(App.translator.translateCurrency(localeCurrency) + ' ' + totalStake.toFixed(2));
                $('#bet-total-returns em').html(App.translator.translateCurrency(localeCurrency) + ' ' + totalReturns.toFixed(2));
            }

            (totalStake == 0) ? $('#bet-total-stake, #bet-total-returns, #bet-total-bets').addClass('zero') : $('#bet-total-stake, #bet-total-returns, #bet-total-bets').removeClass('zero');

            if(totalStake.toFixed(2).toString().length > 8 || totalReturns.toFixed(2).toString().length > 8){
                $('section.actions').addClass('blockElements');
            }else{
                $('section.actions').removeClass('blockElements');
            }
        },

        /**
         * @param newBet
         */
        addMultipleBet: function(bet) {
            this.multiples = bet;
            this.onShow();
        },

        onLocaleChange: function(locale) {
            this.updateTotalStake();
        },

        onSessionLogin: function() {
            this.updateTotalStake();
        },

        onSessionLogout: function() {
            var totalStake = this.betsModel.totalStake();
            if (isNaN(totalStake)) {
                totalStake = '0.00';
            }
            var localeCurrency = App.translator.translate("CURRENCY_NAME");
            $('.bet-total-stake').find('em').html(App.translator.translateCurrency(localeCurrency) + ' ' + totalStake.toFixed(2));

            var totalReturns = this.betsModel.estimatedReturns();
            if (isNaN(totalReturns)) {
                totalReturns = '0.00';
            }
            $('#bet-total-returns em').html(App.translator.translateCurrency(localeCurrency) + ' ' + totalReturns.toFixed(2));
        }
    });
});
