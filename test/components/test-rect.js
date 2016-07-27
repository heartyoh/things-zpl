var Rect = require('../../src/components/rect').Rect;

import { expect } from 'chai'
import { parseZpl } from '../util'

describe('Rect', function () {

  describe('그룹에 속하지 않은 경우.', function () {

    var model;

    beforeEach(function () {
      model = {
        left : 150,
  			top : 50,
        width : 100,
  			height : 200,
  			lineWidth : 10,
  			fillStyle : '',
  			strokeStyle : '',
  			rotation : '',
  			text : ''
      };
    });

    it('GB 커맨드를 생성해야 한다.', function () {

      var result = parseZpl(new Rect(model).toZpl());

      expect(result[0].command).to.equal('FO');
      expect(result[0].params[0]).to.equal(String(model.left));
      expect(result[0].params[1]).to.equal(String(model.top));
      expect(result[1].command).to.equal('GB');
      expect(result[2].command).to.equal('FS');
    });

    it('round 속성은 무시한다.', function () {
      model.round = 20;
      var result = parseZpl(new Rect(model).toZpl());

      expect(result[0].command).to.equal('FO');
      expect(result[0].params[0]).to.equal(String(model.left));
      expect(result[0].params[1]).to.equal(String(model.top));
      expect(result[1].command).to.equal('GB');
      expect(result[2].command).to.equal('FS');
    });

  });

  describe('회전된 경우', function () {

    var foo, bar;

    beforeEach(function () {
      foo = {a: 32, b: {aa: 33, bb: 94}};
      bar = {c: 44};
    });

    it('생성된 커맨드의 X값이 어떠어떠해야한다.', function () {
      expect(foo.a).to.equal(32);
    });

  });

  describe('그룹에 속한 경우', function () {

    var foo, bar;

    beforeEach(function () {
      foo = {a: 32, b: {aa: 33, bb: 94}};
      bar = {c: 44};
    });

    it('생성된 커맨드의 X값이 어떠어떠해야한다.222', function () {
      expect(foo.a).to.equal(32);
    });

  });
});
