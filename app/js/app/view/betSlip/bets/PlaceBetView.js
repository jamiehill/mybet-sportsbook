/**
 * Created by ianrotherham on 25/02/2015.
 */
define([
        'marionette',
        'text!app/view/bets/PlaceBetView.tpl.html'
    ],
    function(Marionette,tpl) {
        return Marionette.View.extend({


            dependencies: 'betSlipPM, vent',
            template: _.translateTemplate(tpl),

            events: {
                'click #place-bet-button': 'onPlacebetClick'
            },

            /**
             * @param options
             */
            ready: function() {
                _.bindAll(this, 'onLocaleChange', 'onPlacebetClick');
                this.pm = this.betSlipPM;
                this.pm.on("onSessionLogin", this.onSessionLogin, this);
                this.pm.on("onSessionLogout", this.onSessionLogout, this);
                this.vent.on('globals:localeChange', this.onLocaleChange, this);
            },

            onPlacebetClick : function(event) {
                this.pm.onPlaceBetClick();
            },

            /**
             *
             */
            onShow: function() {

                this.$el.html(this.template({
                    currencySymbol:this.pm.getCurrencySymbol(),
                    format: App.globals.priceFormat
                }));

                var betButtonText = App.translator.translate(this.pm.getBetButtonText());
                this.setButtonText(betButtonText);
            },


            /**
             * @param text
             */
            setButtonText: function(text) {
                $("#place-bet-button").val(text);
                this.delegateEvents();
            },


            onLocaleChange: function(locale) {
                var buttonText = App.translator.translate(this.pm.getBetButtonText());
                this.setButtonText(buttonText);
            },

            onSessionLogin: function() {
                this.pm.setBetButtonText("PLACE_BET");
                var buttonText = App.translator.translate("PLACE_BET");
                this.setButtonText(buttonText);
            },

            onSessionLogout: function() {
                this.pm.setBetButtonText("SIGN_IN_AND_PLACE_BET");
                var buttonText = App.translator.translate("SIGN_IN_AND_PLACE_BET");
                this.setButtonText(buttonText);
            }

        });
    });