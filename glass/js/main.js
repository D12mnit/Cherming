var content = document.querySelector('.content');
var copy = content.cloneNode(true);
var contentBlurred = document.createElement('div');
contentBlurred.className = 'blur-content';
contentBlurred.appendChild(copy);

var header = document.querySelector('header');
header.appendChild(contentBlurred);

var contentWrapper = document.querySelector('.content-wrapper'),
		translation;

contentWrapper.addEventListener('scroll', function(){
	translation = 'translate3d(0,'+( - this.scrollTop + 'px')+',0)';
	copy.style['-webkit-transform'] = translation;
	copy.style['-moz-transform'] = translation;
	copy.style['transform'] = translation;
	// body...
});

contentWrapper.scrollTop = 140;