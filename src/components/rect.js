function rect(properties) {
  this.model = properties;

  this.toZpl = function() {
	var zpl = '';
	var width = this.model.width || '';
	var height = this.model.height || '';
	var lineWidth = this.model.lineWidth || '';
	var strokeStyle = this.mode.strokeStyle || '';
	var top = this.model.top || '0';
	var left = this.model.left || '0';


    	var symbolMap = new Map([
		['GB', 	['^GB' + width, height ,lineWidth, strokeStyle]]		
	]);

    	var zpl = '';
	var params = symbolMap.get('GB');
	zpl += '^FO' + left + ',' + top + params.join(',') + '^FS';

	return zpl;
  }
}

exports.Rect = rect;