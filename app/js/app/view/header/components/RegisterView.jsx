import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class LoginView extends Component {
	constructor() {
		super();
	}

	/**
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="container-wrapper header-space">
				<div id="register-page">
					<div className="container narrow-center">
						<div className="row top-bar">
							<div className="inline-element">
								<h2 className="title">Register</h2>
							</div>
						</div>
						<div className="row">
							<div className="cell">
								<div className="form-wrapper">
									<div className="row vertical-number-steps">
										<div className="vertical-number-step">
											<span className="number-step-indicator">1</span>
											<h3><a href="register.html">Your Profile</a></h3>
											<div className="form-section">
												<div className="label-col">
													<label>Username </label>
												</div>
												<div className="form-col">
													<input type="text"/><i className="input-icon entypo-user"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Tel No.</label>
												</div>
												<div className="form-col">
													<input type="text"/><i className="input-icon entypo-phone"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Email Address</label>
												</div>
												<div className="form-col">
													<input type="email"/><i className="input-icon entypo-mail"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Password</label>
												</div>
												<div className="form-col">
													<div className="row"><input type="password"/><i className="input-icon entypo-lock"></i></div>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Confirm Password</label>
												</div>
												<div className="form-col">
													<div className="row"><input type="password"/><i className="input-icon entypo-check"></i></div>

												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
												</div>
												<div className="form-col">
													<a href="register-error.html" className="btn solid blue">Next step</a>
												</div>
											</div>



										</div>
									</div>
									<div className="row vertical-number-steps collapse">
										<div className="vertical-number-step ">
											<span className="number-step-indicator">2</span>
											<h3><a href="register_personal-data.html">Personal Data</a></h3>

											<div className="form-section">
												<div className="label-col">
													<label>Currency</label>
												</div>
												<div className="form-col">
													<select>
														<option>Euro</option>
														<option>GBP</option>
														<option>USD</option>
													</select>
												</div>
											</div>

										</div>
										<a href="" className="btn outline float-right">Next</a>
									</div>
									<div className="row vertical-number-steps collapse">
										<div className="vertical-number-step">
											<span className="number-step-indicator">3</span>
											<h3><a href="register_deposit.html">Deposit</a></h3>
											<div className="form-section">
												<div className="label-col">
													<label>Username</label>
												</div>
												<div className="form-col">
													<input type="text"/><i className="input-icon entypo-user"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Tel No.</label>
												</div>
												<div className="form-col">
													<input type="text"/><i className="input-icon entypo-phone"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Email Address</label>
												</div>
												<div className="form-col">
													<input type="email"/><i className="input-icon entypo-mail"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Password</label>
												</div>
												<div className="form-col">
													<div className="row"><input type="password"/><i className="input-icon entypo-lock"></i></div>
													<div className="row connected"><input type="checkbox" name="show-password" value="Bike"/><label className="right check-label">Show Password</label></div>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Confirm Password</label>
												</div>
												<div className="form-col">
													<div className="row"><input type="password"/><i className="input-icon entypo-check"></i></div>
													<div className="row connected"><input type="checkbox" name="show-password" value="Bike"/><label className="right check-label">Show Password</label></div>

												</div>
											</div>

										</div>
									</div>
									<div className="row vertical-number-steps collapse">
										<div className="vertical-number-step">
											<span className="number-step-indicator">4</span>
											<h3><a href="register_confirm.html">Confirm</a></h3>
											<div className="form-section">
												<div className="label-col">
													<label>Username</label>
												</div>
												<div className="form-col">
													<input type="text" placeholder="Choose a username"/><i className="input-icon entypo-user"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Tel No.</label>
												</div>
												<div className="form-col">
													<input type="text" placeholder="Choose a username"/><i className="input-icon entypo-phone"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Email Address</label>
												</div>
												<div className="form-col">
													<input type="email" placeholder="Enter email address"/><i className="input-icon entypo-mail"></i>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Password</label>
												</div>
												<div className="form-col">
													<div className="row"><input type="password" placeholder="Enter password"/><i className="input-icon entypo-lock"></i></div>
													<div className="row connected"><input type="checkbox" name="show-password" value="Bike"/><label className="right check-label">Show Password</label></div>
												</div>
											</div>
											<div className="form-section">
												<div className="label-col">
													<label>Confirm Password</label>
												</div>
												<div className="form-col">
													<div className="row"><input type="password" placeholder="Enter password"/><i className="input-icon entypo-check"></i></div>
													<div className="row connected"><input type="checkbox" name="show-password" value="Bike"/><label className="right check-label">Show Password</label></div>

												</div>
											</div>

										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
