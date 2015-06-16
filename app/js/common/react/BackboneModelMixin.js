export default {
	/**
	 * equivalent to marionette onShow in the react world,
	 * listen to backbone model change events to update the
	 * components when one occurs, if a model has been set
	 */
	componentDidMount() {
		if (!this.props || !this.props.model) return;
		this.model = this.props.model;
		this.model.on('change', this._forceUpdate, this);
	},

	/**
	 * Removes any listeners if previously added
	 */
	componentWillUnmount() {
		if (!this.props || !this.props.model) return;
		this.model = this.props.model;
		this.model.off('change');
	},

	/**
	 * Forces update of the component on model change
	 */
	_forceUpdate() {
		if (this.isMounted()) this.forceUpdate();
	}
};
