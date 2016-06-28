// text, line, ellipse, rect, barcode
exports.sample = [{
  type: 'line',
  lineWidth: 5,
  fillStyle: 'B',
  x1: 200,
  x2: 280,
  y1: 200,
  y2: 400
},{
  type: 'ellipse',
  left: 10,
  top: 20,
  rx: 30,
  ry: 20,
  lineWidth: 20,
  fillStyle: 'black',
  cx: 34,
  cy: 34
},{
  type: 'rect',
  top: 6,
  left:7,
  width: 10,
  height: 7.5,
  fillStyle: 'black'
}, {
  type: 'rect',
  top: 12,
  left:14,
  rotation: Math.PI/2,
  width: 20,
  height: 15
}, {  // barcode type code39
  left: 20,
  top: 11,
  width: 51,
  height: 20,
  rot: "N",
  rotation: 0.1,
  scale_h: 1,
  scale_w: 2,
  symbol: "code39",
  text: "1234567890",
  alttext: "1234567890",
  type: "barcode"
}, {  // barcode type code39 rotation 90
  left: 20,
  top: 11,
  width: 51,
  height: 20,
  rot: "N",
  rotation: Math.PI/2,
  scale_h: 1,
  scale_w: 2,
  symbol: "code39",
  text: "1234567890",
  alttext: "1234567890",
  type: "barcode"
}]
