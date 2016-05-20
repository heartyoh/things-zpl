var common = {
	'MD': {
		desc: '',
		parameters: '',
		handler: function(p) {	// media darkness
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
		handler: function(p) {	// label length	// TODO
		}
	},
	'XG': {
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
	},
	'XA': {
		desc: 'Start Format',
		parameters: '',
		handler: function(p) {
		}
	},
	'XZ': {
		desc: '',
		parameters: '',
		handler: function(p) {
		}
	}
}
