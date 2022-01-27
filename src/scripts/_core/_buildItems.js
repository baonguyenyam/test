function ___buildItems(e) {
	$('#items').append('<div class="col-sm-6 col-md-4 item" id="item-' + e.id + '"> <div class="product-item"><img src="' + e.api_featured_image + '"> <h5 class="my-2">' + e.name + '</h5> <p class="rating" data-rating="' + e.rating + '"></p> <p class="price">$' + e.price + '</p> <p class="more"> <a class="btn btn-primary" href="javascript:void(0);" data-toggle="modal" data-target="#staticBackdrop" data-id="' + e.id + '">View More</a></p> </div> </div>');
	$('[data-id="' + e.id + '"]').on('click', () => {
		let array_colors = '';
		for (let key in e.product_colors) {
			if (Object.hasOwnProperty.call(e.product_colors, key)) {
				array_colors += '<li class="list-inline-item" style="background:'+e.product_colors[key].hex_value+'">&nbsp;</li>';
			}
		}
		$('#staticBackdrop .modal-title').text(e.name);
		$('#staticBackdrop .modal-body').html('<div class="row item"> <div class="col-lg-4"><img class="w-100" src="' + e.api_featured_image + '"></div> <div class="col-lg-8"> <div class="product-item"> <h3 class="my-2">' + e.name + '</h3> <p class="price mb-1">$' + e.price + '</p> <p class="rating"  data-rating="' + e.rating + '"></p> <ul class="colors list-inline">'+array_colors+'</ul> <p class="desc">' + e.description + '</p> <p class="more"><a class="btn btn-primary" href="' + e.product_link + '" target="_blank">View More</a></p> </div> </div> </div>');
	})
	
}