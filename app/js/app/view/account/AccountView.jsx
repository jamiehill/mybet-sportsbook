import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class AccountView extends Component {
	constructor() {
		super();
	}


	/**
	 * @returns {XML}
	 */
	render() {
		return (
			<div id="account-nav">
				<div className="container">
					<ul>
						<li><a>My Cockpit</a></li>
						<li><a id="openMyBetsPage">My Bets</a></li>
						<li><a id="openAccountMenu">Max Usermann <i className="entypo-down-open"></i></a></li>
						<li className="account-deposit-box"><a id="openDepositPage"> <span>$210.00</span> Deposit <i className="entypo-down-open"></i></a></li>
					</ul>
				</div>
				<div id="content-container"></div>
			</div>
		)
	}
};
