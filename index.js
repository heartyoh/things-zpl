var converter = require('./src/converter')
var reverter = require('./src/converter')

var fs = require('fs');

// zpl -> model
fs.readFile(__dirname + '/sample/sample-001.zpl', function (err, data) {
  if (err) {
    throw err;
  }

  var command = data.toString();
  var converted = converter.convert(command)
	console.log(JSON.stringify(converted, null, 2))
});


// model -> zpl
fs.readFile(__dirname + '/sample/sample-001.js', function (err, data) {
  if (err) {
    throw err;
  }

  var models = data.toString();
  var converted = reverter.convert(models)
	console.log(JSON.stringify(converted, null, 2))
});
