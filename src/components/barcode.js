var config = require('../../config').config

var scaleBuf = {};

function barcode(properties) {
	this.model = properties;

	this.toZpl = function() {
		var {
			height = '',
			rotation = '',
			showText = 'Y',
			textAbove = '',
			text = '',
			symbol,
			top = '',
			left = '',
			scale_w = '',
			scale_h = ''
		} = this.model;

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

		if (showText) {
			height = height / 1.2;	// barcode 높이는 문자 뺀 다음의 높이임.
		}

		var dpi = config.dpi;	// FIXME

		var symbolMap = new Map([
			['code11', 					['^B1'+rotation, , height, showText, textAbove]],
			['interleaved2of5', ['^B2'+rotation, height, showText, textAbove, ]],
			['code39', 					['^B3'+rotation, , height, showText, textAbove]],
			['code49', 					['^B4'+rotation, height, showText,]],
			['planet', 					['^B5'+rotation, height, showText, textAbove]],
			['pdf417', 					['^B7'+rotation, height, , , , ]],
			['ean8', 						['^B8'+rotation, height, showText, textAbove]],
			['upce', 						['^B9'+rotation, height, showText, textAbove, ]],
			['code93', 					['^BA'+rotation, height, showText, textAbove, ]],
			['codablock', 			['^BB'+rotation, height, , , , ]],
			['code128', 				['^BC'+rotation, height, showText, textAbove, , ]],
			['maxicode', 				['^BD'+rotation, , height, showText, textAbove]],
			['ean13', 					['^BE'+rotation, height, showText, textAbove]],
			['micropdf417', 		['^BF'+'2', , ]],
			['industrial2of5',	['^BI'+rotation, height, showText, textAbove]],
			['standard2of5', 		['^BJ'+rotation, height, showText, textAbove]],
			['ansicodabar', 		['^BK'+rotation, , height, showText, textAbove, , ]],
			['logmars', 				['^BL'+rotation, height, textAbove]],
			['msi', 						['^BM'+rotation, , height, showText, textAbove, ]],
			['plessey', 				['^BP'+rotation, , height, showText, textAbove]],
			['qrcode', 					['^BQ'+rotation, 2, Math.floor(height / dpi)]],	// TODO
			['upca', 						['^BU'+rotation, height, showText, textAbove, ]],
			['datamatrix', 			['^BX'+'']],	// TODO
			['postal', 					['^BZ'+rotation, height, showText, textAbove]]
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