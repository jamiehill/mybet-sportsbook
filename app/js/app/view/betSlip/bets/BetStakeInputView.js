define([
        'marionette',
        'text!app/view/bets/BetStakeInputView.tpl.html'
    ],
    function(Marionette,tpl) {
        return Marionette.View.extend({


            dependencies: 'betsModel, betSlipPM, vent , sessionModel',
            template: _.translateTemplate(tpl),
            multiples: [],
            systemBet: null,
            displayMaxStakeInfo: true,
            selectedSystemBet:null,


            events: {
                'change #bet-stake-input': 'onStakeChange'
            },


            /**
             * @param options
             */
            ready: function() {
                this.pm = this.betSlipPM;
                this.betsModel.on("bets:selectedSystemBetChange", this.onBetChange, this);
            },

            onBetChange: function() {
                //set the stake for the selected bet and clear the other bets.
                var systemBets = _.values(this.betsModel.systemBets);
                for (var i=0;i<systemBets.length;i++) {
                    var bet = systemBets[i];
                    bet.stake = 0;
                }

                var selectedBet = this.betsModel.getSelectedMultiOrSystemBet();
                this.selectedSystemBet = selectedBet;
                var betId = selectedBet.betId();
                //selectedBet.multiway = true;
                this.pm.updateStake(betId, 1);
                this.onShow();
            },

            /**
             *
             */
            onShow: function() {
                this.$el.html(this.template({
                    selectedSystemBet:this.selectedSystemBet,
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
            }


        });
    });