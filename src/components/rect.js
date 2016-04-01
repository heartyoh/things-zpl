function rect(properties) {
  this.model = properties;

  this.toZpl = function(group) {
  	var model = this.model;
		var width = model.width || '';
		var height = model.height || '';
		var lineWidth = model.lineWidth || '' ;
		var fillStyle = model.fillStyle || '';

		var strokeStyle;
		if (model.strokeStyle === 'white' || model.strokeStyle === '#fff'
			|| (model.strokeStyle === '#fff')) {
			strokeStyle = 'W';
		} else {
			strokeStyle = 'B'
		}

		if (fillStyle) {
			if (fillStyle === 'white' || fillStyle === '#fff'
				|| (fillStyle === '#fff')) {
				fillStyle = 'W';
			} else {
				fillStyle = 'B'
			}

			lineWidth = height;
			strokeStyle = fillStyle;
		}

		var left = model.left || '';
		left += group ? group.left || 0 : 0;

		var top = model.top || '';
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

		return zpl;
  }
}

exports.Rect = rect;