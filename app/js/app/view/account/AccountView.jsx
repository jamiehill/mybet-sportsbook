import React from 'react';
import AccountHeader from './AccountHeader.jsx!';
import DepositView from './components/DepositView.jsx!';
import LoginView from './components/LoginView.jsx!';
import RegisterView from './components/RegisterView.jsx!';
import MyBetsView from './components/MyBetsView.jsx!';
import controller from '../../../app/AppRouter';
import {getComponent} from 'core/utils/Href';

export default class AccountView extends React.Component {
	constructor() {
		super();

		controller.register(this);
		this.state = {route: ''};

		_.bindAll(this, 'onRouteChange');
	}

	/**
	 * Handle route changes for this component
	 */
	onRouteChange() {
		this.setState({route: getComponent(0)});
	}

	/**
	 * @returns {XML}
	 */
	render() {
		switch(this.state.route) {
			case 'deposit':
				return this.renderDeposit();
				break;
			case 'login':
				return this.renderLogin();
				break;
			case 'register':
				return this.renderRegister();
				break;
			case 'mybets':
				return this.renderMyBets();
				break;
		}
		return this.renderHeader();
	}

	/**
	 * @returns {XML}
	 */
	renderHeader() {
		return <AccountHeader/>;
	}

	/**
	 * @returns {XML}
	 */
	renderDeposit() {
		return (
			<div>
				<AccountHeader/>
				<DepositView/>
			</div>
		)
	}

	/**
	 * @returns {XML}
	 */
	renderLogin() {
		return <LoginView/>;
	}

	/**
	 * @returns {XML}
	 */
	renderRegister() {
		return <RegisterView/>;
	}

	/**
	 * @returns {XML}
	 */
	renderMyBets() {
		return (
			<div>
				<AccountHeader/>
				<MyBetsView/>
			</div>
		)
	}
};
