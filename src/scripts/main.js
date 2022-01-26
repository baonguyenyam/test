// APP
var MEYER_APP = {
	// REST FULL API 
	MEYER_REST_API: './data/data.json',
	// MEYER_REST_API: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
	MEYER_DEFAULT_PAGE: parseInt(getParameterByName('showItems')) ? parseInt(getParameterByName('showItems')) : 6,
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
			window.location.href = queryAll(parseInt($('#showItems').val()),1,getParameterByName('color'),getParameterByName('type'),getParameterByName('rating'),getParameterByName('price'));
		});
		if(getParameterByName('showItems')) {
			$('#showItems option[value="'+getParameterByName('showItems')+'"]').prop('selected', true);
		}
	},
	buildcustomPrice: () => {
		let arrayPrice = [0,20];
		$('#customPrice').attr('min', arrayPrice[0]).attr('max', arrayPrice[1]);
		$('#customPrice').on('change', () => {
			window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), getParameterByName('rating'), $('#customPrice').val());
		});
		if(getParameterByName('price')) {
			$('#customPrice').val(getParameterByName('price'));
		} else {
			$('#customPrice').val(arrayPrice[1]);
		}
	},
	buildcustomRating: () => {
		let arrayRating = 5;
		for (let index = 0; index < arrayRating; index++) {
			$('#customRating').append('<div class="form-check"><input class="form-check-input" id="inlineRadiobox_'+(index+1)+'" type="radio" value="' + (index+1) + '" name="inlineRadioOptions" ><label class="form-check-label" for="inlineRadiobox_'+(index+1)+'">' + (index+1) +
			' stars' +
			'</label></div>');
		}
		$('#customRating').on('change', () => {
			window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), $('#customRating input:checked').val(), getParameterByName('price'));
		});
		if(getParameterByName('rating')) {
			$('#customRating input[value="'+getParameterByName('rating')+'"]').prop('checked', true);
		}
	},
	buildcustomType: () => {
		let arrayType = ['bronzer', 'blush', 'lip_liner', 'foundation', 'eyeshadow', 'eyeliner', 'nail_polish', 'lipstick', 'mascara'];
		for (let key in arrayType) {
			if (Object.hasOwnProperty.call(arrayType, key)) {
				$('#customType').append('<div class="form-check"><input class="form-check-input" id="inlineCheckbox_'+arrayType[key]+'" type="checkbox" value="' + arrayType[key] + '"><label class="form-check-label" for="inlineCheckbox_'+arrayType[key]+'">' + capitalizeFirstLetter(arrayType[key]) + '</label></div>');
			}
		}
		$('#customType').on('change', () => {
			window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), $('#customType input:checked').map(function() { return $(this).val(); }).get().join(','), getParameterByName('rating'), getParameterByName('price'));
		});
		if(getParameterByName('type')) {
			let m = getParameterByName('type').split(',');
			for (let key in m) {
				if (Object.hasOwnProperty.call(m, key)) {
					$('#customType input[value="'+m[key]+'"]').prop('checked', true);
				}
			}
		}
	},
	buildcustomColors: () => {
		let arrayColors = ['Caramel','Classic Ivory','Coconut','Creamy Natural','Honey Beige','Ivory','Natural Beige','Nude','Porcelain Ivory','Pure Beige','Sandy Beige','Warm Porcelain'];
		for (let key in arrayColors) {
			if (Object.hasOwnProperty.call(arrayColors, key)) {
				$('#customColors').append('<option value="' + arrayColors[key] + '">' + arrayColors[key] + '</option>');
			}
		}
		$('#customColors').on('change', () => {
			window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), $('#customColors').val(), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'));
		});
		if(getParameterByName('color')) {
			$('#customColors option[value="'+getParameterByName('color')+'"]').prop('selected', true);
		}
	},
	buildPaging: (e,i) => {
		let totalPages = Math.floor(i/e) > 0 ? Math.floor(i/e) : 1;
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
				MEYER_APP.buildShowItem();
				MEYER_APP.buildcustomPrice();
				MEYER_APP.buildcustomType();
				MEYER_APP.buildcustomRating();
				MEYER_APP.buildcustomColors();
				// // Add Products
				let newData = data
				
				if(getParameterByName('type')) {
					let m = getParameterByName('type').split(',');
					let AlltmpData = [];
					for (let key in m) {
						let tmpData = [];
						if (Object.hasOwnProperty.call(m, key)) {
							tmpData = newData.filter(function(item) {
								return item.product_type.includes(m[key]);
							});
							AlltmpData = AlltmpData.concat(tmpData);
						}
					}
					newData = AlltmpData;
				}
				if(getParameterByName('price')) {
					newData = newData.filter(function (el) {
						return parseInt(el.price) <= parseInt(getParameterByName('price'));
					});
				}
				if(getParameterByName('rating')) {
					newData = newData.filter(function (el) {
						return el.rating >= parseInt(getParameterByName('rating')) && el.rating < (parseInt(getParameterByName('rating')) + 1);
					});
				}
				console.log(newData);
				if(parseInt(getParameterByName('page'))) {
					$.each(newData.slice(((parseInt(getParameterByName('page'))-1)*MEYER_APP.MEYER_DEFAULT_PAGE),(((parseInt(getParameterByName('page'))-1)*MEYER_APP.MEYER_DEFAULT_PAGE)+MEYER_APP.MEYER_DEFAULT_PAGE)), (i, item) => {
						console.log(item);
					});
				} else {
					$.each(newData.slice(0,MEYER_APP.MEYER_DEFAULT_PAGE), (i, item) => {
						console.log(item);
					});
				}
				MEYER_APP.buildPaging(MEYER_APP.MEYER_DEFAULT_PAGE, newData.length);
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