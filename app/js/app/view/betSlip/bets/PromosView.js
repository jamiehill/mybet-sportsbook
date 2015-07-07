define([
        'marionette',
        'text!app/view/bets/PromosView.tpl.html'
    ],
    function(Marionette, tpl) {
        return Marionette.View.extend({

            dependencies: 'vent',
            template: _.translateTemplate(tpl , {}),

            /**
             *
             */
            ready: function() {
                _.bindAll(this, 'onShow');
                this.listenTo(this.vent, 'globals:localeChange', this.onShow);
            },


            /**
             *
             */
            onShow: function() {
            }

        });
    });