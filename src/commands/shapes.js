var shapes = {
	'DG': {
		desc: 'Download Graphic use with ^XG',
		parameters: '^DGd:o.x,t,w,data: t: total number of bytes in graphic, w: number of bytes per row, data: ASCII hexadecimal string defining image',
		handler: function(p) {
			var obj = {};
			obj.id = p[0]
			obj.totalSize = p[1]
			obj.rowSize = p[2]
			obj.data = p[3]
		}
	},
	'GB': {
		desc: 'Graphic Box',
		parameters: 'w,h,t,c,r : t: border thickness, c: line color, r: degree of corner-rounding',
		handler: function(p) {
			var obj = {};
			obj.type = 'rect'
			obj.innerBorder = true
			obj.width = parseInt(p[0])
			obj.height = parseInt(p[1])
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black'

			return obj
		}
	},
	'GC': {
		desc: 'Graphic Circle',
		parameters: 'd,t,c : d: circle diameter',
		handler: function(p) {
			var obj = {};
			obj.type = 'ellipse'
			obj.rx = parseInt(p[0])
			obj.ry = parseInt(p[0])
			obj.lineWidth = parseInt(p[1])
			obj.fillStyle = p[2]

			return obj
		}
	},
	'GD': {
		desc: 'Graphic Diagonal Line',
		parameters: 'w,h,t,c,o',
		handler: function(p) {
			var obj = {};
			obj.type = 'line'
			obj.width = parseInt(p[0])
			obj.height = parseInt(p[1])
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black'
			obj.rotate = p[4]

			return obj
		}
	},
	'GE': {
		desc: 'Graphic Ellipse',
		parameters: 'w,h,t,c',
		handler: function(p) {
			var obj = {};
			obj.type = 'ellipse'
			obj.rx = parseInt(p[0]) / 2
			obj.ry = parseInt(p[1]) / 2
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black'

			return obj
		}
	},
	'GF': {
		desc: 'Graphic Field',
		parameters: 'a,b,c,d,data : a: compression type(A,B,C), b: binary byte count, c: graphic field count, d: bytes per row',
		handler: function(p) {
			// Graphic Field 지원 안함.
		}
	},
	'GS': {
		desc: 'Graphic Symbol',
		parameters: 'o,h,w',
		handler: function(p) {
			// Graphic Symbol 지원 안함.
		}
	}
}

exports.shapes = shapes
