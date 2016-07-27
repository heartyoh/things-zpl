import * as rect from '../../src/components/rect'

import { expect } from 'chai'

describe('Component', function () {

  describe('rect', function () {

    var foo, bar;

    beforeEach(function () {
      foo = {a: 32, b: {aa: 33, bb: 94}};
      bar = {c: 44};
    });

    it('XXX 커맨드를 생성해야 한다.', function () {
      expect(foo.a).to.equal(32);
    });

  });
});
