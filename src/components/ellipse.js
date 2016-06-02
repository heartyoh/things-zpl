var Text = require('./text').Text

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
			left,
			top,

			text
		} = this.model;

		if (fillStyle === 'white' || fillStyle === '#fff'
			|| (fillStyle === '#ffffff')) {
			fillStyle = 'W';
		} else {
			fillStyle = 'B'
		}

		left += group ? group.left || 0 : 0
		top += group ? group.top || 0 : 0
		
		var command;
		if(rx === ry)
			command = 'GC'
		else
			command = 'GE'


		var symbolMap = new Map([
			['GC', 		['^GC' + rx*2, lineWidth, fillStyle]],
			['GE', 		['^GE' + rx*2, ry*2, lineWidth, fillStyle]],
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