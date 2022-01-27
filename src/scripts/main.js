// APP
var MEYER_APP = {
	// REST FULL API 
	MEYER_REST_API: './data/data.json',
	// MEYER_REST_API: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
	MEYER_DEFAULT_PAGE: parseInt(getParameterByName('showItems')) ? parseInt(getParameterByName('showItems')) : 6,
	MEYER_CURRENT_QUERY: '&color=' + getParameterByName('color') + '&type=' + getParameterByName('type') + '&rating=' + getParameterByName('rating') + '&price=' + getParameterByName('price'),
	MEYER_APP_PAGE: [9, 12, 15],
	MEYER_APP_PRICE_RANGE: [0,20],
	MEYER_APP_TYPE: ['bronzer', 'blush', 'lip_liner', 'foundation', 'eyeshadow', 'eyeliner', 'nail_polish', 'lipstick', 'mascara'],
	MEYER_APP_COLOR: ['Caramel', 'Classic Ivory', 'Coconut', 'Creamy Natural', 'Honey Beige', 'Ivory', 'Natural Beige', 'Nude', 'Porcelain Ivory', 'Pure Beige', 'Sandy Beige', 'Warm Porcelain'],
	buildShowItem: () => {
		___buildShowItem(MEYER_APP);
	},
	buildcustomPrice: () => {
		___buildcustomPrice(MEYER_APP);
	},
	buildcustomRating: () => {
		___buildcustomRating();
	},
	buildcustomType: () => {
		___buildcustomType(MEYER_APP);
	},
	buildcustomColors: () => {
		___buildcustomColors(MEYER_APP);
	},
	buildPaging: (e, i) => {
		___buildPaging(e, i, MEYER_APP);
	},
	filterData: (e) => {
		___filterData(e, MEYER_APP);
	},
	buildItems: (e) => {
		___buildItems(e);
	},
	// Init App
	init: () => {
		jsonLoad(MEYER_APP.MEYER_REST_API,
			(data) => {
				MEYER_APP.buildShowItem();
				MEYER_APP.buildcustomPrice();
				MEYER_APP.buildcustomType();
				MEYER_APP.buildcustomRating();
				MEYER_APP.buildcustomColors();
				MEYER_APP.filterData(data);
			},
			(xhr) => {
				console.error(xhr);
			}
		);
	},
}

jQuery(() => {
	MEYER_APP.init();
});
