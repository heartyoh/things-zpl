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
				tmp.join(',');
				break;
			case 'interleaved2of5': 		// B2
				var tmp = ['^B2', rotate, height, showText, textAbove, 'N'];
				tmp.join(',');
				break;
			case 'code39': 				// B3
				var tmp = ['^B3', rotate, 'N', height, showText, textAbove];
				tmp.join(',');
				break;
			case 'code49': 				// B4
				var tmp = ['^B4', rotate, height, showText, 'A'];
				tmp.join(',');
				break;
			case 'planet': 				// B5
				var tmp = ['^B5', rotate, height, showText, textAbove];
				tmp.join(',');
				break;
			case 'pdf417': 				// B7
				var tmp = ['^B7', rotate, height, '0', '1:2', '1:2', 'N'];
				tmp.join(',');
				break;
			case 'ean8': 				// B8
				var tmp = ['^B8', rotate, height, showText, textAbove];
				tmp.join(',');
				break; 
			case 'upce': 				// B9
				var tmp = ['^B9', rotate, height, showText, textAbove, 'N'];
				tmp.join(',');
				break;
			case 'code93': 				// BA
				var tmp = ['^BA', rotate, height, showText, textAbove, 'N'];
				tmp.join(',');
				break;
			case 'codablock': 			// BB 	
				// var tmp = ['^BB', rotate, height, 'Y', '1:2', '1:2', 'F'];		디폴트 값 없음
				// tmp.join(',');
				break;
			case 'code128': 				// BC
				var tmp = ['^BC', rotate, height, showText, textAbove, 'N', 'N'];
				tmp.join(',');
				break;
			case 'codemaxicode': 		// BD
				var tmp = ['^BD', '2', '1', '1'];
				tmp.join(',');
				break;
			case 'ean13': 				// BE
				var tmp = ['^BE', rotate, height, showText, textAbove];
				tmp.join(',');
				break;
			case 'micropdf417': 			// BF
				var tmp = ['^BF', rotate, height, '0'];
				tmp.join(',');
				break;
			case 'industrial2of5': 		// BI
				var tmp = ['^BI', rotate, height, showText, textAbove];
				tmp.join(',');
				break;
			case 'standard2of5': 			// BJ
				var tmp = ['^BJ', rotate, height, showText, textAbove];
				tmp.join(',');
				break;
			case 'ansicodabar': 			// BK
				var tmp = ['^BK', rotate, 'N', height, showText, textAbove, 'A', 'A'];
				tmp.join(',');
				break;
			case 'logmars': 				// BL
				var tmp = ['^BL', rotate, height, textAbove];
				tmp.join(',');
				break;
			case 'msi': 					// BM
				var tmp = ['^BM', rotate, 'B', height, showText, textAbove, 'N'];
				tmp.join(',');
				break;
			case 'plessey': 				// BP
				var tmp = ['^BP', rotate, 'N',  height, showText, textAbove];
				tmp.join(',');
				break;
			case 'qrcode': 				// BQ
				// zpl += ('^BQ' + )		디폴트 값 없음
				break;
			case 'upca': 				// BU
				var tmp = ['^BU', rotate, height, showText, textAbove, 'Y'];
				tmp.join(',');
				break;
			case 'datamatrix': 			// BX
				// zpl += ('^BX' + rotate + ',' + height + ',' + )		디폴트 값 없음
				break;
			case 'postnet': 				// BZ
				var tmp = ['^BZ', rotate, height, showText, textAbove];
				tmp.join(',');
				break;
		}		

		return zpl;
	}
}

exports.Barcode = barcode;