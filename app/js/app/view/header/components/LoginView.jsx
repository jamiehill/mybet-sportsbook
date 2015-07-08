import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import appRouter from '../../../AppRouter';
import login from 'core/command/Login';
import {validString} from 'core/utils/Validator';

export default class LoginView extends Component {
	constructor() {
		super();
		_.bindAll(this, 'onLoginSuccess', 'onLoginFailure');
		// initial states
		this.state = {
			submitted: false,
			emailValid: true,
			passValid: true,
			showPass: false,
			emailState: '',
			passState: '',
			errorState: 'none',
			errorMsg: 'Oops! There is 1 piece of information to correct.'
		}
	}

	/**
	 * Validate the changed values
	 * @param e
	 */
	onChange(e) {
		var emailValid = validString(this.email.value, 5),
			passValid  = validString(this.pass.value, 5);
		this.setState({
			emailValid: emailValid,
			passValid: 	passValid,
			showPass: 	this.showPass.checked,
			emailState: !this.state.submitted || emailValid ? '' : 'error',
			passState: 	!this.state.submitted || passValid ? '' : 'error'
		});
	}

	/**
	 * Submit the details
	 */
	onSubmit() {
		this.setState({submitted: true});
		if (this.state.emailValid && this.state.passValid) {
			login('test1', 'test1')
				.then(this.onLoginSuccess)
				.catch(this.onLoginFailure);
		}
	}

	/**
	 * On success, navigate to previous route
	 */
	onLoginSuccess() {
		var previous = appRouter.getPrevious();
		App.navigate(previous.fragment);
	}

	/**
	 * On failure display the error
	 */
	onLoginFailure() {
		var error = (arguments.length && _.has(arguments[0], 'Error')) ?
			arguments[0].Error.value : 'Oops! There was an issue logging in!';
		if (this.isMounted())
			this.setState({errorState: 'block', errorMsg: _.humanize(error)});
	}

	/**
	 * Equivalent to onRender
	 */
	componentDidMount(){
		React.findDOMNode(this.refs.emailInput).focus();
		this.email = React.findDOMNode(this.refs.emailInput);
		this.pass  = React.findDOMNode(this.refs.passwordInput);
		this.showPass = React.findDOMNode(this.refs.showPassword);
		this.submitError = React.findDOMNode(this.refs.submitError);
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
									<form onSubmit={this.onSubmit.bind(this)}>

										<div className={`form-section ${this.state.emailState}`}>
											<div className="label-col">
												<label>Email Address</label>
											</div>
											<div className="form-col">
												<input ref="emailInput"  type="email" placeholder="Enter email address" onChange={this.onChange.bind(this)}/>
												<i className="input-icon entypo-mail"></i>
											</div>
											<div className="tooltip" style={{display: this.state.emailState == '' ? 'none' : 'block'}}>
												<p>Enter a valid email</p>
											</div>
										</div>

										<div className={`form-section ${this.state.passState}`}>
											<div className="label-col">
												<label>Password</label>
											</div>
											<div className="form-col">
												<div className="row">
													<input ref="passwordInput" type={this.state.showPass ? 'text' : 'password'} placeholder="Enter password" onChange={this.onChange.bind(this)}/>
													<i className="input-icon entypo-lock"></i>
												</div>
												<div className="tooltip" style={{display: this.state.passState == '' ? 'none' : 'block'}}>
													<p>Enter a valid password</p>
												</div>
												<div className="row connected">
													<input ref="showPassword" type="checkbox" name="show-password" value={this.state.showPass} onChange={this.onChange.bind(this)}/>
													<label className="right check-label">Show Password</label>
												</div>
											</div>
										</div>

										<div className="form-section">
											<div className="label-col">
											</div>
											<div className="form-col">
												<div className="error-info" style={{display: this.state.errorState}}>
													<p ref="submitError">{this.state.errorMsg}</p>
												</div>
												<a className="btn solid blue" type="submit" onClick={this.onSubmit.bind(this)}>Login</a>
											</div>
										</div>

									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};
