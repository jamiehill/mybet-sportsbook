/**
 * Created by Jamie on 17/09/2014.
 */
define([
	'common/model/Event'
],
function (Event) {
	var Events = Backbone.Collection.extend({


		model: Event,
		sortType: 'eventTime',


		/**
		 * @param evt
		 * @returns {*}
		 */
		comparator: function(evt) {
			var sortType = this.sortType;
			switch(sortType) {
				case 'date':
					sortType = 'eventTime';
						break;
				case 'competition':
					sortType = 'compId';
					break;
				case 'weighting':
					sortType = 'compWeighting';
					break;
			}
			return evt.get(sortType);
		},


		/**
		 * @param type
		 */
		changeSort: function(type) {
			this.sortType = type;
			this.sort();
		},


		/**
		 * @param options
		 */
		bySport: function(sport) {
			if (_.isEmpty(sport) || !sport) return this;
			var filtered = this.filter(function(event) {
				return sport.toLowerCase() === event.get("sport").toLowerCase();
			});
			return new Events(filtered);
		}
	});

	return Events;
});

