exports.commands = new Map([
	['A', function(params) {
		var obj = {};
		var sign = params.substr(0, 1);
		params = params.substr(1);

		if (sign === '0') {
			var p = params.split(',');

			obj.width = new Number(p[1]);
			obj.height = new Number(p[2]);

			switch(p[0]) {
				// TODO font family
				case '0':
					obj.fontFamily = 'serif'	// FIXME
					break;
			}

			return obj;
		} else if(sign === '@') {	// ^A@o,h,w,d:o.x	// o: rotation(n,r,i,b), d: drive location of font, o: font name, x: extension
			var p = params.split(',');
			obj.width = new Number(p[1]);
			obj.height = new Number(p[2]);

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
	}],
	['B1', function(p) {
		var obj = oehfg(p);
		obj.symbol = 'code11';
		return obj;
	}],
	['B2', function(p) {
		var obj = ohfge(p);
		obj.symbol = 'interleaved2of5';
		return obj;
	}],
	['B3', function(p) {
		var obj = oehfg(p);
		obj.symbol = 'code39';
		return obj;
	}],
	['B4', function(p) {
		var obj = ohfm(p);
		obj.symbol = 'code49';
		return obj;
	}],
	['B5', function(params) {
		var obj = ohfg(params);
		obj.symbol = 'planet'
		return obj;
	}],
	['B7', function(params) {
		var obj = ohscrt(params);
		obj.symbol = 'pdf417'
		return obj;
	}],
	['B8', function(params) {
		var obj = ohfg(params);
		obj.symbol = 'ean8'
		return obj;
	}],
	['B9', function(params) {
		var obj = ohfge(params);
		obj.symbol = 'upce'
		return obj;
	}],
	['BA', function(params) {
		var obj = ohfge(params);
		obj.symbol = 'code93'
		return obj;
	}],
	['BB', function(params) {
		var obj = ohscrm(params);
		obj.symbol = 'codablock'
		return obj;
	}],
	['BC', function(params) {
		var obj = ohscrm(params);
		obj.symbol = 'code128'
		return obj;
	}],
	['BD', function(params) {
		var obj = mpt(params);
		obj.symbol = 'maxicode'
		return obj;
	}],
	['BE', function(params) {
		var obj = ohfg(params);
		obj.symbol = 'ean13'
		return obj;
	}],
	['BF', function(params) {
		var obj = ohm(params);
		obj.symbol = 'micropdf417'
		return obj;
	}],
	['BI', function(params) {
		var obj = ohfg(params);
		obj.symbol = 'industrial2of5'
		return obj;
	}],
	['BJ', function(params) {
		var obj = ohfg(params);
		obj.symbol = 'standard2of5'
		return obj;
	}],
	['BK', function(params) {
		var obj = oehfgki(params);
		obj.symbol = 'ansicodabar'
		return obj;
	}],
	['BL', function(params) {	
		var obj = ohg(params);
		obj.symbol = 'logmars'
		return obj;
	}],
	['BM', function(params) {
		var obj = oehfge(params);
		obj.symbol = 'msi'
		return obj;
	}],
	// ['BO', function(params) {      // 메뉴얼에 없음
	// 	var obj = oceeyyi(params);
	// 	obj.symbol = 'azteccode'
	// 	return obj;
	// }],
	['BP', function(params) {
		var obj = oehfg(params);
		obj.symbol = 'plessey'
		return obj;
	}],
	['BQ', function(params) {
		var obj = abcq(params);
		obj.symbol = 'qrcode'
		return obj;
	}],
	['BS', function(params) {
		// var obj = ohfg(params);
		// obj.symbol = 'upceanextension'	// 우리 라이브러리에 없음
		// return obj;
	}],
	['BU', function(params) {
		var obj = ohfge(params);
		obj.symbol = 'upca'
		return obj;
	}],
	['BX', function(params) {
		var obj = ohscrfg(params);
		obj.symbol = 'datamatrix'
		return obj;
	}],
	['BY', function(params) {	// barcode field default

	}],
	['BZ', function(params) {
		var obj = ohfg(params);
		obj.symbol = 'postal'
		return obj;
	}],
	['CF', function(p) {	// ^CFf,h,w : f: font
		var obj = {};
		obj.height = new Number(p[1]);
		obj.width = new Number(p[2]);
		switch(p[0]) {
			case 0:
				obj.fontFamily = 'serif';
				break;
			default:
				obj.fontFamily = 'serif';
				break;
		}

		return obj;
	}],
	['FD', function(p) {
		return { text: p[0] }
	}],
	['FO', function(p) {	// ^FOx,y

		if (p.length != 2) {
			error_log('FO');
			return;
		}

		return { left: new Number(p[0]), top: new Number(p[1]) }
	}],
	['FS', function(p) {
	}],
	['FX', function(p) {
	}],
	['GB', function(p) {	// ^GBw,h,t,c,r : t: border thickness, c: line color, r: degree of corner-rounding
		
		var obj = {};
		obj.type = 'fitted_rect'
		obj.width = new Number(p[0])
		obj.height = new Number(p[1])
		obj.lineWidth = new Number(p[2])
		obj.strokeStyle = new Number(p[3])

		return obj
	}],
	['GC', function(p) {	// ^GCd,t,c : d: circle diameter
		
		var obj = {};
		obj.type = 'ellipse'
		obj.rx = new Number(p[0])
		obj.ry = new Number(p[0])
		obj.lineWidth = new Number(p[1])
		obj.fillStyle = p[2]

		return obj
	}],
	['GD', function(p) {	// Graphic Diagonal Line ^GDw,h,t,c,o

		var obj = {};
		obj.type = 'line'
		obj.width = new Number(p[0])
		obj.height = new Number(p[1])
		obj.lineWidth = new Number(p[2])
		obj.fillStyle = p[3]
		obj.rotate = p[4]

		return obj
	}],
	['GE', function(p) {	// ^GEw,h,t,c

		var obj = {};
		obj.type = 'ellipse'
		obj.rx = new Number(p[0])
		obj.ry = new Number(p[1])
		obj.lineWidth = new Number(p[1])
		obj.fillStyle = p[2]

		return obj
	}],
	['GF', function(p) {	// ^GFa,b,c,d,data : a: compression type(A,B,C), b: binary byte count, c: graphic field count, d: bytes per row
		// Graphic Field 지원 안함.
	}],
	['GS', function(p) {	// ^GSo,h,w
		// Graphic Symbol 지원 안함.
	}],
	['MD', function(p) {	// media darkness

	}],
	['PO', function(p) {	// print orientation

	}],
	['PW', function(p) {	// print width

	}],
	['LR', function(p) {	// label reverse print

	}],
	['LL', function(p) {	// label length

	}],
	['XA', function(p) {

	}],
	['XZ', function(p) {
		
	}]
]);


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
