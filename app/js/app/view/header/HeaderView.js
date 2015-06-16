import template from './HeaderTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template),


	templateHelpers() {
		var sports = this.parseSports();
		return {
			sports: sports,
			sport : 'SOCCER',
			isTouch: false,
			isHome: true
		};
	},


	/**
	 * Parses sport codes to icons
	 * @param sports
	 * @returns {{}}
	 */
	parseSports() {
		var sports = ctx.get('sportsBookModel').get('sports');
		var icon, icons = [];
		_.each(sports, function(s) {
			var sport = s.code.toUpperCase();
			switch(sport) {
				case 'SOCCER':
					icon = 'icon-sport-football';
					break;
				case 'ICE_HOCKEY':
					icon = 'icon-sport-ice-hockey';
					break;
				case 'RUGBY_UNION':
				case 'RUGBY_LEAGUE':
					icon = 'icon-sport-rugby';
					break;
				default:
					icon = 'icon-sport-'+sport.toLowerCase();
					break;
			}

			var title = sport == 'SOCCER' ? 'FOOTBALL' : sport;
			icons.push({sport: sport, title: _.titleize(title.toUpperCase().replace(/_/g, ' ')), icon: icon});
		});
		return icons;
	},
});
