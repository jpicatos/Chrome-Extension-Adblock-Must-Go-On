/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

eval("function getword(info, tab) {\n    chrome.tabs.query({\n        \"active\": true,\n        \"currentWindow\": true\n    }, function (tabs) {\n        chrome.tabs.sendMessage(tabs[0].id, {\n            \"functiontoInvoke\": \"holacaracola\"\n        });\n    });\n}\n\nchrome.contextMenus.create({\n    title: \"Eliminar popup\",\n    contexts: [\"all\"],\n    onclick: getword\n});\n\nchrome.runtime.onMessage.addListener(function (request, sender) {\n    if (request.type == \"changeIcon\") {\n        if (request.options.pause) {\n            chrome.browserAction.setIcon({ path: \"extjav-pause-38.png\" });\n        } else {\n            chrome.browserAction.setIcon({ path: \"48.png\" });\n        }\n    }\n});\n\nchrome.tabs.onActivated.addListener(function (activeInfo) {\n    chrome.tabs.query({\n        \"active\": true,\n        \"currentWindow\": true\n    }, function (tabs) {\n        chrome.tabs.sendMessage(tabs[0].id, {\n            \"functiontoInvoke\": \"changeTab\"\n        });\n    });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvYmFja2dyb3VuZC5qcz9iYzNiIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldHdvcmQoaW5mbywgdGFiKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgICBcImFjdGl2ZVwiOiB0cnVlLFxuICAgICAgICBcImN1cnJlbnRXaW5kb3dcIjogdHJ1ZVxuICAgIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHtcbiAgICAgICAgICAgIFwiZnVuY3Rpb250b0ludm9rZVwiOiBcImhvbGFjYXJhY29sYVwiXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5jaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgdGl0bGU6IFwiRWxpbWluYXIgcG9wdXBcIixcbiAgICBjb250ZXh0czogW1wiYWxsXCJdLFxuICAgIG9uY2xpY2s6IGdldHdvcmRcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyKSB7XG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PSBcImNoYW5nZUljb25cIikge1xuICAgICAgICBpZiAocmVxdWVzdC5vcHRpb25zLnBhdXNlKSB7XG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtwYXRoOiBcImV4dGphdi1wYXVzZS0zOC5wbmdcIn0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7cGF0aDogXCI0OC5wbmdcIn0pO1xuICAgICAgICB9ICAgXG4gICAgfVxufSk7XG5cbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uKGFjdGl2ZUluZm8pIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7XG4gICAgICAgIFwiYWN0aXZlXCI6IHRydWUsXG4gICAgICAgIFwiY3VycmVudFdpbmRvd1wiOiB0cnVlXG4gICAgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwge1xuICAgICAgICAgICAgXCJmdW5jdGlvbnRvSW52b2tlXCI6IFwiY2hhbmdlVGFiXCJcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2JhY2tncm91bmQuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ })

/******/ });