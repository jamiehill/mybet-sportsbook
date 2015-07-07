import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class FooterView extends Component {
	constructor() {
		super();
	}


	/**
	 * Renders compeition container
	 * @returns {XML}
	 */
	render() {
		return (
			<div>
				<div className="container">
					<div className="col-container">
						<div className="footer-col">
							<h3>Sports</h3>
							<ul>
								<li>Highlights</li>
								<li>Betting Program</li>
								<li>Live Games</li>
								<li>Mobile Betting</li>
								<li>Actions</li>
								<li>Statistics</li>
								<li>Live Scores</li>
								<li>Premier League</li>
								<li>Primera Division</li>
							</ul>
						</div>
						<div className="footer-col">
							<h3>Casino</h3>
							<ul>
								<li>Lobby</li>
								<li>Live Casino</li>
								<li>Actions</li>
								<li>VIP Programme</li>
								<li>Casino FAQ</li>
							</ul>
						</div>

						<div className="footer-col">
							<h3>Poker</h3>
							<ul>
								<li>Lobby</li>
								<li>First Steps</li>
								<li>Poker Schedule</li>
								<li>myPoker</li>
								<li>Tournament</li>
								<li>Actions</li>
								<li>Information</li>
							</ul>
						</div>
						<div className="footer-col">
							<h3>My Account</h3>
							<ul>
								<li>New Account</li>
								<li>Partner Program</li>
								<li>About us</li>
								<li>Security</li>
								<li>AGB</li>
								<li>Privacy</li>
								<li>Bonus</li>
								<li>News</li>
								<li>Help</li>
							</ul>
						</div>
						<div className="footer-col">
							<h3>Language</h3>
							<ul>
								<li>English</li>
								<li>Deutsch</li>
								<li>Francais</li>
								<li>Espanol</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="detail-row row">
					<div className="container">
						<div className="detail-container">
							<p>© Personal Exchange International Ltd. 2001 - 2015</p>
						</div>
						<div className="logo-container right-float">
							<p>Security and Responsibility</p>
							<img src="images/logos/gamcare-certified-white.png"/>
							<img src="images/logos/gambling-support-white.png"/>
							<img src="images/logos/gambling-commission-white.png"/>
							<img src="images/logos/mga-white.png"/>
						</div>
					</div>
				</div>
			</div>
		)
	}
};
