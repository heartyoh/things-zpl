// var zpl = require("./src/api");
var zpl = require("./lib/api");

if (typeof window !== 'undefined')
  window.zpl = zpl

if (typeof exports !== 'undefined') {
	exports.zpl = zpl;
}