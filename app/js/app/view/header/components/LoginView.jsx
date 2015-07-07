import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import login from 'core/command/Login';

export default class LoginView extends Component {
	constructor() {
		super();
		this.state = {email: '', pass: ''}
	}


	onSubmit() {

		login('test1', 'test1');
	}


	onEmailChange(e) {
		this.setState({email: e.target.value});
	}


	onPassChange(e) {
		this.setState({pass: e.target.value});
	}


	/**
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="container-wrapper header-space">
				<div id="login-page">
					<div className="container narrow-center login">
						<div className="row top-bar">
							<div className="inline-element">
								<h2 className="title">Login</h2>
							</div>
						</div>
						<div className="row vertical-number-steps">
							<div className="cell">
								<div className="form-wrapper">
									<div className="form-section">
										<div className="label-col">
											<label>Email Address</label>
										</div>
										<div className="form-col">
											<input type="email" placeholder="Enter email address"/>
										</div>
									</div>
									<div className="form-section">
										<div className="label-col">
											<label>Password</label>
										</div>
										<div className="form-col">
											<div className="row">
												<input type="password" placeholder="Enter password"/>
											</div>
											<div className="row connected">
												<input type="checkbox" name="show-password" value="Bike"/>
												<label className="right check-label">Show Password</label>
											</div>
										</div>
									</div>
								</div>
								<a className="btn solid blue" onClick={this.onSubmit.bind(this)}>Login</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};
