var Utils = require('./commands/utils')
var commandsMap = require('./commands/index').commands
var calcMmSize = require('./commands/utils').calcMmSize

var fontBuf;
var barcodeBuf;
var imageBuf;

exports.convert = function(zpl) {

  if (!zpl) return;

  fontBuf = {};
  barcodeBuf = {};
  imageBuf = new Map();

  var models = [];
  var obj = {};

  var commands = zpl.split('^');
  commands.forEach((c) => {
    if (c.trim().length === 0) return;

    c = c.replace('\n', '')
    var command = c.substr(0, 2);

    if (command.charAt(0) === 'A') {
      var params = c.substr(1);

      var commandHandler = Utils.get(commandsMap, 'A');
      if(!commandHandler) return;

      var properties = commandHandler.handler(params);
      obj = Object.assign(obj || {}, properties);

      return;
    }

    var commandHandler = Utils.get(commandsMap, command);
    if(!commandHandler) return;


    var params;
    if (command === 'FD') {
      params = c.substr(2);
    } else {
      params = c.substr(2).split(',').map(function(value) {
        return value.trim();
      });
    }

    var properties = commandHandler.handler(params);

    switch(command) {
      case 'XZ':      // 마지막 바코드는 FS를 생략하고 XZ로 끝나도 가능 
        if(obj == null)   // XZ가 null인 경우는 마지막 바코드도 FS로 끝나는 경우 
        break;

      case 'FS':
        if (!obj.type) {
          obj.type = 'text';
          obj.textAlign = 'left';
          obj.textType = obj.textType || 'F';
        }

        // obj = Utils.specific(obj);
        obj = specific(obj);
        obj.centerRotate = false
        models.push(obj);
        
        obj = null;
        break;

      case 'BY':
        Object.assign(barcodeBuf, properties || {});
        break;

      case 'CF':
        Object.assign(fontBuf, properties || {});
        break;

      default:
        obj = Object.assign(obj || {}, properties);
    }
  })

  calcMmSize(models);
  return models;
}

// function dashParser(zpl) {
//   var startIdx = zpl.indexOf('~');
//   var endIdx = Math.min(command.indexOf('~'), command.indexOf('^'));

//   var dashCommand = zpl.substr(startIdx, endIdx);
//   var command = dashCommand.substr(0, 2);
//   switch(command) {
//    case 'DG':
//      var commandHandler = commandsMap.get(command);
//      var properties = commandHandler.handler(params);
//      imageBuf.set(properties.id, properties.data);

//      break;
//    case '':
//      break;
//   }

//   zpl.replace(dashCommand, '');
//   dashParser(zpl);

//    return zpl;
// }

var specific = function(obj) {
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

function error_log(c) {
  console.log('Command: '+ c + ' parameter error');
}