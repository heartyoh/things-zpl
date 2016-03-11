var scaleBuf = {};

function barcode(properties) {
	this.model = properties;

	this.toZpl = function() {
		var height = this.model.height || '';
		var rotate = this.model.rot || '';
		var showText = this.model.showText || '';
		var textAbove = this.model.textAbove || ''
		var text = this.model.text || '';
		var symbol = this.model.symbol;
		var top = this.model.top || '';
		var left = this.model.left || '';
		var scale_w = this.model.scale_w || '';
		var scale_h = this.model.scale_h || '';

		var scale = '';
		var lines = [];
		if(scaleBuf.w != scale_w || scaleBuf.h != scale_h) {
			scaleBuf.w = scale_w;
			scaleBuf.h = scale_h;
			scale = ['^BY'+scale_w, scale_h]

			lines.push(scale)
		} else {
			scale_w = '';
		}

		var symbolMap = new Map([
			['code11', 				['^B1'+rotate, , height, showText, textAbove]],
			['interleaved2of5', 	['^B2'+rotate, height, showText, textAbove, ]],
			['code39', 				['^B3'+rotate, , height, showText, textAbove]],
			['code49', 				['^B4'+rotate, height, showText,]],
			['planet', 				['^B5'+rotate, height, showText, textAbove]],
			['pdf417', 			x	['^B7'+rotate, height, , , , ]],
			['ean8', 				['^B8'+rotate, height, showText, textAbove]],
			['upce', 				['^B9'+rotate, height, showText, textAbove, ]],
			['code93', 				['^BA'+rotate, height, showText, textAbove, ]],
			['codablock', 			['^BB'+rotate, height, , , , ]],
			['code128', 			['^BC'+rotate, height, showText, textAbove, , ]],
			['maxicode', 			['^BD'+rotate, , height, showText, textAbove]],
			['ean13', 				['^BE'+rotate, height, showText, textAbove]],
			['micropdf417', 		['^BF'+'2', , ]],
			['industrial2of5',		['^BI'+rotate, height, showText, textAbove]],
			['standard2of5', 		['^BJ'+rotate, height, showText, textAbove]],
			['ansicodabar', 		['^BK'+rotate, , height, showText, textAbove, , ]],
			['logmars', 			['^BL'+rotate, height, textAbove]],
			['msi', 				['^BM'+rotate, , height, showText, textAbove, ]],
			['plessey', 			['^BP'+rotate, , height, showText, textAbove]],
			['qrcode', 				['^BQ'+'']],	// TODO
			['upca', 				['^BU'+rotate, height, showText, textAbove, ]],
			['datamatrix', 			['^BX'+'']],	// TODO
			['postal', 				['^BZ'+rotate, height, showText, textAbove]]
		]);

		
		var params = symbolMap.get(symbol);

		
		lines.push('^FO' + left + ',' + top)
		lines.push(params.join(','))
		lines.push('^FD' + text)
		lines.push('^FS')

		var zpl = lines.join('\n') + '\n'

		return zpl;
	}
}

exports.Barcode = barcode;