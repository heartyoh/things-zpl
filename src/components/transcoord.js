
/*
 * 좌표 변환 API.
 */

function calcCenter(left, top, width, height) {
  return {
    x: left + width/2,
    y: top + height/2
  }
}

/*
 * transcoordRR은 자신의 회전각을 감안하여 부모의 원점을 이동시킨 상태의 좌표값을 (반대로 회전시켜서)
 * 부모 원점 기준의 좌표로 변환하는 기능.
 * (기존의 reverseTranscoord와 동일함 - RR은 Reverse Rotation을 의미함.)
 */
function transcoordRR(x, y, rotatePoint = {x: 0, y: 0}, rotation = 0, scale = {x: 1, y: 1}) {
  x -= rotatePoint.x;
  y -= rotatePoint.y;

  return {
    x: (x * Math.cos(rotation) - y * Math.sin(rotation) + rotatePoint.x) * scale.x,
    y: (x * Math.sin(rotation) + y * Math.cos(rotation) + rotatePoint.y) * scale.y
  }
}

/*
 * transcoordS2P는 현재 컴포넌트(Self) 기준의 논리좌표를 부모(Parent) 컨테이너 기준의 논리좌표로 변환한다.
 */
export function transcoordS2P(x, y, model) {

  var { left, top, width, height, rotation = 0, text } = model;

  var rotatePoint = calcCenter(left, top, width, height);
  var point = transcoordRR(x, y, rotatePoint, rotation)

  return {
    x: point.x,
    y: point.y
  }
}

export function shapeTranscoord(model) {
  var {
    left,
    top,
    width,
    height
  } = model;

  // 회전
  var start = transcoordS2P(left, top, model);
  var end = transcoordS2P(left + width, top + height, model);

  var x = Math.min(start.x, end.x);
  var y = Math.min(start.y, end.y);

  return {x, y}
}

export function textTranscoord(model) {
  var point = shapeTranscoord(model)
  var x = point.x;
  var y = point.y;

  var transValue = calcTextPosition(model);
  x += transValue.tx;
  y += transValue.ty;

  return {x, y};
}


function calcTextPosition(model) {
  var {
    textAlign = 'center',
    textBaseline = 'middle',
    width,
    height,
    charHeight,
    textWidth,
    lineMargin = 0,
    lineCount = 1,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0
  } = model;

  textWidth = textWidth || width;

  var tx = 0;
  switch(textAlign) {
    case 'left':
    case 'justify':
      tx = paddingLeft;
      break;
    case 'right':
      tx = (width - textWidth - paddingRight);
      break;
    case 'center':
    default:
      width = width - paddingLeft - paddingRight;
      tx = (width - textWidth) / 2 + paddingLeft;
      break;
  }

  var textsHeight = (charHeight + lineMargin) * lineCount;
  var ty = 0;
  switch(textBaseline) {
    case 'top':
    case 'hanging':
      // height = height < textsHeight ? textsHeight : height;
      ty = paddingTop
      break;
    case 'bottom':
    case 'alphabetic':
      ty = (height - textsHeight) - paddingBottom
      break;
    case 'middle':
    default:
      ty = (height - textsHeight) / 2 + paddingTop;
      break;
  }

  return {tx, ty};
}


var config = require('../../config').config
export function calcDotSize(model) {
  for (var property in model) {
    if (property === 'rotation' || property === 'scale_w' || property === 'scale_w') {
      continue;
    }

    let size = model[property];
    if (typeof size === 'number') {
      model[property] = config.dpi * size / 25.4
    }
  }
}
