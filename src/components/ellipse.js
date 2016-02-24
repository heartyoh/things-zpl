function ellipse(properties) {
  this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var rx = this.model.rx || '';
		var ry = this.model.ry || '';
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.mode.fillStyle || '';

		if(rx == ry)
			zpl += '^GC' + rx + '.' + ry + ',' + lineWidth + ',' + fillStyle;
		else
			zpl += '^GE' + rx + '.' + ry + ',' + lineWidth + ',' + fillStyle;

		return zpl;
  }
}

exports.Ellipse = ellipse;