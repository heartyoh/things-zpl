var rotation = require('./utils').rotation

var fonts = {
	'A': {
		desc: 'Scalable/Bitmapped Font',
		parameters: 'f,o,h,w: f: font name, o: orientation, h: charHeight, w: width',
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

				obj.rotation = rotation(p[0]);
				
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
	},
	'CF': {
		desc: 'The ^CF command sets the default font used in your printer.',
		parameters: '^CFf,h,w',
		handler: function(p) {	// ^CFf,h,w : f: font
			var obj = {};
			obj.charHeight = parseInt(p[1]);
			obj.charWidth = parseInt(p[2] || 0);
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
	},
	'CI': {
		desc: 'Change International Font/Encoding',
		parameters: '',
		handler: function(p) {

		}
	},
	'CW': {	// 폰트 설정. 폰트를 숫자로 설정함.
		desc: 'Font Identifier',
		parameters: 'a,d:o.x: a(A~Z, 0~9), ',
		handler: function(p) {	// TODO 프린터에 있는 폰트를 알아야 사용 가능함.	CWQ,R:MYFONT.FNT

		}
	},
	'FL': {
		desc: 'Font Linking',
		parameters: '<ext>,<base>,<link>',
		handler: function(p) {	// TODO 프린터에 있는 폰트를 알아야 사용 가능함.

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
}

exports.fonts = fonts;