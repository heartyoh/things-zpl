// zpl -> model
var converter = require('./lib/converter')
// var converter = require('./src/converter')

var fs = require('fs');
fs.readFile(__dirname + '/samples/sample.zpl', function (err, data) {
  if (err) {
    throw err;
  }

  var command = data.toString();
  var converted = converter.convert(command)
	console.log(JSON.stringify(converted, null, 2))
});



// model -> zpl
var reverter = require('./lib/reverter')
// var reverter = require('./src/reverter')
// var sample = require('./samples/sample-group');
// var sample = require('./samples/sample-label');
// var sample = require('./samples/sample-line');
var sample = require('./samples/sample-rect');
// var sample = require('./samples/sample-text');

var components = sample.sample;
var command = reverter.revert(components)
console.log(command)

// TEST CODE
