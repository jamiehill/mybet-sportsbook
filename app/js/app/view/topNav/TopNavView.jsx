import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class TopNavView extends Component {
	constructor() {
		super();
	}

	/**
	 * @param route
	 */
	navigate(route) {
		App.navigate(route);
	}

	/**
	 * @returns {XML}
	 */
	render() {
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
						<li><a onClick={this.navigate.bind(this, 'login')}>Log In</a></li>
						<li><a onClick={this.navigate.bind(this, 'register')}>Register</a></li>
						<li><a href="javascript:void 0">English</a></li>
					</ul>
				</div>
			</div>
		)
	}
};
