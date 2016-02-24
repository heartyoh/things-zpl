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
				zpl += ('^B1' + rotate + ',' +   'N'   + ',' + height + ',' + showText + ',' + textAbove)
				break;
			case 'interleaved2of5': 		// B2
				zpl += ('^B2' + rotate + ',' + height + ',' + showText + ',' + textAbove + 'N')
				break;
			case 'code39': 				// B3
				zpl += ('^B3' + rotate + ',' +   'N'   + ',' + height   + ',' + showText  + ',' + textAbove)
				break;
			case 'code49': 				// B4
				zpl += ('^B4' + rotate + ',' + height + ',' + showText + ',' + 'A')
				break;
			case 'planet': 				// B5
				zpl += ('^B5' + rotate + ',' + height + ',' + showText + ',' + textAbove)
				break;
			case 'pdf417': 				// B7
				zpl += ('^B7' + rotate + ',' + height + ',' +     '0'    + ',' + 	  '1:2'   + ',' + '1:2' + ',' + 'N')
				break;
			case 'ean8': 				// B8
				zpl += ('^B8' + rotate + ',' + height + ',' + showText + ',' + textAbove)
				break; 
			case 'upce': 				// B9
				zpl += ('^B9' + rotate + ',' + height + ',' + showText + ',' + textAbove +  ',' + 'N')
				break;
			case 'code93': 				// BA
				zpl += ('^BA' + rotate + ',' + height + ',' + showText + ',' + textAbove +  ',' + 'N')
				break;
			case 'codablock': 			// BB
				// zpl += ('^BB' + rotate + ',' + height + ',' + 'Y' + '1:2' + '1:2' + 'F')   	디폴트 값 없음
				break;
			case 'code128': 				// BC
				zpl += ('^BC' + rotate + ',' + height + ',' + showText + ',' + textAbove +  ',' + 'N' + ',' + 'N')
				break;
			case 'codemaxicode': 		// BD
				zpl += ('^BD' +    '2'   + ',' +   '1'   + ',' + '1')
				break;
			case 'ean13': 				// BE
				zpl += ('^BE' + rotate + ',' + height + ',' + showText + ',' + textAbove)
				break;
			case 'micropdf417': 			// BF
				zpl += ('^BF' + rotate + ',' + height + ',' + '0')
				break;
			case 'industrial2of5': 		// BI
				zpl += ('^BI' + rotate + ',' + height + ',' + showText + ',' + textAbove)
				break;
			case 'standard2of5': 			// BJ
				zpl += ('^BJ' + rotate + ',' + height + ',' + showText + ',' + textAbove)
				break;
			case 'ansicodabar': 			// BK
				zpl += ('^BK' + rotate + ',' +   'N' 	 + ',' +   height  + ',' + showText + ',' + textAbove + ',' + 'A' + ',' + 'A')
				break;
			case 'logmars': 				// BL
				zpl += ('^BL' + rotate + ',' + height + ',' + textAbove)
				break;
			case 'msi': 					// BM
				zpl += ('^BM' + rotate + ',' +   '^B'   + ',' +   height  + ',' + showText + ',' + textAbove + ',' + 'N')
				break;
			case 'plessey': 				// BP
				zpl += ('^BP' + rotate + ',' +   'N'   + ',' +   height  + ',' + showText + ',' + textAbove)
				break;
			case 'qrcode': 				// BQ
				// zpl += ('^BQ' + )		디폴트 값 없음
				break;
			case 'upca': 				// BU
				zpl += ('^BU' + rotate + ',' + height + ',' + showText + ',' + textAbove + ',' + 'Y')
				break;
			case 'datamatrix': 			// BX
				// zpl += ('^BX' + rotate + ',' + height + ',' + )		디폴트 값 없음
				break;
			case 'postal': 				// BZ
				zpl += ('^BZ' + rotate + ',' + height + ',' + showText + ',' + textAbove)
				break;
		}		

		return zpl;
	}
}

exports.Barcode = barcode;