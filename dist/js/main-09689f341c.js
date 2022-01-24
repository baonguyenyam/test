"use strict";

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
} // Main
// FIXED SVG SPACING AROUND 


$(document).ready(function () {
  $.each($('svg, symbol'), function () {
    $(this).attr('x', '0');
    $(this).attr('y', '0');
  });
  $('#icon-shape-1').attr('preserveAspectRatio', 'xMaxYMax slice');
  $('#icon-shape-2').attr('preserveAspectRatio', 'xMaxYMax meet');
});
//# sourceMappingURL=main.js.map
