exports.convert = function(components) {

	if (!components) return;

	var zpl = '';

	components.forEach((c, i) => {
		switch(c.type) {
			case 'text':
				var obj = new Text(c);
				zpl += obj.toZpl();
				break;
			case 'barcode':
				var obj = new Barcode(c);
				zpl += obj.toZpl();
				break;
			case 'rect':
				var obj = new Rect(c);
				zpl += obj.toZpl();
				break;
			case 'image':
				break;
		}
	});

  return zpl;
}