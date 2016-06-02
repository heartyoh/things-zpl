var T = require('./text')

function rect(properties) {
	this.model = properties;

	this.toZpl = function(group) {
		var {
			width = '',
			height = '',
			lineWidth = '',
			fillStyle = '',
			strokeStyle,
			left,
			top,

			text
		} = this.model

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

			lineWidth = height;
			strokeStyle = fillStyle;
		}

		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;
		
		var commands = [
			['^FO'+left, top],
			['^GB'+width, height, lineWidth, strokeStyle],
			['^FS']
		];

		var zpl = '';
		commands.forEach(c => {
			zpl += (c.join(',') + '\n')
		});
		zpl += '\n';

		// make text command
		if (text) {
			var texts = new T.Text(this.model);
			zpl += texts.toZpl(group);
		}

		return zpl;
	}
}

exports.Rect = rect;