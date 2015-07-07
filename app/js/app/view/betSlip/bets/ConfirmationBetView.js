define([
    'marionette','trading/core/ctx',
    'text!app/view/bets/ConfirmationBetView.tpl.html',
    //'jquery.barcode'
],
        function (Marionette, ctx, tpl) {
            return Marionette.View.extend({
                dependencies: 'betsModel, betSlipPM, sessionModel',

                template: _.translateTemplate(tpl),
                className: "betslip-inner", 
                betConfirmations: [],
                confirmationHasOverAsk:false,

                events: {
		            'click #confirmation-reset' : 'confirmationReset'
                },
                /**
                 * @param options
                 */
                ready: function () {
                    this.pm = this.betSlipPM;
                    this.betsModel.on("bets:addConfirmations", this.addBetConfirmations, this);
                    this.betConfirmations.betParts = [];
                },
                
                addBetConfirmations: function (bets) {
                    this.betConfirmations = bets;
                    this.confirmationHasOverAsk = false;

                    for (var i=0;i<bets.length;i++) {
                        var betObj = bets[i];
                        if (betObj.status == 'OVER_ASK') {
                            this.confirmationHasOverAsk = true;
                        }
                    }
                    this.onShow();
                },


                onShow: _.debounce(function () {
                    if (this.betConfirmations.length > 0) {
                        this.$el.html(this.template(
                        {
                            hasOverAsk:this.confirmationHasOverAsk,
                            bets: this.betConfirmations,
                            priceFormat: App.globals.priceFormat,
                            currencySymbol: ctx.get('sessionModel').getCurrencySymbol()
                        }
                        ));
                    }
                    this.generateBarcode();
                }, 500),
                
                confirmationReset: function(e) {
			        e.preventDefault();
			        this.betsModel.clearAllBets();
		        },
		        
		         generateBarcode: function(){
                	if(this.betConfirmations[0] !== undefined){
	                	$("#printBarcode").barcode(this.betConfirmations[0].betSlipId, "code93",{barWidth:1, barHeight:30});
					}
                }


            });
        });