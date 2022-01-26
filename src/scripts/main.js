// APP
var NGUYEN_APP = {
	// REST FULL API 
	REST_API: './data/data.json',
	// REST_API: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
	// This code to load JSON data from REST API without jQuery 
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
	// Call API 
	getData: () => {
		NGUYEN_APP.jsonLoad(NGUYEN_APP.REST_API,
			(data) => { console.log(data); },
			(xhr) => { console.error(xhr); }
		);
	},
	// Init APP 
	init: () => {
		console.log(NGUYEN_APP.getData());
	}
}

// This code will be watching Browser ready without jQuery
NguyenAppReady(() => {
	// var lift_chat_element = document.getElementById("lift-chat-box");
	// if(typeof(lift_chat_element) != 'undefined' && lift_chat_element != null && lift_chat_element != "") {
	// 	LIFT_CHAT_APP.init()
	// } else {
	// 	document.body.appendChild(LIFT_CHAT_APP.mainHTML())
	// 	LIFT_CHAT_APP.init()
	// }
	NGUYEN_APP.init();

});
