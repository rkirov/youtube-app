System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/css_processor", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/dom/dom_adapter", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "angular2/src/facade/collection"], function($__export) {
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
      CssProcessor,
      CssTransformer,
      ShadowDomStrategy,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      DOM,
      Component,
      DirectiveMetadata,
      ListWrapper,
      FakeShadowDomStrategy,
      MockStep,
      FakeCssTransformer,
      SomeComponent;
  function main() {
    describe('CssProcessor', (function() {
      describe('compile step', (function() {
        function createPipeline(cssProcessor, strategy, templateUrl) {
          assert.argumentTypes(cssProcessor, CssProcessor, strategy, ShadowDomStrategy, templateUrl, assert.type.string);
          var annotation = new Component();
          var meta = new DirectiveMetadata(SomeComponent, annotation);
          return new CompilePipeline([cssProcessor.getCompileStep(meta, strategy, templateUrl)]);
        }
        Object.defineProperty(createPipeline, "parameters", {get: function() {
            return [[CssProcessor], [ShadowDomStrategy], [assert.type.string]];
          }});
        it('it should set ignoreBindings to true for style elements', (function() {
          var strategy = new FakeShadowDomStrategy(null);
          var cssProcessor = new CssProcessor(null);
          var pipeline = createPipeline(cssProcessor, strategy, 'http://base');
          var results = pipeline.process(el('<div><style></style></div>'));
          expect(results[0].ignoreBindings).toBe(false);
          expect(results[1].ignoreBindings).toBe(true);
        }));
        it('should execute the strategy step for style elements', (function() {
          var processedEls = [];
          var compileStep = new MockStep((function(parent, current, control) {
            ListWrapper.push(processedEls, current.element);
          }));
          var strategy = new FakeShadowDomStrategy(compileStep);
          var cssProcessor = new CssProcessor(null);
          var pipeline = createPipeline(cssProcessor, strategy, 'http://base');
          var results = pipeline.process(el('<div><style></style></div>'));
          expect(processedEls.length).toEqual(1);
          expect(processedEls[0]).toBe(results[1].element);
        }));
        it('should apply the given transformers', (function() {
          var strategy = new FakeShadowDomStrategy(null);
          var cssProcessor = new CssProcessor([new FakeCssTransformer('/*transformer1 */'), new FakeCssTransformer('/*transformer2 */')]);
          var pipeline = createPipeline(cssProcessor, strategy, 'http://base');
          var results = pipeline.process(el('<div><style></style></div>'));
          expect(results[1].element).toHaveText('/*transformer1 *//*transformer2 */');
        }));
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
      CssProcessor = $__m.CssProcessor;
      CssTransformer = $__m.CssTransformer;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      FakeShadowDomStrategy = (function($__super) {
        var FakeShadowDomStrategy = function FakeShadowDomStrategy(compileStep) {
          assert.argumentTypes(compileStep, CompileStep);
          $traceurRuntime.superConstructor(FakeShadowDomStrategy).call(this);
          this._compileStep = compileStep;
        };
        return ($traceurRuntime.createClass)(FakeShadowDomStrategy, {getStyleCompileStep: function(cmpMetadata, templateUrl) {
            assert.argumentTypes(cmpMetadata, DirectiveMetadata, templateUrl, assert.type.string);
            return assert.returnType((this._compileStep), CompileStep);
          }}, {}, $__super);
      }(ShadowDomStrategy));
      Object.defineProperty(FakeShadowDomStrategy, "parameters", {get: function() {
          return [[CompileStep]];
        }});
      Object.defineProperty(FakeShadowDomStrategy.prototype.getStyleCompileStep, "parameters", {get: function() {
          return [[DirectiveMetadata], [assert.type.string]];
        }});
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      FakeCssTransformer = (function($__super) {
        var FakeCssTransformer = function FakeCssTransformer(css) {
          assert.argumentTypes(css, assert.type.string);
          $traceurRuntime.superConstructor(FakeCssTransformer).call(this);
          this._css = css;
        };
        return ($traceurRuntime.createClass)(FakeCssTransformer, {transform: function(styleEl) {
            var cssText = DOM.getText(styleEl);
            cssText += this._css;
            DOM.setText(styleEl, cssText);
          }}, {}, $__super);
      }(CssTransformer));
      Object.defineProperty(FakeCssTransformer, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/css_processor_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/css_processor_spec.js.map