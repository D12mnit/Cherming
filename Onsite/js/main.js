$(document).ready(function() {
	var slider = $('.slider-contents');
	var Dots = $('.checkdots').find('li'); 
	var mNav = $('.mobile-nav');
	mNav.click(function(event) {
		/* Act on the event */
		$('nav').toggle(0);
	});
	Dots.click(function(event) {
		/* Act on the event */
		if ($(this).hasClass('selected')) {
			return false;
		} else{
			Dots.removeClass('selected');
			$(this).addClass('selected');
			var Pos = $(this).index();
			picRoll(Pos);
		}
	});
	function picRoll(num){
		slider.animate({left: -num*720+"px"}, 700);
	}
});