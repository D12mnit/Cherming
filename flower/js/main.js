$(document).ready(function() {
	var mainNav = $('.main-nav ul li');
	var picTabbar = $('.tabbar');
	var picTabbox = $('.tabbox');
	var blogTabbar = $('.tab-btn');
	var blogTabbox = $('.blog');

	mainNav.find('a').click(function(event) { //页内平滑跳转
		event.preventDefault();
		var href = $(this).attr("href");
		var pos = $(href).offset().top;
		$("html,body").animate({
			scrollTop: pos
		}, 400);
	});

	$(".navToggle1").click(function() { //导航栏按钮效果
		$(this).toggleClass("open");
		$('nav').toggleClass('block');
	});

	$(window).scroll(function(event) {
		if ($(window).scrollTop() > 400 && $(window).scrollTop() < 1600) {
			$('.detail img').addClass('block');
		}
		if ($(window).scrollTop() > 1600) {
			$('.detail img').removeClass('block');
		}
	});
	tabSwitch(picTabbar, picTabbox);
	tabSwitch(blogTabbar, blogTabbox);

	function tabSwitch(tabbar, tabbox) { //tab栏切换函数
		var tabBtn = tabbar.find('li');
		var tabBody = tabbox.find('li');
		var activePos = tabBtn.index('.selected');
		tabBtn.hover(function(event) {
			var Pos = $(this).index();
			if (Pos > activePos) {
				tabBody.removeClass('selected');
				tabBody.eq(Pos).addClass('selected');
				activePos = Pos;
			} else {
				tabBody.removeClass('selected');
				tabBody.eq(Pos).addClass('selected');
				activePos = Pos;
			}
			if ($(this).hasClass('selected')) {
				return;
			} else {
				tabBtn.removeClass('selected');
				$(this).addClass('selected');
			}
		});
	}
});