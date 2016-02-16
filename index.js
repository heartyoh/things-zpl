var converter = require('./src/converter')

var converted = converter.convert(`
^XA
^FX:123456
^XZ
`)

console.log(JSON.stringify(converted, null, 2))
