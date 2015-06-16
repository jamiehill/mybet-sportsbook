import React from 'react';
import mixin from '../../common/react/BackboneModelMixin';
import HighlightsPanel from './HighlightsPanel.jsx!';
import Highlight from './Highlight.jsx!';


export default React.createFactory(React.createClass({
	mixins: [mixin],


	render: function() {
		var rows = _.times(12, function() {
			return <Highlight></Highlight>;
		})
		return (
			<div className="cell cell-4 highlights">
				<HighlightsPanel>
					{rows}
				</HighlightsPanel>
			</div>
		)
	}

}));

