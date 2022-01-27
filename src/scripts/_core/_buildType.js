function ___buildcustomType(MEYER_APP) {
	for (let key in MEYER_APP.MEYER_APP_TYPE) {
		if (Object.hasOwnProperty.call(MEYER_APP.MEYER_APP_TYPE, key)) {
			$('#customType').append('<div class="form-check"><input class="form-check-input" id="inlineCheckbox_' + MEYER_APP.MEYER_APP_TYPE[key] + '" type="checkbox" value="' + MEYER_APP.MEYER_APP_TYPE[key] + '"><label class="form-check-label" for="inlineCheckbox_' + MEYER_APP.MEYER_APP_TYPE[key] + '">' + capitalizeFirstLetter(MEYER_APP.MEYER_APP_TYPE[key]) + '</label></div>');
		}
	}
	$('#customType').on('change', () => {
		window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), $('#customType input:checked').map(function () { return $(this).val(); }).get().join(','), getParameterByName('rating'), getParameterByName('price'));
	});
	if (getParameterByName('type')) {
		let m = getParameterByName('type').split(',');
		for (let key in m) {
			if (Object.hasOwnProperty.call(m, key)) {
				$('#customType input[value="' + m[key] + '"]').prop('checked', true);
			}
		}
	}
}