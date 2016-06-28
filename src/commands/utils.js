exports.rotation = function(r) {
  switch(r) {
    case 'N':
      return Math.PI / 180 * 0;
    case 'R':
      return Math.PI / 180 * 90;
    case 'I':
      return Math.PI;
    case 'B':
      return Math.PI / 180 * 270;
  }
};

exports.get = function(object, prop) {
  return object[prop]
}

exports.specific = function(obj) {
  switch(obj.type) {
    case 'line':
      obj.x1 = obj.left
      obj.x2 = obj.left + obj.width;

      // x1과 x2가 같은으면서 테두리가 100이상 정도 굵은 경우에는 ZPL의 가로선을 표현 할 때에 해당됨. (100이란 수치는 대략임)
      if(obj.x1 == obj.x2 && obj.lineWidth >= 100){
        obj.x1 += obj.lineWidth / 2
        obj.x2 += obj.lineWidth / 2
      }

      if (obj.rotate === 'L') {
        obj.y1 = obj.top
        obj.y2 = obj.top + obj.height;
      } else {  // default is 'R'
        obj.y1 = obj.top + obj.height;
        obj.y2 = obj.top;
      }
      
      delete obj.left
      delete obj.top
      delete obj.width
      delete obj.height
      delete obj.rotate

      break;
    case 'ellipse':
      obj.cx = obj.left + obj.rx;
      obj.cy = obj.top + obj.ry;

      delete obj.left
      delete obj.top

      break;
    case 'text':
      if (fontBuf.charHeight || fontBuf.charWidth) {
        Object.assign(obj, fontBuf);

        // obj.width = (obj.width || fontBuf.charWidth * obj.text.length)
        // obj.height = obj.height || fontBuf.charHeight
      }
      break;

    case 'rect':
      break;

    case 'image_view':
      break;

    case 'barcode':
      if (!obj.height) {
        obj.height = barcodeBuf.height;
      }

      if (!obj.scale_w) {
        obj.scale_w = barcodeBuf.scale_w;
      }

      break;
  }

  return obj;
}


var config = require('../../config').config
exports.calcMmSize = function(models) {
  models.forEach(model => {
    for (var property in model) {
      if (property === 'rotation' || property === 'scale_w' || property === 'scale_h' || property === 'round') {
        continue;
      }

      let value = model[property];
      if (typeof value === 'number') {
        model[property] = Math.round(value/config.dpi * 25.4 * 100) / 100
      }
    }
  });

  return models;
}