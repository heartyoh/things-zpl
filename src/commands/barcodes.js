var barcodes = {
	'B1': {
		desc: 'Code 11 Bar Code',
		parameters: '',
		handler: function(p) {
			var obj = oehfg(p);
			obj.symbol = 'code11';
			return obj;
		}
	},
	'B2': {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = ohfge(p);
			obj.symbol = 'interleaved2of5';
			return obj;
		}
	},
	'B3': {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = oehfg(p);
			obj.symbol = 'code39';
			return obj;
		}
	},
	'B4': {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = ohfm(p);
			obj.symbol = 'code49';
			return obj;
		}
	},
	'B5': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'planet'
			return obj;
		}
	},
	'B7': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrt(params);
			obj.symbol = 'pdf417'
			return obj;
		}
	},
	'B8': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean8'
			return obj;
		}
	},
	'B9': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'upce'
			return obj;
		}
	},
	'BA': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'code93'
			return obj;
		}
	},
	'BB': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrm(params);
			obj.symbol = 'codablock'
			return obj;
		}
	},
	'BC': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfgem(params);
			obj.symbol = 'code128'
			return obj;
		}
	},
	'BD': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = mpt(params);
			obj.symbol = 'maxicode'
			return obj;
		}
	},
	'BE': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean13'
			return obj;
		}
	},
	'BF': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohm(params);
			obj.symbol = 'micropdf417'
			return obj;
		}
	},
	'BI': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'industrial2of5'
			return obj;
		}
	},
	'BJ': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'standard2of5'
			return obj;
		}
	},
	'BK': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfgkl(params);
			obj.symbol = 'ansicodabar'
			return obj;
		}
	},
	'BL': {
		desc: '',
		parameters: '',
		handler: function(params) {	
			var obj = ohg(params);
			obj.symbol = 'logmars'
			return obj;
		}
	},
	'BM': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfge(params);
			obj.symbol = 'msi'
			return obj;
		}
	},
	'BP': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfg(params);
			obj.symbol = 'plessey'
			return obj;
		}
	},
	'BQ': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = abcq(params);
			obj.symbol = 'qrcode'
			return obj;
		}
	},
	'BS': {
		desc: '',
		parameters: '',
		handler: function(params) {
			// var obj = ohfg(params);
			// obj.symbol = 'upcextension'	// 우리 라이브러리에 없음
			// return obj;
		}
	},
	'BU': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'upca'
			return obj;
		}
	},
	'BX': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrfg(params);
			obj.symbol = 'datamatrix'
			return obj;
		}
	},
	'BY': {
		desc: '',
		parameters: '',
		handler: function(params) {	// barcode field default
			var obj = {};
			obj.scale_w = params[0]
			// params[1]
			obj.height = params[2]

			return obj;
		}
	},
	'BZ': {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'postal'
			return obj;
		}
	}
}


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


exports.barcodes = barcodes