import React from 'react';
import Component from 'core/system/react/BackboneComponent';

export default class DashboardView extends Component {
	constructor() {
		super();
	}


	/**
	 * @returns {XML}
	 */
	render() {
		return (
			<div className="faded-back-container">
				<div className="container">
					<h1>Main Dashboard</h1>
					<div className="row">
						<div className="cell cell-0">
							<div className="inner-cell">
								<h4 className="align-center">Pie Chart</h4>
							</div>
						</div>
						<div className="cell cell-0">
							<div className="inner-cell">
								<h4 className="align-center">Inplay Summary</h4>
							</div>
						</div>
						<div className="cell cell-0 over-1680">
							<div className="inner-cell">
								<h4>Something New</h4>
							</div>
						</div>
						<div className="cell cell-0 over-1680">
							<div className="inner-cell">
								<h4>Something New</h4>
							</div>
						</div>
						<div className="cell cell-0 over-1680">
							<div className="inner-cell">
								<h4>Something New Two</h4>
							</div>
						</div>
						<div className="cell cell-1 under-1680">
							<div className="inner-cell">
								<h4>Lists</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};
