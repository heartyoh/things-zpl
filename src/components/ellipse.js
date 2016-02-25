function ellipse(properties) {
	this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var rx = this.model.rx || '';
		var ry = this.model.ry || '';
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.mode.fillStyle || '';
		var top = this.model.top || '0';
		var left = this.model.left || '0';
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