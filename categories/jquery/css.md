# CSS

	$(...).css('background-color');
	$(...).css('backgroundColor'); // same
	$(...).css([ "width", "height" ]);
	
	$(...).css('background-color', '#00ff00');	$(...).css({
		'background-color': '#00ff00',
		'border': '1px solid #000000
	});
	
	$(...).addClass('class1 class2 class3');
	$(...).removeClass('class3');
	$(...).toggleClass('class2');
	
	if ($(...).hasClass('class1')) {...}
	
	$(document).ready(function() {		var $speech = $('div.speech');		$('#switcher-large').click(function() {			var num = parseFloat($speech.css('fontSize'));
			num *= 1.4;			$speech.css('fontSize', num + 'px');		});	});
