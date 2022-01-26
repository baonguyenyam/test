/**
 * @license
 * Coding by Nguyen Pham
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://baonguyenyam.github.io/cv
 */
'use strict';

(function (funcName, baseObj) {
  funcName = funcName || "NguyenAppReady";
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
      throw new TypeError("callback for NguyenAppReady(fn) must be a function");
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
})("NguyenAppReady", window);

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
} // APP


var NGUYEN_APP = {
  // REST FULL API 
  REST_API: './data/data.json',
  // REST_API: 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
  // This code to load JSON data from REST API without jQuery 
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
  // Call API 
  getData: function getData() {
    NGUYEN_APP.jsonLoad(NGUYEN_APP.REST_API, function (data) {
      console.log(data);
    }, function (xhr) {
      console.error(xhr);
    });
  },
  // Init APP 
  init: function init() {
    console.log(NGUYEN_APP.getData());
  }
}; // This code will be watching Browser ready without jQuery

NguyenAppReady(function () {
  // var lift_chat_element = document.getElementById("lift-chat-box");
  // if(typeof(lift_chat_element) != 'undefined' && lift_chat_element != null && lift_chat_element != "") {
  // 	LIFT_CHAT_APP.init()
  // } else {
  // 	document.body.appendChild(LIFT_CHAT_APP.mainHTML())
  // 	LIFT_CHAT_APP.init()
  // }
  NGUYEN_APP.init();
});
//# sourceMappingURL=main.js.map
