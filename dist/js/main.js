"use strict";

function getParameterByName(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
} // APP


var MEYER_APP = {
  // REST FULL API 
  MEYER_REST_API: './data/data.json',
  // MEYER_REST_API: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
  MEYER_DEFAULT_PAGE: parseInt(getParameterByName('showItems')) ? parseInt(getParameterByName('showItems')) : 9,
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
      window.location.href = '?showItems=' + $('#showItems').val();
    });
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
      var total = data.length;
      var defaultPage = MEYER_APP.MEYER_DEFAULT_PAGE;
      MEYER_APP.buildShowItem();
      MEYER_APP.buildPaging(defaultPage, total); // // Add Products
      // $.each(data.slice(0,MEYER_APP.MEYER_DEFAULT_PAGE), (i, item) => {
      // 	console.log(item);
      // });
    }, function (xhr) {// console.error(xhr); 
    });
  }
};
jQuery(function () {
  MEYER_APP.init();
});
//# sourceMappingURL=main.js.map
