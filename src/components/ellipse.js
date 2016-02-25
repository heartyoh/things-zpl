function ellipse(properties) {
	this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var rx = this.model.rx || '';
		var ry = this.model.ry || '';
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.mode.fillStyle || '';

		// TODO calculate ^FO

		if(rx == ry)
			zpl += '^GC' + rx + ','+ lineWidth + ',' + fillStyle;
		else
			zpl += '^GE' + rx + ',' + ry + ',' + lineWidth + ',' + fillStyle;

		zpl += '^FS'
		return zpl;
  }
}

exports.Ellipse = ellipse;