function rect(properties) {
  this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var width = this.model.width || '';
		var height = this.model.height || '';
		var lineWidth = this.model.lineWidth || '';
		var strokeStyle = this.mode.strokeStyle || '';


    zpl += 'GB' + ',' + width + '.' + height + ',' + lineWidth + ',' + strokeStyle;

    return zpl;
  }
}

exports.Rect = rect;