exports.sample001 = [{
  type: 'text',
  top: 30,
  left: 30,
  textAlign: 'left',
  fontSize: '30',
  fontFamily: 'serif',
  text: '이 모델은 바코드 컴포넌트를 위한 샘플입니다.'
},  {
    type: 'ellipse',
    rx: 250,
    ry: 250,
    lineWidth: 10,
    fillStyle: 'B',
    cx: 290,
    cy: 290
  },{
    type: 'ellipse',
    rx: 300,
    ry: 200,
    lineWidth: 20,
    fillStyle: 'W',
    cx: 340,
    cy: 340
  },{
  type: 'barcode',

  left: 200,
  top: 200,
  width: 800,
  height: 200,
  symbol: "code39",
  text: "1234567890",
  alttext: "8741493123493123",
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
  rotation: .5
}, {
  type: 'text',
  left: 30,
  top: 60,
  width: 200,
  height: 200,
  text: 'TEST FITTED TEXT'
}]
