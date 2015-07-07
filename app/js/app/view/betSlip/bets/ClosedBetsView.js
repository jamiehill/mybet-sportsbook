define([
    'marionette',
    'text!app/view/bets/ClosedBetsView.tpl.html'
],
function(Marionette,tpl) {
    return Marionette.View.extend({


        dependencies: 'betsModel, betSlipPM',
        template: _.translateTemplate(tpl),
        className: "betslip-inner", 
        closedBets:[],

        /**
         * @param options
         */
        ready: function() {
            this.pm = this.betSlipPM;
            this.betsModel.on("bets:closedBetsViewDataComplete", this.onClosedBets, this);
        },

        onClosedBets: function(bets) {
            this.closedBets = bets;
            this.$el.html(this.template({bets: bets,currencySymbol:this.pm.getCurrencySymbol()}));
            this.pm.changeCurrencySymbol();
        },

        onShow: function() {
            this.$el.html(this.template({bets: this.closedBets,currencySymbol:this.pm.getCurrencySymbol()}));
        }


    });
});