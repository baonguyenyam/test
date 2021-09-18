// Main
// FIXED SVG SPACING AROUND 
$(document).ready(function () {
	$.each($('svg, symbol'), function () {
		$(this).attr('x', '0');
		$(this).attr('y', '0');
	})
	$('#icon-shape-1').attr('preserveAspectRatio', 'xMaxYMax slice');
	$('#icon-shape-2').attr('preserveAspectRatio', 'xMaxYMax meet');
});
