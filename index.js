var converter = require('./src/converter')

var fs = require('fs');

fs.readFile(__dirname + '/sample/sample-001.zpl', function (err, data) {
  if (err) {
    throw err;
  }

  var command = data.toString();
  var converted = converter.convert(command)
	console.log(JSON.stringify(converted, null, 2))
});

