
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
  var point = shapeTranscoord(model)  // start point
  var x = point.x;
  var y = point.y;

  var rotate = rotateCase(model.rotation);

  switch(rotate) {
    case 'N':
      break;
    case 'R':
      break;
    case 'I':
      if (model.textAlign === 'left') {
        model.textAlign = 'right'
      } else if (model.textAlign === 'right') {
        model.textAlign = 'left'
      }
      break;
    case 'B':
      if (model.textAlign === 'left') {
        model.textAlign = 'right'
      } else if (model.textAlign === 'right') {
        model.textAlign = 'left'
      }

      model.text = model.text.split('').reverse().join('');

      break;
  }


  var transValue = calcTextPosition(model);
  if (rotate === 'N' || rotate === 'I') {
    x += transValue.tx;
    y += transValue.ty;
  } else {
    x += transValue.ty;
    y += transValue.tx;
  }


  return {x, y};
}


function calcTextPosition(model) {
  var {
    textAlign = 'center',
    textBaseline = 'middle',
    left,
    width,
    height,
    charHeight,
    textWidth,
    rotation,
    lineMargin = 0,
    lineCount = 1,
    // paddingLeft = 0,
    // paddingRight = 0,
    // paddingTop = 0,
    // paddingBottom = 0
  } = model;

  textWidth = textWidth || width;

  width = Math.max(width, textWidth);
  var textsHeight = (charHeight + lineMargin) * lineCount;
  height = Math.max(height, textsHeight);

  var tx = 0;
  // switch(textAlign) {
  //   case 'left':
  //   case 'justify':
  //     tx = paddingLeft;
  //     break;
  //   case 'right':
  //     tx = (width - textWidth - paddingRight);
  //     break;
  //   case 'center':
  //   default:
  //     let myWidth = width - paddingLeft - paddingRight;
  //     if (rotateCase(rotation) === 'N') {
  //       tx = (myWidth - textWidth) / 2 + paddingLeft;
  //     } else if(rotateCase(rotation) === 'R') {
  //       tx = (myHeight - textsHeight) / 2 + paddingBottom;
  //     } else if(rotateCase(rotation) === 'I') {
  //       tx = (myWidth - textWidth) / 2 + paddingRight;
  //     } else if(rotateCase(rotation) === 'B') {
  //       tx = (myHeight - textsHeight) / 2 + paddingTop;
  //     }

  //     break;
  // }


  switch(textAlign) {
    case 'left':
    case 'justify':
      tx = 0;
      break;
    case 'right':
      tx = width - textWidth;
      break;
    case 'center':
    default:
      tx = (width - textWidth) / 2;

      break;
  }

  var ty = 0;
  // switch(textBaseline) {
  //   case 'top':
  //   case 'hanging':
  //     // height = height < textsHeight ? textsHeight : height;
  //     ty = paddingTop
  //     break;
  //   case 'bottom':
  //   case 'alphabetic':
  //     ty = (height - textsHeight) - paddingBottom
  //     break;
  //   case 'middle':
  //   default:
  //     // let myWidth = width - paddingLeft - paddingRight;
  //     // let myHeight = height - paddingTop - paddingBottom;
  //     // if (rotateCase(rotation) === 'N') {
  //     //   ty = (myHeight - textsHeight) / 2 + paddingTop;
  //     // } else if (rotateCase(rotation) === 'R') {
  //     //   ty = (myWidth - textWidth) / 2 + paddingLeft;
  //     // } else if (rotateCase(rotation) === 'I') {
  //     //   ty = (height - charHeight) / 2 + paddingBottom;
  //     // } else if (rotateCase(rotation) === 'B') {
  //     //   ty = (myWidth - textWidth) / 2 + paddingRight;
  //     // }


  //     break;
  // }

  switch(textBaseline) {
    case 'top':
    case 'hanging':
      ty = 0;
      break;
    case 'bottom':
    case 'alphabetic':
      ty = height - textsHeight;
      break;
    case 'middle':
    default:
      ty = (height - textsHeight) / 2

      break;
  }

  return {tx, ty};
}


var config = require('../../config').config
export function calcDotSize(model) {
  for (var property in model) {
    if (property === 'rotation' || property === 'scale_w' || property === 'scale_h' || property === 'round') {
      continue;
    }

    let value = model[property];
    if (typeof value === 'number') {
      // model[property] = Math.round(config.dpi * value / 25.4)
      model[property] = Math.round(config.dpi * value/10 / 25.4)
    }
  }
}

export function rotateCase(rotate) {
  if (Math.PI * 0.25 < rotate && rotate <= Math.PI * 0.75) {
    rotate = 'R'
  } else if ((Math.PI * 0.75 < rotate && rotate <= Math.PI * 1.25)
    || (Math.PI * -1.25 < rotate && rotate <= Math.PI * -0.75)) {
    rotate = 'I'
  } else if ((Math.PI < rotate * 1.25 && rotate <= Math.PI * 1.75)
    || (Math.PI * -0.75 < rotate && rotate <= Math.PI * -0.25)) {
    rotate = 'B'
  } else { // if (Math.PI * -0.25 < rotate && rotate <= Math.PI * 0.25) {
    rotate = 'N'
  }

  return rotate;
}

