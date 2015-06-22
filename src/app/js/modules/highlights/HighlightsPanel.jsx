import React from 'react';

export default React.createClass({
	render: function() {
		return (
			<div className="inner-cell">
				<h4>Highlights</h4>
				<div className="table regular-table">
					{this.props.children}
				</div>
			</div>
		)
	}
});

