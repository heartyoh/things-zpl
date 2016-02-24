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



// var dateExp = [
// 	['%a', { 
// 		desc: 'is replaced by the abbreviated weekday name'
// 	}],
// 	['%A', {
// 		desc: 'is replaced by the weekday name'
// 	}],
// 	['%b', {
// 		desc: 'is replaced by the abbreviated month name'
// 	}],
// 	['%B', {
// 		desc: 'is replaced by the month name'
// 	}],
// 	['%d', {
// 		desc: 'is replaced by the day of month number, 0 to 31'
// 	}],
// 	['%H', {
// 		desc: 'is replaced by the hour of the day (military), 0 to 23'
// 	}],
// 	['%I', {
// 		desc: 'is replaced by the hour of the day (civilian), 0 to 23'
// 	}],
// 	['%j', {
// 		desc: ''
// 	}],
// 	['%m', {
// 		desc: ''
// 	}],
// 	['%M', {
// 		desc: ''
// 	}],
// 	['%p', {
// 		desc: ''
// 	}],
// 	['%S', {
// 		desc: ''
// 	},
// 	['%U', {
// 		desc: ''
// 	},
// 	['%W', {
// 		desc: ''
// 	},
// 	['%w', {
// 		desc: ''
// 	},
// 	['%y', {
// 		desc: ''
// 	},
// 	['%Y', {
// 		desc: ''
// 	}]
// ];