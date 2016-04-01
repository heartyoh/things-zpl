function line(properties) {
  this.model = properties;

  this.toZpl = function(group) {
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

		left = Math.min(x1, x2);
		top = Math.min(y1, y2);
		width = Math.abs(x2 - x1)
		height = Math.abs(y2 - y1)

		if(x1 <= x2 && y1 <= y2){
			rotate = 'L'
		} else if(x1 >= x2 && y1 >= y2) {
			rotate = 'L'
		} else if(x1 >= x2 && y1 <= y2) {
			rotate = 'R'
		} else if(x1 <= x2 && y1 >= y2) {
			rotate = 'R'
		}
		
		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		/* 
		 * height가 0일 때(가로선 일 경우)는 두께가 width의 길이가 됨.
		 * 하지만 일직선이라도 정확히 0이 나오지 않는 경우가 있어 대략 1이하 정도는 0으로 판단
		 */
		if(height <= 1) {
			var commands = [
				['^FO'+left, top],
				['^GD' + 0, lineWidth, width, fillStyle, rotate],
				['^FS']
			];
		} else {
			var commands = [
				['^FO'+left, top],
				['^GD' + width, height, lineWidth, fillStyle, rotate],
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