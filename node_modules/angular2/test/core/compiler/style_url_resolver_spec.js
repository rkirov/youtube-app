System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/url_resolver"], function($__export) {
  "use strict";
  var assert,
      describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      StyleUrlResolver,
      UrlResolver,
      FakeUrlResolver;
  function main() {
    describe('StyleUrlResolver', (function() {
      it('should resolve "url()" urls', (function() {
        var styleUrlResolver = new StyleUrlResolver(new FakeUrlResolver());
        var css = "\n      .foo {\n        background-image: url(\"double.jpg\");\n        background-image: url('simple.jpg');\n        background-image: url(noquote.jpg);\n      }";
        var expectedCss = "\n      .foo {\n        background-image: url('base/double.jpg');\n        background-image: url('base/simple.jpg');\n        background-image: url('base/noquote.jpg');\n      }";
        var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
        expect(resolvedCss).toEqual(expectedCss);
      }));
      it('should resolve "@import" urls', (function() {
        var styleUrlResolver = new StyleUrlResolver(new FakeUrlResolver());
        var css = "\n      @import '1.css';\n      @import \"2.css\";\n      ";
        var expectedCss = "\n      @import 'base/1.css';\n      @import 'base/2.css';\n      ";
        var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
        expect(resolvedCss).toEqual(expectedCss);
      }));
      it('should resolve "@import url()" urls', (function() {
        var styleUrlResolver = new StyleUrlResolver(new FakeUrlResolver());
        var css = "\n      @import url('3.css');\n      @import url(\"4.css\");\n      @import url(5.css);\n      ";
        var expectedCss = "\n      @import url('base/3.css');\n      @import url('base/4.css');\n      @import url('base/5.css');\n      ";
        var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
        expect(resolvedCss).toEqual(expectedCss);
      }));
      it('should support media query in "@import"', (function() {
        var styleUrlResolver = new StyleUrlResolver(new FakeUrlResolver());
        var css = "\n      @import 'print.css' print;\n      @import url(print.css) print;\n      ";
        var expectedCss = "\n      @import 'base/print.css' print;\n      @import url('base/print.css') print;\n      ";
        var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
        expect(resolvedCss).toEqual(expectedCss);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }],
    execute: function() {
      FakeUrlResolver = (function($__super) {
        var FakeUrlResolver = function FakeUrlResolver() {
          $traceurRuntime.superConstructor(FakeUrlResolver).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(FakeUrlResolver, {resolve: function(baseUrl, url) {
            assert.argumentTypes(baseUrl, assert.type.string, url, assert.type.string);
            return assert.returnType((baseUrl + '/' + url), assert.type.string);
          }}, {}, $__super);
      }(UrlResolver));
      Object.defineProperty(FakeUrlResolver.prototype.resolve, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/style_url_resolver_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/style_url_resolver_spec.js.map