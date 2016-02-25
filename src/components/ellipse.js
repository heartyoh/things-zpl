function ellipse(properties) {
	this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var rx = this.model.rx || 0;
		var ry = this.model.ry || 0;
		var cx = this.model.cx || 0;
		var cy = this.model.cy || 0;
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.model.fillStyle || '';
		var left = cx - rx || '0';
		var top = cy - ry || '0';
		var symbol;

		if(rx == ry)
			symbol = 'GC'
		else
			symbol = 'GE'


		var symbolMap = new Map([
			['GC', 		['^GC' + rx, lineWidth, fillStyle]],
			['GE', 		['^GE' + rx, ry, lineWidth, fillStyle]]
		]);

		var zpl = '';
		var params = symbolMap.get(symbol);
		zpl += '^FO' + left + ',' + top + params.join(',') + '^FS';


		return zpl;
  }
}

exports.Ellipse = ellipse;