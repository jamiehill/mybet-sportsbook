define([
        'marionette',
        'text!app/view/bets/RejectedBetView.tpl.html'
    ],
    function(Marionette,tpl) {
        return Marionette.View.extend({


            dependencies: 'betsModel, betSlipPM',
            className: "betslip-inner", 
            template: _.translateTemplate(tpl),
            betRejections:[],
            reasonCode:'',
            status:'',

            /**
             * @param options
             */
            ready: function() {
                this.pm = this.betSlipPM;
                this.pm.on("bets:removeSuspendedRejectionInfo", this.onRemoveSuspendedRejection, this);
                this.betsModel.on("bets:addRejections", this.addBetRejections, this);
            },

            onRemoveSuspendedRejection: function() {
                if (this.status == 'UNAVAILABLE_SELECTION' || this.status == 'LIVE_SUSPENSION') {
                    $("#rejected-bet-info").hide();
                }
            },

            addBetRejections: function(rejectedBetsObj) {
                if (!_.isUndefined(rejectedBetsObj)) {
                    this.betRejections = rejectedBetsObj.bets;
                    this.reasonCode = rejectedBetsObj.reasonCode;
                    this.status = rejectedBetsObj.status;
                    this.onShow();
                }
            },

            onShow: function() {
                var args = {
                    bets: this.betRejections,
                    reasonCode:this.reasonCode
                };

                this.$el.html(this.template(args));
            }


        });
    });