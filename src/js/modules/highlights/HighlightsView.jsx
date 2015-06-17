import React from 'react';
import mixin from '../../common/react/BackboneMixin';
import HighlightsPanel from './HighlightsPanel.jsx!';
import Highlight from './Highlight.jsx!';

export default React.createClass({
	mixins: [mixin],

	render: function() {
		var collection = this.props.collection,
			highlights = collection.map(function(model) {
				return <Highlight key={model.get('id')} model={model}/>;
			});
		return (
			<div className="cell cell-4 highlights">
				<HighlightsPanel>
					{highlights}
				</HighlightsPanel>
			</div>
		)
	}
});

