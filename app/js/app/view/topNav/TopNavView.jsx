import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import service from 'core/service/ApiService';

export default class TopNavView extends Component {
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
		this.setState({loggedIn: App.session.request('loggedIn')});
	}

	/**
	 * @param route
	 */
	onNavigate(route) {
		App.navigate(route);
	}

	/**
	 *
	 */
	onLogout() {
		App.session.execute('clearSession');
		service.logout();
	}

	/**
	 * @returns {XML}
	 */
	render() {
		var options = this.renderOptions();
		return (
			<div className="container">
				<a href="" className="logo">myBet</a>
				<div id="top-nav">
					<ul>
						<li><a href="javascript:void 0">Sports Bets</a></li>
						<li><a href="javascript:void 0">Casino</a></li>
						<li><a href="javascript:void 0">Live Casino</a></li>
						<li><a href="javascript:void 0">Poker</a></li>
						<li><a href="javascript:void 0">Games</a></li>
					</ul>
				</div>
				<div id="top-account-nav">
					<ul>
						{options}
					</ul>
				</div>
			</div>
		)
	}

	/**
	 * Returns the session options depending on current session state
	 * @returns {XML[]}
	 */
	renderOptions() {
		var options = [<li><a href="javascript:void 0">English</a></li>];
		if (this.state.loggedIn)
			options.unshift(<li><a onClick={this.onLogout.bind(this)}>Log out</a></li>);
		else {
			options.unshift(<li><a onClick={this.onNavigate.bind(this, 'register')}>Register</a></li>);
			options.unshift(<li><a onClick={this.onNavigate.bind(this, 'login')}>Log In</a></li>);
		}
		return options;
	}
};
