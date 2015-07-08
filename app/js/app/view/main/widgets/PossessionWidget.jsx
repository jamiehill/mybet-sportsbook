import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class PossessionWidget extends Component {
	constructor() {
		super();
	}


	/**
	 * @returns {XML}
	 */
	render() {
		var strokeWidth = {'stroke-width': '50px'};
		return (
			<div className="cell cell-2">
				<div className="inner-cell">
					<h4 className="align-center">Possession</h4>
					<a href=""><i className="entypo-star favourite-icon active"></i></a>

					<div id="ct-chart-1" className="possession-chart">
						<svg width="275" height="200" className="ct-chart-donut" style={{width: 275, height: 200}}>
							<g className="ct-series ct-series-b">
								<path d="M137.5,30A70,70,0,0,0,96.553,156.774" className="ct-slice-donut" value="40" style={strokeWidth} stroke-dasharray="176.1786346435547px 176.1786346435547px" stroke-dashoffset="-176.1786346435547px">
									<animate attributeName="stroke-dashoffset" id="anim1" dur="500ms" from="-176.1786346435547px" to="0px" fill="freeze" begin="anim0.end" calcMode="spline" keySplines="0.23 1 0.32 1" keyTimes="0;1"></animate>
								</path>
								<text dx="70.92604385933926" dy="78.36881039375366" text-anchor="middle" className="ct-label">40%</text>
							</g>
							<g className="ct-series ct-series-a"><path d="M96.355,156.631A70,70,0,1,0,137.5,30" className="ct-slice-donut" value="60" style={strokeWidth} stroke-dasharray="263.9042663574219px 263.9042663574219px" stroke-dashoffset="-263.9042663574219px">
								<animate attributeName="stroke-dashoffset" id="anim0" dur="500ms" from="-263.9042663574219px" to="0px" fill="freeze" calcMode="spline" keySplines="0.23 1 0.32 1" keyTimes="0;1"></animate>
							</path><text dx="204.07395614066075" dy="121.63118960624632" text-anchor="middle" className="ct-label">60%</text>
							</g>
						</svg>
					</div>
					<p className="align-center">Middlesbrough v Arsenal</p>
				</div>
			</div>
		)
	}
};
