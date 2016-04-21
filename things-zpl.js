(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var zpl = require("./src/api");

if (typeof window !== 'undefined')
  window.zpl = zpl

if (typeof exports !== 'undefined') {
	exports.zpl = zpl;
}
},{"./src/api":12}],2:[function(require,module,exports){
'use strict';

var typeMap = {};
var types = require('./types');

// load all available handlers
types.forEach(function (type) {
  typeMap[type] = require('./types/' + type).detect;
});

module.exports = function (buffer, filepath) {
  var type, result;
  for (type in typeMap) {
    result = typeMap[type](buffer, filepath);
    if (result) {
      return type;
    }
  }
};

},{"./types":4}],3:[function(require,module,exports){
(function (Buffer){
'use strict';

var fs = require('fs');
var path = require('path');

var detector = require('./detector');

var handlers = {};
var types = require('./types');

// load all available handlers
types.forEach(function (type) {
  handlers[type] = require('./types/' + type);
});

// Maximum buffer size, with a default of 128 kilobytes.
// TO-DO: make this adaptive based on the initial signature of the image
var MaxBufferSize = 128*1024;

function lookup (buffer, filepath) {
  // detect the file type.. don't rely on the extension
  var type = detector(buffer, filepath);

  // find an appropriate handler for this file type
  if (type in handlers) {
    var size = handlers[type].calculate(buffer, filepath);
    if (size !== false) {
      size.type = type;
      return size;
    }
  }

  // throw up, if we don't understand the file
  throw new TypeError('unsupported file type: ' + type + ' (file: ' + filepath + ')');
}

function asyncFileToBuffer (filepath, callback) {
  // open the file in read only mode
  fs.open(filepath, 'r', function (err, descriptor) {
    if (err) { return callback(err); }
    var size = fs.fstatSync(descriptor).size;
    var bufferSize = Math.min(size, MaxBufferSize);
    var buffer = new Buffer(bufferSize);
    // read first buffer block from the file, asynchronously
    fs.read(descriptor, buffer, 0, bufferSize, 0, function (err) {
      if (err) { return callback(err); }
      // close the file, we are done
      fs.close(descriptor, function (err) {
        callback(err, buffer);
      });
    });
  });
}

function syncFileToBuffer (filepath) {
  // read from the file, synchronously
  var descriptor = fs.openSync(filepath, 'r');
  var size = fs.fstatSync(descriptor).size;
  var bufferSize = Math.min(size, MaxBufferSize);
  var buffer = new Buffer(bufferSize);
  fs.readSync(descriptor, buffer, 0, bufferSize, 0);
  fs.closeSync(descriptor);
  return buffer;
}

/**
 * @params input - buffer or relative/absolute path of the image file
 * @params callback - optional function for async detection
 */
module.exports = function (input, callback) {

  // Handle buffer input
  if (Buffer.isBuffer(input)) {
    return lookup(input);
  }

  // input should be a string at this point
  if (typeof input !== 'string') {
    throw new TypeError('invalid invocation');
  }

  // resolve the file path
  var filepath = path.resolve(input);

  if (typeof callback === 'function') {
    asyncFileToBuffer(filepath, function (err, buffer) {
      if (err) { return callback(err); }

      // return the dimensions
      var dimensions;
      try {
        dimensions = lookup(buffer, filepath);
      } catch (e) {
        err = e;
      }
      callback(err, dimensions);
    });
  } else {
    var buffer = syncFileToBuffer(filepath);
    return lookup(buffer, filepath);
  }
};

module.exports.types = types;

}).call(this,require("buffer").Buffer)
},{"./detector":2,"./types":4,"buffer":6,"fs":5,"path":10}],4:[function(require,module,exports){
'use strict';

module.exports = [
  'bmp',
  'gif',
  'jpg',
  'png',
  'psd',
  'svg',
  'tiff',
  'webp'
];

},{}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(array)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":7,"ieee754":8,"isarray":9}],7:[function(require,module,exports){
;(function (exports) {
  'use strict'

  var i
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var lookup = []
  for (i = 0; i < code.length; i++) {
    lookup[i] = code[i]
  }
  var revLookup = []

  for (i = 0; i < code.length; ++i) {
    revLookup[code.charCodeAt(i)] = i
  }
  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

  function decode (elt) {
    var v = revLookup[elt.charCodeAt(0)]
    return v !== undefined ? v : -1
  }

  function b64ToByteArray (b64) {
    var i, j, l, tmp, placeHolders, arr

    if (b64.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    var len = b64.length
    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(b64.length * 3 / 4 - placeHolders)

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? b64.length - 4 : b64.length

    var L = 0

    function push (v) {
      arr[L++] = v
    }

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
      push((tmp & 0xFF0000) >> 16)
      push((tmp & 0xFF00) >> 8)
      push(tmp & 0xFF)
    }

    if (placeHolders === 2) {
      tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
      push(tmp & 0xFF)
    } else if (placeHolders === 1) {
      tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
      push((tmp >> 8) & 0xFF)
      push(tmp & 0xFF)
    }

    return arr
  }

  function encode (num) {
    return lookup[num]
  }

  function tripletToBase64 (num) {
    return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
  }

  function encodeChunk (uint8, start, end) {
    var temp
    var output = []
    for (var i = start; i < end; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
      output.push(tripletToBase64(temp))
    }
    return output.join('')
  }

  function uint8ToBase64 (uint8) {
    var i
    var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
    var output = ''
    var parts = []
    var temp, length
    var maxChunkLength = 16383 // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later

    for (i = 0, length = uint8.length - extraBytes; i < length; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > length ? length : (i + maxChunkLength)))
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    switch (extraBytes) {
      case 1:
        temp = uint8[uint8.length - 1]
        output += encode(temp >> 2)
        output += encode((temp << 4) & 0x3F)
        output += '=='
        break
      case 2:
        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
        output += encode(temp >> 10)
        output += encode((temp >> 4) & 0x3F)
        output += encode((temp << 2) & 0x3F)
        output += '='
        break
      default:
        break
    }

    parts.push(output)

    return parts.join('')
  }

  exports.toByteArray = b64ToByteArray
  exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],8:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],9:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],10:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":11}],11:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
exports.convert = require('./converter').convert
exports.revert = require('./reverter').revert
},{"./converter":21,"./reverter":22}],13:[function(require,module,exports){
var scaleBuf = {};

function barcode(properties) {
	this.model = properties;

	this.toZpl = function() {
		var model = this.model;

		var height = model.height || '';
		var rotate = model.rot || '';
		var showText = model.showText || 'Y';
		var textAbove = model.textAbove || ''
		var text = model.text || '';
		var symbol = model.symbol;
		var top = model.top || '';
		var left = model.left || '';
		var scale_w = model.scale_w || '';
		var scale_h = model.scale_h || '';

		var scale = '';
		var lines = [];
		if(scaleBuf.w != scale_w || scaleBuf.h != scale_h) {
			scaleBuf.w = scale_w;
			scaleBuf.h = scale_h;
			scale = ['^BY'+scale_w, scale_h]

			lines.push(scale)
		} else {
			scale_w = '';
		}

		if (showText) {
			height = height / 1.2;	// barcode 높이는 문자 뺀 다음의 높이임.
		}

		var dpi = 200;
		var symbolMap = new Map([
			['code11', 				['^B1'+rotate, , height, showText, textAbove]],
			['interleaved2of5', 	['^B2'+rotate, height, showText, textAbove, ]],
			['code39', 				['^B3'+rotate, , height, showText, textAbove]],
			['code49', 				['^B4'+rotate, height, showText,]],
			['planet', 				['^B5'+rotate, height, showText, textAbove]],
			['pdf417', 				['^B7'+rotate, height, , , , ]],
			['ean8', 				['^B8'+rotate, height, showText, textAbove]],
			['upce', 				['^B9'+rotate, height, showText, textAbove, ]],
			['code93', 				['^BA'+rotate, height, showText, textAbove, ]],
			['codablock', 			['^BB'+rotate, height, , , , ]],
			['code128', 			['^BC'+rotate, height, showText, textAbove, , ]],
			['maxicode', 			['^BD'+rotate, , height, showText, textAbove]],
			['ean13', 				['^BE'+rotate, height, showText, textAbove]],
			['micropdf417', 		['^BF'+'2', , ]],
			['industrial2of5',		['^BI'+rotate, height, showText, textAbove]],
			['standard2of5', 		['^BJ'+rotate, height, showText, textAbove]],
			['ansicodabar', 		['^BK'+rotate, , height, showText, textAbove, , ]],
			['logmars', 			['^BL'+rotate, height, textAbove]],
			['msi', 				['^BM'+rotate, , height, showText, textAbove, ]],
			['plessey', 			['^BP'+rotate, , height, showText, textAbove]],
			['qrcode', 				['^BQ'+rotate, , 6]],	// TODO
			['upca', 				['^BU'+rotate, height, showText, textAbove, ]],
			['datamatrix', 			['^BX'+'']],	// TODO
			['postal', 				['^BZ'+rotate, height, showText, textAbove]]
		]);

		
		var params = symbolMap.get(symbol);

		
		lines.push('^FO' + left + ',' + top)
		lines.push(params.join(','))
		lines.push('^FD' + text)
		lines.push('^FS')

		var zpl = lines.join('\n') + '\n'

		return zpl;
	}
}

exports.Barcode = barcode;
},{}],14:[function(require,module,exports){
exports.commands = new Map([
	['A', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = {};
			var sign = params.substr(0, 1);
			params = params.substr(1);

			if(sign === '@') {	// ^A@o,h,w,d:o.x	// o: rotation(n,r,i,b), d: drive location of font, o: font name, x: extension
				var p = params.split(',');
				obj.charHeight = parseInt(p[1]);		// FIXME
				obj.charWidth = parseInt(p[2]);

				if(p.length === 4) {
					var fonts = p[3];
					switch(fonts.substr(0, 1)) {
						case 'R':
							break;
						case 'E':
							break;
						case 'B':
							break;
						case 'A':
							break;
					}

					fonts = fonts.substr(2);
					var i = fonts.indexOf('.');
					fonts = fonts.substr(0, i);
					obj.fontFamily = fonts;
				} else if (p.length === 3) {

				} else {
					error_log('A@');
					return;
				}

				obj.rotation = getRotation(p[0]);
				
				return obj;
			} else {
				var p = params.split(',');

				obj.charHeight = parseInt(p[1]);		// FIXME
				obj.charWidth = parseInt(p[2]);

				switch(p[0]) {
					// TODO font family
					case '0':
						obj.fontFamily = 'serif'	// FIXME
						break;
				}

				return obj;
			}
		}
	}],
	['B1', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = oehfg(p);
			obj.symbol = 'code11';
			return obj;
		}
	}],
	['B2', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = ohfge(p);
			obj.symbol = 'interleaved2of5';
			return obj;
		}
	}],
	['B3', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = oehfg(p);
			obj.symbol = 'code39';
			return obj;
		}
	}],
	['B4', {
		desc: '',
		parameters: '',
		handler: function(p) {
			var obj = ohfm(p);
			obj.symbol = 'code49';
			return obj;
		}
	}],
	['B5', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'planet'
			return obj;
		}
	}],
	['B7', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrt(params);
			obj.symbol = 'pdf417'
			return obj;
		}
	}],
	['B8', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean8'
			return obj;
		}
	}],
	['B9', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'upce'
			return obj;
		}
	}],
	['BA', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'code93'
			return obj;
		}
	}],
	['BB', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrm(params);
			obj.symbol = 'codablock'
			return obj;
		}
	}],
	['BC', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfgem(params);
			obj.symbol = 'code128'
			return obj;
		}
	}],
	['BD', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = mpt(params);
			obj.symbol = 'maxicode'
			return obj;
		}
	}],
	['BE', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'ean13'
			return obj;
		}
	}],
	['BF', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohm(params);
			obj.symbol = 'micropdf417'
			return obj;
		}
	}],
	['BI', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'industrial2of5'
			return obj;
		}
	}],
	['BJ', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'standard2of5'
			return obj;
		}
	}],
	['BK', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfgkl(params);
			obj.symbol = 'ansicodabar'
			return obj;
		}
	}],
	['BL', {
		desc: '',
		parameters: '',
		handler: function(params) {	
			var obj = ohg(params);
			obj.symbol = 'logmars'
			return obj;
		}
	}],
	['BM', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfge(params);
			obj.symbol = 'msi'
			return obj;
		}
	}],
	['BP', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = oehfg(params);
			obj.symbol = 'plessey'
			return obj;
		}
	}],
	['BQ', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = abcq(params);
			obj.symbol = 'qrcode'
			return obj;
		}
	}],
	['BS', {
		desc: '',
		parameters: '',
		handler: function(params) {
			// var obj = ohfg(params);
			// obj.symbol = 'upcextension'	// 우리 라이브러리에 없음
			// return obj;
		}
	}],
	['BU', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfge(params);
			obj.symbol = 'upca'
			return obj;
		}
	}],
	['BX', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohscrfg(params);
			obj.symbol = 'datamatrix'
			return obj;
		}
	}],
	['BY', {
		desc: '',
		parameters: '',
		handler: function(params) {	// barcode field default
			var obj = {};
			obj.scale_w = params[0]
			// params[1]
			obj.height = params[2]

			return obj;
		}
	}],
	['BZ', {
		desc: '',
		parameters: '',
		handler: function(params) {
			var obj = ohfg(params);
			obj.symbol = 'postal'
			return obj;
		}
	}],
	['CF', {
		desc: 'The ^CF command sets the default font used in your printer.',
		parameters: '^CFf,h,w',
		handler: function(p) {	// ^CFf,h,w : f: font
			var obj = {};
			obj.charHeight = parseInt(p[1]);
			obj.charWidth = parseInt(p[2]);
			switch(p[0]) {
				case 0:
					obj.fontFamily = 'serif';
					break;
				default:
					obj.fontFamily = 'serif';
					break;
			}

			return obj;
		}
	}],
	['CW', {
		desc: 'Font Identifier',
		parameters: '^CWa,d:o.x: a(A~Z, 0~9)',
		handler: function(p) {	// TODO

		}
	}],
	['DG', {
		desc: 'Download Graphic use with ^XG',
		parameters: '^DGd:o.x,t,w,data: t: total number of bytes in graphic, w: number of bytes per row, data: ASCII hexadecimal string defining image',
		handler: function(p) {
			var obj = {};
			obj.id = p[0]
			obj.totalSize = p[1]
			obj.rowSize = p[2]
			obj.data = p[3]
		}
	}],
	['FB', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^FBa,b,c,d,e: Field Block(automatic word-wrap): 	// TODO

			var obj = {};
			obj.textType = 'W';
			obj.width = parseInt(p[0])			// 행의 너비
			obj.maxLines = parseInt(p[1])		// 최대행수
			obj.lineMargin = parseInt(p[2])		// 줄 간격
			
			switch(p[3]) {
				case 'L':
					obj.textAlign = 'left'
					break;
				case 'C':
					obj.textAlign = 'center'
					break;
				case 'R':
					obj.textAlign = 'right'
					break;
				case 'J':
					obj.textAlign = 'justified'
					break;
				default:
					obj.textAlign = textAlign;
			}

			obj.hangingIndent = parseInt(p[4])		// 두번째 줄 띄어쓰기
			return obj
		}
	}],
	['FC', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^FCa,b,c: Field Clock	// TODO
			var obj = {};
		}
	}],
	['FD', {
		desc: '',
		parameters: '',
		handler: function(p) {
			
			// if () {	// check DATE
			// }
			p = p.trim();	// 바코드 양 끝의 공백은 출력되지 않으므로 trim 적용

			return { text: p }
		}
	}],
	['FO', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^FOx,y
			if (p.length != 2) {
				error_log('FO');
				return;
			}

			return { left: parseInt(p[0]), top: parseInt(p[1]) }
		}
	}],
	['FS', {
		desc: '',
		parameters: '',
		handler: function(p) {
		}
	}],
	['FX', {
		desc: '',
		parameters: '',
		handler: function(p) {
		}
	}],
	['GB', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GBw,h,t,c,r : t: border thickness, c: line color, r: degree of corner-rounding	
			var obj = {};
			obj.type = 'rect'
			obj.innerBorder = true
			obj.width = parseInt(p[0])
			obj.height = parseInt(p[1])
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black'

			return obj
		}
	}],
	['GC', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GCd,t,c : d: circle diameter	
			var obj = {};
			obj.type = 'ellipse'
			obj.rx = parseInt(p[0])
			obj.ry = parseInt(p[0])
			obj.lineWidth = parseInt(p[1])
			obj.fillStyle = p[2]

			return obj
		}
	}],
	['GD', {
		desc: '',
		parameters: '',
		handler: function(p) {	// Graphic Diagonal Line ^GDw,h,t,c,o
			var obj = {};
			obj.type = 'line'
			obj.width = parseInt(p[0])
			obj.height = parseInt(p[1])
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black'
			obj.rotate = p[4]

			return obj
		}
	}],
	['GE', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GEw,h,t,c
			var obj = {};
			obj.type = 'ellipse'
			obj.rx = parseInt(p[0]) / 2
			obj.ry = parseInt(p[1]) / 2
			obj.lineWidth = parseInt(p[2])
			obj.strokeStyle = p[3] === 'W' ? 'white' : 'black'

			return obj
		}
	}],
	['GF', {
		desc: '^GFa,b,c,d,data',
		parameters: '',
		handler: function(p) {	// ^GFa,b,c,d,data : a: compression type(A,B,C), b: binary byte count, c: graphic field count, d: bytes per row
			// Graphic Field 지원 안함.
		}
	}],
	['GS', {
		desc: '',
		parameters: '',
		handler: function(p) {	// ^GSo,h,w
			// Graphic Symbol 지원 안함.
		}
	}],
	['MD', {
		desc: '',
		parameters: '',
		handler: function(p) {	// media darkness
		}
	}],
	// ['PO', function(p) {	// print orientation

	// }],
	// ['PW', function(p) {	// print width

	// }],
	// ['LR', function(p) {	// label reverse print

	// }],
	['LL', {
		desc: '',
		parameters: '',
		handler: function(p) {	// label length	// TODO
		}
	}],
	['XG', {
		desc: 'Recall Graphic',
		parameters: '^XGd:o.x,mx,my: d:o.x: magnification factor on the x-axis',
		handler: function(p) {
			var obj = {}
			obj.type = 'image_view'
			obj.id = p[0]
			obj.scaleX = p[1]
			obj.scaleY = p[2]

			return obj;
		}
	}],
	['XA', {
		desc: 'Start Format',
		parameters: '',
		handler: function(p) {
		}
	}],
	['XZ', {
		desc: '',
		parameters: '',
		handler: function(p) {
		}
	}]
]);


// var dateExp = new Map([
// 	['%a', { 
// 		desc: 'is replaced by the abbreviated weekday name'
// 	}],
// 	['%A', {
// 		desc: 'is replaced by the weekday name'
// 	}],
// 	['%b', {
// 		desc: 'is replaced by the abbreviated month name'
// 	}],
// 	['%B', {
// 		desc: 'is replaced by the month name'
// 	}],
// 	['%d', {
// 		desc: 'is replaced by the day of month number, 0 to 31'
// 	}],
// 	['%H', {
// 		desc: 'is replaced by the hour of the day (military), 0 to 23'
// 	}],
// 	['%I', {
// 		desc: 'is replaced by the hour of the day (civilian), 0 to 23'
// 	}],
// 	['%j', {
// 		desc: ''
// 	}],
// 	['%m', {
// 		desc: ''
// 	}],
// 	['%M', {
// 		desc: ''
// 	}],
// 	['%p', {
// 		desc: ''
// 	}],
// 	['%S', {
// 		desc: ''
// 	},
// 	['%U', {
// 		desc: ''
// 	},
// 	['%W', {
// 		desc: ''
// 	},
// 	['%w', {
// 		desc: ''
// 	},
// 	['%y', {
// 		desc: ''
// 	},
// 	['%Y', {
// 		desc: ''
// 	}]
// ]);


// 바코드 생성 커맨드의 파라미터가 o,e,h,f,g 일때 호출
function oehfg(p) {	// ^B1o,e,h,f,g : e: check digit(y:1digit/n:2digit), f: print interpretation line(y/n), g: print interpretation line above code
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[2];
		obj.showText = p[3];
		obj.textAbove = p[4];

		return obj;
}

// 바코드 생성 커맨드의 파라미터가 o,e,h,f,g 일때 호출
function ohfge(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];
		obj.checkDigit = p[4];

		return obj;
}

// 바코드 생성 커맨드의 파라미터가 o,h,f,m 일때 호출
function ohfm(p) {	// ^B4o,h,f,m : m: starting mode
	var obj = {};
	obj.type = 'barcode';
	obj.rot = p[0];
	obj.height = p[1]

	switch(p[2]) {
		case 'N':
			obj.showText = 'N';
			break;
		case 'A':
			obj.showText = 'Y';
			obj.textAbove = 'Y';
			break;
		case 'B':
			obj.showText = 'Y';
			obj.textAbove = 'N';
	}

	obj.mode = p[3];

	return obj;
}

// 바코드 생성 커맨드의 파라미터가 o,h,f,g 일때 호출
function ohfge(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];
		obj.checkDigit = p[4];

		return obj;
}

function ohfgem(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];
		obj.checkDigit = p[4];
		obj.mode = p[5];

		return obj;
}

function ohfg(p) {
		
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.showText = p[2];
		obj.textAbove = p[3];

		return obj;
}

function ohscrt(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.security = p[2];
		obj.columns = p[3];
		obj.rows = p[4];
		obj.truncate = p[5];

		return obj;
}

function ohscrm(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.security = p[2];
		obj.columns = p[3];
		obj.rows = p[4];
		obj.mode = p[5];

		return obj;
}

function ohm(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.mode = p[2];

		return obj;
}

function oehfgkl(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.checkDigit = p[1];
		obj.height = p[2];
		obj.showText = p[3];
		obj.textAbove = p[4];
		obj.startChar = p[5];
		obj.stopChar = p[6];

		return obj;
}

function ohg(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.height = p[1];
		obj.textAbove = p[2];

		return obj;
}

function oehfge(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.rot = p[0];
		obj.checkDigit = p[1];
		obj.height = p[2];
		obj.showText = p[3];
		obj.textAbove = p[4];
		obj.checkDigit = p[5];

		return obj;
}

function abcq(p) {
		var obj = {};
		obj.type = 'qrcode';
		obj.model = p[0];
		obj.position = p[1];
		obj.magnification = p[2];
		obj.hqml = p[3];

		return obj;
}

function ohscrfg(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.orientation = p[0];
		obj.height = p[1];
		obj.quality = p[2];
		obj.columns = p[3];
		obj.rows = p[4];
		obj.format = p[5];
		obj.escape = p[6];

		return obj;
}

function mpt(p) {
		var obj = {};
		obj.type = 'barcode';
		obj.mode = p[0];
		obj.position = p[1];
		obj.total = p[2];

		return obj;
}

function getRotation(r) {
	switch(r) {
		case 'N':
			return Math.PI / 180 * 0;
			break;
		case 'R':
			return Math.PI / 180 * 90;
			break;
		case 'I':
			return Math.PI;
			break;
		case 'B':
			return Math.PI / 180 * 270;
			break;
	}
}

},{}],15:[function(require,module,exports){
function ellipse(properties) {
	this.model = properties;

  this.toZpl = function(group) {
		var model = this.model;

		var rx = model.rx || '';
		var ry = model.ry || '';
		var cx = model.cx || '';
		var cy = model.cy || '';
		var lineWidth = model.lineWidth || '';
		var fillStyle = model.fillStyle;

		if (fillStyle === 'white' || fillStyle === '#fff'
			|| (fillStyle === '#ffffff')) {
			fillStyle = 'W';
		} else {
			fillStyle = 'B'
		}

		var left = cx - rx || 0;
		left += group ? group.left || 0 : 0
		var top = cy - ry || 0;
		top += group ? group.top || 0 : 0
		
		var command;
		if(rx === ry)
			command = 'GC'
		else
			command = 'GE'


		var symbolMap = new Map([
			['GC', 		['^GC' + rx*2, lineWidth, fillStyle]],
			['GE', 		['^GE' + rx*2, ry*2, lineWidth, fillStyle]],
		]);

		var zpl = [];
		var params = symbolMap.get(command);
		zpl.push('^FO' + left + ',' + top);
		zpl.push(params.join(','));
		zpl.push('^FS');

		zpl = zpl.join('\n');
		zpl += '\n'

		return zpl;
  }
}

exports.Ellipse = ellipse;
},{}],16:[function(require,module,exports){
function group(properties) {
	this.model = properties;

	return this.model;
}

exports.Group = group;
},{}],17:[function(require,module,exports){
var sizeOf = require('image-size');
const exec = require('child_process').exec;

// function toGrf(inputFile, outputFile) {
// 	var dimensions = sizeOf('images/funny-cats.png');
// 	console.log(dimensions.width, dimensions.height);


// 	// NodeJs
// 	// var command = parse('java -jar ZSDK_API.jar graphic %s -s %s', inputFile, outputFile);
// 	// exec(command, function(error, stdout, stderr) {
// 	//   if (error) {
// 	//   	console.log(`exec error: ${error}`);
// 	//   	return;
// 	//   }

// 	// 	console.log(`stdout: ${stdout}`);
// 	// 	console.log(`stderr: ${stderr}`);
// 	// });

// 	if() {

// 	}
// }


function image(properties) {
	this.model = properties;

	this.toZpl = function(group) {
		var model = this.model;
		var top = model.top || '';
		var left = model.left || '';
		var imageGrf = model.imageGrf;

		top += group ? group.top || 0 : 0
    left += group ? group.left || 0 : 0;

    if (!imageGrf) {
    	return '';
    }

    var guid = getGuid();
    var commands = [
			['~DG'+guid, imageGrf],
			['^FO'+left, top],
      // ['^A@'+rotate, charHeight, charWidth * 0.75],
			['^XG'+'R:'+guid, 1, 1],
			['^PQ'+1],
			['^FS']
    ];

    var zpl = '';
    commands.forEach(c => {
			zpl += c.join(',') + '\n'
		});

    return zpl;
	}
}

exports.Image = image;

function getGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function parse(str) {
  var args = [].slice.call(arguments, 1);
  var i = 0;

  return str.replace(/%s/g, function() {
      return args[i++];
  });
}
},{"child_process":5,"image-size":3}],18:[function(require,module,exports){
var Rect = require('./rect').Rect

function line(properties) {
  this.model = properties;

  this.toZpl = function(group) {
		var model = this.model;
		var x1 = model.x1 || '';
		var x2 = model.x2 || '';
		var y1 = model.y1 || '';
		var y2 = model.y2 || '';

		var lineWidth = model.lineWidth || '';
		var fillStyle = model.fillStyle;

		if (fillStyle === 'white' || fillStyle === '#fff'
			|| (fillStyle === '#ffffff')) {
			fillStyle = 'W';
		} else {
			fillStyle = 'B'
		}

		var zpl = '';		
		if (x1 === x2 || y1 === y2) {
			zpl = this.gbLine(group);
			return zpl;
		} else {
			var commands = this.gdLine(group);
		}

	  commands.forEach(c => {
	  	zpl += (c.join(',') + '\n')
	  });

		return zpl;
  }

	this.gbLine = function(group) {
		var model = this.model;
		var x1 = model.x1 || '';
		var x2 = model.x2 || '';
		var y1 = model.y1 || '';
		var y2 = model.y2 || '';
		var lineWidth = model.lineWidth || '';

		var strokeStyle = this.model.strokeStyle;

		var left = Math.min(x1, x2);
		var top = Math.min(y1, y2);

		var tx = Math.abs(x2 - x1);
		var ty = Math.abs(y2 - y1);
		var width = tx === 0 ? lineWidth : tx;
		var height = ty === 0 ? lineWidth : ty;

		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		var properties = {
			left: left,
			top: top,
			width: width,
			height: height,
			lineWidth: lineWidth,
			strokeStyle: strokeStyle
		}

		var rect = new Rect(properties);
		return rect.toZpl(group);
  }

  this.gdLine = function(group) {
  	var model = this.model;
		var x1 = model.x1 || '';
		var x2 = model.x2 || '';
		var y1 = model.y1 || '';
		var y2 = model.y2 || '';

		var left = Math.min(x1, x2);
		var top = Math.min(y1, y2);
		var width = Math.abs(x2 - x1);
		var height = Math.abs(y2 - y1);

		if(x1 <= x2 && y1 <= y2) {
			rotate = 'L'
		} else if(x1 >= x2 && y1 >= y2) {
			rotate = 'L'
		} else if(x1 >= x2 && y1 <= y2) {
			rotate = 'R'
		} else if(x1 <= x2 && y1 >= y2) {
			rotate = 'R'
		}
		
		left += group ? group.left || 0 : 0;
		top += group ? group.top || 0 : 0;

		var commands = [
			['^FO'+left, top],
			['^GD' + width, height, this.lineWidth, this.fillStyle, rotate],
			['^FS']
		];

		return commands;
  }
}

exports.Line = line;
},{"./rect":19}],19:[function(require,module,exports){
function rect(properties) {
  this.model = properties;

  this.toZpl = function(group) {
  	var model = this.model;
		var width = model.width || '';
		var height = model.height || '';
		var lineWidth = model.lineWidth || '' ;
		var fillStyle = model.fillStyle || '';

		var strokeStyle;
		if (model.strokeStyle === 'white' || model.strokeStyle === '#fff'
			|| (model.strokeStyle === '#ffffff')) {
			strokeStyle = 'W';
		} else {
			strokeStyle = 'B'
		}

		if (fillStyle) {
			if (fillStyle === 'white' || fillStyle === '#fff'
				|| (fillStyle === '#ffffff')) {
				fillStyle = 'W';
			} else {
				fillStyle = 'B'
			}

			lineWidth = height;
			strokeStyle = fillStyle;
		}

		var left = model.left || '';
		left += group ? group.left || 0 : 0;

		var top = model.top || '';
		top += group ? group.top || 0 : 0;
		
	  var commands = [
	  	['^FO'+left, top],
			['^GB'+width, height, lineWidth, strokeStyle],
			['^FS']
		];

	  var zpl = '';
	  commands.forEach(c => {
	  	zpl += (c.join(',') + '\n')
	  });

		return zpl;
  }
}

exports.Rect = rect;
},{}],20:[function(require,module,exports){
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
        ['^A6'+rotate, charHeight, charWidth],
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
},{}],21:[function(require,module,exports){
var commands = require('./components/commands')
var commandsMap = commands.commands

var fontBuf;
var barcodeBuf;
var imageBuf;

exports.convert = function(zpl) {

	if (!zpl) return;

  fontBuf = {};
	barcodeBuf = {};
	imageBuf = new Map();

	var models = [];
	var obj = {};

	var commands = zpl.split('^');
	commands.forEach((c, i) => {
		if (c.trim().length === 0) return;

		c = c.replace('\n', '')
		var command = c.substr(0, 2);

		if (command.charAt(0) === 'A') {
  		var params = c.substr(1);
  		
  		var commandHandler = commandsMap.get('A');
			if(!commandHandler) return;

  		var properties = commandHandler.handler(params);
			obj = Object.assign(obj || {}, properties);

			return;
		}

		var commandHandler = commandsMap.get(command);
		if(!commandHandler) return;


		var params;
		if (command === 'FD') {
			params = c.substr(2);
		} else {
			params = c.substr(2).split(',').map(function(value) {
				return value.trim();
			});
		}

		var properties = commandHandler.handler(params);

		switch(command) {
			case 'XZ': 			// 마지막 바코드는 FS를 생략하고 XZ로 끝나도 가능 
				if(obj == null)		// XZ가 null인 경우는 마지막 바코드도 FS로 끝나는 경우 
				break;

			case 'FS':
				if (!obj.type) {
	  			obj.type = 'text';
	  			obj.textAlign = 'left';
	  			obj.textType = obj.textType || 'F';
	  		}

	  		obj = specific(obj);
				obj.centerRotate = false
	  		models.push(obj);
	  		
	  		obj = null;
	  		break;

	  	case 'BY':
	  		Object.assign(barcodeBuf, properties || {});
	  		break;

	  	case 'CF':
	  		Object.assign(fontBuf, properties || {});
	  		break;

	  	default:
		  	obj = Object.assign(obj || {}, properties);
		}


	})

  return models;
}

function dashParser(zpl) {
  var startIdx = zpl.indexOf('~');
  var tmp = zpl.substr(startIdx + 1);
  var endIdx = Math.min(command.indexOf('~'), command.indexOf('^'));

  var dashCommand = zpl.substr(startIdx, endIdx);
  var command = dashCommand.substr(0, 2);
  switch(command) {
  	case 'DG':
  		var commandHandler = commandsMap.get(command);
  		var properties = commandHandler.handler(params);
  		imageBuf.set(properties.id, properties.data);

  		break;
  	case '':
  		break;
  }

  zpl.replace(dashCommand, '');
  dashParser(zpl);

 	return zpl;
}

function specific(obj) {
	switch(obj.type) {
		case 'line':
			obj.x1 = obj.left
			obj.x2 = obj.left + obj.width;

			// x1과 x2가 같은으면서 테두리가 100이상 정도 굵은 경우에는 ZPL의 가로선을 표현 할 때에 해당됨. (100이란 수치는 대략임)
			if(obj.x1 == obj.x2 && obj.lineWidth >= 100){
				obj.x1 += obj.lineWidth / 2
				obj.x2 += obj.lineWidth / 2
			}

			if (obj.rotate === 'L') {
				obj.y1 = obj.top
				obj.y2 = obj.top + obj.height;
			} else {	// default is 'R'
				obj.y1 = obj.top + obj.height;
				obj.y2 = obj.top;
			}
			
			delete obj.left
			delete obj.top
			delete obj.width
			delete obj.height
			delete obj.rotate

			break;
		case 'ellipse':
			obj.cx = obj.left + obj.rx;
			obj.cy = obj.top + obj.ry;

			delete obj.left
			delete obj.top

			break;
		case 'text':
			if (fontBuf.charHeight || fontBuf.charWidth) {
				Object.assign(obj, fontBuf);

				// obj.width = (obj.width || fontBuf.charWidth * obj.text.length)
				// obj.height = obj.height || fontBuf.charHeight
			}
			break;

		case 'rect':
			break;

		case 'image_view':
			break;

		case 'barcode':
			if (!obj.height) {
				obj.height = barcodeBuf.height;
			}

			if (!obj.scale_w) {
				obj.scale_w = barcodeBuf.scale_w;
			}

			break;
	}

	return obj;
}

function error_log(c) {
	console.log('Command: '+ c + ' parameter error');
}
},{"./components/commands":14}],22:[function(require,module,exports){
var Text = require('./components/text').Text
var Barcode = require('./components/barcode').Barcode
var Rect = require('./components/rect').Rect
var Ellipse = require('./components/ellipse').Ellipse
var Line = require('./components/line').Line
var Group = require('./components/group').Group
var Image = require('./components/image').Image

exports.revert = function(components) {
	if (!components) return;

	var zpl = '^XA\n';
	zpl = makeZpl(components, zpl)
	zpl += '^XZ'

	return zpl
}


var groups = [];
function makeZpl(components, zpl) {
	if (!components) return;

	if (groups.length > 0) {
		var group = groups.pop();
	}

	components.forEach((c, i) => {
		switch(c.type) {
			case 'group':
				groups.push(Group(c));
				zpl += makeZpl(c.components, '')

				break;
			case 'text':
				var obj = new Text(c);
				break;
			case 'barcode':
				var obj = new Barcode(c);
				break;
			case 'rect':
				var obj = new Rect(c);
				break;
			case 'ellipse':
				var obj = new Ellipse(c);
				break;
			case 'image':
			case 'image-view':
				var obj = new Image(c);
				break;
			case 'line':
				var obj = new Line(c);

				break;
		}

    if(obj) {
      zpl += obj.toZpl(group);
      zpl += '\n';
    }
	});

  return zpl;
}

},{"./components/barcode":13,"./components/ellipse":15,"./components/group":16,"./components/image":17,"./components/line":18,"./components/rect":19,"./components/text":20}]},{},[1]);
