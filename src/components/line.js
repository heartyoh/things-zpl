function line(properties) {
  this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.model.fillStyle === 'White' ? 'W' : 'B';
		var x1 = this.model.x1 || '';
		var x2 = this.model.x2 || '';
		var y1 = this.model.y1 || '';
		var y2 = this.model.y2 || '';

		var left;
		var top;
		var width;
		var height;
		var rotate;

		if(x1 <= x2 && y1 <= y2){
			left = x1
			top = y1
			width = x2 - x1
			height = y2 - y1
			rotate = 'L'
		} else if(x1 >= x2 && y1 <= y2){
			left = x2
			top = y1
			width = x1 - x2
			height = y2 - y1
			rotate = 'R'
		} else if(x1 <= x2 && y1 >= y2){
			left = x1
			top = y2
			width = x2 - x1
			height = y1 - y2
			rotate = 'R'
		} else if(x1 >= x2 && y1 >= y2){
			left = x2
			top  = y2
			width = x1 - x2
			height = y1 - y2
			rotate = 'L'
		}
		
		// height가 0일 때는 (가로선 일 경우) 두께가 width의 길이가 됨.
		if(height == 0){
			var commands = [
		  		['^FO'+left, top],
				['^GD' + height, lineWidth ,width, fillStyle, rotate],
				['^FS']
			];
		} else {
			var commands = [
			  	['^FO'+left, top],
				['^GD' + width, height ,lineWidth, fillStyle, rotate],
				['^FS']
			];
		}		

	  var zpl = '';
	  commands.forEach(c => {
	  	zpl += (c.join(',') + '\n')
	  });

		return zpl;
  }
}

exports.Line = line;