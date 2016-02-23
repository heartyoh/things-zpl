function barcode(properties) {
	this.model = properties;

	function toZpl() {
		var zpl = '';
		var height = this.model.height;
		var rotate = this.model.rot;
		var showText = this.model.showText;
		var textAbove = this.model.textAbove;

		switch(this.model.symbol) {
			case 'code11': 	// B1
				zpl += ('B1' + rotate + ',' + 'N' + ',' + height + ',' + showText + ',' + textAbove)
				break;
			case 'interleaved2of5': 	// B2
				break;
			case 'code39': 	// B3
				break;
		}

		return zpl;
	}
}

exports.Barcode = barcode;