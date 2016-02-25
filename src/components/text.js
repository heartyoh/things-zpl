function text(properties) {
  this.model = properties;

  this.toZpl = function() {
    var zpl = '';
    var text = this.model.text || '';
    var top = this.model.top || '0';
    var left = this.model.left || '0';
    var fontSize = this.model.fontSize || 5;
    var rotate = this.model.rotate || 'N';


    var commands = [
      ['^FO'+left, top],
      ['^A0', fontSize, fontSize],
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