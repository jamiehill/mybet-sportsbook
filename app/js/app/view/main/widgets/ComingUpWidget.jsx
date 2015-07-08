import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class ComingUpWidget extends Component {
	constructor() {
		super();
	}


	/**
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="cell cell-2">
				<div className="inner-cell">
					<h4 className="align-center">Coming Up</h4>
					<a href=""><i className="entypo-star favourite-icon"></i></a>
					<ul className="game-list">
						<li>
							<div className="disc red">S</div>
							<a href="#_" className="date">12/03/2015</a>
							<a href="#_" className="game">
								Middlesbrough vs Arsenal
							</a>
						</li>
						<li>
							<div className="disc green">D</div>
							<a href="#_" className="date">10/02/2015</a>
							<a href="#_" className="game">
								Man United vs Chelsea
							</a>
						</li>
						<li>
							<div className="disc red">S</div>
							<a href="#_" className="date">24/10/2015</a>
							<a href="#_" className="game">
								Norwich vs West Ham
							</a>
						</li>
						<li>
							<div className="disc blue">B</div>
							<a href="#_" className="date">10/02/2015</a>
							<a href="#_" className="game">
								Man United vs Chelsea
							</a>
						</li>
					</ul>

				</div>
			</div>
		)
	}
};
