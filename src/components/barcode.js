export function Barcode(properties) {
	this.model = properties;

	function toZpl() {
		var zpl = '';

		switch(this.model.symbol) {
			case 'B1':
				break;
			case 'B2':
				break;
			case 'B3':
				break;
		}

		return zpl;
	}
}