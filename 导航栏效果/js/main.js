$(document).ready(function() {
	var underLine = $('.underLine');
	var underLinePos = 0;
	var isWheel = false; //限制一次页面滚动时的滚轮滚动次数
	var EventUtil = {
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else
			if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeHandler: function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else
			if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		getEvent: function(event) {
			return event ? event : window.event;
		}
	};
	EventUtil.addHandler(document, "mousewheel", function(event) {
		if (isWheel == false) {
			if (event.wheelDelta > 0) {
				if (underLinePos > 0) {
					isWheel = true;
					pageChange(underLinePos - 1);
					underLinemove(underLinePos - 1);
					setTimeout(function() {
						isWheel = false
					}, 1000);
					underLinePos--;
				};
			} else {
				if (underLinePos < 6) {
					isWheel = true;
					pageChange(underLinePos + 1);
					underLinemove(underLinePos + 1);
					setTimeout(function() {
						isWheel = false
					}, 1000);
					underLinePos++;
				};
			}
		}
	});
	EventUtil.addHandler(document, "DOMMouseScroll", function(event) {
		if (isWheel == false) {
			if (event.detail < 0) {
				if (underLinePos > 0) {
					isWheel = true;
					pageChange(underLinePos - 1);
					underLinemove(underLinePos - 1);
					setTimeout(function() {
						isWheel = false
					}, 1000);
					underLinePos--;
				};
			} else {
				if (underLinePos < 6) {
					isWheel = true;
					pageChange(underLinePos + 1);
					underLinemove(underLinePos + 1);
					setTimeout(function() {
						isWheel = false
					}, 1000);
					underLinePos++;
				};
			}
		}
	});
	$('.btn').mouseover(function(event) {
		underLinemove($(this));
	}).click(function(event) {
		underLinePos = $(this).index();
		pageChange(underLinePos);
	}).mouseout(function(event) {
		underLineback();
	});

	function underLinemove(child) {
		if (typeof child == "object") {
			var tempLeft = $(".btn:eq(" + child.index() + ")").position().left;
		} else {
			tempLeft = $(".btn:eq(" + child + ")").position().left;
		}
			
		underLine.stop(false).animate({
			left: tempLeft + 10 + "px"
		}, 400, "easeOutBounce");
	};

	function underLineback() {
		var tempLeft = $(".btn:eq(" + underLinePos + ")").position().left;
		underLine.stop(false).animate({
			left: tempLeft + 10 + "px"
		}, 400, "easeOutBounce");
	}

	function pageChange(index) {
		$('.main').animate({
			top: -index * 100 + "%"
		}, 1000, "easeInOutCirc");
	}
});