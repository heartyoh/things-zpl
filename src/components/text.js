var config = require('../../config').config
var Line = require('./line').Line


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
      rotation = 0,
      underLine,
      strike
    } = this.model

    left += group ? group.left || 0 : 0;
    top += group ? group.top || 0 : 0;

    var textType = this.model.textType || '';
    var charWidth = this.model.charWidth || width / text.length;
    
    if (textType === 'W') {
      var charHeight = this.model.charHeight;
    } else {
      var charHeight = this.model.charHeight || this.model.charWidth;
    }

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

      var lineMargin = this.model.lineMargin || '';
      var maxLines = this.model.maxLines || '';
      var hangingIndent = this.model.hangingIndent || '';

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

    lineZpl.call(this, group);

    var zpl = '';
    commands.forEach(c => {
      zpl += c.join(',') + '\n'
    });

    return zpl;
  }

  function lineZpl(group) {
    var {
      left,
      top,
      width,
      height,
      underLine,
      strike,
      charHeight,
      lineCount
    } = this.model;

    var x1 = left;
    var x2 = left + width;
    var y1 = top;
    var y2 = top;

    
    if (underLine) {
      for (let i = 0; i < lineCount; i++) {
        y2 += charHeight
        let properties = { x1, x2, y1, y2 };
        let line = new Line(properties);
        zpl += line.toZpl(group);
      }
    }

    y2 = top + charHeight/2;
    if (strike) {
      for (let i = 0; i < lineCount; i++) {
        y2 += charHeight
        let properties = { x1, x2, y1, y2 };
        let line = new Line(properties);
        zpl += line.toZpl(group);
      }
    }
  }
}

exports.Text = text;