var fields = {
	'FB': {
		desc: 'Field Block',
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
					obj.textAlign = '';
			}

			obj.hangingIndent = parseInt(p[4])		// 두번째 줄 띄어쓰기
			return obj
		}
	},
	'FC': {
		desc: 'Field Clock',
		parameters: '',
		handler: function(p) {	// ^FCa,b,c: Field Clock	// TODO
			// var obj = {};
		}
	},
	'FD': {
		desc: 'Field Data',
		parameters: '',
		handler: function(p) {
			
			// if () {	// check DATE
			// }
			p = p.trim();	// 바코드 양 끝의 공백은 출력되지 않으므로 trim 적용

			return { text: p }
		}
	},
	'FH': {
		desc: 'Field Hexadecimal Indicator',
		parameters: '0: hexadecimal indicator',
		handler: function(p) {
			// TODO
		}
	},
	'FO': {
		desc: 'Field Origin',
		parameters: 'x, y, justification(0: left, 1: right, 2: auto)',
		handler: function(p) {
			if (p.length < 2) {
				error_log('FO');
				return;
			}

			return { left: parseInt(p[0]), top: parseInt(p[1]), justification: parseInt(p[2])}
		}
	},
	'FS': {
		desc: 'Field Separator',
		parameters: '',
		handler: function(p) {
		}
	},
	'FT': {
		desc: 'Field Typeset',
		parameters: 'x, y, justification',
		handler: function(p) {
			if (p.length < 2) {
				error_log('FO');
				return;
			}

			return { left: parseInt(p[0]), top: parseInt(p[1]), justification: parseInt(p[2])}
		}
	},
	'FX': {
		desc: 'comment',
		parameters: '',
		handler: function(p) {
			// var obj = {};
		}
	}
}

exports.fields = fields
