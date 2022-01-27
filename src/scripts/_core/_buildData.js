function ___filterData(e, MEYER_APP) {
	if (getParameterByName('type')) {
		let m = getParameterByName('type').split(',');
		let AlltmpData = [];
		for (let key in m) {
			let tmpData = [];
			if (Object.hasOwnProperty.call(m, key)) {
				tmpData = e.filter(function (item) {
					return item.product_type.includes(m[key]);
				});
				AlltmpData = AlltmpData.concat(tmpData);
			}
		}
		e = AlltmpData;
	}
	if (getParameterByName('color')) {
		// let m = getParameterByName('color').split(',');
		// e = AlltmpData;
	}
	if (getParameterByName('price')) {
		e = e.filter(function (el) {
			return parseInt(el.price) <= parseInt(getParameterByName('price'));
		});
	}
	if (getParameterByName('rating')) {
		e = e.filter(function (el) {
			return el.rating >= parseInt(getParameterByName('rating')) && el.rating < (parseInt(getParameterByName('rating')) + 1);
		});
	}
	// NEW DATA 
	console.log(e);
	// PAGING
	if (parseInt(getParameterByName('page'))) {
		$.each(e.slice(((parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE), (((parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE) + MEYER_APP.MEYER_DEFAULT_PAGE)), (i, item) => {
			MEYER_APP.buildItems(item);
		});
	} else {
		$.each(e.slice(0, MEYER_APP.MEYER_DEFAULT_PAGE), (i, item) => {
			MEYER_APP.buildItems(item);
		});
	}
	MEYER_APP.buildPaging(MEYER_APP.MEYER_DEFAULT_PAGE, e.length);
}