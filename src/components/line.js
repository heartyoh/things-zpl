var Rect = require('./rect').Rect

function line(properties) {
  this.model = properties;

  this.toZpl = function(group) {
		var model = this.model;
		var x1 = model.x1 || '';
		var x2 = model.x2 || '';
		var y1 = model.y1 || '';
		var y2 = model.y2 || '';

		var lineWidth = model.lineWidth || '';
		var fillStyle = model.fillStyle === 'White' ? 'W' : 'B';

		var zpl = '';		
		if (x1 === x2 || y1 === y2) {
			zpl = this.gbLine(group);
			return zpl;
		} else {
			var commands = this.gdLine(group);
		}

	  commands.forEach(c => {
	  	zpl += (c.join(',') + '\n')
	  });

		return zpl;
  }

	this.gbLine = function(group) {
		var model = this.model;
		var x1 = model.x1 || '';
		var x2 = model.x2 || '';
		var y1 = model.y1 || '';
		var y2 = model.y2 || '';
		var lineWidth = model.lineWidth || '';

		var strokeStyle = this.model.strokeStyle;

		var left = Math.min(x1, x2);
		var top = Math.min(y1, y2);

		var tx = Math.abs(x2 - x1);
		var ty = Math.abs(y2 - y1);
		var width = tx === 0 ? lineWidth : tx;
		var height = ty === 0 ? lineWidth : ty;

		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		var properties = {
			left: left,
			top: top,
			width: width,
			height: height,
			lineWidth: lineWidth,
			strokeStyle: strokeStyle
		}

		var rect = new Rect(properties);
		return rect.toZpl(group);
  }

  this.gdLine = function(group) {
  	var model = this.model;
		var x1 = model.x1 || '';
		var x2 = model.x2 || '';
		var y1 = model.y1 || '';
		var y2 = model.y2 || '';

		var left = Math.min(x1, x2);
		var top = Math.min(y1, y2);
		var width = Math.abs(x2 - x1);
		var height = Math.abs(y2 - y1);

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
			['^GD' + width, height, this.lineWidth, this.fillStyle, rotate],
			['^FS']
		];

		return commands;
  }
}

exports.Line = line;