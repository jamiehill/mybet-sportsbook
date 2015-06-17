import Store from './Store';


export default Backbone.Model.extend({

	Store: null,
	defaults: {
		name: '-',
		accountId: '-',
		username: '',
		password: '-',
		sessionToken: '-',
		lastLoginTime: 0,
		maxLoginIdleTimeInMinutes: 60,
		enabledProducts: 'SPBOK,LOTTO',
		accountBalance: {
			amount: '0',
			currency: 'GBP',
			activeFundsType: 'CASH',
			wallets: []
		}
	},

	/**
	 *
	 */
	initialize: function() {
		// if this is the embedded src, use localStorage
		var store = 'sessionStorage';

		// In some environment (like Android webviews) localStorage is not available
		// In that case, use cookies
		if (store === 'localStorage' && !localStorage){
			store = 'cookie';
		}

		console.log('Persistence :: '+store);
		this.Store = new Store({persistence: store, name: 'session'});
		this.recoverSession();
	},

	/**
	 * @param key
	 * @param val
	 * @param options
	 */
	set: function(key, val, options) {
		Backbone.Model.prototype.set.apply(this, arguments);
		if(val) {
			// update storage with new data from this model
			if (this.Store && !val.silent) {
				this.Store.set(this);
			}
		}
	},

	/**
	 * @returns {*}
	 */
	toJSON: function() {
		var data = _.clone(this.attributes);
		delete data.accountBalance.accountId;
		return data;
	},


	/**
	 * @returns {boolean}
	 */
	isLoggedIn: function() {
		return this.Store.check();
	},

	isNotLoggedIn: function() {
		return !this.isLoggedIn();
	},


	/**
	 * @param lgn
	 * @param persist
	 */
	storeSession: function(lgn, silent){
		this.set(lgn, {silent: !!silent});
		App.vent.trigger('session:loggedin', lgn);
	},


	/**
	 * @param cookieSession
	 */
	storeSessionFromCookie: function(cookieSession){
		this.set(JSON.parse(cookieSession));
	},


	/**
	 * @returns {*}
	 */
	getSession: function() {
		return this.Store.get();
	},


	/**
	 *
	 */
	clearSession: function(){
		this.Store.clear();
		App.vent.trigger('session:loggedout');
	},


	/**
	 * Recovers any session data from the sessionStorage
	 * to automatically log the user back in
	 */
	recoverSession: function(){
		var localSession = this.Store.get();
		if (localSession == null) {
			console.log('RecoveredSession :: NonePresent');
			this.clearSession();
		}

		else {

			console.log('RecoveredSession :: '+JSON.stringify(localSession));
			this.storeSession(JSON.parse(localSession), true);
		}
	},


	// property methods


	/**
	 * @returns {*}
	 */
	getCurrency: function(){
		return this.get('accountBalance').currency;
	},


	/**
	 * @returns {*}
	 */
	getCurrencySymbol: function() {
		if (this.isLoggedIn()) {
			return App.Translator.translateCurrency(this.getCurrency());
		}
		else {
			var localeCurrency = App.Translator.translate("CURRENCY_NAME");
			return App.Translator.translateCurrency(localeCurrency)
		}
	},


	/**
	 * @param balance
	 */
	resetAccountBalance: function(balance){
		this.set('accountBalance', balance);
	},


	/**
	 * @returns {*}
	 */
	getBalance: function(fundType){
		if (!fundType) {
			return parseFloat(this.get('accountBalance').amount).toFixed(2);
		}

		var bal = 0;
		_.each(this.get('accountBalance').wallets, function(wallet){
			if (wallet.fundType == fundType) {
				bal += parseFloat(wallet.balance);
			}
		}, this);

		return bal.toFixed(2);
	},


	/**
	 * @returns {boolean}
	 */
	isAgent: function() {
		return this.get('accountBalance').activeFundsType == 'CREDIT'
			|| this.get('accountBalance').activeFundsType == 'AGENT_CASH';
	},


	/**
	 * @returns {boolean}
	 */
	isSportsbookEnabled: function() {
		return this.get('enabledProducts').indexOf('SPBOK') > -1;
	},


	/**
	 * @returns {boolean}
	 */
	isLotteryEnabled: function() {
		return this.get('enabledProducts').indexOf('LOTTO') > -1;
	},



	/**
	 * @param bln
	 */
	setBalance: function(balance){
		if (!this.isLoggedIn()) return;
		this.set('accountBalance', balance);
	},


	/**
	 * @returns {*}
	 */
	getUsername: function(){
		return this.get('username');
	},

	/**
	 * @returns {*}
	 */
	getName: function(){
		return this.get('name');
	},

	/**
	 * @returns {*}
	 */
	getSessionToken: function(){
		return this.get('sessionToken');
	},


	/**
	 * @returns {*}
	 */
	getAccountId: function(){
		return this.get('accountId');
	},


	/**
	 * @returns {string|.defaults.accountBalance.activeFundsType}
	 */
	getActiveFundsType: function() {
		return this.get('accountBalance').activeFundsType;
	},


	/**
	 * @returns {number}
	 */
	getMaxIdleTime: function() {
		return this.get('maxLoginIdleTimeInMinutes') * 60 * 1000;
	},


	/**
	 * @returns {*}
	 */
	getLastLoginTime: function() {
		return this.get('lastLoginTime');
	}

});
