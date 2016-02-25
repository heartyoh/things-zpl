function barcode(properties) {
	this.model = properties;

	this.toZpl = function() {
		var height = this.model.height || '';
		var rotate = this.model.rotate || '';
		var showText = this.model.showText || '';
		var textAbove = this.model.textAbove || ''
		var text = this.model.text || '';
		var symbol = this.model.symbol;

		var symbolMap = new Map([
			['code11', 					['^B1'+rotate, 'N', height, showText, textAbove]],
			['interleaved2of5', ['^B2'+rotate, height, showText, textAbove, 'N']],
			['code39', 					['^B3'+rotate, 'N', height, showText, textAbove]],
			['code49', 					['^B4'+rotate, height, showText, 'A']],
			['planet', 					['^B5'+rotate, height, showText, textAbove]],
			['pdf417', 					['^B7'+rotate, height, '0', '1:2', '1:2', 'N']],
			['ean8', 						['^B8'+rotate, height, showText, textAbove]],
			['upce', 						['^B9'+rotate, height, showText, textAbove, 'N']],
			['code93', 					['^BA'+rotate, height, showText, textAbove, 'N']],
			['codablock', 			['^BB', rotate, height, 'Y', '1:2', '1:2', 'F']],
			['code128', 				['^BC'+rotate, height, showText, textAbove, 'N', 'N']],
			['codemaxicode', 		['^BD'+rotate, 'N', height, showText, textAbove]],
			['ean13', 					['^BE'+rotate, 'N', height, showText, textAbove]],
			['micropdf417', 		['^BF'+'2', '1', '1']],
			['industrial2of5', 	['^BI'+rotate, height, showText, textAbove]],
			['standard2of5', 		['^BJ'+rotate, height, showText, textAbove]],
			['ansicodabar', 		['^BK'+rotate, 'N', height, showText, textAbove, 'A', 'A']],
			['logmars', 				['^BL'+rotate, height, textAbove]],
			['msi', 						['^BM'+rotate, 'B', height, showText, textAbove, 'N']],
			['plessey', 				['^BP'+rotate, 'N',  height, showText, textAbove]],
			['qrcode', 					['^BQ'+'']],
			['upca', 						['^BU'+rotate, height, showText, textAbove, 'Y']],
			['datamatrix', 			['^BX'+'']],
			['postnet', 				['^BZ'+rotate, height, showText, textAbove]]
		]);

		var zpl = '';
		var params = symbolMap.get(symbol);
		zpl += params.join(',');
		

		// TODO text

		return zpl;
	}
}

exports.Barcode = barcode;