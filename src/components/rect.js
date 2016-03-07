function rect(properties) {
  this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var width = this.model.width || '';
		var height = this.model.height || '';
		var lineWidth = this.model.lineWidth || '';
		var strokeStyle = this.model.strokeStyle === 'White' ? 'W' : 'B';
		var top = this.model.top || '';
		var left = this.model.left || '';


	  var commands = [
	  	['^FO'+left, top],
			['^GB'+width, height ,lineWidth, strokeStyle],
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