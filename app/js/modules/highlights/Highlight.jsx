import React from 'react';


export default React.createClass({
	render: function() {
		return (
			<div className="table-row">
				<div className="table-cell">
					<span className="date">Today</span>
					<span className="time">10:30</span>
				</div>
				<div className="table-cell align-right">
					Middlesbrough
				</div>
				<div className="table-cell align-center price">
					1.3
				</div>
				<div className="table-cell align-center price">
					1.4
				</div>
				<div className="table-cell align-center price">
					1.1
				</div>
				<div className="table-cell align-left">
					Manchester United
				</div>
				<div className="table-cell align-center">
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center price">
					+12
				</div>
			</div>
		)
	}

});

