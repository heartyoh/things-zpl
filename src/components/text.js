var config = require('../../config').config
var Line = require('./line').Line
var textTranscoord = require('./transcoord').textTranscoord
var transcoordS2P = require('./transcoord').transcoordS2P
var rotateCase = require('./transcoord').rotateCase

function text(properties) {
  this.model = properties;  // text 에서는 left, top만 위치를 결정함, width, height는 의미가 없음.

  this.toZpl = function(group) {
    var {
      text = '',
      left = 0,
      top = 0,
      width = '',
      height = '',
      textType = '',
      charWidth,
      charHeight,
      lineCount,
      rotation = 0,
      underLine,
      strike,

      maxLines = 100,
      hangingIndent,
      lineMargin
    } = this.model

    if (!width) {
      this.model.width = charWidth * text.length;
    }

    if (!height || height === '') {
      this.model.height = charHeight;
    }

    var startPoint = textTranscoord(this.model)
    left = startPoint.x;
    top = startPoint.y;

    left += group ? group.left || 0 : 0;
    top += group ? group.top || 0 : 0;

    var rotate = rotation || '';
    rotate += group ? group.rotation || 0 : 0;

    var textAlign = this.model.textAlign || '';

    rotate = rotateCase(rotation);

    var fontNo = config.fontNo || 0;
    if (textType === 'W' || textType === 'w') {
      switch(textAlign) {
        case 'left':
          textAlign = 'L';
          break;
        case 'right':
          textAlign = 'R';
          break;
        case 'center':
        default:
          textAlign = 'C';
          break;
        case 'justified':
          textAlign = 'J';
          break;
      }

      var commands = [
        ['^FO'+left, top],
        // ['^A@'+rotate, charHeight, charWidth * 0.75],
        ['^A'+fontNo+rotate, charHeight, charWidth], // FIXME
        ['^FB'+width, maxLines, lineMargin, textAlign, hangingIndent],
        ['^FD'+text],
        ['^FS']
      ];
    } else {
      var commands = [
        ['^FO'+left, top],
        // ['^A@' + rotate, charHeight, charWidth * 0.75],
        ['^A'+fontNo+rotate, charHeight, charWidth],
        ['^FD'+text],
        ['^FS']
      ];
    }

    var zpl = '';
    zpl += lineZpl.call(this, group, rotate, left, top);
    commands.forEach(c => {
      zpl += c.join(',') + '\n'
    });

    return zpl;
  }
}

function lineZpl(group, rotate) {
  var {
    left,
    top,
    width,
    textWidth,
    charHeight,
    lineCount = 1,

    underLine,
    strike,
  } = this.model;

  textWidth = textWidth || width;

  var x = left;

  var points = [];
  var zpl = '';
  if (underLine) {
    let y = top;
    for (let i = 0; i < lineCount; i++) {
      y += charHeight;
      points.push({x1: x, x2: x+textWidth, y1: y, y2: y});
    }
  }

  if (strike) {
    let y = top + charHeight/2;
    for (let i = 0; i < lineCount; i++) {
      points.push({x1: x, x2: x+textWidth, y1: y, y2: y});
      y += charHeight;
    }
  }

  var rotatePoints = points.map((point) => {
    let sp = transcoordS2P(point.x1, point.y1, this.model);
    let ep = transcoordS2P(point.x2, point.y2, this.model);

    return { x1: sp.x, x2: ep.x, y1: sp.y, y2: ep.y };
  });

  rotatePoints.forEach((point) => {
    let line = new Line(point);
    zpl += line.toZpl(group);
  });

  return zpl;
}

function rotateLine(rotate, x, textWidth, y, ty, lineIndex) {
  switch(rotate) {
    case 'N':
    default:
      return {x1: x, x2: x+textWidth, y1: y+ty, y2: y+ty};
      break;
    case 'R':
      return {x1: x, x2: x, y1: y, y2: y+textWidth};
      break;
    case 'I':
      return {x1: x, x2: x+textWidth, y1: y, y2: y};
      break;
    case 'B':
      return {x1: x+ty, x2: x+ty, y1: y, y2: y+textWidth};
      break;
  }


}

exports.Text = text;