function rect(properties) {
  this.model = properties;

  this.toZpl = function(group) {
		var zpl = '';
		var width = this.model.width || '';
		var height = this.model.height || '';
		var lineWidth = this.model.lineWidth || '';
		var strokeStyle = this.model.strokeStyle === 'white' ? 'W' : 'B';
		
		var left = this.model.left || '';
		left += group ? group.left || 0 : 0;

		var top = this.model.top || '';
		top += group ? group.top || 0 : 0;
		
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