exports.commands = new Map([
	['A', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = {};
			var sign = params.substr(0, 1);
			params = params.substr(1);

			if (sign === '0') {
				var p = params.split(',');

				obj.width = parseInt(p[1]);
				obj.height = parseInt(p[2]);

				switch(p[0]) {
					// TODO font family
					case '0':
						obj.fontFamily = 'serif'	// FIXME
						break;
				}

				return obj;
			} else if(sign === '@') {	// ^A@o,h,w,d:o.x	// o: rotation(n,r,i,b), d: drive location of font, o: font name, x: extension
				var p = params.split(',');
				obj.width = parseInt(p[1]);
				obj.height = parseInt(p[2]);

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
					switch(fonts) {
						// TODO font family
						case 'CYRI_UB':
							obj.fontFamily = fonts.toLowerCase();
							break;
					}
				} else if (p.length === 3) {

				} else {
					error_log('A@');
					return;
				}

				obj.rotation = getRotation(p[0]);
				
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
			var obj = oehfgki(params);
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
			obj.width = params[0]
			obj.rot = params[1]
			obj.width = params[2]

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
		desc: '',
		parameters: '',
		handler: function(p) {	// ^CFf,h,w : f: font
			var obj = {};
			obj.height = parseInt(p[1]);
			obj.width = parseInt(p[2]);
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


			return { text: p[0] }
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
			obj.innerBor = true
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
			obj.rx = parseInt(p[0])
			obj.ry = parseInt(p[1])
			obj.lineWidth = parseInt(p[2])
			obj.fillStyle = p[3]

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

function ohfg(params) {
		var p = params.split(',');
		
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

function oehfgki(p) {
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

function mpt(params) {
		var p = params.split(',');
		
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
			return Math.PI / 180 * 0.5;
			break;
		case 'I':
			return Math.PI / 180 * 1;
			break;
		case 'B':
			return Math.PI / 180 * 1.5;
			break;
	}
}
