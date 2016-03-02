// zpl -> model
var converter = require('./src/converter')

var fs = require('fs');
fs.readFile(__dirname + '/samples/sample-001.zpl', function (err, data) {
  if (err) {
    throw err;
  }

  var command = data.toString();
  var converted = converter.convert(command)
	console.log(JSON.stringify(converted, null, 2))
});

// model -> zpl
var reverter = require('./src/reverter')
var sample = require('./samples/sample-001');

var components = sample.sample001;
var command = reverter.revert(components)
console.log(command)


// TEST CODE
