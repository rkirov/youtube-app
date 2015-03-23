System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/services/title"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      afterEach,
      DOM,
      Title;
  function main() {
    describe('title service', (function() {
      var initialTitle = DOM.getTitle();
      var titleService = new Title();
      afterEach((function() {
        DOM.setTitle(initialTitle);
      }));
      it('should allow reading initial title', (function() {
        expect(titleService.getTitle()).toEqual(initialTitle);
      }));
      it('should set a title on the injected document', (function() {
        titleService.setTitle('test title');
        expect(DOM.getTitle()).toEqual('test title');
        expect(titleService.getTitle()).toEqual('test title');
      }));
      it('should reset title to empty string if title not provided', (function() {
        titleService.setTitle(null);
        expect(DOM.getTitle()).toEqual('');
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      afterEach = $__m.afterEach;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Title = $__m.Title;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/services/title_spec.map

//# sourceMappingURL=../../../angular2/test/services/title_spec.js.map