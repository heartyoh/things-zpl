function barcode(properties) {
	this.model = properties;

	this.toZpl = function() {
		var zpl = '';
		var height = this.model.height || '';
		var rotate = this.model.rot || '';
		var showText = this.model.showText || '';
		var textAbove = this.model.textAbove || '';

		switch(this.model.symbol) {	
			case 'code11': 				// B1
				var tmp = ['^B1', rotate, 'N', height, showText, textAbove];
				break;
			case 'interleaved2of5': 		// B2
				var tmp = ['^B2', rotate, height, showText, textAbove, 'N'];
				break;
			case 'code39': 				// B3
				var tmp = ['^B3', rotate, 'N', height, showText, textAbove];
				break;
			case 'code49': 				// B4
				var tmp = ['^B4', rotate, height, showText, 'A'];
				break;
			case 'planet': 				// B5
				var tmp = ['^B5', rotate, height, showText, textAbove];
				break;
			case 'pdf417': 				// B7
				var tmp = ['^B7', rotate, height, '0', '1:2', '1:2', 'N'];
				break;
			case 'ean8': 				// B8
				var tmp = ['^B8', rotate, height, showText, textAbove];
				break; 
			case 'upce': 				// B9
				var tmp = ['^B9', rotate, height, showText, textAbove, 'N'];
				break;
			case 'code93': 				// BA
				var tmp = ['^BA', rotate, height, showText, textAbove, 'N'];
				break;
			case 'codablock': 			// BB 	
				// var tmp = ['^BB', rotate, height, 'Y', '1:2', '1:2', 'F'];		디폴트 값 없음
				break;
			case 'code128': 				// BC
				var tmp = ['^BC', rotate, height, showText, textAbove, 'N', 'N'];
				break;
			case 'codemaxicode': 		// BD
				var tmp = ['^BD', '2', '1', '1'];
				break;
			case 'ean13': 				// BE
				var tmp = ['^BE', rotate, height, showText, textAbove];
				break;
			case 'micropdf417': 			// BF
				var tmp = ['^BF', rotate, height, '0'];
				break;
			case 'industrial2of5': 		// BI
				var tmp = ['^BI', rotate, height, showText, textAbove];
				break;
			case 'standard2of5': 			// BJ
				var tmp = ['^BJ', rotate, height, showText, textAbove];
				break;
			case 'ansicodabar': 			// BK
				var tmp = ['^BK', rotate, 'N', height, showText, textAbove, 'A', 'A'];
				break;
			case 'logmars': 				// BL
				var tmp = ['^BL', rotate, height, textAbove];
				break;
			case 'msi': 					// BM
				var tmp = ['^BM', rotate, 'B', height, showText, textAbove, 'N'];
				break;
			case 'plessey': 				// BP
				var tmp = ['^BP', rotate, 'N',  height, showText, textAbove];
				break;
			case 'qrcode': 				// BQ
				// zpl += ('^BQ' + )		디폴트 값 없음
				break;
			case 'upca': 				// BU
				var tmp = ['^BU', rotate, height, showText, textAbove, 'Y'];
				break;
			case 'datamatrix': 			// BX
				// zpl += ('^BX' + rotate + ',' + height + ',' + )		디폴트 값 없음
				break;
			case 'postnet': 				// BZ
				var tmp = ['^BZ', rotate, height, showText, textAbove];
				break;
		}		
		tmp.join(',');

		return zpl;
	}
}

exports.Barcode = barcode;