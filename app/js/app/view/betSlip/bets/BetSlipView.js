define(['marionette',
        'text!app/view/bets/BetSlipView.tpl.html', 'jquery.nicescroll'
    ],
    function (Marionette, tpl, niceScroll) {

        return Marionette.LayoutView.extend({
            template: _.translateTemplate(tpl),
            dependencies: 'betsModel, pm=betSlipPM, bonusEntitlementModel, sessionModel, vent',
            defaultBetSlipInView: false,
            betSlipTop: 0,

            events: {
                'click .tab-bar-betslip #tab-nav-mybets': 'onOpenBetsClick',
                'click .tab-bar-betslip #tab-nav-betslip': 'onDefaultBetsClick',
                'click .tab-bar-betslip #tab-nav-combi-betslip': 'onCombiBetsClick',
                'click .tab-bar-betslip #tab-nav-system-betslip': 'onSystemBetsClick',
                'click #closeStickyList': 'closeBetslip',
                'click .mobile-close': 'closeBetslip',
                'click .btn-deposit': 'depositFunds',
                'click .deposit-button': 'depositFunds'
            },

            regions: {
                "bonusRegion": "#bets-bonus",
                "singlesRegion": "#bets-singles",
                //"multiplesRegion": "#bets-multiples",
                "systemRegion": "#bets-system",
                "combiRegion": "#bets-combi",
                "actionRegion": "#bets-action",
                "confirmationRegion": "#bets-confirmation",
                "rejectionRegion" :"#bets-rejection",
                "openBetsRegion": "#bets-open",
                "promosRegion":"#betslip-promos",
                "placeBetsRegion":"#bets-place-bets",
                "betStakeRegion":"#bets-enter-stake"

            },

            ready: function () {
                _.bindAll(this, 'onShowDefaultBetSlip','onBonusEntitlementChange');
                this.betsModel.on("bets:showConfirmationView", this.onShowConfirmationView, this);
                this.betsModel.on("bets:showRejectionView", this.onShowRejectionBetSlip, this);
                this.betsModel.on("bets:showConfirmRejectionView", this.onShowConfirmRejectionBetSlip, this);
                this.betsModel.on("bets:showDefaultBetView", this.onShowDefaultBetSlip, this);

                this.pm.on("onSessionLogin", this.onSessionLogin, this);
                this.pm.on("onSessionLogout", this.onSessionLogout, this);
                this.betsModel.on("bets:removeSingleBet", this.removeSingleBet, this);
                this.betsModel.on("bets:clearSingleBets", this.clearSingleBets, this);
                this.betsModel.on("bets:addSingleBet", this.addSingleBet, this);
                this.bonusEntitlementModel.on('change:entitlements', this.onBonusEntitlementChange);

            },

            closeBetslip: function() {
                $('#content-side-panel-2, .betslipToggle').toggleClass('show');
                $('body').removeClass('fixed');
            },


            addSingleBet :  function(bet) {

                var betsCount = this.betsModel.singleBetCount;

                $('#betCount').html(betsCount);
                if (betsCount > 0) {
                    $('#betCount').removeClass('zero');
                    this.actionRegion.$el.show();
                    this.placeBetsRegion.$el.show();
                    $('.betslip-promo-content').css({'display':'none'});
                }
                this.highlightTab(betsCount);


                if(window.innerWidth > 1024){
                    var existingScroll = $('#content-side-panel-2 > div').getNiceScroll(0);
                    setTimeout(function() {
                        if(existingScroll) {
                            // existingScroll.doScrollTop($('#bet-slip').height() + 300, 10);
                        }
                        $('#single-bet-li-bet-'+bet.betPart.selection.selectionId+' .stakeBox input').focus();
                    }, 100);
                }
                if (this.defaultBetSlipInView == false) {
                    this.showDefaultBetSlip();
                }
            },

            removeSingleBet: function() {
                var betsCount = parseInt(this.pm.singles.length)-1;
                $('#betCount').html(betsCount);

                if (betsCount == 0) {
                    $('#betCount').addClass('zero');
                    this.actionRegion.$el.hide();
                    this.placeBetsRegion.$el.hide();
                    $('.betslip-promo-content').css({'display':'block'});
                }

                if (this.defaultBetSlipInView == false) {
                    this.showDefaultBetSlip();
                }

                this.highlightTab(betsCount);
            },

            clearSingleBets: function() {
                $('#betCount').html(0);
                $('#betCount').addClass('zero');
                this.actionRegion.$el.hide();
                this.placeBetsRegion.$el.hide();
                $('.betslip-promo-content').css({'display':'block'});
                this.showDefaultBetSlip();
            },

            onBonusEntitlementChange: function(event) {
                var entitlements = event.attributes.entitlements;
                var isEntitlementValid = event.isBonusAvailable();
                if (this.defaultBetSlipInView == true) {
                    this.hideShowBonusRegion();
                }
            },

            onSessionLogin: function () {
                $('#tab-nav-mybets').show();
            },

            onSessionLogout: function () {
                $('#tab-nav-mybets').hide();
                this.showDefaultBetSlip();
            },

            onOpenBetsClick: function (e) {
                if ( this.sessionModel.isLoggedIn() ) {
                    this.onShowOpenBetsView();
                    this.pm.getOpenBetsClick();
                }
            },

            onSystemBetsClick: function(e) {
                this.selectTab('#tab-nav-system-betslip');
                this.betStakeRegion.$el.show();
                this.combiRegion.$el.hide();
                this.singlesRegion.$el.hide();
                this.systemRegion.$el.show();
                this.betsModel.calculateSystemBets();
            },

            onCombiBetsClick: function (e) {
                this.selectTab('#tab-nav-combi-betslip');
                this.betStakeRegion.$el.hide();
                this.combiRegion.$el.show();
                this.systemRegion.$el.hide();
                this.singlesRegion.$el.hide();
                this.betsModel.calculateSystemBets();
            },

            onDefaultBetsClick: function (e) {
                this.showDefaultBetSlip();
            },

            onShowDefaultBetSlip: function () {
                if (this.defaultBetSlipInView == false) {
                    this.showDefaultBetSlip();
                }
            },

            onShowConfirmRejectionBetSlip: function() {
                this.bonusRegion.$el.hide();
                this.singlesRegion.$el.show();
                this.openBetsRegion.$el.hide();
                //this.multiplesRegion.$el.show();
                this.actionRegion.$el.show();
                this.placeBetsRegion.$el.show();
                this.confirmationRegion.$el.show();
                this.rejectionRegion.$el.show();

                this.betStakeRegion.$el.hide();
                this.combiRegion.$el.hide();
                this.systemRegion.$el.hide();

                this.defaultBetSlipInView = false;
            },

            onShowRejectionBetSlip: function() {
                this.bonusRegion.$el.hide();
                this.singlesRegion.$el.hide();
                this.openBetsRegion.$el.hide();
                //this.multiplesRegion.$el.show();
                this.actionRegion.$el.show();
                this.placeBetsRegion.$el.show();
                this.confirmationRegion.$el.hide();
                this.rejectionRegion.$el.show();

                this.betStakeRegion.$el.hide();
                this.combiRegion.$el.hide();
                this.systemRegion.$el.hide();

                this.defaultBetSlipInView = false;
            },

            onShowConfirmationView: function () {
                this.bonusRegion.$el.hide();
                this.singlesRegion.$el.hide();
                this.openBetsRegion.$el.hide();
                //this.multiplesRegion.$el.hide();
                this.actionRegion.$el.hide();
                this.placeBetsRegion.$el.hide();
                this.rejectionRegion.$el.hide();
                this.confirmationRegion.$el.show();
                this.defaultBetSlipInView = false;

                this.betStakeRegion.$el.hide();
                this.combiRegion.$el.hide();
                this.systemRegion.$el.hide();

                // reset bet selection indicator
                var betsCount = this.betsModel.singleBetCount;
                this.highlightTab(betsCount);
            },

            onShowOpenBetsView: function () {
                this.bonusRegion.$el.hide();
                this.singlesRegion.$el.hide();
                //this.multiplesRegion.$el.hide();
                this.confirmationRegion.$el.hide();
                this.actionRegion.$el.hide();
                this.placeBetsRegion.$el.hide();
                this.rejectionRegion.$el.hide();
                this.openBetsRegion.$el.show();

                this.betStakeRegion.$el.hide();
                this.combiRegion.$el.hide();
                this.systemRegion.$el.hide();

                this.defaultBetSlipInView = false;
                this.selectTab('#tab-nav-mybets');
                $('#tab-nav-open').parent().addClass('active');
            },


            hideShowBonusRegion: function() {
                if ( this.bonusEntitlementModel.isBonusAvailable() && this.sessionModel.isLoggedIn() ) {
                    this.bonusRegion.$el.show();
                }
                else {
                    this.bonusRegion.$el.hide();
                }
            },

            showDefaultBetSlip: function () {
                this.hideShowBonusRegion();
                this.singlesRegion.$el.show();
                //this.multiplesRegion.$el.show();
                this.betStakeRegion.$el.hide();
                this.systemRegion.$el.hide();
                this.combiRegion.$el.hide();
                this.openBetsRegion.$el.hide();
                this.confirmationRegion.$el.hide();
                this.rejectionRegion.$el.hide();
                this.actionRegion.$el.show();
                this.placeBetsRegion.$el.show();
                this.defaultBetSlipInView = true;
                this.selectTab('#tab-nav-betslip');
                $('#tab-nav-singles').parent().addClass('active');
                $('.tab-bar-betslip.second.mybets-tabs, #bet-slip .mybets-content').hide();
                $('.tab-bar-betslip.second.betslip-tabs, #bet-slip .betslip-content').show();

            },

            selectTab: function (tabEl) {
                $('.tab-bar-betslip li.active').removeClass('active');
                $(tabEl).parent().addClass('active');
            },

            translateTabBar: function () {
                $('#tab-nav-open').html(App.translator.translate("OPEN"));
                $('#tab-nav-closed').html(App.translator.translate("SETTLED"));
                $('#tab-nav-singles').html(App.translator.translate("BET_SLIP"));
            },
            /**
             *
             */


            slipTimeout: null,

            onShow: function () {

                this.translateTabBar();

                this.defaultBetSlipInView = true;

                this.bonusRegion.show(new BonusEntitlementView(), {forceShow: true});
                this.hideShowBonusRegion();

                this.singlesRegion.show(new SingleBetView(), {forceShow: true});
                this.singlesRegion.$el.show();

                this.systemRegion.show(new SystemBetView(), {forceShow: true});
                this.systemRegion.$el.hide();

                //this.multiplesRegion.show(new MultipleBetView'), {forceShow: true});
                //this.multiplesRegion.$el.hide();

                this.betStakeRegion.show(new BetStakeInputView(), {forceShow: true});
                this.betStakeRegion.$el.hide();

                this.combiRegion.show(new CombiBetView(), {forceShow: true});
                this.combiRegion.$el.hide();

                this.actionRegion.show(new ActionBetView(), {forceShow: true});
                this.actionRegion.$el.hide();

                this.placeBetsRegion.show(new PlaceBetView(), {forceShow: true});
                this.placeBetsRegion.$el.hide();

                this.openBetsRegion.show(new OpenBetsView(), {forceShow: true});
                this.openBetsRegion.$el.hide();

                this.confirmationRegion.show(new ConfirmationBetView(), {forceShow: true});
                this.confirmationRegion.$el.hide();

                this.rejectionRegion.show(new RejectionBetView(), {forceShow: true});
                this.rejectionRegion.$el.hide();

                this.promosRegion.show(new PromosView(), {forceShow: true});

                $('.tab-bar-betslip.second.mybets-tabs').hide();

                //Hide open closed bets if not logged in.
                if (!this.sessionModel.isLoggedIn()) {
                    $('#tab-nav-open').hide();
                    $('#tab-nav-mybets').hide();
                }

                var that = this;
                $(window).on('scroll', function() {
                    that.windowScroll();
                });

                $(window).on('resize', function() {
                    that.windowScroll();
                });
                $('#content-side-panel-2 > div').niceScroll();

            },

            windowScroll: function() {
                // keeps betslip off footer
                var fromTop = $(window).scrollTop();
                var headerHeight = $('.nav-global').outerHeight(true);

                if ($(window).width() < 1025) {
                    headerHeight = headerHeight+$('.nav-main').outerHeight(true);
                }

                if ($(window).width() > 1025 && fromTop > headerHeight) {
                    $('#content-side-panel-2').addClass('stick');
                } else {
                    $('#content-side-panel-2').removeClass('stick');
                }

            },


            timeout: null,

            highlightTab: function(count) {

                clearTimeout(this.timeout);

                $('.subnav-container .betslipToggle .add').remove();

                $('.subnav-container .betslipToggle').append('<div class="add">'+count+'</div>');
                $('.betslipToggle .add').fadeIn(300);

                if(count == 0){
                    this.timeout = setTimeout(function() {
                        var el = $('.betslipToggle .add');
                        el.fadeOut(300, function() {
                            el.remove();
                        });
                    }, 4000);
                }

            },

            // Trigger the event that allows the web cashier to open
            depositFunds: function(event){
                //var rejectedBets = this.betsModel && this.betsModel.rejectedBetsCollection;

                // The BetSlip is only considered free if all bets within it are free
                //IAN. Remove FREE BETS FROM HERE.
                //var isCompletelyFree = _.every( rejectedBets, 'isFreeBet' );
                //var openCashierParam = isCompletelyFree ? { deeplink: 'rmf' } : null;
                //this.vent.trigger('openWebCashier', openCashierParam);
                this.vent.trigger('openWebCashier',[]);
            }

        });
    });
