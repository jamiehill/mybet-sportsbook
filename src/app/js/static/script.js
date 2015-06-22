(function($){
	$(window).on('scroll', function(e) {
		var opacity = ($(window).scrollTop()/4)/100;

		if ($(window).scrollTop() > 400) {
			$('.headerImg, #header').css({'position':'fixed', 'top':'0'});
		} else {
			$('.headerImg, #header').attr('style', '');
			$('.headerImg').css({'margin-top':'-'+$(window).scrollTop()/2+'px'});
			$('.headerImg .cover').css({'opacity': opacity});
		}

		if ($(window).scrollTop()  > 400 ) {
			$('#sub-nav-container').addClass('fixed');
			$('#sub-nav-container').parent().css({'padding-top': '51px'});
		} else {
			$('#sub-nav-container').removeClass('fixed');
			$('#sub-nav-container').parent().attr('style', '');
		}
	});
})($);

