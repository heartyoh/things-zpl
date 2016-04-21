// var sizeOf = require('image-size');
// const exec = require('child_process').exec;

// function toGrf(inputFile, outputFile) {
// 	var dimensions = sizeOf('images/funny-cats.png');
// 	console.log(dimensions.width, dimensions.height);


// 	// NodeJs
// 	// var command = parse('java -jar ZSDK_API.jar graphic %s -s %s', inputFile, outputFile);
// 	// exec(command, function(error, stdout, stderr) {
// 	//   if (error) {
// 	//   	console.log(`exec error: ${error}`);
// 	//   	return;
// 	//   }

// 	// 	console.log(`stdout: ${stdout}`);
// 	// 	console.log(`stderr: ${stderr}`);
// 	// });

// 	if() {

// 	}
// }


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
      // ['^A@'+rotate, charHeight, charWidth * 0.75],
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

function parse(str) {
  var args = [].slice.call(arguments, 1);
  var i = 0;

  return str.replace(/%s/g, function() {
      return args[i++];
  });
}