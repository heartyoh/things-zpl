exports.sample001 = [{
  type: 'text',
  top: 30,
  left: 30,
  textAlign: 'left',
  fontSize: '30',
  height: 10,
  fontFamily: 'serif',
  text: 'line, ellipse, barcode(code39, planet), text를 테스트 합니다.'
}, {
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
},{
  type: 'rect',
  top: 120,
  left:140,
  width: 200,
  height: 190
},{
  type: 'barcode',
  left: 200,
  top: 200,
  width: 800,
  height: 200,
  symbol: "code39",
  text: "1234567890",
  // alttext: "8741493123493123",
  alttext : 'N',
  scale_h: 1,
  scale_w: 2,
  rot: "N",
  rotation: .1
}, {
  type: 'barcode',
  left: 100,
  top: 350,
  width: 300,
  height: 300,
  symbol: "planet",
  text: "http://www.hatiolab.com",
  scale_h: 1,
  scale_w: 2,
  rot: "I",
  rotation: 1.5
}, {
  type: 'text',
  left: 30,
  top: 60,
  width: 200,
  height: 200,
  text: 'TEST FITTED TEXT'
}, {
    "left": 25,
    "top": 50,
    "blockLine": 350,
    "lineLimited": 4,
    "portraitWidth": 30,
    "textAlign": "L",
    "hangingIndent": null,
    "text": "\"FD\" statement that IS preceded by an \"FB\" command.",
    "type": "text",
    "toFit": true
  }]
