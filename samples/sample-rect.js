// text, line, ellipse, rect, barcode
exports.sample = [/*{
  type: 'line',
  lineWidth: 5,
  fillStyle: 'B',
  x1: 200,
  x2: 280,
  y1: 200,
  y2: 400
},{
  type: 'ellipse',
  rx: 300,
  ry: 200,
  lineWidth: 20,
  fillStyle: 'W',
  cx: 340,
  cy: 340
},*/{
  type: 'rect',
  top: 120,
  left:140,
  width: 200,
  height: 150
}, {
  type: 'rect',
  top: 120,
  left:140,
  rotation: Math.PI/2,
  width: 200,
  height: 150
}, {  // barcode type code39
  left: 200,
  top: 110,
  width: 510,
  height: 200,
  rot: "N",
  rotation: 0.1,
  scale_h: 1,
  scale_w: 2,
  symbol: "code39",
  text: "1234567890",
  alttext: "1234567890",
  type: "barcode"
}, {  // barcode type code39 rotation 90
  left: 200,
  top: 110,
  width: 510,
  height: 200,
  rot: "N",
  rotation: Math.PI/2,
  scale_h: 1,
  scale_w: 2,
  symbol: "code39",
  text: "1234567890",
  alttext: "1234567890",
  type: "barcode"
}]
