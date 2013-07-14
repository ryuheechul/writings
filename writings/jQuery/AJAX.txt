# AJAX

jQuery AJAX 를 잘 안 써서 대충만

	$(...).load(url, [data], [complete]); // fill with loaded HTML
	
	$.ajax({
		url: '...',
		dataType: 'json',
		type: 'POST',
		data: { ... }
	})
	.success(function (response) { ... })
	.error(fn)
	.complete(fn)
	;
