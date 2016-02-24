function text(properties) {
  this.model = properties;

  this.toZpl = function() {
    var zpl = '';
    var text = this.model.text || '';
    var top = this.model.top || '0';
    var left = this.model.left || '0';

    zpl += '^FO' + left + ',' + top
    zpl += '^FD' + text
    zpl += '^FS'

    return zpl;
  }
}

exports.Text = text;