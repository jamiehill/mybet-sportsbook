import React from 'react';

export default class AccountView extends React.Component {
	constructor() {
		super();

		_.bindAll(this, 'onSessionChange');

		App.session.on('session:changed', this.onSessionChange);
		this.state = {loggedIn: App.session.request('loggedIn')}
	}

	/**
	 * Update state when session changes
	 */
	onSessionChange() {
		if (this.isMounted()) {
			this.setState({loggedIn: App.session.request('loggedIn')});
		}
	}

	/**
	 * Open desposit page
	 */
	onDeposit() {
		App.navigate('deposit');
	}

	/**
	 * @returns {XML}
	 */
	render() {
		if (!this.state.loggedIn) {
			return this.renderLoggedOut();
		}
		var session = App.session.request('session'),
			account = session.accountBalanace || {currency: 'GBP', amount: '256'};
		return (
			<div id="account-nav">
				<div className="container">
					<ul>
						<li><a>My Cockpit</a></li>
						<li><a id="openMyBetsPage">My Bets</a></li>
						<li><a id="openAccountMenu">{_.titleize(session.name)} <i className="entypo-down-open"></i></a></li>
						<li className="account-deposit-box"><a id="openDepositPage" onClick={this.onDeposit.bind(this)}> <span>{account.currency+account.amount}</span> Deposit <i className="entypo-down-open"></i></a></li>
					</ul>
				</div>
				<div id="content-container"></div>
			</div>
		)
	}

	/**
	 * @returns {XML}
	 */
	renderLoggedOut() {
		return (
			<div id="account-nav">
				<div className="container">
					<ul>
						<li className="account-deposit-box"><a id="openDepositPage">Search <i className="entypo-search"></i></a></li>
					</ul>
				</div>
				<div id="content-container"></div>
			</div>
		)
	}
};
