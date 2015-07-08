import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class BetSlipView extends Component {
	constructor() {
		super();
	}


	/**
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="cell cell-5" id="betslip">
				<div className="inner-slip">

					<ul className="tabs">
						<li className="active">
							<a href="#tab-1">
								Active
							</a>
						</li>
						<li>
							<a href="#tab-2">
								Open
							</a>
						</li>
						<li>
							<a href="#tab-3">
								Settled
							</a>
						</li>
					</ul>

					<div className="tab-pane">
						<div id="tab-1" className="tab open">

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Middlesbrough vs Arsenal <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Middlesbrough to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Manchester United vs Chelsea <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 2.02</span>
										</li>
										<li className="sel-stake">
											<span className="left">Draw</span>
											<span className="right">£1.50</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Middlesbrough vs Arsenal <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Middlesbrough to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row">
								<div className="left">

									<ul>
										<li>
								         	<span className="small">
								         		My Account
								         	</span>
								         	<span className="large">
								         		£23.00
								         	</span>
										</li>
										<li>
								         	<span className="small">
								         		Active Bets Total
								         	</span>
								         	<span className="large">
								         		£20.00
								         	</span>
										</li>
										<li>
								         	<span className="small">
								         		Possible Winnings
								         	</span>
								         	<span className="large">
								         		£123.00
								         	</span>
										</li>
									</ul>

								</div>
								<div className="right">
									<div id="ct-chart-2" className="bet-chart"></div>
								</div>
							</div>

							<div className="row">

								<a href="#_" id="place-bet">Place Bet</a>

							</div>

						</div>
						<div id="tab-2" className="tab">

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Chelsea vs Tottenham <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Tottenham to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Chelsea vs Tottenham <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Tottenham to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Manchester United vs Chelsea <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 2.02</span>
										</li>
										<li className="sel-stake">
											<span className="left">Draw</span>
											<span className="right">£1.50</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Middlesbrough vs Arsenal <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Middlesbrough to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Manchester United vs Chelsea <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 2.02</span>
										</li>
										<li className="sel-stake">
											<span className="left">Draw</span>
											<span className="right">£1.50</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Middlesbrough vs Arsenal <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Middlesbrough to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>


						</div>
						<div id="tab-3" className="tab">
							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Chelsea vs Tottenham <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Tottenham to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>
							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Middlesbrough vs Arsenal <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Middlesbrough to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>

							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Middlesbrough vs Arsenal <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Middlesbrough to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>


							<div className="row bet-row">
								<div className="left">
									<i className="entypo-cancel"></i>
								</div>
								<div className="right">
									Chelsea vs Tottenham <br/>
									<ul>
										<li className="market-odds">
											<span className="left">Match Result</span>
											<span className="right">@ 1.52</span>
										</li>
										<li className="sel-stake">
											<span className="left">Tottenham to Win</span>
											<span className="right">£5.00</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

		)
	}
};
