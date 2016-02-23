function text(properties) {
  this.model = properties;

  this.toZpl = function() {
    var zpl = '';

    var text = this.model.text || '';

    zpl += 'FD' + text

    return zpl;
  }
}

exports.Text = text;