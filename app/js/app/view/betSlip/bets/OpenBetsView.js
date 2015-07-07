define([
    'marionette',
    'common/util/IdUtil',
    'text!app/view/bets/OpenBetsView.tpl.html'
],
function(Marionette, IdUtil, tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel, betSlipPM, vent',
        template: _.translateTemplate(tpl),
        className: "betslip-inner", 
        betConfirmations:[],
        cashoutCollection:[],

        events: {
            'click button[betId*=cashout-button]': 'onCashoutClick'
        },

        onCashoutClick: function(e) {
            var selector = $(e.currentTarget).attr('betId');
            var betId = IdUtil.extract(selector);
            this.betsModel.cashoutBetById(betId);
            
            $("#cashout-"+betId).addClass("-load");
        },


        /**
         * @param options
         */
        ready: function() {
            _.bindAll(this, 'onCashoutClick','renderTemplate','onCashoutStateChange');
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:openViewDataComplete", this.onOpenBets, this);
            this.betsModel.on("bets:calculateCashoutDataComplete", this.onCalculateCashoutDataComplete, this);
            this.betsModel.on("bets:cashoutBetComplete", this.onCashoutBetComplete, this);
            this.betsModel.on("bets:cashoutError", this.onCashoutError, this);
            this.listenTo(this.pm, 'bets:cashoutStateChange', this.onCashoutStateChange);

            this.listenTo(this.vent, 'globals:priceFormatChange', this.renderTemplate);

        },

        onCashoutStateChange: function(cashoutObj) {
            //cashoutObj.state == 'SUSPENDED' or 'ACTIVE'
            var betId = cashoutObj.bet.id;

            if (cashoutObj.cashoutEnabled == true) {
                if (cashoutObj.state == 'SUSPENDED') {
                    $("#cashout-"+betId).hide();
                }
                else if (cashoutObj.state == 'ACTIVE') {
                    $("#cashout-"+betId).show();
                    $("#cashout-value-"+betId).text(parseFloat(cashoutObj.cashoutValue).toFixed(2));
                    $("#cashout-confirm-value-"+betId).text(parseFloat(cashoutObj.cashoutValue).toFixed(2));
                }
            }
        },

        onCalculateCashoutDataComplete: function(cashoutCollection) {
	        this.cashoutCollection = cashoutCollection;
            for (var i=0; i<cashoutCollection.length; i++) {
                var cashoutBet = cashoutCollection[i];
                var betId = cashoutBet.bet.id;
                var cashoutValue = cashoutBet.cashoutValue;
                var cashoutEnabled = cashoutBet.cashoutEnabled;

                if (cashoutEnabled) {
                    $("#cashout-"+betId).show();
                    $("#cashout-value-"+betId).text(parseFloat(cashoutValue).toFixed(2));
                    $("#cashout-confirm-value-"+betId).text(parseFloat(cashoutValue).toFixed(2));
                }
                else {
                    $("#cashout-"+betId).hide();
                }
            }
        },

        onCashoutError: function(data) {

	        //var betId = data.betId;
	        
			//$("#cashout-"+betId).removeClass("-load").hide();
	        //$("#cashout-success-"+betId).hide();
		    //$("#cashout-fail-"+betId).show();
        },

        onCashoutBetComplete: function(data) {
	        
            var balance = data.balance;
            var betId = data.betId;
            var status = data.status;
            $("#cashout-"+betId).removeClass("-load").hide();

            if(status == "SUCCESS"){
	            $("#cashout-"+betId).hide();
	            $("#cashout-success-"+betId).show();
                $("#cashout-fail-"+betId).hide();
	            
	        }else{

                if (_.has(data),'rejectionCode') {
                    var rejectionCode = data.rejectionCode;
                    $("#cashout-success-"+betId).hide();
                    //Show the button if we get this error message.
                    $("#cashout-"+betId).show();
                    $("#cashout-fail-"+betId+" p").text(rejectionCode);
                    $("#cashout-fail-"+betId).show();
                }
                else {
                    $("#cashout-success-"+betId).hide();
                    $("#cashout-fail-"+betId).show();
                }
	        }
        },

        renderTemplate: function() {
            this.$el.html(this.template(
                {   bets: this.betConfirmations,
                    currencySymbol: this.pm.getCurrencySymbol(),
                    priceFormat: App.globals.priceFormat
                }
            ));
        },

        onOpenBets: function(bets) {
            this.betConfirmations = bets;
            this.renderTemplate();
            this.pm.changeCurrencySymbol();
        },

        onShow: function() {
            this.$el.html(this.template({bets: this.betConfirmations,currencySymbol:this.pm.getCurrencySymbol()}));
        }


    });
});