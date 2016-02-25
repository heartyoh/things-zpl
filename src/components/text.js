function text(properties) {
  this.model = properties;

  this.toZpl = function() {
    var zpl = '';
    var text = this.model.text || '';
    var top = this.model.top || '0';
    var left = this.model.left || '0';


    var symbolMap = new Map([
      ['FD',    ['^FO' + left, top + '^FD' + text + '^FS']]
    ]);

    var zpl = '';
    var params = symbolMap.get('FD');
    zpl += params.join(',');

    return zpl;
  }
}

exports.Text = text;