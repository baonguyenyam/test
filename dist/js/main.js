/**
 * @license
 * Copyright LIFT Creations All Rights Reserved.
 * Coding by Nguyen Pham
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://baonguyenyam.github.io/cv
 */
'use strict';

(function (window) {
  var last = +new Date();
  var delay = 100; // default delay
  // Manage event queue

  var stack = [];

  function callback() {
    var now = +new Date();

    if (now - last > delay) {
      for (var i = 0; i < stack.length; i++) {
        stack[i]();
      }

      last = now;
    }
  } // Public interface


  var liftDOMChange = function liftDOMChange(fn, newdelay) {
    if (newdelay) delay = newdelay;
    stack.push(fn);
  }; // Naive approach for compatibility


  function naive() {
    var last = document.querySelector('#lift-chat-box');
    var lastlen = last.length;
    var timer = setTimeout(function check() {
      // get current state of the document
      var current = document.querySelector('#lift-chat-box');
      var len = current.length; // if the length is different
      // it's fairly obvious

      if (len != lastlen) {
        // just make sure the loop finishes early
        last = [];
      } // go check every element in order


      for (var i = 0; i < len; i++) {
        if (current[i] !== last[i]) {
          callback();
          last = current;
          lastlen = len;
          break;
        }
      } // over, and over, and over again


      setTimeout(check, delay);
    }, delay);
  } //
  //  Check for mutation events support
  //


  var support = {};
  var el = document.documentElement;
  var remain = 3; // callback for the tests

  function decide() {
    if (support.DOMNodeInserted) {
      window.addEventListener("DOMContentLoaded", function () {
        if (support.DOMSubtreeModified) {
          // for FF 3+, Chrome
          el.addEventListener('DOMSubtreeModified', callback, false);
        } else {
          // for FF 2, Safari, Opera 9.6+
          el.addEventListener('DOMNodeInserted', callback, false);
          el.addEventListener('DOMNodeRemoved', callback, false);
        }
      }, false);
    } else if (document.onpropertychange) {
      // for IE 5.5+
      document.onpropertychange = callback;
    } else {
      // fallback
      naive();
    }
  } // checks a particular event


  function test(event) {
    el.addEventListener(event, function fn() {
      support[event] = true;
      el.removeEventListener(event, fn, false);
      if (--remain === 0) decide();
    }, false);
  } // attach test events


  if (window.addEventListener) {
    test('DOMSubtreeModified');
    test('DOMNodeInserted');
    test('DOMNodeRemoved');
  } else {
    decide();
  } // do the dummy test


  var dummy = document.createElement("div");
  el.appendChild(dummy);
  el.removeChild(dummy); // expose

  window.liftDOMChange = liftDOMChange;
})(window);
/**
 * @license
 * Copyright LIFT Creations All Rights Reserved.
 * Coding by Nguyen Pham
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://baonguyenyam.github.io/cv
 */


'use strict';

(function (funcName, baseObj) {
  funcName = funcName || "LIFTReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;

  function ready() {
    if (!readyFired) {
      readyFired = true;

      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
      }

      readyList = [];
    }
  }

  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  }

  baseObj[funcName] = function (callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for LIFTReady(fn) must be a function");
    }

    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      readyList.push({
        fn: callback,
        ctx: context
      });
    }

    if (document.readyState === "complete") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }

      readyEventHandlersInstalled = true;
    }
  };
})("LIFTReady", window);

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
