function text(properties) {
  this.model = properties;

  this.toZpl = function() {
    var zpl = '';
    var text = this.model.text || '';
    var top = this.model.top || '0';
    var left = this.model.left || '0';
    var w = this.model.width || 10;
    var h = this.model.height || 10;
    var rotate = this.model.rotation || 'N';
    var textAlign = this.model.textAlign || 'L';
    var lineMargin = this.model.lineMargin || 0;

    // TODO

    var commands = [
      ['^FO'+left, top],
      ['^A' + 0, w, h],
      ['^FD'+text],
      ['^FS'],
    ];

    var zpl = '';
    
    commands.forEach(c => {
      zpl += c.join(',') + '\n'
    });

    return zpl;
  }
}

exports.Text = text;