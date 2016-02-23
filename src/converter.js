var commands = require('./components/commands')
var commandsMap = commands.commands
var buf = {};

exports.convert = function(zpl) {

	if (!zpl) return;

  var models = [];
  var obj;

	var commands = zpl.split('^');
	commands.forEach((c, i) => {
		if (c.trim().length === 0) return;

		c = c.replace('\n','')

		var command = c.substr(0, 2);
		if (command.substr(0, 1) === 'A') {
  		var params = c.substr(1);
  		
  		var properties = handler(params);
			obj = Object.assign(obj || {}, properties);
		} else {
			switch(command) {
				case 'FS':
					if (!obj.type) {
		  			obj.type = 'fitted_text';
		  		}

		  		obj = specific(obj);
		  		models.push(obj);
		  		
		  		obj = null;
		  		
		  		break;
		  	case 'CF':
		  		var params = c.substr(2).split(',').map(function(value) {
						return value.trim();
					});

			  	var handler = commandsMap.get(command);
			  	if(!handler) return;

					var properties = handler(params);

		  		Object.assign(buf, properties || {});
		  		break;
		  	default:
		  		var params = c.substr(2);
		  		// TODO ~ command

			  	var handler = commandsMap.get(command);
			  	if(!handler) return;

			  	params = params.split(',').map(function(value) {
						return value.trim();
					});

			  	var properties = handler(params);
			  	obj = Object.assign(obj || {}, properties);
			}
		}
	})

  return models;
}


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
			delete obj.roate

			break;
		case 'ellipse':
			obj.cx = obj.left + obj.rx;
			obj.cy = obj.top + obj.yx;

			delete obj.left
			delete obj.top

			break;
		case 'fitted_text':
			if (buf) {
				Object.assign(obj, buf);
			}

			break;
		case 'rect':
			break;
	}

	return obj;
}

function error_log(c) {
	console.log('Command: '+ c + ' parameter error');
}