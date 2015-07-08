import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class MyBetsView extends Component {
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
				<div className="headerImg"></div>
				<div className="hero-area">
					<div className="container">
						<h1>Knowledge. Power. <br/>Betting.</h1>
					</div>
				</div>
			</div>
		)
	}
};
