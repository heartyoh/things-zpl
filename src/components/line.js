var Rect = require('./rect').Rect

function line(properties) {
  this.model = properties;

  this.toZpl = function(group) {
		var {
			x1 = '',
			x2 = '',
			y1 = '',
			y2 = '',
			fillStyle
 		} = this.model;

		if (fillStyle === 'white' || fillStyle === '#fff'
			|| (fillStyle === '#ffffff')) {
			fillStyle = 'W';
		} else {
			fillStyle = 'B'
		}

		var zpl = '';		
		if (Math.round(x1*100) === Math.round(x2*100) || Math.round(y1*100) === Math.round(y2*100)) {
			zpl = gbLine.call(this, group);
			return zpl;
		} else {
			var commands = gdLine.call(this, group);
		}

	  commands.forEach(c => {
	  	zpl += (c.join(',') + '\n')
	  });

		return zpl;
  }
}

function gbLine(group) {	// graphic box
	var {
		x1 = '',
		x2 = '',
		y1 = '',
		y2 = '',
		lineWidth,
		strokeStyle,
		rotation = 0
	} = this.model;

	if (strokeStyle === 'white' || strokeStyle === '#fff'
		|| (strokeStyle === '#ffffff')) {
		strokeStyle = 'W';
	} else {
		strokeStyle = 'B'
	}

	var left = Math.min(x1, x2);
	var top = Math.min(y1, y2);

	var tx = Math.abs(x2 - x1);
	var ty = Math.abs(y2 - y1);
	var width = tx === 0 ? lineWidth : tx;
	var height = ty === 0 ? lineWidth : ty;

	var properties = { left, top, width, height, lineWidth, strokeStyle };
	var rect = new Rect(properties);
	return rect.toZpl(group);
}

function gdLine(group) {
	var {
		x1 = '',
		x2 = '',
		y1 = '',
		y2 = '',
		lineWidth = '',
		strokeStyle
	} = this.model;

	if (strokeStyle === 'white' || strokeStyle === '#fff'
		|| (strokeStyle === '#ffffff')) {
		strokeStyle = 'W';
	} else {
		strokeStyle = 'B'
	}

	var left = Math.min(x1, x2);
	var top = Math.min(y1, y2);
	var width = Math.abs(x2 - x1);
	var height = Math.abs(y2 - y1);

	var rotate;
	if(x1 <= x2 && y1 <= y2) {
		rotate = 'L'
	} else if(x1 >= x2 && y1 >= y2) {
		rotate = 'L'
	} else if(x1 >= x2 && y1 <= y2) {
		rotate = 'R'
	} else if(x1 <= x2 && y1 >= y2) {
		rotate = 'R'
	}
	
	left += group ? group.left || 0 : 0;
	top += group ? group.top || 0 : 0;

	var commands = [
		['^FO'+left, top],
		['^GD' + width, height, lineWidth, strokeStyle, rotate],
		['^FS']
	];

	return commands;
}

exports.Line = line;