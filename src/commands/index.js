var barcodes = require('./barcodes').barcodes
var common = require('./common').common
var fields = require('./fields').fields
var fonts = require('./fonts').fonts
var shapes = require('./shapes').shapes

var commands = function() {
	var types = [barcodes, common, fields, fonts, shapes];

	var commands = {};
	types.forEach((obj, idx) => {
		Object.assign(commands, obj);
	});

	return commands;
}()

exports.commands = commands