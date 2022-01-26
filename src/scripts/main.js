// APP
var MEYER_APP = {
	// REST FULL API 
	MEYER_REST_API: './data/data.json',
	// MEYER_REST_API: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
	MEYER_DEFAULT_PAGE: parseInt(getParameterByName('showItems')) ? parseInt(getParameterByName('showItems')) : 9,
	MEYER_CURRENT_QUERY: '&color=' + getParameterByName('color') + '&type=' + getParameterByName('type') + '&rating=' + getParameterByName('rating') + '&price=' + getParameterByName('price'),
	jsonLoad: (path, success, error) => {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					if (success)
						success(JSON.parse(xhr.responseText));
				} else {
					if (error)
						error(xhr);
				}
			}
		};
		xhr.open("GET", path, true);
		xhr.send();
	},
	buildShowItem: () => {
		let arrayPage = [9,12,15];
		for (let key in arrayPage) {
			if (Object.hasOwnProperty.call(arrayPage, key)) {
				$('#showItems').append('<option value="' + arrayPage[key] + '">' + arrayPage[key] + '</option>');
			}
		}
		$('#showItems').on('change', () => {
			window.location.href = '?showItems=' + $('#showItems').val();
		});
	},
	buildPaging: (e,i) => {
		let totalPages = Math.floor(i/e);
		for (let index = 0; index < totalPages; index++) {
			if(((parseInt(getParameterByName('page')) == (index+1))) || ((isNaN(parseInt(getParameterByName('page')))) && (index == 0))) { 
				$('#paging').append('<li class="page-item active"><a class="page-link" href="?showItems='+e+'&page='+(index+1)+MEYER_APP.MEYER_CURRENT_QUERY+'">'+(index+1)+'</a></li>');
			} else {
				$('#paging').append('<li class="page-item"><a class="page-link" href="?showItems='+e+'&page='+(index+1)+MEYER_APP.MEYER_CURRENT_QUERY+'">'+(index+1)+'</a></li>');
			}
		}
	},
	// Init App
	init: () => {
		MEYER_APP.jsonLoad(MEYER_APP.MEYER_REST_API,
			(data) => { 
				let total = data.length;
				let defaultPage = MEYER_APP.MEYER_DEFAULT_PAGE;
				MEYER_APP.buildShowItem();
				MEYER_APP.buildPaging(defaultPage, total);
				// // Add Products
				// $.each(data.slice(0,MEYER_APP.MEYER_DEFAULT_PAGE), (i, item) => {
				// 	console.log(item);
				// });
			},
			(xhr) => { 
				// console.error(xhr); 
			}
		);
	},
}

jQuery(() => { 
	MEYER_APP.init();
});