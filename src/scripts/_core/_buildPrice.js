function ___buildcustomPrice(MEYER_APP) {
	$('#customPrice').attr('min', MEYER_APP.MEYER_APP_PRICE_RANGE[0]).attr('max', MEYER_APP.MEYER_APP_PRICE_RANGE[1]);
		$('#customPrice').on('change', () => {
			window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), getParameterByName('rating'), $('#customPrice').val());
		});
		if (getParameterByName('price')) {
			$('#customPrice').val(getParameterByName('price'));
		} else {
			$('#customPrice').val(MEYER_APP.MEYER_APP_PRICE_RANGE[1]);
		}
}