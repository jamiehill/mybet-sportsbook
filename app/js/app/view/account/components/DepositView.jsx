import React from 'react';
import Component from 'core/system/react/BackboneComponent';
import appRouter from '../../../AppRouter';

export default class DepositView extends Component {
	constructor() {
		super();
	}

	/**
	 * Goto the previously opened route
	 */
	onClose() {
		App.navigatePrevious();
	}


	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		return (
			<div id="deposit-page" className="open" style={{height: '668px'}}>
				<div className="container">
					<div className="row top-bar">
						<div className="cell cell-3 flatten">
							<div className="inline-element">
								<h2 className="title">Deposit</h2>
							</div>
						</div>
						<div className="cell cell-2 flatten account-page-controls">
							<div className="inline-element right-float">
								<a className="btn small outline" href="">Reset</a>
								<a className="btn small outline close-accounts" onClick={this.onClose.bind(this)}>Close</a>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="cell cell-4 flatten">
							<ul className="step-nav">
								<li className="inline-element active"><a href="">Select amount<i className="entypo-right-open"></i></a></li>
								<li className="inline-element"><a href="">Payment<i className="entypo-right-open"></i></a></li>
								<li className="inline-element"><a href="">Confirm</a></li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="cell cell-3">

							<div className="deposit-box inner-cell">
								<div className="row align-top">
									<div className="cell cell-4 flatten">
										<div className="inline-element">
											<h3>Select your desired amount:</h3>
											<div className="inline-element lozenge active">
												20$
											</div>
											<div className="inline-element lozenge">
												50$
											</div>
											<div className="inline-element lozenge">
												100$
											</div>
											<div className="inline-element lozenge">
												200$
											</div>
											<div className="inline-element deposit-choice">
												<form className="form-wrapper">
													<div className="form-section">
														<div className="label-col">
															<label className="right">Or enter amount</label>
														</div>
														<div className="form-col">
															<input className="short dark" type="number" placeholder="in E" required=""/>
															</div>

														</div>
													</form>
												</div>

											</div>
										</div>
									</div>
									<div className="row info">
										<div className="cell cell-4 flatten">
											<div className="inline-element">
												<div className="deposit-actions">
													<h5>Your new credit would be calculated as follows:</h5>
													<div className="calc">
														<span>Account <span className="price">19$</span></span>
														<span className="operator">+</span>
														<span>Deposit <span className="price">20$</span></span>
														<span className="operator">=</span>
														<span>Credit <span className="price">39$</span></span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="cell cell-4 flatten">
											<a className="btn solid blue">Continue</a>
										</div>
									</div>
								</div>
							</div>
							<div className="cell cell-2">
								<div className="inner-cell">
									<ul className="account-inner-nav">
										<li className="active">
											<a>Deposit</a>
										</li>
										<li>
											<a>My Cockpit</a>
										</li>
										<li>
											<a>My Bets</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
};
















