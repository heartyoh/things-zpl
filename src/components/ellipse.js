function ellipse(properties) {
	this.model = properties;

  this.toZpl = function(group) {
		var zpl = '';
		var rx = this.model.rx || '';
		var ry = this.model.ry || '';
		var cx = this.model.cx || '';
		var cy = this.model.cy || '';
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.model.fillStyle === 'white' ? 'W' : 'B';

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
			['GC', 		['^GC' + rx, lineWidth, fillStyle]],
			['GE', 		['^GE' + rx, ry, lineWidth, fillStyle]],
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