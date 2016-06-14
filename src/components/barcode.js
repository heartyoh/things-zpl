var config = require('../../config').config
var shapeTranscoord = require('./transcoord').shapeTranscoord
var rotateCase = require('./transcoord').rotateCase

function barcode(properties) {
	this.model = properties;

	this.toZpl = function(group) {
		var {
			left = '',
			top = '',
			width = '',
			height = '',
			symbol = '',
			rotation = '',
			scale_w = 1,
			showText = 'Y',
			textAbove = '',
			text = ''
		} = this.model;

		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		var rotate = rotateCase(rotation);

		switch(rotate) {
			case 'N':
			case 'I':
			default:
				break;
			case 'R':
			case 'B':
				let startPoint = shapeTranscoord(this.model);
				left = startPoint.x;
				top = startPoint.y;
				break;
		}

		var lines = [];
		lines.push(['^BY'+scale_w, 3])

		if (showText && symbol != 'qrcode') {
			height -= (scale_w * 6 + 8);	// barcode 높이는 문자 뺀 다음의 높이임.
		}

		var dpi = config.dpi;	// FIXME

		var symbolMap = new Map([
			['code11', 					['^B1'+rotate, , height, showText, textAbove]],
			['interleaved2of5', ['^B2'+rotate, height, showText, textAbove, ]],
			['code39', 					['^B3'+rotate, , height, showText, textAbove]],
			['code49', 					['^B4'+rotate, height, showText,]],
			['planet', 					['^B5'+rotate, height, showText, textAbove]],
			['pdf417', 					['^B7'+rotate, height, , , , ]],
			['ean8', 						['^B8'+rotate, height, showText, textAbove]],
			['upce', 						['^B9'+rotate, height, showText, textAbove, ]],
			['code93', 					['^BA'+rotate, height, showText, textAbove, ]],
			['codablock', 			['^BB'+rotate, height, , , , ]],
			['code128', 				['^BC'+rotate, height, showText, textAbove, , ]],
			['maxicode', 				['^BD'+rotate, , height, showText, textAbove]],
			['ean13', 					['^BE'+rotate, height, showText, textAbove]],
			['micropdf417', 		['^BF'+'2', , ]],
			['industrial2of5',	['^BI'+rotate, height, showText, textAbove]],
			['standard2of5', 		['^BJ'+rotate, height, showText, textAbove]],
			['ansicodabar', 		['^BK'+rotate, , height, showText, textAbove, , ]],
			['logmars', 				['^BL'+rotate, height, textAbove]],
			['msi', 						['^BM'+rotate, , height, showText, textAbove, ]],
			['plessey', 				['^BP'+rotate, , height, showText, textAbove]],
			['qrcode', 					['^BQ'+rotate, 2, Math.round(height / 19.54)]],
			['upca', 						['^BU'+rotate, height, showText, textAbove, ]],
			['datamatrix', 			['^BX'+'']],	// TODO
			['postal', 					['^BZ'+rotate, height, showText, textAbove]]
		]);

		
		var params = symbolMap.get(symbol);

		lines.push('^FO' + left + ',' + top)
		lines.push(params.join(','))
		if (symbol === 'qrcode') {
			lines.push('^FDQ,' + 'A' + text);
		} else {
			lines.push('^FD' + text);
		}
		
		lines.push('^FS')

		var zpl = lines.join('\n') + '\n'

		return zpl;
	}
}

exports.Barcode = barcode;