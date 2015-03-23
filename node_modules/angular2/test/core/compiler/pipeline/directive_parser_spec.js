System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/pipeline/directive_parser", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/core/compiler/directive_metadata_reader", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      xit,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      assertionsEnabled,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      DirectiveParser,
      CompilePipeline,
      CompileStep,
      CompileElement,
      CompileControl,
      Component,
      DynamicComponent,
      Decorator,
      Viewport,
      Template,
      DirectiveMetadataReader,
      Lexer,
      Parser,
      MockStep,
      SomeDecorator,
      SomeDecoratorIgnoringChildren,
      SomeDecoratorWithBinding,
      SomeViewport,
      SomeViewport2,
      SomeComponent,
      SomeComponent2,
      SomeDynamicComponent,
      SomeDynamicComponent2,
      MyComp;
  function main() {
    describe('DirectiveParser', (function() {
      var reader,
          directives;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
        directives = [SomeDecorator, SomeDecoratorIgnoringChildren, SomeDecoratorWithBinding, SomeViewport, SomeViewport2, SomeComponent, SomeComponent2, SomeDynamicComponent, SomeDynamicComponent2];
      }));
      function createPipeline() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            propertyBindings = $__1.propertyBindings,
            variableBindings = $__1.variableBindings;
        var parser = new Parser(new Lexer());
        var annotatedDirectives = ListWrapper.create();
        for (var i = 0; i < directives.length; i++) {
          ListWrapper.push(annotatedDirectives, reader.read(directives[i]));
        }
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(propertyBindings)) {
            StringMapWrapper.forEach(propertyBindings, (function(v, k) {
              current.addPropertyBinding(k, parser.parseBinding(v, null));
              MapWrapper.set(current.attrs(), k, v);
            }));
          }
          if (isPresent(variableBindings)) {
            StringMapWrapper.forEach(variableBindings, (function(v, k) {
              current.addVariableBinding(k, v);
              MapWrapper.set(current.attrs(), k, v);
            }));
          }
        })), new DirectiveParser(annotatedDirectives)]);
      }
      it('should not add directives if they are not used', (function() {
        var results = createPipeline().process(el('<div></div>'));
        expect(results[0].decoratorDirectives).toBe(null);
        expect(results[0].componentDirective).toBe(null);
        expect(results[0].viewportDirective).toBe(null);
      }));
      describe('component directives', (function() {
        it('should detect them in attributes', (function() {
          var results = createPipeline().process(el('<div some-comp></div>'));
          expect(results[0].componentDirective).toEqual(reader.read(SomeComponent));
        }));
        it('component directives must be first in collected directives', (function() {
          var results = createPipeline().process(el('<div some-comp some-decor></div>'));
          var dirs = results[0].getAllDirectives();
          expect(dirs.length).toEqual(2);
          expect(dirs[0]).toEqual(reader.read(SomeComponent));
          expect(dirs[1]).toEqual(reader.read(SomeDecorator));
        }));
        it('should detect them in property bindings', (function() {
          var pipeline = createPipeline({propertyBindings: {'some-comp': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].componentDirective).toEqual(reader.read(SomeComponent));
        }));
        it('should detect them in variable bindings', (function() {
          var pipeline = createPipeline({variableBindings: {'some-comp': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].componentDirective).toEqual(reader.read(SomeComponent));
        }));
        it('should not allow multiple component directives on the same element', (function() {
          expect((function() {
            createPipeline().process(el('<div some-comp some-comp2></div>'));
          })).toThrowError('Multiple component directives not allowed on the same element - check <div some-comp some-comp2>');
        }));
        it('should not allow component directives on <template> elements', (function() {
          expect((function() {
            createPipeline().process(el('<template some-comp></template>'));
          })).toThrowError('Only template directives are allowed on template elements - check <template some-comp>');
        }));
      }));
      describe("dynamic component directives", (function() {
        it('should detect dynamic component', (function() {
          var results = createPipeline().process(el('<div some-dynamic-comp></div>'));
          expect(results[0].componentDirective).toEqual(reader.read(SomeDynamicComponent));
        }));
        it('should not allow multiple dynamic component directives on the same element', (function() {
          expect((function() {
            createPipeline().process(el('<div some-dynamic-comp some-dynamic-comp2></div>'));
          })).toThrowError(new RegExp('Multiple component directives not allowed on the same element'));
        }));
        it('should not allow component and dynamic directives on the same element', (function() {
          expect((function() {
            createPipeline().process(el('<div some-dynamic-comp some-comp></div>'));
          })).toThrowError(new RegExp('Multiple component directives not allowed on the same element'));
        }));
      }));
      describe('viewport directives', (function() {
        it('should detect them in attributes', (function() {
          var results = createPipeline().process(el('<template some-templ></template>'));
          expect(results[0].viewportDirective).toEqual(reader.read(SomeViewport));
        }));
        it('should detect them in property bindings', (function() {
          var pipeline = createPipeline({propertyBindings: {'some-templ': 'someExpr'}});
          var results = pipeline.process(el('<template></template>'));
          expect(results[0].viewportDirective).toEqual(reader.read(SomeViewport));
        }));
        it('should detect them in variable bindings', (function() {
          var pipeline = createPipeline({variableBindings: {'some-templ': 'someExpr'}});
          var results = pipeline.process(el('<template></template>'));
          expect(results[0].viewportDirective).toEqual(reader.read(SomeViewport));
        }));
        it('should not allow multiple viewport directives on the same element', (function() {
          expect((function() {
            createPipeline().process(el('<template some-templ some-templ2></template>'));
          })).toThrowError('Only one viewport directive can be used per element - check <template some-templ some-templ2>');
        }));
        it('should not allow viewport directives on non <template> elements', (function() {
          expect((function() {
            createPipeline().process(el('<div some-templ></div>'));
          })).toThrowError('Viewport directives need to be placed on <template> elements or elements with template attribute - check <div some-templ>');
        }));
      }));
      describe('decorator directives', (function() {
        it('should detect them in attributes', (function() {
          var results = createPipeline().process(el('<div some-decor></div>'));
          expect(results[0].decoratorDirectives).toEqual([reader.read(SomeDecorator)]);
        }));
        it('should detect them in property bindings', (function() {
          var pipeline = createPipeline({propertyBindings: {'some-decor': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].decoratorDirectives).toEqual([reader.read(SomeDecorator)]);
        }));
        it('should compile children by default', (function() {
          var results = createPipeline().process(el('<div some-decor></div>'));
          expect(results[0].compileChildren).toEqual(true);
        }));
        it('should stop compiling children when specified in the decorator config', (function() {
          var results = createPipeline().process(el('<div some-decor-ignoring-children></div>'));
          expect(results[0].compileChildren).toEqual(false);
        }));
        it('should detect them in variable bindings', (function() {
          var pipeline = createPipeline({variableBindings: {'some-decor': 'someExpr'}});
          var results = pipeline.process(el('<div></div>'));
          expect(results[0].decoratorDirectives).toEqual([reader.read(SomeDecorator)]);
        }));
        it('should not instantiate decorator directive twice', (function() {
          var pipeline = createPipeline({propertyBindings: {'some-decor-with-binding': 'someExpr'}});
          var results = pipeline.process(el('<div some-decor-with-binding="foo"></div>'));
          expect(results[0].decoratorDirectives.length).toEqual(1);
          expect(results[0].decoratorDirectives).toEqual([reader.read(SomeDecoratorWithBinding)]);
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
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      xit = $__m.xit;
      expect = $__m.expect;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      isPresent = $__m.isPresent;
      assertionsEnabled = $__m.assertionsEnabled;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      DirectiveParser = $__m.DirectiveParser;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      Component = $__m.Component;
      DynamicComponent = $__m.DynamicComponent;
      Decorator = $__m.Decorator;
      Viewport = $__m.Viewport;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
    }],
    execute: function() {
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
      SomeDecorator = (function() {
        var SomeDecorator = function SomeDecorator() {};
        return ($traceurRuntime.createClass)(SomeDecorator, {}, {});
      }());
      Object.defineProperty(SomeDecorator, "annotations", {get: function() {
          return [new Decorator({selector: '[some-decor]'})];
        }});
      SomeDecoratorIgnoringChildren = (function() {
        var SomeDecoratorIgnoringChildren = function SomeDecoratorIgnoringChildren() {};
        return ($traceurRuntime.createClass)(SomeDecoratorIgnoringChildren, {}, {});
      }());
      Object.defineProperty(SomeDecoratorIgnoringChildren, "annotations", {get: function() {
          return [new Decorator({
            selector: '[some-decor-ignoring-children]',
            compileChildren: false
          })];
        }});
      SomeDecoratorWithBinding = (function() {
        var SomeDecoratorWithBinding = function SomeDecoratorWithBinding() {};
        return ($traceurRuntime.createClass)(SomeDecoratorWithBinding, {}, {});
      }());
      Object.defineProperty(SomeDecoratorWithBinding, "annotations", {get: function() {
          return [new Decorator({
            selector: '[some-decor-with-binding]',
            bind: {'some-decor-with-binding': 'foo'}
          })];
        }});
      SomeViewport = (function() {
        var SomeViewport = function SomeViewport() {};
        return ($traceurRuntime.createClass)(SomeViewport, {}, {});
      }());
      Object.defineProperty(SomeViewport, "annotations", {get: function() {
          return [new Viewport({selector: '[some-templ]'})];
        }});
      SomeViewport2 = (function() {
        var SomeViewport2 = function SomeViewport2() {};
        return ($traceurRuntime.createClass)(SomeViewport2, {}, {});
      }());
      Object.defineProperty(SomeViewport2, "annotations", {get: function() {
          return [new Viewport({selector: '[some-templ2]'})];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      Object.defineProperty(SomeComponent, "annotations", {get: function() {
          return [new Component({selector: '[some-comp]'})];
        }});
      SomeComponent2 = (function() {
        var SomeComponent2 = function SomeComponent2() {};
        return ($traceurRuntime.createClass)(SomeComponent2, {}, {});
      }());
      Object.defineProperty(SomeComponent2, "annotations", {get: function() {
          return [new Component({selector: '[some-comp2]'})];
        }});
      SomeDynamicComponent = (function() {
        var SomeDynamicComponent = function SomeDynamicComponent() {};
        return ($traceurRuntime.createClass)(SomeDynamicComponent, {}, {});
      }());
      Object.defineProperty(SomeDynamicComponent, "annotations", {get: function() {
          return [new DynamicComponent({selector: '[some-dynamic-comp]'})];
        }});
      SomeDynamicComponent2 = (function() {
        var SomeDynamicComponent2 = function SomeDynamicComponent2() {};
        return ($traceurRuntime.createClass)(SomeDynamicComponent2, {}, {});
      }());
      Object.defineProperty(SomeDynamicComponent2, "annotations", {get: function() {
          return [new DynamicComponent({selector: '[some-dynamic-comp2]'})];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {};
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component(), new Template({directives: [SomeDecorator, SomeViewport, SomeViewport2, SomeComponent, SomeComponent2, SomeDynamicComponent, SomeDynamicComponent2]})];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/directive_parser_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/directive_parser_spec.js.map