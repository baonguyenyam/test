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
    var totalPages = Math.floor(i / e);

    for (var index = 0; index < totalPages; index++) {
      if (parseInt(getParameterByName('page')) == index + 1 || isNaN(parseInt(getParameterByName('page'))) && index == 0) {
        $('#paging').append('<li class="page-item active"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '">' + (index + 1) + '</a></li>');
      } else {
        $('#paging').append('<li class="page-item"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '">' + (index + 1) + '</a></li>');
      }
    }
  },
  // Init App
  init: function init() {
    MEYER_APP.jsonLoad(MEYER_APP.MEYER_REST_API, function (data) {
      MEYER_APP.buildShowItem();
      MEYER_APP.buildcustomPrice();
      MEYER_APP.buildcustomType();
      MEYER_APP.buildcustomRating();
      MEYER_APP.buildcustomColors(); // // Add Products
      // let newData = data;
      // for (const key in newData) {
      // 	if (Object.hasOwnProperty.call(newData, key)) {
      // 		console.log(newData[key].rating);
      // 	}
      // }

      var newData = data.filter(function (el) {
        return el.rating >= parseInt(getParameterByName('rating')) && el.rating <= parseInt(getParameterByName('rating')) + 1;
      });
      console.log(newData);

      if (parseInt(getParameterByName('page'))) {
        $.each(newData.slice((parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE, (parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE + MEYER_APP.MEYER_DEFAULT_PAGE), function (i, item) {
          console.log(item);
        });
      } else {
        $.each(newData.slice(0, MEYER_APP.MEYER_DEFAULT_PAGE), function (i, item) {
          console.log(item);
        });
      }

      MEYER_APP.buildPaging(MEYER_APP.MEYER_DEFAULT_PAGE, newData.length);
    }, function (xhr) {// console.error(xhr); 
    });
  }
};
jQuery(function () {
  MEYER_APP.init();
});
//# sourceMappingURL=main.js.map
