function ___buildStar() {
	$('[data-rating]').each(() => {
		let rating = Math.floor($(this).attr('data-rating'));
		let dm = '';
		let em = '';
		if (rating > 0) {
			for (let index = 0; index < rating; index++) {
				dm += '<i class="fas fa-star"></i>';
			}
			if (rating < 5) {
				for (let gindex = 0; gindex < (5 - rating); gindex++) {
					em += '<i class="far fa-star deactive"></i>';
				}
			}
			$(this).html(dm + em + ' <span class="text-muted small">(' + $(this).attr('data-rating') + '/5)</span>');
		} else {
			for (let gindex = 0; gindex < 5; gindex++) {
				em += '<i class="far fa-star deactive"></i>';
			}
			$(this).html(em);
		}
	})
}