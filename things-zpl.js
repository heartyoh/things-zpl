(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var zpl = require("./src/api");

if(window)
  window.zpl = zpl

},{"./src/api":2}],2:[function(require,module,exports){
exports.convert = require('./converter').convert
exports.revert = require('./reverter').revert
},{"./converter":9,"./reverter":10}],3:[function(require,module,exports){
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
			['pdf417', 				['^B7'+rotate, height, , , , ]],
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
},{}],4:[function(require,module,exports){
exports.commands = new Map([
	['A', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = {};
			var sign = params.substr(0, 1);
			params = params.substr(1);

			if(sign === '@') {	// ^A@o,h,w,d:o.x	// o: rotation(n,r,i,b), d: drive location of font, o: font name, x: extension
				var p = params.split(',');
				obj.charHeight = parseInt(p[1]);		// FIXME
				obj.charWidth = parseInt(p[2]);

				if(p.length === 4) {
					var fonts = p[3];
					switch(fonts.substr(0, 1)) {
						case 'R':
							break;
						case 'E':
							break;
						case 'B':
							break;
						case 'A':
							break;
					}

					fonts = fonts.substr(2);
					var i = fonts.indexOf('.');
					fonts = fonts.substr(0, i);
					obj.fontFamily = fonts;
				} else if (p.length === 3) {

				} else {
					error_log('A@');
					return;
				}

				obj.rotation = getRotation(p[0]);
				
				return obj;
			} else {
				var p = params.split(',');

				obj.charHeight = parseInt(p[1]);		// FIXME
				obj.charWidth = parseInt(p[2]);

				switch(p[0]) {
					// TODO font family
					case '0':
						obj.fontFamily = 'serif'	// FIXME
						break;
				}

				return obj;
			}
		}
	}],
	['B1', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = oehfg(p);
			obj.symbol = 'code11';
			return obj;
		}
	}],
	['B2', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = ohfge(p);
			obj.symbol = 'interleaved2of5';
			return obj;
		}
	}],
	['B3', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = oehfg(p);
			obj.symbol = 'code39';
			return obj;
		}
	}],
	['B4', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = ohfm(p);
			obj.symbol = 'code49';
			return obj;
		}
	}],
	['B5', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'planet'
			return obj;
		}
	}],
	['B7', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrt(params);
			obj.symbol = 'pdf417'
			return obj;
		}
	}],
	['B8', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean8'
			return obj;
		}
	}],
	['B9', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'upce'
			return obj;
		}
	}],
	['BA', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'code93'
			return obj;
		}
	}],
	['BB', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrm(params);
			obj.symbol = 'codablock'
			return obj;
		}
	}],
	['BC', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfgem(params);
			obj.symbol = 'code128'
			return obj;
		}
	}],
	['BD', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = mpt(params);
			obj.symbol = 'maxicode'
			return obj;
		}
	}],
	['BE', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean13'
			return obj;
		}
	}],
	['BF', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohm(params);
			obj.symbol = 'micropdf417'
			return obj;
		}
	}],
	['BI', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'industrial2of5'
			return obj;
		}
	}],
	['BJ', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'standard2of5'
			return obj;
		}
	}],
	['BK', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfgkl(params);
			obj.symbol = 'ansicodabar'
			return obj;
		}
	}],
	['BL', {
		desc: '',
		parameters: '',
		handler: function(params) {	
			var obj = ohg(params);
			obj.symbol = 'logmars'
			return obj;
		}
	}],
	['BM', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfge(params);
			obj.symbol = 'msi'
			return obj;
		}
	}],
	['BP', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfg(params);
			obj.symbol = 'plessey'
			return obj;
		}
	}],
	['BQ', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = abcq(params);
			obj.symbol = 'qrcode'
			return obj;
		}
	}],
	['BS', {
		desc: '',
		parameters: '',
		handler: function(params) {
			// var obj = ohfg(params);
			// obj.symbol = 'upcextension'	// 우리 라이브러리에 없음
			// return obj;
		}
	}],
	['BU', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'upca'
			return obj;
		}
	}],
	['BX', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrfg(params);
			obj.symbol = 'datamatrix'
			return obj;
		}
	}],
	['BY', {
		desc: '',
		parameters: '',
		handler: function(params) {	// barcode field default
			var obj = {};
			obj.scale_w = params[0]
			// params[1]
			obj.height = params[2]

			return obj;
		}
	}],
	['BZ', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'postal'
			return obj;
		}
	}],
	['CF', {
		desc: 'The ^CF command sets the default font used in your printer.',
		parameters: '^CFf,h,w',
		handler: function(p) {	// ^CFf,h,w : f: font
			var obj = {};
			obj.charHeight = parseInt(p[1]);
			obj.charWidth = parseInt(p[2]);
			switch(p[0]) {
				case 0:
					obj.fontFamily = 'serif';
					break;
				default:
					obj.fontFamily = 'serif';
					break;
			}

			return obj;
		}
	}],
	['CW', {
		desc: 'Font Identifier',
		parameters: '^CWa,d:o.x: a(A~Z, 0~9)',
		handler: function(p) {	// TODO

		}
	}],
	['DG', {
		desc: 'Download Graphic use with ^XG',
		parameters: '^DGd:o.x,t,w,data: t: total number of bytes in graphic, w: number of bytes per row, data: ASCII hexadecimal string defining image',
		handler: function(p) {
			var obj = {};
			obj.id = p[0]
			obj.totalSize = p[1]
			obj.rowSize = p[2]
			obj.data = p[3]
		}
	}],
	['FB', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^FBa,b,c,d,e: Field Block(automatic word-wrap): 	// TODO

			var obj = {};
			obj.textType = 'W';
			obj.width = parseInt(p[0])			// 행의 너비
			obj.maxLines = parseInt(p[1])		// 최대행수
			obj.lineMargin = parseInt(p[2])		// 줄 간격
			
			switch(p[3]) {
				case 'L':
					obj.textAlign = 'left'
					break;
				case 'C':
					obj.textAlign = 'center'
					break;
				case 'R':
					obj.textAlign = 'right'
					break;
				case 'J':
					obj.textAlign = 'justified'
					break;
				default:
					obj.textAlign = textAlign;
			}

			obj.hangingIndent = parseInt(p[4])		// 두번째 줄 띄어쓰기
			return obj
		}
	}],
	['FC', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^FCa,b,c: Field Clock	// TODO
			var obj = {};
		}
	}],
	['FD', {
		desc: '',
		parameters: '',
		handler: function(p) {
			
			// if () {	// check DATE
			// }
			p = p.trim();	// 바코드 양 끝의 공백은 출력되지 않으므로 trim 적용

			return { text: p }
		}
	}],
	['FO', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^FOx,y
			if (p.length != 2) {
				error_log('FO');
				return;
			}

			return { left: parseInt(p[0]), top: parseInt(p[1]) }
		}
	}],
	['FS', {
		desc: '',
		parameters: '',
		handler: function(p) {
		}
	}],
	['FX', {
		desc: '',
		parameters: '',
		handler: function(p) {
		}
	}],
	['GB', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GBw,h,t,c,r : t: border thickness, c: line color, r: degree of corner-rounding	
			var obj = {};
			obj.type = 'rect'
			obj.innerBorder = true
			obj.width = parseInt(p[0])
			obj.height = parseInt(p[1])
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3]

			return obj
		}
	}],
	['GC', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GCd,t,c : d: circle diameter	
			var obj = {};
			obj.type = 'ellipse'
			obj.rx = parseInt(p[0])
			obj.ry = parseInt(p[0])
			obj.lineWidth = parseInt(p[1])
			obj.fillStyle = p[2]

			return obj
		}
	}],
	['GD', {
		desc: '',
		parameters: '',
		handler: function(p) {	// Graphic Diagonal Line ^GDw,h,t,c,o
			var obj = {};
			obj.type = 'line'
			obj.width = parseInt(p[0])
			obj.height = parseInt(p[1])
			obj.lineWidth = parseInt(p[2])
			obj.fillStyle = p[3]
			obj.rotation = p[4]

			return obj
		}
	}],
	['GE', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GEw,h,t,c
			var obj = {};
			obj.type = 'ellipse'
			obj.rx = parseInt(p[0]) / 2
			obj.ry = parseInt(p[1]) / 2
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black'

			return obj
		}
	}],
	['GF', {
		desc: '^GFa,b,c,d,data',
		parameters: '',
		handler: function(p) {	// ^GFa,b,c,d,data : a: compression type(A,B,C), b: binary byte count, c: graphic field count, d: bytes per row
			// Graphic Field 지원 안함.
		}
	}],
	['GS', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GSo,h,w
			// Graphic Symbol 지원 안함.
		}
	}],
	['MD', {
		desc: '',
		parameters: '',
		handler: function(p) {	// media darkness
		}
	}],
	// ['PO', function(p) {	// print orientation

	// }],
	// ['PW', function(p) {	// print width

	// }],
	// ['LR', function(p) {	// label reverse print

	// }],
	['LL', {
		desc: '',
		parameters: '',
		handler: function(p) {	// label length	// TODO
		}
	}],
	['XG', {
		desc: 'Recall Graphic',
		parameters: '^XGd:o.x,mx,my: d:o.x: magnification factor on the x-axis',
		handler: function(p) {
			var obj = {}
			obj.type = 'image_view'
			obj.id = p[0]
			obj.scaleX = p[1]
			obj.scaleY = p[2]

			return obj;
		}
	}],
	['XA', {
		desc: 'Start Format',
		parameters: '',
		handler: function(p) {
		}
	}],
	['XZ', {
		desc: '',
		parameters: '',
		handler: function(p) {
		}
	}]
]);


// var dateExp = new Map([
// 	['%a', { 
// 		desc: 'is replaced by the abbreviated weekday name'
// 	}],
// 	['%A', {
// 		desc: 'is replaced by the weekday name'
// 	}],
// 	['%b', {
// 		desc: 'is replaced by the abbreviated month name'
// 	}],
// 	['%B', {
// 		desc: 'is replaced by the month name'
// 	}],
// 	['%d', {
// 		desc: 'is replaced by the day of month number, 0 to 31'
// 	}],
// 	['%H', {
// 		desc: 'is replaced by the hour of the day (military), 0 to 23'
// 	}],
// 	['%I', {
// 		desc: 'is replaced by the hour of the day (civilian), 0 to 23'
// 	}],
// 	['%j', {
// 		desc: ''
// 	}],
// 	['%m', {
// 		desc: ''
// 	}],
// 	['%M', {
// 		desc: ''
// 	}],
// 	['%p', {
// 		desc: ''
// 	}],
// 	['%S', {
// 		desc: ''
// 	},
// 	['%U', {
// 		desc: ''
// 	},
// 	['%W', {
// 		desc: ''
// 	},
// 	['%w', {
// 		desc: ''
// 	},
// 	['%y', {
// 		desc: ''
// 	},
// 	['%Y', {
// 		desc: ''
// 	}]
// ]);


// 바코드 생성 커맨드의 파라미터가 o,e,h,f,g 일때 호출
function oehfg(p) {	// ^B1o,e,h,f,g : e: check digit(y:1digit/n:2digit), f: print interpretation line(y/n), g: print interpretation line above code
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[2];
		obj.showText = p[3];
		obj.textAbove = p[4];

		return obj;
}

// 바코드 생성 커맨드의 파라미터가 o,e,h,f,g 일때 호출
function ohfge(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];
		obj.checkDigit = p[4];

		return obj;
}

// 바코드 생성 커맨드의 파라미터가 o,h,f,m 일때 호출
function ohfm(p) {	// ^B4o,h,f,m : m: starting mode
	var obj = {};
	obj.type = 'barcode';
	obj.rot = p[0];
	obj.height = p[1]

	switch(p[2]) {
		case 'N':
			obj.showText = 'N';
			break;
		case 'A':
			obj.showText = 'Y';
			obj.textAbove = 'Y';
			break;
		case 'B':
			obj.showText = 'Y';
			obj.textAbove = 'N';
	}

	obj.mode = p[3];

	return obj;
}

// 바코드 생성 커맨드의 파라미터가 o,h,f,g 일때 호출
function ohfge(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];
		obj.checkDigit = p[4];

		return obj;
}

function ohfgem(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];
		obj.checkDigit = p[4];
		obj.mode = p[5];

		return obj;
}

function ohfg(p) {
		
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];

		return obj;
}

function ohscrt(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.security = p[2];
		obj.columns = p[3];
		obj.rows = p[4];
		obj.truncate = p[5];

		return obj;
}

function ohscrm(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.security = p[2];
		obj.columns = p[3];
		obj.rows = p[4];
		obj.mode = p[5];

		return obj;
}

function ohm(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.mode = p[2];

		return obj;
}

function oehfgkl(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.checkDigit = p[1];
		obj.height = p[2];
		obj.showText = p[3];
		obj.textAbove = p[4];
		obj.startChar = p[5];
		obj.stopChar = p[6];

		return obj;
}

function ohg(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.textAbove = p[2];

		return obj;
}

function oehfge(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.checkDigit = p[1];
		obj.height = p[2];
		obj.showText = p[3];
		obj.textAbove = p[4];
		obj.checkDigit = p[5];

		return obj;
}

function abcq(p) {
		var obj = {};
		obj.type = 'qrcode';
		obj.model = p[0];
		obj.position = p[1];
		obj.magnification = p[2];
		obj.hqml = p[3];

		return obj;
}

function ohscrfg(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.orientation = p[0];
		obj.height = p[1];
		obj.quality = p[2];
		obj.columns = p[3];
		obj.rows = p[4];
		obj.format = p[5];
		obj.escape = p[6];

		return obj;
}

function mpt(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.mode = p[0];
		obj.position = p[1];
		obj.total = p[2];

		return obj;
}

function getRotation(r) {
	switch(r) {
		case 'N':
			return Math.PI / 180 * 0;
			break;
		case 'R':
			return Math.PI / 180 * 90;
			break;
		case 'I':
			return Math.PI;
			break;
		case 'B':
			return Math.PI / 180 * 270;
			break;
	}
}

},{}],5:[function(require,module,exports){
function ellipse(properties) {
	this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var rx = this.model.rx || '';
		var ry = this.model.ry || '';
		var cx = this.model.cx || '';
		var cy = this.model.cy || '';
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.model.fillStyle === 'white' ? 'W' : 'B';

		var left = cx - rx || '0';
		var top = cy - ry || '0';
		
		var command;
		if(rx === ry)
			command = 'GC'
		else
			command = 'GE'


		var symbolMap = new Map([
			['GC', 		['^GC' + rx, lineWidth, fillStyle]],
			['GE', 		['^GE' + rx, ry, lineWidth, fillStyle]],
		]);

		var zpl = [];
		var params = symbolMap.get(command);
		zpl.push('^FO' + left + ',' + top);
		zpl.push(params.join(','));
		zpl.push('^FS');

		zpl = zpl.join('\n');
		zpl += '\n'

		return zpl;
  }
}

exports.Ellipse = ellipse;
},{}],6:[function(require,module,exports){
function line(properties) {
  this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var lineWidth = this.model.lineWidth || '';
		var fillStyle = this.model.fillStyle === 'White' ? 'W' : 'B';
		var x1 = this.model.x1 || '';
		var x2 = this.model.x2 || '';
		var y1 = this.model.y1 || '';
		var y2 = this.model.y2 || '';

		var left;
		var top;
		var width;
		var height;
		var rotate;

		if(x1 <= x2 && y1 <= y2){
			left = x1
			top = y1
			width = x2 - x1
			height = y2 - y1
			rotate = 'L'
		} else if(x1 >= x2 && y1 <= y2){
			left = x2
			top = y1
			width = x1 - x2
			height = y2 - y1
			rotate = 'R'
		} else if(x1 <= x2 && y1 >= y2){
			left = x1
			top = y2
			width = x2 - x1
			height = y1 - y2
			rotate = 'R'
		} else if(x1 >= x2 && y1 >= y2){
			left = x2
			top  = y2
			width = x1 - x2
			height = y1 - y2
			rotate = 'L'
		}
		
		// height가 0일 때는 (가로선 일 경우) 두께가 width의 길이가 됨.
		if(height == 0){
			var commands = [
		  		['^FO'+left, top],
				['^GD' + height, lineWidth ,width, fillStyle, rotate],
				['^FS']
			];
		} else {
			var commands = [
			  	['^FO'+left, top],
				['^GD' + width, height ,lineWidth, fillStyle, rotate],
				['^FS']
			];
		}		

	  var zpl = '';
	  commands.forEach(c => {
	  	zpl += (c.join(',') + '\n')
	  });

		return zpl;
  }
}

exports.Line = line;
},{}],7:[function(require,module,exports){
function rect(properties) {
  this.model = properties;

  this.toZpl = function() {
		var zpl = '';
		var width = this.model.width || '';
		var height = this.model.height || '';
		var lineWidth = this.model.lineWidth || '';
		var strokeStyle = this.model.strokeStyle === 'white' ? 'W' : 'B';
		var top = this.model.top || '';
		var left = this.model.left || '';


	  var commands = [
	  	['^FO'+left, top],
			['^GB'+width, height ,lineWidth, strokeStyle],
			['^FS']
		];

	  var zpl = '';
	  commands.forEach(c => {
	  	zpl += (c.join(',') + '\n')
	  });

		return zpl;
  }
}

exports.Rect = rect;
},{}],8:[function(require,module,exports){
function text(properties) {
  this.model = properties;

  this.toZpl = function() {
    var zpl = '';
    var text = this.model.text || '';
    var top = this.model.top || '';
    var left = this.model.left || '';
    var width = this.model.width || '';
    var height = this.model.height || '';

    var textType = this.model.textType || '';
    var charWidth = this.model.charWidth || width / text.length;
    if (textType === 'F') {
      var charHeight = this.model.charHeight || height;
    } else if (textType === 'W') {
      var charHeight = this.model.charHeight;
    } else {
      var charHeight = this.model.charHeight || this.model.charWidth;
    }

    var rotate = this.model.rotation || '';
    var textAlign = this.model.textAlign || '';

    if (Math.PI * -0.25 < rotate && rotate <= Math.PI * 0.25) {
      rotate = 'N'
    } else if (Math.PI * 0.25 < rotate && rotate <= Math.PI * 0.75) {
      rotate = 'R'
    } else if (Math.PI * 0.75 < rotate && rotate <= Math.PI * 1.25) {
      rotate = 'I'
    } else if (Math.PI < rotate * 1.25 && rotate <= Math.PI * 1.75) {
      rotate = 'B'
    }


    if (textType === 'W' || textType === 'w') {
      switch(textAlign) {
        case 'left':
          textAlign = 'L';
          break;
        case 'right':
          textAlign = 'R';
          break;
        case 'center':
          textAlign = 'C';
          break;
        case 'justified':
          textAlign = 'J';
          break;
        default:
          break;
      }

      var lineMargin = this.model.lineMargin || '';
      var maxLines = this.model.maxLines || '';
      var hangingIndent = this.model.hangingIndent || '';

      var commands = [
        ['^FO'+left, top],
        ['^A@'+rotate, charHeight, charWidth],
        ['^FB'+width, maxLines, lineMargin, textAlign, hangingIndent],
        ['^FD'+text],
        ['^FS']
      ];
    } else {
      var commands = [
        ['^FO'+left, top],
        ['^A@' + rotate, charHeight, charWidth],
        ['^FD'+text],
        ['^FS']
      ];
    }

    var zpl = '';
    
    commands.forEach(c => {
      zpl += c.join(',') + '\n'
    });

    return zpl;
  }
}

exports.Text = text;
},{}],9:[function(require,module,exports){
var commands = require('./components/commands')
var commandsMap = commands.commands

var fontBuf;
var barcodeBuf;
var imageBuf;

exports.convert = function(zpl) {

	if (!zpl) return;

  fontBuf = {};
	barcodeBuf = {};
	imageBuf = new Map();

	var models = [];
	var obj = {};

	var commands = zpl.split('^');
	commands.forEach((c, i) => {
		if (c.trim().length === 0) return;

		c = c.replace('\n', '')
		var command = c.substr(0, 2);

		if (command.charAt(0) === 'A') {
  		var params = c.substr(1);
  		
  		var commandHandler = commandsMap.get('A');
			if(!commandHandler) return;

  		var properties = commandHandler.handler(params);
			obj = Object.assign(obj || {}, properties);

			return;
		}

		var commandHandler = commandsMap.get(command);
		if(!commandHandler) return;


		var params;
		if (command === 'FD') {
			params = c.substr(2);
		} else {
			params = c.substr(2).split(',').map(function(value) {
				return value.trim();
			});
		}

		var properties = commandHandler.handler(params);

		switch(command) {
			case 'XZ': 			// 마지막 바코드는 FS를 생략하고 XZ로 끝나도 가능 
				if(obj == null)		// XZ가 null인 경우는 마지막 바코드도 FS로 끝나는 경우 
				break;

			case 'FS':
				if (!obj.type) {
	  			obj.type = 'text';
	  			obj.textAlign = 'left';
	  			obj.textType = obj.textType || 'F';
	  		}

	  		obj = specific(obj);
				obj.centerRotate = false
	  		models.push(obj);
	  		
	  		obj = null;
	  		break;

	  	case 'BY':
	  		Object.assign(barcodeBuf, properties || {});
	  		break;

	  	case 'CF':
	  		Object.assign(fontBuf, properties || {});
	  		break;

	  	default:
		  	obj = Object.assign(obj || {}, properties);
		}


	})

  return models;
}

function dashParser(zpl) {
  var startIdx = zpl.indexOf('~');
  var tmp = zpl.substr(startIdx + 1);
  var endIdx = Math.min(command.indexOf('~'), command.indexOf('^'));

  var dashCommand = zpl.substr(startIdx, endIdx);
  var command = dashCommand.substr(0, 2);
  switch(command) {
  	case 'DG':
  		var commandHandler = commandsMap.get(command);
  		var properties = commandHandler.handler(params);
  		imageBuf.set(properties.id, properties.data);

  		break;
  	case '':
  		break;
  }

  zpl.replace(dashCommand, '');
  dashParser(zpl);

 	return zpl;
}

function specific(obj) {
	switch(obj.type) {
		case 'line':
			obj.x1 = obj.left
			obj.x2 = obj.left + obj.width;
			if (obj.rotate === 'L') {
				obj.y1 = obj.top
				obj.y2 = obj.top + obj.height;
			} else {	// default is 'R'
				obj.y1 = obj.top + obj.height;
				obj.y2 = obj.top;
			}
			
			delete obj.left
			delete obj.top
			delete obj.width
			delete obj.height
			delete obj.rotate

			break;
		case 'ellipse':
			obj.cx = obj.left + obj.rx;
			obj.cy = obj.top + obj.ry;

			delete obj.left
			delete obj.top

			break;
		case 'text':
			if (fontBuf.charHeight || fontBuf.charWidth) {
				Object.assign(obj, fontBuf);

				// obj.width = (obj.width || fontBuf.charWidth * obj.text.length)
				// obj.height = obj.height || fontBuf.charHeight
			}
			break;

		case 'rect':
			break;

		case 'image_view':
			break;

		case 'barcode':
			if (!obj.height) {
				obj.height = barcodeBuf.height;
			}

			if (!obj.scale_w) {
				obj.scale_w = barcodeBuf.scale_w;
			}

			break;
	}

	return obj;
}

function error_log(c) {
	console.log('Command: '+ c + ' parameter error');
}
},{"./components/commands":4}],10:[function(require,module,exports){
var Text = require('./components/text').Text
var Barcode = require('./components/barcode').Barcode
var Rect = require('./components/rect').Rect
var Ellipse = require('./components/ellipse').Ellipse
var Line = require('./components/line').Line

exports.revert = function(components) {

	if (!components) return;

	var zpl = '^XA\n';
	components.forEach((c, i) => {
		switch(c.type) {
			case 'text':
				var obj = new Text(c);
				break;
			case 'barcode':
				var obj = new Barcode(c);
				break;
			case 'rect':
				var obj = new Rect(c);
				break;
			case 'ellipse':
				var obj = new Ellipse(c);
				break;
			case 'image':
				break;
			case 'line':
				var obj = new  Line(c);
				break;
		}

    if(obj) {
      zpl += obj.toZpl();
      zpl += '\n';
    }
	});

	zpl += '^XZ'
  return zpl;
}

},{"./components/barcode":3,"./components/ellipse":5,"./components/line":6,"./components/rect":7,"./components/text":8}]},{},[1]);
