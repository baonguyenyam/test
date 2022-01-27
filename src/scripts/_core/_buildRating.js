function ___buildcustomRating() {
	let arrayRating = 5;
	for (let index = 0; index < arrayRating; index++) {
		$('#customRating').append('<div class="form-check"><input class="form-check-input" id="inlineRadiobox_' + (index + 1) + '" type="radio" value="' + (index + 1) + '" name="inlineRadioOptions" ><label class="form-check-label" for="inlineRadiobox_' + (index + 1) + '">' + (index + 1) +
			' stars' +
			'</label></div>');
	}
	$('#customRating').on('change', () => {
		window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), $('#customRating input:checked').val(), getParameterByName('price'));
	});
	if (getParameterByName('rating')) {
		$('#customRating input[value="' + getParameterByName('rating') + '"]').prop('checked', true);
	}
}