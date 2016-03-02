var commands = require('./components/commands')
var commandsMap = commands.commands

var fontBuf;
var barcodeBuf;
var imageBuf;

exports.convert = function(zpl) {

	if (!zpl) return;

  fontBuf = {};
	barcodeBuf = {};
	imageBuf = new Map();

	var models = [];
	var obj;

	var commands = zpl.split('^');
	commands.forEach((c, i) => {
		if (c.trim().length === 0) return;

		c = c.replace('\n','')
		var command = c.substr(0, 2);
		var commandHandler = commandsMap.get(command);

		if(!commandHandler) return;


		if (command.substr(0, 1) === 'A') {
  		var params = c.substr(1);
  		
  		var properties = commandHandler.handler(params);
			obj = Object.assign(obj || {}, properties);

			return;
		}

		var params;
		if (command === 'FD') {
			params = c.substr(2);
		} else {
			params = c.substr(2).split(',').map(function(value) {
				return value.trim();
			});
		}

		var properties = commandHandler.handler(params);

		switch(command) {
			case 'FS':
				if (!obj.type) {
	  			obj.type = 'text';
	  			obj.textAlign = 'left';
	  			obj.textType = 'F';
	  		}

	  		obj = specific(obj);
	  		models.push(obj);
	  		
	  		obj = null;
	  		break;

	  	case 'BY':
	  		Object.assign(barcodeBuf, properties || {});
	  		break;

	  	case 'CF':
	  		Object.assign(fontBuf, properties || {});
	  		break;

	  	default:
		  	obj = Object.assign(obj || {}, properties);
		}
	})

  return models;
}

function dashParser(zpl) {
  var startIdx = zpl.indexOf('~');
  var tmp = zpl.substr(startIdx + 1);
  var endIdx = Math.min(command.indexOf('~'), command.indexOf('^'));

  var dashCommand = zpl.substr(startIdx, endIdx);
  var command = dashCommand.substr(0, 2);
  switch(command) {
  	case 'DG':
  		var commandHandler = commandsMap.get(command);
  		var properties = commandHandler.handler(params);
  		imageBuf.set(properties.id, properties.data);

  		break;
  	case '':
  		break;
  }

  zpl.replace(dashCommand, '');
  dashParser(zpl);

 	return zpl;
}

const ratio = 7.5 / 10; // pt : px
function specific(obj) {
	switch(obj.type) {
		case 'line':
			obj.x1 = obj.left
			obj.x2 = obj.left + obj.width;
			if (obj.rotate === 'L') {
				obj.y1 = obj.top
				obj.y2 = obj.top + obj.height;
			} else {	// default is 'R'
				obj.y1 = obj.top + obj.height;
				obj.y2 = obj.top;
			}
			
			delete obj.left
			delete obj.top
			delete obj.width
			delete obj.height
			delete obj.rotate

			break;
		case 'ellipse':
			obj.cx = obj.left + obj.rx;
			obj.cy = obj.top + obj.ry;

			delete obj.left
			delete obj.top

			break;
		case 'text':
			if (fontBuf) {
				obj.height = fontBuf.height * ratio
				obj.width = fontBuf.width * obj.text.length * ratio * 4/9
			}
			break;

		case 'rect':
			break;

		case 'image_view':
			
			break;
	}

	return obj;
}

function error_log(c) {
	console.log('Command: '+ c + ' parameter error');
}