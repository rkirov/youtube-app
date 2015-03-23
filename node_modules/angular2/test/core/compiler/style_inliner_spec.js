System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/style_inliner", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/core/compiler/xhr/xhr", "angular2/di"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      beforeEach,
      beforeEachBindings,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      StyleInliner,
      isBlank,
      Promise,
      PromiseWrapper,
      Map,
      MapWrapper,
      XHR,
      bind,
      FakeXHR;
  function main() {
    describe('StyleInliner', (function() {
      beforeEachBindings((function() {
        return [bind(XHR).toClass(FakeXHR)];
      }));
      describe('loading', (function() {
        it('should return a string when there is no import statement', inject([StyleInliner], (function(inliner) {
          var css = '.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base');
          expect(loadedCss).not.toBePromise();
          expect(loadedCss).toEqual(css);
        })));
        it('should inline @import rules', inject([XHR, StyleInliner, AsyncTestCompleter], (function(xhr, inliner, async) {
          xhr.reply('http://base/one.css', '.one {}');
          var css = '@import url("one.css");.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('.one {}\n.main {}');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
        it('should support url([unquoted url]) in @import rules', inject([XHR, StyleInliner, AsyncTestCompleter], (function(xhr, inliner, async) {
          xhr.reply('http://base/one.css', '.one {}');
          var css = '@import url(one.css);.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('.one {}\n.main {}');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
        it('should handle @import error gracefuly', inject([StyleInliner, AsyncTestCompleter], (function(inliner, async) {
          var css = '@import "one.css";.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('/* failed to import http://base/one.css */\n.main {}');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
        it('should inline multiple @import rules', inject([XHR, StyleInliner, AsyncTestCompleter], (function(xhr, inliner, async) {
          xhr.reply('http://base/one.css', '.one {}');
          xhr.reply('http://base/two.css', '.two {}');
          var css = '@import "one.css";@import "two.css";.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('.one {}\n.two {}\n.main {}');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
        it('should inline nested @import rules', inject([XHR, StyleInliner, AsyncTestCompleter], (function(xhr, inliner, async) {
          xhr.reply('http://base/one.css', '@import "two.css";.one {}');
          xhr.reply('http://base/two.css', '.two {}');
          var css = '@import "one.css";.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base/');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('.two {}\n.one {}\n.main {}');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
        it('should handle circular dependencies gracefuly', inject([XHR, StyleInliner, AsyncTestCompleter], (function(xhr, inliner, async) {
          xhr.reply('http://base/one.css', '@import "two.css";.one {}');
          xhr.reply('http://base/two.css', '@import "one.css";.two {}');
          var css = '@import "one.css";.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base/');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('.two {}\n.one {}\n.main {}');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
        it('should handle invalid @import fracefuly', inject([StyleInliner, AsyncTestCompleter], (function(inliner, async) {
          var css = '@import one.css;.main {}';
          var loadedCss = inliner.inlineImports(css, 'http://base/');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('/* Invalid import rule: "@import one.css;" */.main {}');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
      }));
      describe('media query', (function() {
        it('should wrap inlined content in media query', inject([XHR, StyleInliner, AsyncTestCompleter], (function(xhr, inliner, async) {
          xhr.reply('http://base/one.css', '.one {}');
          var css = '@import "one.css" (min-width: 700px) and (orientation: landscape);';
          var loadedCss = inliner.inlineImports(css, 'http://base/');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual('@media (min-width: 700px) and (orientation: landscape) {\n.one {}\n}\n');
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
      }));
      describe('url rewritting', (function() {
        it('should rewrite url in inlined content', inject([XHR, StyleInliner, AsyncTestCompleter], (function(xhr, inliner, async) {
          xhr.reply('http://base/one.css', '@import "./nested/two.css";.one {background-image: url("one.jpg");}');
          xhr.reply('http://base/nested/two.css', '.two {background-image: url("../img/two.jpg");}');
          var css = '@import "one.css";';
          var loadedCss = inliner.inlineImports(css, 'http://base/');
          expect(loadedCss).toBePromise();
          PromiseWrapper.then(loadedCss, function(css) {
            expect(css).toEqual(".two {background-image: url('http://base/img/two.jpg');}\n" + ".one {background-image: url('http://base/one.jpg');}\n");
            async.done();
          }, function(e) {
            throw 'fail;';
          });
        })));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      beforeEachBindings = $__m.beforeEachBindings;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      isBlank = $__m.isBlank;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      bind = $__m.bind;
    }],
    execute: function() {
      FakeXHR = (function($__super) {
        var FakeXHR = function FakeXHR() {
          $traceurRuntime.superConstructor(FakeXHR).call(this);
          this._responses = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeXHR, {
          get: function(url) {
            assert.argumentTypes(url, assert.type.string);
            var response = MapWrapper.get(this._responses, url);
            if (isBlank(response)) {
              return assert.returnType((PromiseWrapper.reject('xhr error')), assert.genericType(Promise, assert.type.string));
            }
            return assert.returnType((PromiseWrapper.resolve(response)), assert.genericType(Promise, assert.type.string));
          },
          reply: function(url, response) {
            assert.argumentTypes(url, assert.type.string, response, assert.type.string);
            MapWrapper.set(this._responses, url, response);
          }
        }, {}, $__super);
      }(XHR));
      Object.defineProperty(FakeXHR.prototype.get, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeXHR.prototype.reply, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/style_inliner_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/style_inliner_spec.js.map