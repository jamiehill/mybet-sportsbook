import React from 'react';


export default React.createClass({
	render: function() {
		var rows = [];
		_.times(12, function() {
			rows.push()
		});
		return (
			<div className="inner-cell">
				<h4>Highlights</h4>
				<div className="table regular-table">
					{this.props.children}
				</div>
			</div>)
	}

});

