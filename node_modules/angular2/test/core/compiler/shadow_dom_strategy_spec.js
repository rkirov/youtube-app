System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/url_resolver", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/style_inliner", "angular2/src/core/compiler/view", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/xhr/xhr", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      SpyObject,
      NativeShadowDomStrategy,
      EmulatedScopedShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      resetShadowDomCache,
      UrlResolver,
      StyleUrlResolver,
      StyleInliner,
      ProtoView,
      DirectiveMetadata,
      CompileElement,
      XHR,
      isPresent,
      isBlank,
      DOM,
      Map,
      MapWrapper,
      PromiseWrapper,
      Promise,
      DynamicProtoChangeDetector,
      FakeXHR,
      SomeComponent,
      SomeOtherComponent;
  function main() {
    var strategy;
    describe('NativeShadowDomStratgey', (function() {
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        strategy = new NativeShadowDomStrategy(styleUrlResolver);
      }));
      it('should attach the view nodes to the shadow root', (function() {
        var host = el('<div></div>');
        var nodes = el('<div>view</div>');
        var pv = new ProtoView(nodes, new DynamicProtoChangeDetector(null), null);
        var view = pv.instantiate(null, null);
        strategy.attachTemplate(host, view);
        var shadowRoot = DOM.getShadowRoot(host);
        expect(isPresent(shadowRoot)).toBeTruthy();
        expect(shadowRoot).toHaveText('view');
      }));
      it('should rewrite style urls', (function() {
        var step = strategy.getStyleCompileStep(null, 'http://base');
        var styleElement = DOM.createStyleElement('.one {background-image: url("img.jpg");}');
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(styleElement).toHaveText(".one {background-image: url('http://base/img.jpg');}");
      }));
      it('should not inline import rules', (function() {
        var step = strategy.getStyleCompileStep(null, 'http://base');
        var styleElement = DOM.createStyleElement('@import "other.css";');
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(styleElement).toHaveText("@import 'http://base/other.css';");
      }));
    }));
    describe('EmulatedScopedShadowDomStratgey', (function() {
      var xhr,
          styleHost;
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        xhr = new FakeXHR();
        var styleInliner = new StyleInliner(xhr, styleUrlResolver, urlResolver);
        styleHost = el('<div></div>');
        strategy = new EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, styleHost);
        resetShadowDomCache();
      }));
      it('should attach the view nodes as child of the host element', (function() {
        var host = el('<div><span>original content</span></div>');
        var nodes = el('<div>view</div>');
        var pv = new ProtoView(nodes, new DynamicProtoChangeDetector(null), null);
        var view = pv.instantiate(null, null);
        strategy.attachTemplate(host, view);
        var firstChild = DOM.firstChild(host);
        expect(DOM.tagName(firstChild).toLowerCase()).toEqual('div');
        expect(firstChild).toHaveText('view');
        expect(host).toHaveText('view');
      }));
      it('should rewrite style urls', (function() {
        var template = el('<div><style>.foo {background-image: url("img.jpg");}</style></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getStyleCompileStep(cmpMetadata, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(styleElement).toHaveText(".foo[_ngcontent-0] {\n" + "background-image: url(http://base/img.jpg);\n" + "}");
      }));
      it('should scope styles', (function() {
        var template = el('<div><style>.foo {} :host {}</style></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getStyleCompileStep(cmpMetadata, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(styleElement).toHaveText(".foo[_ngcontent-0] {\n\n}\n\n[_nghost-0] {\n\n}");
      }));
      it('should inline @import rules', inject([AsyncTestCompleter], (function(async) {
        xhr.reply('http://base/one.css', '.one {}');
        var template = el('<div><style>@import "one.css";</style></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getStyleCompileStep(cmpMetadata, 'http://base');
        var styleElement = DOM.firstChild(template);
        var parentElement = new CompileElement(template);
        var compileElement = new CompileElement(styleElement);
        var parentpv = new ProtoView(null, null, null);
        parentElement.inheritedProtoView = parentpv;
        step.process(parentElement, compileElement, null);
        expect(parentpv.stylePromises.length).toEqual(1);
        expect(parentpv.stylePromises[0]).toBePromise();
        expect(styleElement).toHaveText('');
        parentpv.stylePromises[0].then((function(_) {
          expect(styleElement).toHaveText('.one[_ngcontent-0] {\n\n}');
          async.done();
        }));
      })));
      it('should return the same style given the same component', (function() {
        var template = el('<div><style>.foo {} :host {}</style></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getStyleCompileStep(cmpMetadata, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        var template2 = el('<div><style>.foo {} :host {}</style></div>');
        var step2 = strategy.getStyleCompileStep(cmpMetadata, 'http://base');
        var styleElement2 = DOM.firstChild(template2);
        var compileElement2 = new CompileElement(styleElement2);
        step2.process(null, compileElement2, null);
        expect(DOM.getText(styleElement)).toEqual(DOM.getText(styleElement2));
      }));
      it('should return different styles given different components', (function() {
        var template = el('<div><style>.foo {} :host {}</style></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getStyleCompileStep(cmpMetadata, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        var template2 = el('<div><style>.foo {} :host {}</style></div>');
        var cmpMetadata2 = new DirectiveMetadata(SomeOtherComponent, null);
        var step2 = strategy.getStyleCompileStep(cmpMetadata2, 'http://base');
        var styleElement2 = DOM.firstChild(template2);
        var compileElement2 = new CompileElement(styleElement2);
        step2.process(null, compileElement2, null);
        expect(DOM.getText(styleElement)).not.toEqual(DOM.getText(styleElement2));
      }));
      it('should move the style element to the style host', (function() {
        var template = el('<div><style>.one {}</style></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getStyleCompileStep(cmpMetadata, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(template).toHaveText('');
        expect(styleHost).toHaveText('.one[_ngcontent-0] {\n\n}');
      }));
      it('should add an attribute to the content elements', (function() {
        var template = el('<div></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getTemplateCompileStep(cmpMetadata);
        var compileElement = new CompileElement(template);
        step.process(null, compileElement, null);
        expect(DOM.getAttribute(template, '_ngcontent-0')).toEqual('');
      }));
      it('should add an attribute to the host elements', (function() {
        var template = el('<div></div>');
        var cmpMetadata = new DirectiveMetadata(SomeComponent, null);
        var step = strategy.getTemplateCompileStep(cmpMetadata);
        var compileElement = new CompileElement(template);
        compileElement.componentDirective = new DirectiveMetadata(SomeOtherComponent, null);
        step.process(null, compileElement, null);
        expect(DOM.getAttribute(template, '_nghost-1')).toEqual('');
      }));
    }));
    describe('EmulatedUnscopedShadowDomStratgey', (function() {
      var styleHost;
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        styleHost = el('<div></div>');
        strategy = new EmulatedUnscopedShadowDomStrategy(styleUrlResolver, styleHost);
        resetShadowDomCache();
      }));
      it('should attach the view nodes as child of the host element', (function() {
        var host = el('<div><span>original content</span></div>');
        var nodes = el('<div>view</div>');
        var pv = new ProtoView(nodes, new DynamicProtoChangeDetector(null), null);
        var view = pv.instantiate(null, null);
        strategy.attachTemplate(host, view);
        var firstChild = DOM.firstChild(host);
        expect(DOM.tagName(firstChild).toLowerCase()).toEqual('div');
        expect(firstChild).toHaveText('view');
        expect(host).toHaveText('view');
      }));
      it('should rewrite style urls', (function() {
        var template = el('<div><style>.one {background-image: url("img.jpg");}</style></div>');
        var step = strategy.getStyleCompileStep(null, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(styleElement).toHaveText(".one {background-image: url('http://base/img.jpg');}");
      }));
      it('should not inline import rules', (function() {
        var template = el('<div><style>@import "other.css";</style></div>');
        var step = strategy.getStyleCompileStep(null, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(styleElement).toHaveText("@import 'http://base/other.css';");
      }));
      it('should move the style element to the style host', (function() {
        var template = el('<div><style>/*css*/</style></div>');
        var step = strategy.getStyleCompileStep(null, 'http://base');
        var styleElement = DOM.firstChild(template);
        var compileElement = new CompileElement(styleElement);
        step.process(null, compileElement, null);
        expect(styleHost).toHaveText("/*css*/");
      }));
      it('should insert the same style only once in the style host', (function() {
        var template = el('<div><style>/*css1*/</style><style>/*css2*/</style>' + '<style>/*css1*/</style></div>');
        var step = strategy.getStyleCompileStep(null, 'http://base');
        var styleElements = DOM.childNodes(template);
        var compileElement = new CompileElement(styleElements[0]);
        step.process(null, compileElement, null);
        compileElement = new CompileElement(styleElements[0]);
        step.process(null, compileElement, null);
        compileElement = new CompileElement(styleElements[0]);
        step.process(null, compileElement, null);
        expect(styleHost).toHaveText("/*css1*//*css2*/");
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
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      SpyObject = $__m.SpyObject;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
      EmulatedScopedShadowDomStrategy = $__m.EmulatedScopedShadowDomStrategy;
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
      resetShadowDomCache = $__m.resetShadowDomCache;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
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
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      SomeOtherComponent = (function() {
        var SomeOtherComponent = function SomeOtherComponent() {};
        return ($traceurRuntime.createClass)(SomeOtherComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom_strategy_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/shadow_dom_strategy_spec.js.map