System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      ListWrapper,
      isPresent,
      RegExpWrapper,
      RegExpMatcherWrapper;
  function main() {
    describe('RegExp', (function() {
      it('should expose the index for each match', (function() {
        var re = RegExpWrapper.create('(!)');
        var matcher = RegExpWrapper.matcher(re, '0!23!567!!');
        var indexes = [];
        var m;
        while (isPresent(m = RegExpMatcherWrapper.next(matcher))) {
          ListWrapper.push(indexes, m.index);
          expect(m[0]).toEqual('!');
          expect(m[1]).toEqual('!');
          expect(m.length).toBe(2);
        }
        expect(indexes).toEqual([1, 4, 8, 9]);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      RegExpWrapper = $__m.RegExpWrapper;
      RegExpMatcherWrapper = $__m.RegExpMatcherWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/facade/lang_spec.map

//# sourceMappingURL=../../../angular2/test/facade/lang_spec.js.map