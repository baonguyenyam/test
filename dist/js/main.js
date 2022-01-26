"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getParameterByName(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function capitalizeFirstLetter(string) {
  var str = string.charAt(0).toUpperCase() + string.slice(1);
  return str.replace('_', ' ');
}

function queryAll() {
  var showItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var rating = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var price = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  return '?showItems=' + showItems + '&page=' + page + '&color=' + color + '&type=' + type + '&rating=' + rating + '&price=' + price + '';
}

function filterObject(obj, callback) {
  return Object.keys(obj).filter(function (key) {
    return key.includes(callback);
  }).reduce(function (cur, key) {
    return Object.assign(cur, _defineProperty({}, key, obj[key]));
  }, {});
} // APP


var MEYER_APP = {
  // REST FULL API 
  MEYER_REST_API: './data/data.json',
  // MEYER_REST_API: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
  MEYER_DEFAULT_PAGE: parseInt(getParameterByName('showItems')) ? parseInt(getParameterByName('showItems')) : 6,
  MEYER_CURRENT_QUERY: '&color=' + getParameterByName('color') + '&type=' + getParameterByName('type') + '&rating=' + getParameterByName('rating') + '&price=' + getParameterByName('price'),
  jsonLoad: function jsonLoad(path, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success) success(JSON.parse(xhr.responseText));
        } else {
          if (error) error(xhr);
        }
      }
    };

    xhr.open("GET", path, true);
    xhr.send();
  },
  buildShowItem: function buildShowItem() {
    var arrayPage = [9, 12, 15];

    for (var key in arrayPage) {
      if (Object.hasOwnProperty.call(arrayPage, key)) {
        $('#showItems').append('<option value="' + arrayPage[key] + '">' + arrayPage[key] + '</option>');
      }
    }

    $('#showItems').on('change', function () {
      window.location.href = queryAll(parseInt($('#showItems').val()), 1, getParameterByName('color'), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'));
    });

    if (getParameterByName('showItems')) {
      $('#showItems option[value="' + getParameterByName('showItems') + '"]').prop('selected', true);
    }
  },
  buildcustomPrice: function buildcustomPrice() {
    var arrayPrice = [0, 20];
    $('#customPrice').attr('min', arrayPrice[0]).attr('max', arrayPrice[1]);
    $('#customPrice').on('change', function () {
      window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), getParameterByName('rating'), $('#customPrice').val());
    });

    if (getParameterByName('price')) {
      $('#customPrice').val(getParameterByName('price'));
    } else {
      $('#customPrice').val(arrayPrice[1]);
    }
  },
  buildcustomRating: function buildcustomRating() {
    var arrayRating = 5;

    for (var index = 0; index < arrayRating; index++) {
      $('#customRating').append('<div class="form-check"><input class="form-check-input" id="inlineRadiobox_' + (index + 1) + '" type="radio" value="' + (index + 1) + '" name="inlineRadioOptions" ><label class="form-check-label" for="inlineRadiobox_' + (index + 1) + '">' + (index + 1) + ' stars' + '</label></div>');
    }

    $('#customRating').on('change', function () {
      window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), $('#customRating input:checked').val(), getParameterByName('price'));
    });

    if (getParameterByName('rating')) {
      $('#customRating input[value="' + getParameterByName('rating') + '"]').prop('checked', true);
    }
  },
  buildcustomType: function buildcustomType() {
    var arrayType = ['bronzer', 'blush', 'lip_liner', 'foundation', 'eyeshadow', 'eyeliner', 'nail_polish', 'lipstick', 'mascara'];

    for (var key in arrayType) {
      if (Object.hasOwnProperty.call(arrayType, key)) {
        $('#customType').append('<div class="form-check"><input class="form-check-input" id="inlineCheckbox_' + arrayType[key] + '" type="checkbox" value="' + arrayType[key] + '"><label class="form-check-label" for="inlineCheckbox_' + arrayType[key] + '">' + capitalizeFirstLetter(arrayType[key]) + '</label></div>');
      }
    }

    $('#customType').on('change', function () {
      window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), $('#customType input:checked').map(function () {
        return $(this).val();
      }).get().join(','), getParameterByName('rating'), getParameterByName('price'));
    });

    if (getParameterByName('type')) {
      var m = getParameterByName('type').split(',');

      for (var _key in m) {
        if (Object.hasOwnProperty.call(m, _key)) {
          $('#customType input[value="' + m[_key] + '"]').prop('checked', true);
        }
      }
    }
  },
  buildcustomColors: function buildcustomColors() {
    var arrayColors = ['Caramel', 'Classic Ivory', 'Coconut', 'Creamy Natural', 'Honey Beige', 'Ivory', 'Natural Beige', 'Nude', 'Porcelain Ivory', 'Pure Beige', 'Sandy Beige', 'Warm Porcelain'];

    for (var key in arrayColors) {
      if (Object.hasOwnProperty.call(arrayColors, key)) {
        $('#customColors').append('<option value="' + arrayColors[key] + '">' + arrayColors[key] + '</option>');
      }
    }

    $('#customColors').on('change', function () {
      window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), $('#customColors').val(), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'));
    });

    if (getParameterByName('color')) {
      $('#customColors option[value="' + getParameterByName('color') + '"]').prop('selected', true);
    }
  },
  buildPaging: function buildPaging(e, i) {
    var totalPages = Math.floor(i / e) > 0 ? Math.floor(i / e) : 1;

    for (var index = 0; index < totalPages; index++) {
      if (parseInt(getParameterByName('page')) == index + 1 || isNaN(parseInt(getParameterByName('page'))) && index == 0) {
        $('#paging').append('<li class="page-item active"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '">' + (index + 1) + '</a></li>');
      } else {
        $('#paging').append('<li class="page-item"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '">' + (index + 1) + '</a></li>');
      }
    }
  },
  filterData: function filterData(e) {
    if (getParameterByName('type')) {
      (function () {
        var m = getParameterByName('type').split(',');
        var AlltmpData = [];

        var _loop = function _loop(key) {
          var tmpData = [];

          if (Object.hasOwnProperty.call(m, key)) {
            tmpData = e.filter(function (item) {
              return item.product_type.includes(m[key]);
            });
            AlltmpData = AlltmpData.concat(tmpData);
          }
        };

        for (var key in m) {
          _loop(key);
        }

        e = AlltmpData;
      })();
    }

    if (getParameterByName('price')) {
      e = e.filter(function (el) {
        return parseInt(el.price) <= parseInt(getParameterByName('price'));
      });
    }

    if (getParameterByName('rating')) {
      e = e.filter(function (el) {
        return el.rating >= parseInt(getParameterByName('rating')) && el.rating < parseInt(getParameterByName('rating')) + 1;
      });
    } // NEW DATA 


    console.log(e); // PAGING

    if (parseInt(getParameterByName('page'))) {
      $.each(e.slice((parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE, (parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE + MEYER_APP.MEYER_DEFAULT_PAGE), function (i, item) {
        MEYER_APP.buildItems(item);
      });
    } else {
      $.each(e.slice(0, MEYER_APP.MEYER_DEFAULT_PAGE), function (i, item) {
        MEYER_APP.buildItems(item);
      });
    }

    MEYER_APP.buildPaging(MEYER_APP.MEYER_DEFAULT_PAGE, e.length);
  },
  buildItems: function buildItems(e) {
    $('#items').append('<div class="col-sm-6 col-md-4 item" id="item-' + e.id + '"> <div class="product-item"><img src="' + e.api_featured_image + '"> <h5 class="my-2">' + e.name + '</h5> <p class="rating" data-rating="' + e.rating + '"></p> <p class="price">$' + e.price + '</p> <p class="more"> <a class="btn btn-primary" href="javascript:void(0);" data-toggle="modal" data-target="#staticBackdrop" data-id="' + e.id + '">View More</a></p> </div> </div>');
    $('[data-id="' + e.id + '"]').on('click', function () {
      $('#staticBackdrop .modal-title').text(e.name);
      $('#staticBackdrop .modal-body').html('<div class="row item"> <div class="col-lg-4"><img class="w-100" src="' + e.api_featured_image + '"></div> <div class="col-lg-8"> <div class="product-item"> <h3 class="my-2">' + e.name + '</h3> <p class="price mb-1">$' + e.price + '</p> <p class="rating"  data-rating="' + e.rating + '"></p> <ul class="colors list-inline"> <li class="list-inline-item">A</li> <li class="list-inline-item">A</li> <li class="list-inline-item">A</li> <li class="list-inline-item">A</li> </ul> <p class="desc">' + e.description + '</p> <p class="more"><a class="btn btn-primary" href="' + e.product_link + '" target="_blank">View More</a></p> </div> </div> </div>');
    });
    MEYER_APP.buildStars();
    $('#staticBackdrop').on('show.bs.modal', function (event) {
      MEYER_APP.buildStars();
    });
  },
  buildStars: function buildStars() {
    $('[data-rating]').each(function () {
      var rating = Math.floor($(this).attr('data-rating'));
      var dm = '';
      var em = '';

      if (rating > 0) {
        for (var index = 0; index < rating; index++) {
          dm += '<i class="fas fa-star"></i>';
        }

        if (rating < 5) {
          for (var gindex = 0; gindex < 5 - rating; gindex++) {
            em += '<i class="far fa-star deactive"></i>';
          }
        }

        $(this).html(dm + em + ' <span class="text-muted small">(' + $(this).attr('data-rating') + '/5)</span>');
      } else {
        for (var _gindex = 0; _gindex < 5; _gindex++) {
          em += '<i class="far fa-star deactive"></i>';
        }

        $(this).html(em);
      }
    });
  },
  // Init App
  init: function init() {
    MEYER_APP.jsonLoad(MEYER_APP.MEYER_REST_API, function (data) {
      MEYER_APP.buildShowItem();
      MEYER_APP.buildcustomPrice();
      MEYER_APP.buildcustomType();
      MEYER_APP.buildcustomRating();
      MEYER_APP.buildcustomColors();
      MEYER_APP.filterData(data);
    }, function (xhr) {
      console.error(xhr);
    });
  }
};
jQuery(function () {
  MEYER_APP.init();
});
//# sourceMappingURL=main.js.map
