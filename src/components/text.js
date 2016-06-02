var config = require('../../config').config
var Line = require('./line').Line
var transcoord = require('./transcoord').transcoord

function text(properties) {
  this.model = properties;

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

    var startPoint = transcoord(this.model)
    left = startPoint.x;
    top = startPoint.y;

    left += group ? group.left || 0 : 0;
    top += group ? group.top || 0 : 0;

    var rotate = rotation || '';
    rotate += group ? group.rotation || 0 : 0;

    var textAlign = this.model.textAlign || '';

    if (Math.PI * -0.25 < rotate && rotate <= Math.PI * 0.25) {
      rotate = 'N'
    } else if (Math.PI * 0.25 < rotate && rotate <= Math.PI * 0.75) {
      rotate = 'R'
    } else if (Math.PI * 0.75 < rotate && rotate <= Math.PI * 1.25) {
      rotate = 'I'
    } else if (Math.PI < rotate * 1.25 && rotate <= Math.PI * 1.75) {
      rotate = 'B'
    }

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
    zpl += lineZpl.call(this, group);
    commands.forEach(c => {
      zpl += c.join(',') + '\n'
    });

    return zpl;
  }
}

function lineZpl(group) {
  var {
    left,
    top,
    width,
    textWidth,
    underLine,
    strike,
    charHeight,
    lineCount = 1
  } = this.model;

  textWidth = textWidth || width;

  var x1 = left;
  var x2 = left + textWidth;

  var zpl = '';
  if (underLine) {
    let y = top;
    for (let i = 0; i < lineCount; i++) {
      y += charHeight
      let properties = { x1, x2, y1: y, y2: y };
      let line = new Line(properties);
      zpl += line.toZpl(group);
    }
  }

  if (strike) {
    let y = top + charHeight/2;
    for (let i = 0; i < lineCount; i++) {
      y += charHeight
      let properties = { x1, x2, y1: y, y2: y };
      let line = new Line(properties);
      zpl += line.toZpl(group);
    }
  }

  return zpl;
}

exports.Text = text;