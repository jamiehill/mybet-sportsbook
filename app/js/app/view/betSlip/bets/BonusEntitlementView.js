define([
        'marionette','trading/core/ctx',
        'text!app/view/bets/BonusEntitlementView.tpl.html'
    ],
    function (Marionette, ctx, tpl) {
        return Marionette.View.extend({
            dependencies: 'betsModel, betSlipPM, bonusEntitlementModel',

            template: _.translateTemplate(tpl),
            entitlements:[],

            events: {
            },

            ready: function () {
                this.bonusEntitlementModel.on('change:entitlements', this.onBonusEntitlementChange,this);
            },

            onBonusEntitlementChange: function (event) {
                this.entitlements = event.attributes.entitlements;
                this.onShow();
            },

            onShow: function() {
                var args = {
                    entitlements: this.entitlements
                };
                this.$el.html(this.template(args));
            }


        });
    });
