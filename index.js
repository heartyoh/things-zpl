var converter = require('./src/converter')

var converted = converter.convert(`
^FX:123456
`)

console.log(JSON.stringify(converted, null, 2))
