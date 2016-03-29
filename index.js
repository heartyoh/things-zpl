var zpl = require("./src/api");

if (typeof window !== 'undefined')
  window.zpl = zpl

if (typeof exports !== 'undefined') {
	exports.zpl = zpl;
}