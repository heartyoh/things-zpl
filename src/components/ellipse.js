var Text = require('./text').Text
var shapeTranscoord = require('./transcoord').shapeTranscoord
var rotateCase = require('./transcoord').rotateCase

function ellipse(properties) {
	this.model = properties;

	this.toZpl = function(group) {
		var {
			rx = '',
			ry = '',
			cx = '',
			cy = '',
			lineWidth = '',
			fillStyle,
			strokeStyle,
			left,
			top,
			rotation,
			text
		} = this.model;

		var rotate = rotateCase(rotation);

		switch(rotate) {
			case 'N':
			case 'I':
			default:
				break;
			case 'R':
			case 'B':
				let tmp = rx;
				rx = ry;
				ry = tmp;

				let startPoint = shapeTranscoord(this.model);
				left = startPoint.x;
				top = startPoint.y;
				break;
		}

		if (strokeStyle === 'white' || strokeStyle === '#fff'
			|| (strokeStyle === '#ffffff')) {
			strokeStyle = 'W';
		} else {
			strokeStyle = 'B'
		}

		if (fillStyle) {
			if (fillStyle === 'white' || fillStyle === '#fff'
				|| (fillStyle === '#ffffff')) {
				fillStyle = 'W';
			} else {
				fillStyle = 'B'
			}

			lineWidth = Math.max(rx, ry);
			strokeStyle = fillStyle;
		}

		left += group ? group.left || 0 : 0
		top += group ? group.top || 0 : 0
		
		var command;
		if(rx === ry)
			command = 'GC'
		else
			command = 'GE'


		var symbolMap = new Map([
			['GC', 		['^GC' + rx*2, lineWidth, strokeStyle]],
			['GE', 		['^GE' + rx*2, ry*2, lineWidth, strokeStyle]],
		]);

		var zpl = [];
		var params = symbolMap.get(command);
		zpl.push('^FO' + left + ',' + top);
		zpl.push(params.join(','));
		zpl.push('^FS');

		zpl = zpl.join('\n');
		zpl += '\n'

		// make text command
		if (text) {
			var texts = new Text(this.model);
			zpl += texts.toZpl(group);
		}

		return zpl;
	}
}

exports.Ellipse = ellipse;