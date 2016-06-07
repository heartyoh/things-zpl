var T = require('./text')
var shapeTranscoord = require('./transcoord').shapeTranscoord

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
			rotation,
			text
		} = this.model

		var rotate = ''
    if (Math.PI * -0.25 < rotation && rotation <= Math.PI * 0.25) {
      rotate = 'N'
    } else if (Math.PI * 0.25 < rotation && rotation <= Math.PI * 0.75) {
      rotate = 'R'
    } else if (Math.PI * 0.75 < rotation && rotation <= Math.PI * 1.25) {
      rotate = 'I'
    } else if (Math.PI < rotation * 1.25 && rotation <= Math.PI * 1.75) {
      rotate = 'B'
    }

    switch(rotate) {
    	case 'N':
    	case 'I':
    	default:
    		break;
    	case 'R':
    	case 'B':
    		let tmp = width;
    		width = height;
    		height = tmp;

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