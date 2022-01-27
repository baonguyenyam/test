function ___buildShowItem(MEYER_APP) {
	for (let key in MEYER_APP.MEYER_APP_PAGE) {
		if (Object.hasOwnProperty.call(MEYER_APP.MEYER_APP_PAGE, key)) {
			$('#showItems').append('<option value="' + MEYER_APP.MEYER_APP_PAGE[key] + '">' + MEYER_APP.MEYER_APP_PAGE[key] + '</option>');
		}
	}
	$('#showItems').on('change', () => {
		window.location.href = queryAll(parseInt($('#showItems').val()), 1, getParameterByName('color'), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'));
	});
	if (getParameterByName('showItems')) {
		$('#showItems option[value="' + getParameterByName('showItems') + '"]').prop('selected', true);
	}
}