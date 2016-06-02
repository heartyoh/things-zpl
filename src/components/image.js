
// const exec = require('child_process').exec;

// function getGrf(inputFile, outputFile) {	// input must be local path
// 	// NodeJs
// 	var command = parse('java -jar ZSDK_API.jar graphic %s -s %s', inputFile, outputFile);
// 	exec(command, function(error, stdout, stderr) {
// 	  if (error) {
// 	  	console.log(`exec error: ${error}`);
// 	  	return;
// 	  }

// 		console.log(`stdout: ${stdout}`);
// 		console.log(`stderr: ${stderr}`);
// 	});

// 	var fs = require('fs');
// 	fs.readFile(__dirname + outputFile, function (err, data) {
// 	  if (err) {
// 	    throw err;
// 	  }

// 	  var grfData = data.toString();
// 	  console.log(grfData);
// 	  var converted = converter.convert(command)
// 		// console.log(JSON.stringify(converted, null, 2))
// 	});

// 	return grfData;
// }

// exports.getGrf = getGrf;

function image(properties) {
	this.model = properties;

	this.toZpl = function(group) {
		var model = this.model;
		var top = model.top || '';
		var left = model.left || '';
		var imageGrf = model.imageGrf;

		top += group ? group.top || 0 : 0
    left += group ? group.left || 0 : 0;

    if (!imageGrf) {
    	return '';
    }

    var guid = getGuid();
    var commands = [
			['~DG'+guid, imageGrf],
			['^FO'+left, top],
			['^XG'+'R:'+guid, 1, 1],
			['^PQ'+1],
			['^FS']
    ];

    var zpl = '';
    commands.forEach(c => {
			zpl += c.join(',') + '\n'
		});

    return zpl;
	}
}

exports.Image = image;

function getGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}