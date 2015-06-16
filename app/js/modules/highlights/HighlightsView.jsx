import React from 'react';
import mixin from '../../common/react/BackboneModelMixin';
import HighlightsPanel from './HighlightsPanel.jsx!';
import Highlight from './Highlight.jsx!';

export default React.createFactory(React.createClass({
	mixins: [mixin],

	render: function() {
		return (
			<div className="cell cell-4 highlights">
				<HighlightsPanel>
					{_.times(12, function() {
						return <Highlight></Highlight>;
					})}
				</HighlightsPanel>
			</div>
		)
	}

}));

