function ___buildcustomColors(MEYER_APP) {
	for (let key in MEYER_APP.MEYER_APP_COLOR) {
		if (Object.hasOwnProperty.call(MEYER_APP.MEYER_APP_COLOR, key)) {
			$('#customColors').append('<div class="form-check"><input class="form-check-input" id="inlineCheckbox_' + MEYER_APP.MEYER_APP_COLOR[key] + '" type="checkbox" value="' + MEYER_APP.MEYER_APP_COLOR[key] + '"><label class="form-check-label" for="inlineCheckbox_' + MEYER_APP.MEYER_APP_COLOR[key] + '">' + capitalizeFirstLetter(MEYER_APP.MEYER_APP_COLOR[key]) + '</label></div>');
		}
	}
	$('#customColors').on('change', () => {
		window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), $('#customColors input:checked').map(function () { return $(this).val(); }).get().join(','), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'));
	});
	if (getParameterByName('color')) {
		let m = getParameterByName('color').split(',');
		for (let key in m) {
			if (Object.hasOwnProperty.call(m, key)) {
				$('#customColors input[value="' + m[key] + '"]').prop('checked', true);
			}
		}
	}
}