function ellipse(properties) {
	this.model = properties;

  this.toZpl = function(group) {
		var model = this.model;

		var rx = model.rx || '';
		var ry = model.ry || '';
		var cx = model.cx || '';
		var cy = model.cy || '';
		var lineWidth = model.lineWidth || '';
		var fillStyle = model.fillStyle === 'white' ? 'W' : 'B';

		var left = cx - rx || '0';
		left += group ? group.left || 0 : 0
		var top = cy - ry || '0';
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

		return zpl;
  }
}

exports.Ellipse = ellipse;