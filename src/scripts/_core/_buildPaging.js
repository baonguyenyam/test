function ___buildPaging(e, i, MEYER_APP) {
	let totalPages = Math.floor(i / e) > 0 ? Math.floor(i / e) : 1;
	for (let index = 0; index < totalPages; index++) {
		if (((parseInt(getParameterByName('page')) == (index + 1))) || ((isNaN(parseInt(getParameterByName('page')))) && (index == 0))) {
			$('#paging').append('<li class="page-item active"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '">' + (index + 1) + '</a></li>');
		} else {
			$('#paging').append('<li class="page-item"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '">' + (index + 1) + '</a></li>');
		}
	}
}