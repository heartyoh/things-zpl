(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var config = {
	fontNo: 6,
	dpi: 203
	// dpi: 300
};

exports.config = config;

},{}],2:[function(require,module,exports){
'use strict';

// var zpl = require("./src/api");
var zpl = require("./lib/api");

if (typeof window !== 'undefined') window.zpl = zpl;

if (typeof exports !== 'undefined') {
  exports.zpl = zpl;
}

},{"./lib/api":3}],3:[function(require,module,exports){
'use strict';

exports.convert = require('./converter').convert;
exports.revert = require('./reverter').revert;
exports.config = require('../config').config;

},{"../config":1,"./converter":19,"./reverter":20}],4:[function(require,module,exports){
'use strict';

var barcodes = {
	'B1': {
		desc: 'Code 11 Bar Code',
		parameters: '',
		handler: function handler(p) {
			var obj = oehfg(p);
			obj.symbol = 'code11';
			return obj;
		}
	},
	'B2': {
		desc: '',
		parameters: '',
		handler: function handler(p) {
			var obj = ohfge(p);
			obj.symbol = 'interleaved2of5';
			return obj;
		}
	},
	'B3': {
		desc: '',
		parameters: '',
		handler: function handler(p) {
			var obj = oehfg(p);
			obj.symbol = 'code39';
			return obj;
		}
	},
	'B4': {
		desc: '',
		parameters: '',
		handler: function handler(p) {
			var obj = ohfm(p);
			obj.symbol = 'code49';
			return obj;
		}
	},
	'B5': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfg(params);
			obj.symbol = 'planet';
			return obj;
		}
	},
	'B7': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohscrt(params);
			obj.symbol = 'pdf417';
			return obj;
		}
	},
	'B8': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean8';
			return obj;
		}
	},
	'B9': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfge(params);
			obj.symbol = 'upce';
			return obj;
		}
	},
	'BA': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfge(params);
			obj.symbol = 'code93';
			return obj;
		}
	},
	'BB': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohscrm(params);
			obj.symbol = 'codablock';
			return obj;
		}
	},
	'BC': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfgem(params);
			obj.symbol = 'code128';
			return obj;
		}
	},
	'BD': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = mpt(params);
			obj.symbol = 'maxicode';
			return obj;
		}
	},
	'BE': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean13';
			return obj;
		}
	},
	'BF': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohm(params);
			obj.symbol = 'micropdf417';
			return obj;
		}
	},
	'BI': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfg(params);
			obj.symbol = 'industrial2of5';
			return obj;
		}
	},
	'BJ': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfg(params);
			obj.symbol = 'standard2of5';
			return obj;
		}
	},
	'BK': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = oehfgkl(params);
			obj.symbol = 'ansicodabar';
			return obj;
		}
	},
	'BL': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohg(params);
			obj.symbol = 'logmars';
			return obj;
		}
	},
	'BM': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = oehfge(params);
			obj.symbol = 'msi';
			return obj;
		}
	},
	'BP': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = oehfg(params);
			obj.symbol = 'plessey';
			return obj;
		}
	},
	'BQ': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = abcq(params);
			obj.symbol = 'qrcode';
			return obj;
		}
	},
	'BS': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			// var obj = ohfg(params);
			// obj.symbol = 'upcextension'	// 우리 라이브러리에 없음
			// return obj;
		}
	},
	'BU': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfge(params);
			obj.symbol = 'upca';
			return obj;
		}
	},
	'BX': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohscrfg(params);
			obj.symbol = 'datamatrix';
			return obj;
		}
	},
	'BY': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			// barcode field default
			var obj = {};
			obj.scale_w = params[0];
			// params[1]
			obj.height = params[2];

			return obj;
		}
	},
	'BZ': {
		desc: '',
		parameters: '',
		handler: function handler(params) {
			var obj = ohfg(params);
			obj.symbol = 'postal';
			return obj;
		}
	}
};

// 바코드 생성 커맨드의 파라미터가 o,e,h,f,g 일때 호출
function oehfg(p) {
	// ^B1o,e,h,f,g : e: check digit(y:1digit/n:2digit), f: print interpretation line(y/n), g: print interpretation line above code
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
function ohfm(p) {
	// ^B4o,h,f,m : m: starting mode
	var obj = {};
	obj.type = 'barcode';
	obj.rot = p[0];
	obj.height = p[1];

	switch (p[2]) {
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

exports.barcodes = barcodes;

},{}],5:[function(require,module,exports){
'use strict';

var common = {
	'MD': {
		desc: '',
		parameters: '',
		handler: function handler(p) {// media darkness
		}
	},
	// ['PO', function(p) {	// print orientation

	// }],
	// ['PW', function(p) {	// print width

	// }],
	// ['LR', function(p) {	// label reverse print

	// }],
	'LL': {
		desc: '',
		parameters: '',
		handler: function handler(p) {// label length	// TODO
		}
	},
	'XG': {
		desc: 'Recall Graphic',
		parameters: '^XGd:o.x,mx,my: d:o.x: magnification factor on the x-axis',
		handler: function handler(p) {
			var obj = {};
			obj.type = 'image_view';
			obj.id = p[0];
			obj.scaleX = p[1];
			obj.scaleY = p[2];

			return obj;
		}
	},
	'XA': {
		desc: 'Start Format',
		parameters: '',
		handler: function handler(p) {}
	},
	'XZ': {
		desc: '',
		parameters: '',
		handler: function handler(p) {}
	}
};

},{}],6:[function(require,module,exports){
'use strict';

var fields = {
	'FB': {
		desc: 'Field Block',
		parameters: '',
		handler: function handler(p) {
			// ^FBa,b,c,d,e: Field Block(automatic word-wrap): 	// TODO

			var obj = {};
			obj.textType = 'W';
			obj.width = parseInt(p[0]); // 행의 너비
			obj.maxLines = parseInt(p[1]); // 최대행수
			obj.lineMargin = parseInt(p[2]); // 줄 간격

			switch (p[3]) {
				case 'L':
					obj.textAlign = 'left';
					break;
				case 'C':
					obj.textAlign = 'center';
					break;
				case 'R':
					obj.textAlign = 'right';
					break;
				case 'J':
					obj.textAlign = 'justified';
					break;
				default:
					obj.textAlign = '';
			}

			obj.hangingIndent = parseInt(p[4]); // 두번째 줄 띄어쓰기
			return obj;
		}
	},
	'FC': {
		desc: 'Field Clock',
		parameters: '',
		handler: function handler(p) {// ^FCa,b,c: Field Clock	// TODO
			// var obj = {};
		}
	},
	'FD': {
		desc: 'Field Data',
		parameters: '',
		handler: function handler(p) {

			// if () {	// check DATE
			// }
			p = p.trim(); // 바코드 양 끝의 공백은 출력되지 않으므로 trim 적용

			return { text: p };
		}
	},
	'FH': {
		desc: 'Field Hexadecimal Indicator',
		parameters: '0: hexadecimal indicator',
		handler: function handler(p) {
			// TODO
		}
	},
	'FO': {
		desc: 'Field Origin',
		parameters: 'x, y, justification(0: left, 1: right, 2: auto)',
		handler: function handler(p) {
			if (p.length < 2) {
				error_log('FO');
				return;
			}

			return { left: parseInt(p[0]), top: parseInt(p[1]), justification: parseInt(p[2]) };
		}
	},
	'FS': {
		desc: 'Field Separator',
		parameters: '',
		handler: function handler(p) {}
	},
	'FT': {
		desc: 'Field Typeset',
		parameters: 'x, y, justification',
		handler: function handler(p) {
			if (p.length < 2) {
				error_log('FO');
				return;
			}

			return { left: parseInt(p[0]), top: parseInt(p[1]), justification: parseInt(p[2]) };
		}
	},
	'FX': {
		desc: 'comment',
		parameters: '',
		handler: function handler(p) {
			// var obj = {};
		}
	}
};

exports.fields = fields;

},{}],7:[function(require,module,exports){
'use strict';

var rotation = require('./utils').rotation;

var fonts = {
	'A': {
		desc: 'Scalable/Bitmapped Font',
		parameters: 'f,o,h,w: f: font name, o: orientation, h: charHeight, w: width',
		handler: function handler(params) {
			var obj = {};
			var sign = params.substr(0, 1);
			params = params.substr(1);

			if (sign === '@') {
				// ^A@o,h,w,d:o.x	// o: rotation(n,r,i,b), d: drive location of font, o: font name, x: extension
				var p = params.split(',');
				obj.charHeight = parseInt(p[1]); // FIXME
				obj.charWidth = parseInt(p[2]);

				if (p.length === 4) {
					var fonts = p[3];
					switch (fonts.substr(0, 1)) {
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
				} else if (p.length === 3) {} else {
					error_log('A@');
					return;
				}

				obj.rotation = rotation(p[0]);

				return obj;
			} else {
				var p = params.split(',');

				obj.charHeight = parseInt(p[1]); // FIXME
				obj.charWidth = parseInt(p[2]);

				switch (p[0]) {
					// TODO font family
					case '0':
						obj.fontFamily = 'serif'; // FIXME
						break;
				}

				return obj;
			}
		}
	},
	'CF': {
		desc: 'The ^CF command sets the default font used in your printer.',
		parameters: '^CFf,h,w',
		handler: function handler(p) {
			// ^CFf,h,w : f: font
			var obj = {};
			obj.charHeight = parseInt(p[1]);
			obj.charWidth = parseInt(p[2] || 0);
			switch (p[0]) {
				case 0:
					obj.fontFamily = 'serif';
					break;
				default:
					obj.fontFamily = 'serif';
					break;
			}

			return obj;
		}
	},
	'CI': {
		desc: 'Change International Font/Encoding',
		parameters: '',
		handler: function handler(p) {}
	},
	'CW': { // 폰트 설정. 폰트를 숫자로 설정함.
		desc: 'Font Identifier',
		parameters: 'a,d:o.x: a(A~Z, 0~9), ',
		handler: function handler(p) {// TODO 프린터에 있는 폰트를 알아야 사용 가능함.	CWQ,R:MYFONT.FNT

		}
	},
	'FL': {
		desc: 'Font Linking',
		parameters: '<ext>,<base>,<link>',
		handler: function handler(p) {// TODO 프린터에 있는 폰트를 알아야 사용 가능함.

		}
	}
	// 'DB': {
	// 	desc: 'Download Bitmap Font',
	// 	parameters: '',
	// 	handler: function(p) {	// TODO

	// 	}
	// },
	// 'DE': {
	// 	desc: 'Download Encoding',
	// 	parameters: 'd, o, x, s, data: d(location of table), o(name of table), x(extension), s(table size), data(data string)',
	// 	handler: function(p) {
	// 		// ex: ~DER:JIS.DAT,27848,300021213001...
	// 	}
	// }
};

exports.fonts = fonts;

},{"./utils":10}],8:[function(require,module,exports){
'use strict';

var barcodes = require('./barcodes').barcodes;
var common = require('./common').common;
var fields = require('./fields').fields;
var fonts = require('./fonts').fonts;
var shapes = require('./shapes').shapes;

var commands = function () {
	var types = [barcodes, common, fields, fonts, shapes];

	var commands = {};
	types.forEach(function (obj, idx) {
		Object.assign(commands, obj);
	});

	return commands;
}();

exports.commands = commands;

},{"./barcodes":4,"./common":5,"./fields":6,"./fonts":7,"./shapes":9}],9:[function(require,module,exports){
'use strict';

var shapes = {
	'DG': {
		desc: 'Download Graphic use with ^XG',
		parameters: '^DGd:o.x,t,w,data: t: total number of bytes in graphic, w: number of bytes per row, data: ASCII hexadecimal string defining image',
		handler: function handler(p) {
			var obj = {};
			obj.id = p[0];
			obj.totalSize = p[1];
			obj.rowSize = p[2];
			obj.data = p[3];
		}
	},
	'GB': {
		desc: 'Graphic Box',
		parameters: 'w,h,t,c,r : t: border thickness, c: line color, r: degree of corner-rounding',
		handler: function handler(p) {
			var obj = {};
			obj.type = 'rect';
			obj.innerBorder = true;
			obj.width = parseInt(p[0]);
			obj.height = parseInt(p[1]);
			obj.lineWidth = parseInt(p[2]);
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black';

			return obj;
		}
	},
	'GC': {
		desc: 'Graphic Circle',
		parameters: 'd,t,c : d: circle diameter',
		handler: function handler(p) {
			var obj = {};
			obj.type = 'ellipse';
			obj.rx = parseInt(p[0]);
			obj.ry = parseInt(p[0]);
			obj.lineWidth = parseInt(p[1]);
			obj.fillStyle = p[2];

			return obj;
		}
	},
	'GD': {
		desc: 'Graphic Diagonal Line',
		parameters: 'w,h,t,c,o',
		handler: function handler(p) {
			var obj = {};
			obj.type = 'line';
			obj.width = parseInt(p[0]);
			obj.height = parseInt(p[1]);
			obj.lineWidth = parseInt(p[2]);
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black';
			obj.rotate = p[4];

			return obj;
		}
	},
	'GE': {
		desc: 'Graphic Ellipse',
		parameters: 'w,h,t,c',
		handler: function handler(p) {
			var obj = {};
			obj.type = 'ellipse';
			obj.rx = parseInt(p[0]) / 2;
			obj.ry = parseInt(p[1]) / 2;
			obj.lineWidth = parseInt(p[2]);
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black';

			return obj;
		}
	},
	'GF': {
		desc: 'Graphic Field',
		parameters: 'a,b,c,d,data : a: compression type(A,B,C), b: binary byte count, c: graphic field count, d: bytes per row',
		handler: function handler(p) {
			// Graphic Field 지원 안함.
		}
	},
	'GS': {
		desc: 'Graphic Symbol',
		parameters: 'o,h,w',
		handler: function handler(p) {
			// Graphic Symbol 지원 안함.
		}
	}
};

exports.shapes = shapes;

},{}],10:[function(require,module,exports){
'use strict';

exports.rotation = function (r) {
	switch (r) {
		case 'N':
			return Math.PI / 180 * 0;
		case 'R':
			return Math.PI / 180 * 90;
		case 'I':
			return Math.PI;
		case 'B':
			return Math.PI / 180 * 270;
	}
};

exports.get = function (object, prop) {
	return object[prop];
};

exports.specific = function (obj) {
	switch (obj.type) {
		case 'line':
			obj.x1 = obj.left;
			obj.x2 = obj.left + obj.width;

			// x1과 x2가 같은으면서 테두리가 100이상 정도 굵은 경우에는 ZPL의 가로선을 표현 할 때에 해당됨. (100이란 수치는 대략임)
			if (obj.x1 == obj.x2 && obj.lineWidth >= 100) {
				obj.x1 += obj.lineWidth / 2;
				obj.x2 += obj.lineWidth / 2;
			}

			if (obj.rotate === 'L') {
				obj.y1 = obj.top;
				obj.y2 = obj.top + obj.height;
			} else {
				// default is 'R'
				obj.y1 = obj.top + obj.height;
				obj.y2 = obj.top;
			}

			delete obj.left;
			delete obj.top;
			delete obj.width;
			delete obj.height;
			delete obj.rotate;

			break;
		case 'ellipse':
			obj.cx = obj.left + obj.rx;
			obj.cy = obj.top + obj.ry;

			delete obj.left;
			delete obj.top;

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
};

},{}],11:[function(require,module,exports){
'use strict';

var config = require('../../config').config;
var shapeTranscoord = require('./transcoord').shapeTranscoord;
var rotateCase = require('./transcoord').rotateCase;

function barcode(properties) {
	this.model = properties;

	this.toZpl = function (group) {
		var _model = this.model;
		var _model$left = _model.left;
		var left = _model$left === undefined ? '' : _model$left;
		var _model$top = _model.top;
		var top = _model$top === undefined ? '' : _model$top;
		var _model$width = _model.width;
		var width = _model$width === undefined ? '' : _model$width;
		var _model$height = _model.height;
		var height = _model$height === undefined ? '' : _model$height;
		var _model$symbol = _model.symbol;
		var symbol = _model$symbol === undefined ? '' : _model$symbol;
		var _model$rotation = _model.rotation;
		var rotation = _model$rotation === undefined ? '' : _model$rotation;
		var _model$scale_w = _model.scale_w;
		var scale_w = _model$scale_w === undefined ? 1 : _model$scale_w;
		var _model$showText = _model.showText;
		var showText = _model$showText === undefined ? 'Y' : _model$showText;
		var _model$textAbove = _model.textAbove;
		var textAbove = _model$textAbove === undefined ? '' : _model$textAbove;
		var _model$text = _model.text;
		var text = _model$text === undefined ? '' : _model$text;

		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		var rotate = rotateCase(rotation);

		switch (rotate) {
			case 'N':
			case 'I':
			default:
				break;
			case 'R':
			case 'B':
				var startPoint = shapeTranscoord(this.model);
				left = startPoint.x;
				top = startPoint.y;
				break;
		}

		var lines = [];
		lines.push(['^BY' + scale_w, 3]);

		if (showText && symbol != 'qrcode') {
			height -= scale_w * 6 + 8; // barcode 높이는 문자 뺀 다음의 높이임.
		}

		var dpi = config.dpi; // FIXME

		var symbolMap = new Map([['code11', ['^B1' + rotate,, height, showText, textAbove]], ['interleaved2of5', ['^B2' + rotate, height, showText, textAbove]], ['code39', ['^B3' + rotate,, height, showText, textAbove]], ['code49', ['^B4' + rotate, height, showText]], ['planet', ['^B5' + rotate, height, showText, textAbove]], ['pdf417', ['^B7' + rotate, height,,,,]], ['ean8', ['^B8' + rotate, height, showText, textAbove]], ['upce', ['^B9' + rotate, height, showText, textAbove]], ['code93', ['^BA' + rotate, height, showText, textAbove]], ['codablock', ['^BB' + rotate, height,,,,]], ['code128', ['^BC' + rotate, height, showText, textAbove,,]], ['maxicode', ['^BD' + rotate,, height, showText, textAbove]], ['ean13', ['^BE' + rotate, height, showText, textAbove]], ['micropdf417', ['^BF' + '2',,]], ['industrial2of5', ['^BI' + rotate, height, showText, textAbove]], ['standard2of5', ['^BJ' + rotate, height, showText, textAbove]], ['ansicodabar', ['^BK' + rotate,, height, showText, textAbove,,]], ['logmars', ['^BL' + rotate, height, textAbove]], ['msi', ['^BM' + rotate,, height, showText, textAbove]], ['plessey', ['^BP' + rotate,, height, showText, textAbove]], ['qrcode', ['^BQ' + rotate, 2, Math.round(height / 19.54)]], ['upca', ['^BU' + rotate, height, showText, textAbove]], ['datamatrix', ['^BX' + '']], // TODO
		['postal', ['^BZ' + rotate, height, showText, textAbove]]]);

		var params = symbolMap.get(symbol);

		lines.push('^FO' + left + ',' + top);
		lines.push(params.join(','));
		if (symbol === 'qrcode') {
			lines.push('^FDQ,' + 'A' + text);
		} else {
			lines.push('^FD' + text);
		}

		lines.push('^FS');

		var zpl = lines.join('\n') + '\n';

		return zpl;
	};
}

exports.Barcode = barcode;

},{"../../config":1,"./transcoord":18}],12:[function(require,module,exports){
'use strict';

var Text = require('./text').Text;
var shapeTranscoord = require('./transcoord').shapeTranscoord;
var rotateCase = require('./transcoord').rotateCase;

function ellipse(properties) {
	this.model = properties;

	this.toZpl = function (group) {
		var _model = this.model;
		var _model$rx = _model.rx;
		var rx = _model$rx === undefined ? '' : _model$rx;
		var _model$ry = _model.ry;
		var ry = _model$ry === undefined ? '' : _model$ry;
		var _model$cx = _model.cx;
		var cx = _model$cx === undefined ? '' : _model$cx;
		var _model$cy = _model.cy;
		var cy = _model$cy === undefined ? '' : _model$cy;
		var _model$lineWidth = _model.lineWidth;
		var lineWidth = _model$lineWidth === undefined ? '' : _model$lineWidth;
		var fillStyle = _model.fillStyle;
		var strokeStyle = _model.strokeStyle;
		var left = _model.left;
		var top = _model.top;
		var rotation = _model.rotation;
		var text = _model.text;

		var rotate = rotateCase(rotation);

		switch (rotate) {
			case 'N':
			case 'I':
			default:
				break;
			case 'R':
			case 'B':
				var tmp = rx;
				rx = ry;
				ry = tmp;

				var startPoint = shapeTranscoord(this.model);
				left = startPoint.x;
				top = startPoint.y;
				break;
		}

		if (strokeStyle === 'white' || strokeStyle === '#fff' || strokeStyle === '#ffffff') {
			strokeStyle = 'W';
		} else {
			strokeStyle = 'B';
		}

		if (fillStyle) {
			if (fillStyle === 'white' || fillStyle === '#fff' || fillStyle === '#ffffff') {
				fillStyle = 'W';
			} else {
				fillStyle = 'B';
			}

			lineWidth = Math.max(rx, ry);
			strokeStyle = fillStyle;
		}

		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		var command;
		if (rx === ry) command = 'GC';else command = 'GE';

		var symbolMap = new Map([['GC', ['^GC' + rx * 2, lineWidth, strokeStyle]], ['GE', ['^GE' + rx * 2, ry * 2, lineWidth, strokeStyle]]]);

		var zpl = [];
		var params = symbolMap.get(command);
		zpl.push('^FO' + left + ',' + top);
		zpl.push(params.join(','));
		zpl.push('^FS');

		zpl = zpl.join('\n');
		zpl += '\n';

		// make text command
		if (text) {
			var texts = new Text(this.model);
			zpl += texts.toZpl(group);
		}

		return zpl;
	};
}

exports.Ellipse = ellipse;

},{"./text":17,"./transcoord":18}],13:[function(require,module,exports){
"use strict";

function group(properties) {
	this.model = properties;

	return this.model;
}

exports.Group = group;

},{}],14:[function(require,module,exports){
'use strict';

// const exec = require('child_process').exec;

// function getGrf(inputFile, outputFile) {	// input must be local path
// 	// NodeJs
// 	var command = parse('java -jar ZSDK_API.jar graphic %s -s %s', inputFile, outputFile);
// 	exec(command, function(error, stdout, stderr) {
// 	  if (error) {
// 	  	console.log(`exec error: ${error}`);
// 	  	return;
// 	  }

// 		console.log(`stdout: ${stdout}`);
// 		console.log(`stderr: ${stderr}`);
// 	});

// 	var fs = require('fs');
// 	fs.readFile(__dirname + outputFile, function (err, data) {
// 	  if (err) {
// 	    throw err;
// 	  }

// 	  var grfData = data.toString();
// 	  console.log(grfData);
// 	  var converted = converter.convert(command)
// 		// console.log(JSON.stringify(converted, null, 2))
// 	});

// 	return grfData;
// }

// exports.getGrf = getGrf;

function image(properties) {
  this.model = properties;

  this.toZpl = function (group) {
    var model = this.model;
    var top = model.top || '';
    var left = model.left || '';
    var imageGrf = model.imageGrf;

    top += group ? group.top || 0 : 0;
    left += group ? group.left || 0 : 0;

    if (!imageGrf) {
      return '';
    }

    var guid = getGuid();
    var commands = [['~DG' + guid, imageGrf], ['^FO' + left, top], ['^XG' + 'R:' + guid, 1, 1], ['^PQ' + 1], ['^FS']];

    var zpl = '';
    commands.forEach(function (c) {
      zpl += c.join(',') + '\n';
    });

    return zpl;
  };
}

exports.Image = image;

function getGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

},{}],15:[function(require,module,exports){
'use strict';

var Rect = require('./rect').Rect;

function line(properties) {
	this.model = properties;

	this.toZpl = function (group) {
		var _model = this.model;
		var _model$x = _model.x1;
		var x1 = _model$x === undefined ? '' : _model$x;
		var _model$x2 = _model.x2;
		var x2 = _model$x2 === undefined ? '' : _model$x2;
		var _model$y = _model.y1;
		var y1 = _model$y === undefined ? '' : _model$y;
		var _model$y2 = _model.y2;
		var y2 = _model$y2 === undefined ? '' : _model$y2;
		var fillStyle = _model.fillStyle;

		if (fillStyle === 'white' || fillStyle === '#fff' || fillStyle === '#ffffff') {
			fillStyle = 'W';
		} else {
			fillStyle = 'B';
		}

		var zpl = '';
		if (Math.round(x1 * 100) === Math.round(x2 * 100) || Math.round(y1 * 100) === Math.round(y2 * 100)) {
			zpl = gbLine.call(this, group);
			return zpl;
		} else {
			var commands = gdLine.call(this, group);
		}

		commands.forEach(function (c) {
			zpl += c.join(',') + '\n';
		});

		return zpl;
	};
}

function gbLine(group) {
	// graphic box
	var _model2 = this.model;
	var _model2$x = _model2.x1;
	var x1 = _model2$x === undefined ? '' : _model2$x;
	var _model2$x2 = _model2.x2;
	var x2 = _model2$x2 === undefined ? '' : _model2$x2;
	var _model2$y = _model2.y1;
	var y1 = _model2$y === undefined ? '' : _model2$y;
	var _model2$y2 = _model2.y2;
	var y2 = _model2$y2 === undefined ? '' : _model2$y2;
	var lineWidth = _model2.lineWidth;
	var strokeStyle = _model2.strokeStyle;
	var _model2$rotation = _model2.rotation;
	var rotation = _model2$rotation === undefined ? 0 : _model2$rotation;

	if (strokeStyle === 'white' || strokeStyle === '#fff' || strokeStyle === '#ffffff') {
		strokeStyle = 'W';
	} else {
		strokeStyle = 'B';
	}

	var left = Math.min(x1, x2);
	var top = Math.min(y1, y2);

	var tx = Math.abs(x2 - x1);
	var ty = Math.abs(y2 - y1);
	var width = tx === 0 ? lineWidth : tx;
	var height = ty === 0 ? lineWidth : ty;

	var properties = { left: left, top: top, width: width, height: height, lineWidth: lineWidth, strokeStyle: strokeStyle };
	var rect = new Rect(properties);
	return rect.toZpl(group);
}

function gdLine(group) {
	var _model3 = this.model;
	var _model3$x = _model3.x1;
	var x1 = _model3$x === undefined ? '' : _model3$x;
	var _model3$x2 = _model3.x2;
	var x2 = _model3$x2 === undefined ? '' : _model3$x2;
	var _model3$y = _model3.y1;
	var y1 = _model3$y === undefined ? '' : _model3$y;
	var _model3$y2 = _model3.y2;
	var y2 = _model3$y2 === undefined ? '' : _model3$y2;
	var _model3$lineWidth = _model3.lineWidth;
	var lineWidth = _model3$lineWidth === undefined ? '' : _model3$lineWidth;
	var strokeStyle = _model3.strokeStyle;

	if (strokeStyle === 'white' || strokeStyle === '#fff' || strokeStyle === '#ffffff') {
		strokeStyle = 'W';
	} else {
		strokeStyle = 'B';
	}

	var left = Math.min(x1, x2);
	var top = Math.min(y1, y2);
	var width = Math.abs(x2 - x1);
	var height = Math.abs(y2 - y1);

	var rotate;
	if (x1 <= x2 && y1 <= y2) {
		rotate = 'L';
	} else if (x1 >= x2 && y1 >= y2) {
		rotate = 'L';
	} else if (x1 >= x2 && y1 <= y2) {
		rotate = 'R';
	} else if (x1 <= x2 && y1 >= y2) {
		rotate = 'R';
	}

	left += group ? group.left || 0 : 0;
	top += group ? group.top || 0 : 0;

	var commands = [['^FO' + left, top], ['^GD' + width, height, lineWidth, strokeStyle, rotate], ['^FS']];

	return commands;
}

exports.Line = line;

},{"./rect":16}],16:[function(require,module,exports){
'use strict';

var T = require('./text');
var shapeTranscoord = require('./transcoord').shapeTranscoord;
var rotateCase = require('./transcoord').rotateCase;

function rect(properties) {
	this.model = properties;

	this.toZpl = function (group) {
		var _model = this.model;
		var _model$width = _model.width;
		var width = _model$width === undefined ? '' : _model$width;
		var _model$height = _model.height;
		var height = _model$height === undefined ? '' : _model$height;
		var _model$lineWidth = _model.lineWidth;
		var lineWidth = _model$lineWidth === undefined ? '' : _model$lineWidth;
		var _model$fillStyle = _model.fillStyle;
		var fillStyle = _model$fillStyle === undefined ? '' : _model$fillStyle;
		var strokeStyle = _model.strokeStyle;
		var left = _model.left;
		var top = _model.top;
		var rotation = _model.rotation;
		var _model$round = _model.round;
		var round = _model$round === undefined ? 0 : _model$round;
		var // 0 ~ 100
		text = _model.text;

		var rotate = rotateCase(rotation);

		switch (rotate) {
			case 'N':
			case 'I':
			default:
				break;
			case 'R':
			case 'B':
				var tmp = width;
				width = height;
				height = tmp;

				var startPoint = shapeTranscoord(this.model);
				left = startPoint.x;
				top = startPoint.y;
				break;
		}

		if (strokeStyle === 'white' || strokeStyle === '#fff' || strokeStyle === '#ffffff') {
			strokeStyle = 'W';
		} else {
			strokeStyle = 'B';
		}

		if (fillStyle) {
			if (fillStyle === 'white' || fillStyle === '#fff' || fillStyle === '#ffffff') {
				fillStyle = 'W';
			} else {
				fillStyle = 'B';
			}

			lineWidth = height;
			strokeStyle = fillStyle;
		}

		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		var commands = [['^FO' + left, top], ['^GB' + width, height, lineWidth, strokeStyle, Math.round(round * 8 / 100)], ['^FS']];

		var zpl = '';
		commands.forEach(function (c) {
			zpl += c.join(',') + '\n';
		});
		zpl += '\n';

		// make text command
		if (text) {
			var texts = new T.Text(this.model);
			zpl += texts.toZpl(group);
		}

		return zpl;
	};
}

exports.Rect = rect;

},{"./text":17,"./transcoord":18}],17:[function(require,module,exports){
'use strict';

var config = require('../../config').config;
var Line = require('./line').Line;
var textTranscoord = require('./transcoord').textTranscoord;
var transcoordS2P = require('./transcoord').transcoordS2P;
var rotateCase = require('./transcoord').rotateCase;

function text(properties) {
  this.model = properties; // text 에서는 left, top만 위치를 결정함, width, height는 의미가 없음.

  this.toZpl = function (group) {
    var _model = this.model;
    var _model$text = _model.text;
    var text = _model$text === undefined ? '' : _model$text;
    var _model$left = _model.left;
    var left = _model$left === undefined ? 0 : _model$left;
    var _model$top = _model.top;
    var top = _model$top === undefined ? 0 : _model$top;
    var _model$width = _model.width;
    var width = _model$width === undefined ? '' : _model$width;
    var _model$height = _model.height;
    var height = _model$height === undefined ? '' : _model$height;
    var _model$textType = _model.textType;
    var textType = _model$textType === undefined ? '' : _model$textType;
    var charWidth = _model.charWidth;
    var charHeight = _model.charHeight;
    var lineCount = _model.lineCount;
    var _model$rotation = _model.rotation;
    var rotation = _model$rotation === undefined ? 0 : _model$rotation;
    var underLine = _model.underLine;
    var strike = _model.strike;
    var _model$maxLines = _model.maxLines;
    var maxLines = _model$maxLines === undefined ? 100 : _model$maxLines;
    var hangingIndent = _model.hangingIndent;
    var lineMargin = _model.lineMargin;

    if (!width) {
      this.model.width = charWidth * text.length;
    }

    if (!height || height === '') {
      this.model.height = charHeight;
    }

    var startPoint = textTranscoord(this.model);
    left = startPoint.x;
    top = startPoint.y;

    left += group ? group.left || 0 : 0;
    top += group ? group.top || 0 : 0;

    var rotate = rotation || '';
    rotate += group ? group.rotation || 0 : 0;

    var textAlign = this.model.textAlign || '';

    rotate = rotateCase(rotation);

    var fontNo = config.fontNo || 0;
    if (textType === 'W' || textType === 'w') {
      switch (textAlign) {
        case 'left':
          textAlign = 'L';
          break;
        case 'right':
          textAlign = 'R';
          break;
        case 'center':
        default:
          textAlign = 'C';
          break;
        case 'justified':
          textAlign = 'J';
          break;
      }

      var commands = [['^FO' + left, top],
      // ['^A@'+rotate, charHeight, charWidth * 0.75],
      ['^A' + fontNo + rotate, charHeight, charWidth], // FIXME
      ['^FB' + width, maxLines, lineMargin, textAlign, hangingIndent], ['^FD' + text], ['^FS']];
    } else {
      var commands = [['^FO' + left, top],
      // ['^A@' + rotate, charHeight, charWidth * 0.75],
      ['^A' + fontNo + rotate, charHeight, charWidth], ['^FD' + text], ['^FS']];
    }

    var zpl = '';
    zpl += lineZpl.call(this, group, rotate, left, top);
    commands.forEach(function (c) {
      zpl += c.join(',') + '\n';
    });

    return zpl;
  };
}

function lineZpl(group, rotate) {
  var _this = this;

  var _model2 = this.model;
  var left = _model2.left;
  var top = _model2.top;
  var width = _model2.width;
  var textWidth = _model2.textWidth;
  var charHeight = _model2.charHeight;
  var _model2$lineCount = _model2.lineCount;
  var lineCount = _model2$lineCount === undefined ? 1 : _model2$lineCount;
  var underLine = _model2.underLine;
  var strike = _model2.strike;

  textWidth = textWidth || width;

  var x = left;

  var points = [];
  var zpl = '';
  if (underLine) {
    var y = top;
    for (var i = 0; i < lineCount; i++) {
      y += charHeight;
      points.push({ x1: x, x2: x + textWidth, y1: y, y2: y });
    }
  }

  if (strike) {
    var _y = top + charHeight / 2;
    for (var _i = 0; _i < lineCount; _i++) {
      points.push({ x1: x, x2: x + textWidth, y1: _y, y2: _y });
      _y += charHeight;
    }
  }

  var rotatePoints = points.map(function (point) {
    var sp = transcoordS2P(point.x1, point.y1, _this.model);
    var ep = transcoordS2P(point.x2, point.y2, _this.model);

    return { x1: sp.x, x2: ep.x, y1: sp.y, y2: ep.y };
  });

  rotatePoints.forEach(function (point) {
    var line = new Line(point);
    zpl += line.toZpl(group);
  });

  return zpl;
}

function rotateLine(rotate, x, textWidth, y, ty, lineIndex) {
  switch (rotate) {
    case 'N':
    default:
      return { x1: x, x2: x + textWidth, y1: y + ty, y2: y + ty };
      break;
    case 'R':
      return { x1: x, x2: x, y1: y, y2: y + textWidth };
      break;
    case 'I':
      return { x1: x, x2: x + textWidth, y1: y, y2: y };
      break;
    case 'B':
      return { x1: x + ty, x2: x + ty, y1: y, y2: y + textWidth };
      break;
  }
}

exports.Text = text;

},{"../../config":1,"./line":15,"./transcoord":18}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transcoordS2P = transcoordS2P;
exports.shapeTranscoord = shapeTranscoord;
exports.textTranscoord = textTranscoord;
exports.calcDotSize = calcDotSize;
exports.rotateCase = rotateCase;

/*
 * 좌표 변환 API.
 */

function calcCenter(left, top, width, height) {
  return {
    x: left + width / 2,
    y: top + height / 2
  };
}

/*
 * transcoordRR은 자신의 회전각을 감안하여 부모의 원점을 이동시킨 상태의 좌표값을 (반대로 회전시켜서)
 * 부모 원점 기준의 좌표로 변환하는 기능.
 * (기존의 reverseTranscoord와 동일함 - RR은 Reverse Rotation을 의미함.)
 */
function transcoordRR(x, y) {
  var rotatePoint = arguments.length <= 2 || arguments[2] === undefined ? { x: 0, y: 0 } : arguments[2];
  var rotation = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  var scale = arguments.length <= 4 || arguments[4] === undefined ? { x: 1, y: 1 } : arguments[4];

  x -= rotatePoint.x;
  y -= rotatePoint.y;

  return {
    x: (x * Math.cos(rotation) - y * Math.sin(rotation) + rotatePoint.x) * scale.x,
    y: (x * Math.sin(rotation) + y * Math.cos(rotation) + rotatePoint.y) * scale.y
  };
}

/*
 * transcoordS2P는 현재 컴포넌트(Self) 기준의 논리좌표를 부모(Parent) 컨테이너 기준의 논리좌표로 변환한다.
 */
function transcoordS2P(x, y, model) {
  var left = model.left;
  var top = model.top;
  var width = model.width;
  var height = model.height;
  var _model$rotation = model.rotation;
  var rotation = _model$rotation === undefined ? 0 : _model$rotation;
  var text = model.text;

  var rotatePoint = calcCenter(left, top, width, height);
  var point = transcoordRR(x, y, rotatePoint, rotation);

  return {
    x: point.x,
    y: point.y
  };
}

function shapeTranscoord(model) {
  var left = model.left;
  var top = model.top;
  var width = model.width;
  var height = model.height;

  // 회전

  var start = transcoordS2P(left, top, model);
  var end = transcoordS2P(left + width, top + height, model);

  var x = Math.min(start.x, end.x);
  var y = Math.min(start.y, end.y);

  return { x: x, y: y };
}

function textTranscoord(model) {
  var point = shapeTranscoord(model); // start point
  var x = point.x;
  var y = point.y;

  var rotate = rotateCase(model.rotation);

  switch (rotate) {
    case 'N':
      break;
    case 'R':
      break;
    case 'I':
      if (model.textAlign === 'left') {
        model.textAlign = 'right';
      } else if (model.textAlign === 'right') {
        model.textAlign = 'left';
      }
      break;
    case 'B':
      if (model.textAlign === 'left') {
        model.textAlign = 'right';
      } else if (model.textAlign === 'right') {
        model.textAlign = 'left';
      }

      model.text = model.text.split('').reverse().join('');

      break;
  }

  var transValue = calcTextPosition(model);
  if (rotate === 'N' || rotate === 'I') {
    x += transValue.tx;
    y += transValue.ty;
  } else {
    x += transValue.ty;
    y += transValue.tx;
  }

  return { x: x, y: y };
}

function calcTextPosition(model) {
  var _model$textAlign =
  // paddingLeft = 0,
  // paddingRight = 0,
  // paddingTop = 0,
  // paddingBottom = 0
  model.textAlign;
  var textAlign = _model$textAlign === undefined ? 'center' : _model$textAlign;
  var _model$textBaseline = model.textBaseline;
  var textBaseline = _model$textBaseline === undefined ? 'middle' : _model$textBaseline;
  var left = model.left;
  var width = model.width;
  var height = model.height;
  var charHeight = model.charHeight;
  var textWidth = model.textWidth;
  var rotation = model.rotation;
  var _model$lineMargin = model.lineMargin;
  var lineMargin = _model$lineMargin === undefined ? 0 : _model$lineMargin;
  var _model$lineCount = model.lineCount;
  var lineCount = _model$lineCount === undefined ? 1 : _model$lineCount;

  textWidth = textWidth || width;

  width = Math.max(width, textWidth);
  var textsHeight = (charHeight + lineMargin) * lineCount;
  height = Math.max(height, textsHeight);

  var tx = 0;
  // switch(textAlign) {
  //   case 'left':
  //   case 'justify':
  //     tx = paddingLeft;
  //     break;
  //   case 'right':
  //     tx = (width - textWidth - paddingRight);
  //     break;
  //   case 'center':
  //   default:
  //     let myWidth = width - paddingLeft - paddingRight;
  //     if (rotateCase(rotation) === 'N') {
  //       tx = (myWidth - textWidth) / 2 + paddingLeft;
  //     } else if(rotateCase(rotation) === 'R') {
  //       tx = (myHeight - textsHeight) / 2 + paddingBottom;
  //     } else if(rotateCase(rotation) === 'I') {
  //       tx = (myWidth - textWidth) / 2 + paddingRight;
  //     } else if(rotateCase(rotation) === 'B') {
  //       tx = (myHeight - textsHeight) / 2 + paddingTop;
  //     }

  //     break;
  // }

  switch (textAlign) {
    case 'left':
    case 'justify':
      tx = 0;
      break;
    case 'right':
      tx = width - textWidth;
      break;
    case 'center':
    default:
      tx = (width - textWidth) / 2;

      break;
  }

  var ty = 0;
  // switch(textBaseline) {
  //   case 'top':
  //   case 'hanging':
  //     // height = height < textsHeight ? textsHeight : height;
  //     ty = paddingTop
  //     break;
  //   case 'bottom':
  //   case 'alphabetic':
  //     ty = (height - textsHeight) - paddingBottom
  //     break;
  //   case 'middle':
  //   default:
  //     // let myWidth = width - paddingLeft - paddingRight;
  //     // let myHeight = height - paddingTop - paddingBottom;
  //     // if (rotateCase(rotation) === 'N') {
  //     //   ty = (myHeight - textsHeight) / 2 + paddingTop;
  //     // } else if (rotateCase(rotation) === 'R') {
  //     //   ty = (myWidth - textWidth) / 2 + paddingLeft;
  //     // } else if (rotateCase(rotation) === 'I') {
  //     //   ty = (height - charHeight) / 2 + paddingBottom;
  //     // } else if (rotateCase(rotation) === 'B') {
  //     //   ty = (myWidth - textWidth) / 2 + paddingRight;
  //     // }

  //     break;
  // }

  switch (textBaseline) {
    case 'top':
    case 'hanging':
      ty = 0;
      break;
    case 'bottom':
    case 'alphabetic':
      ty = height - textsHeight;
      break;
    case 'middle':
    default:
      ty = (height - textsHeight) / 2;

      break;
  }

  return { tx: tx, ty: ty };
}

var config = require('../../config').config;
function calcDotSize(model) {
  for (var property in model) {
    if (property === 'rotation' || property === 'scale_w' || property === 'scale_h' || property === 'round') {
      continue;
    }

    var value = model[property];
    if (typeof value === 'number') {
      model[property] = Math.round(config.dpi * value / 25.4);
    }
  }
}

function rotateCase(rotate) {
  if (Math.PI * 0.25 < rotate && rotate <= Math.PI * 0.75) {
    rotate = 'R';
  } else if (Math.PI * 0.75 < rotate && rotate <= Math.PI * 1.25 || Math.PI * -1.25 < rotate && rotate <= Math.PI * -0.75) {
    rotate = 'I';
  } else if (Math.PI < rotate * 1.25 && rotate <= Math.PI * 1.75 || Math.PI * -0.75 < rotate && rotate <= Math.PI * -0.25) {
    rotate = 'B';
  } else {
    // if (Math.PI * -0.25 < rotate && rotate <= Math.PI * 0.25) {
    rotate = 'N';
  }

  return rotate;
}

},{"../../config":1}],19:[function(require,module,exports){
'use strict';

var Utils = require('./commands/utils');
var commandsMap = require('./commands/index').commands;

var fontBuf;
var barcodeBuf;
var imageBuf;

exports.convert = function (zpl) {

	if (!zpl) return;

	fontBuf = {};
	barcodeBuf = {};
	imageBuf = new Map();

	var models = [];
	var obj = {};

	var commands = zpl.split('^');
	commands.forEach(function (c) {
		if (c.trim().length === 0) return;

		c = c.replace('\n', '');
		var command = c.substr(0, 2);

		if (command.charAt(0) === 'A') {
			var params = c.substr(1);

			var commandHandler = Utils.get(commandsMap, 'A');
			if (!commandHandler) return;

			var properties = commandHandler.handler(params);
			obj = Object.assign(obj || {}, properties);

			return;
		}

		var commandHandler = Utils.get(commandsMap, command);
		if (!commandHandler) return;

		var params;
		if (command === 'FD') {
			params = c.substr(2);
		} else {
			params = c.substr(2).split(',').map(function (value) {
				return value.trim();
			});
		}

		var properties = commandHandler.handler(params);

		switch (command) {
			case 'XZ':
				// 마지막 바코드는 FS를 생략하고 XZ로 끝나도 가능
				if (obj == null) // XZ가 null인 경우는 마지막 바코드도 FS로 끝나는 경우
					break;

			case 'FS':
				if (!obj.type) {
					obj.type = 'text';
					obj.textAlign = 'left';
					obj.textType = obj.textType || 'F';
				}

				// obj = Utils.specific(obj);
				obj = specific(obj);
				obj.centerRotate = false;
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
	});

	return models;
};

// function dashParser(zpl) {
//   var startIdx = zpl.indexOf('~');
//   var endIdx = Math.min(command.indexOf('~'), command.indexOf('^'));

//   var dashCommand = zpl.substr(startIdx, endIdx);
//   var command = dashCommand.substr(0, 2);
//   switch(command) {
//   	case 'DG':
//   		var commandHandler = commandsMap.get(command);
//   		var properties = commandHandler.handler(params);
//   		imageBuf.set(properties.id, properties.data);

//   		break;
//   	case '':
//   		break;
//   }

//   zpl.replace(dashCommand, '');
//   dashParser(zpl);

//  	return zpl;
// }

var specific = function specific(obj) {
	switch (obj.type) {
		case 'line':
			obj.x1 = obj.left;
			obj.x2 = obj.left + obj.width;

			// x1과 x2가 같은으면서 테두리가 100이상 정도 굵은 경우에는 ZPL의 가로선을 표현 할 때에 해당됨. (100이란 수치는 대략임)
			if (obj.x1 == obj.x2 && obj.lineWidth >= 100) {
				obj.x1 += obj.lineWidth / 2;
				obj.x2 += obj.lineWidth / 2;
			}

			if (obj.rotate === 'L') {
				obj.y1 = obj.top;
				obj.y2 = obj.top + obj.height;
			} else {
				// default is 'R'
				obj.y1 = obj.top + obj.height;
				obj.y2 = obj.top;
			}

			delete obj.left;
			delete obj.top;
			delete obj.width;
			delete obj.height;
			delete obj.rotate;

			break;
		case 'ellipse':
			obj.cx = obj.left + obj.rx;
			obj.cy = obj.top + obj.ry;

			delete obj.left;
			delete obj.top;

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
};

function error_log(c) {
	console.log('Command: ' + c + ' parameter error');
}

},{"./commands/index":8,"./commands/utils":10}],20:[function(require,module,exports){
'use strict';

var Text = require('./components/text').Text;
var Barcode = require('./components/barcode').Barcode;
var Rect = require('./components/rect').Rect;
var Ellipse = require('./components/ellipse').Ellipse;
var Line = require('./components/line').Line;
var Group = require('./components/group').Group;
var Image = require('./components/image').Image;

var calcDotSize = require('./components/transcoord').calcDotSize;

exports.revert = function (components) {
	if (!components) return;

	var zpl = '^XA\n';
	zpl = makeZpl(components, zpl);
	zpl += '^XZ';

	return zpl;
};

var groups = [];
function makeZpl(components, zpl) {
	if (!components) return;

	if (groups.length > 0) {
		var group = groups.pop();
	}

	components.forEach(function (c) {
		calcDotSize(c);

		switch (c.type) {
			case 'group':
				groups.push(new Group(c));
				zpl += makeZpl(c.components, '');

				break;
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
			case 'image-view':
				var obj = new Image(c);
				break;
			case 'line':
				var obj = new Line(c);

				break;
		}

		if (obj) {
			zpl += obj.toZpl(group);
			zpl += '\n';
		}
	});

	return zpl;
}

},{"./components/barcode":11,"./components/ellipse":12,"./components/group":13,"./components/image":14,"./components/line":15,"./components/rect":16,"./components/text":17,"./components/transcoord":18}]},{},[2]);
