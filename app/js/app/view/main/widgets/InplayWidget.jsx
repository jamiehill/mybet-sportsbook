import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class InplayWidget extends Component {
	constructor() {
		super();
	}


	/**
	 * @returns {XML}
	 */
	render() {
		var strokeWidth = {'stroke-width': '5px'};
		return (
			<div className="cell cell-2 inplay-cell">
				<div className="inner-cell">
					<h4 className="align-center">Man City vs Norwich</h4>
					<a href=""><i className="entypo-star favourite-icon"></i></a>
					<div id="ct-chart-3" className="inplay-chart"><svg width="270" height="230" className="ct-chart-donut" style={{width: 270, height: 230}}><g series-name="Series 2" className="ct-series grey-bar"><path d="M135,7.5A107.5,107.5,0,0,0,66.188,197.59" className="ct-slice-donut" value="35" meta="Meta Two" style={strokeWidth}></path></g><g series-name="Series 1" className="ct-series white-bar"><path d="M65.9,197.35A107.5,107.5,0,1,0,135,7.5" className="ct-slice-donut" value="55" meta="Meta One" style={strokeWidth}></path></g></svg></div>
					<div className="inplay-data">
						<span className="liveTag">
							Live
						</span>
						<span className="score">
							3-2
						</span>
						<span className="time">
							55:26
						</span>
					</div>
				</div>
			</div>
		)
	}
};
