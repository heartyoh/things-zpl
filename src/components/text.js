function text(properties) {
  this.model = properties;

  this.toZpl = function(group) {
    var zpl = '';
    var text = this.model.text || '';
    var top = this.model.top || '';
    top += group ? group.top || 0 : 0;
    var left = this.model.left || '';
    left += group ? group.left || 0 : 0;

    var width = this.model.width || '';
    var height = this.model.height || '';

    var textType = this.model.textType || '';
    var charWidth = this.model.charWidth || width / text.length;
    if (textType === 'F') {
      var charHeight = this.model.charHeight || height;
    } else if (textType === 'W') {
      var charHeight = this.model.charHeight;
    } else {
      var charHeight = this.model.charHeight || this.model.charWidth;
    }

    var rotate = this.model.rotation || '';
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


    if (textType === 'W' || textType === 'w') {
      switch(textAlign) {
        case 'left':
          textAlign = 'L';
          break;
        case 'right':
          textAlign = 'R';
          break;
        case 'center':
          textAlign = 'C';
          break;
        case 'justified':
          textAlign = 'J';
          break;
        default:
          break;
      }

      var lineMargin = this.model.lineMargin || '';
      var maxLines = this.model.maxLines || '';
      var hangingIndent = this.model.hangingIndent || '';

      var commands = [
        ['^FO'+left, top],
        // ['^A@'+rotate, charHeight, charWidth * 0.75],
        ['^A6'+rotate, charHeight, charWidth], // FIXME
        ['^FB'+width, maxLines, lineMargin, textAlign, hangingIndent],
        ['^FD'+text],
        ['^FS']
      ];
    } else {
      var commands = [
        ['^FO'+left, top],
        // ['^A@' + rotate, charHeight, charWidth * 0.75],
        ['^A0'+rotate, charHeight, charWidth],
        ['^FD'+text],
        ['^FS']
      ];
    }

    var zpl = '';
    
    commands.forEach(c => {
      zpl += c.join(',') + '\n'
    });

    return zpl;
  }
}

exports.Text = text;