import React from 'react';


export default React.createClass({
	render: function() {
		var attribs = this.props.model.attributes;
		return (
			<div className="table-row">
				<div className="table-cell">
					<span className="date">{attribs.date}</span>
					<span className="time">{attribs.time}</span>
				</div>
				<div className="table-cell align-right">
					{attribs.homeTeam}
				</div>
				<div className="table-cell align-center price">
					{attribs.homePrice}
				</div>
				<div className="table-cell align-center price">
					{attribs.drawPrice}
				</div>
				<div className="table-cell align-center price">
					{attribs.awayPrice}
				</div>
				<div className="table-cell align-left">
					{attribs.awayTeam}
				</div>
				<div className="table-cell align-center">
					<i className="entypo-chart-bar"></i>
				</div>
				<div className="table-cell align-center price">
					{attribs.numMarkets}
				</div>
			</div>
		)
	}
});

