System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/di", "angular2/change_detection", "angular2/src/core/exception_handler", "angular2/src/core/compiler/compiler", "angular2/src/core/life_cycle/life_cycle", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/component_url_mapper", "angular2/src/core/compiler/url_resolver", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/style_inliner", "angular2/src/core/compiler/css_processor", "angular2/src/mock/template_resolver_mock", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/core/compiler/view_container", "angular2/src/dom/browser_adapter"], function($__export) {
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
      xit,
      StringMapWrapper,
      List,
      Type,
      DOM,
      Injector,
      Lexer,
      Parser,
      ChangeDetector,
      dynamicChangeDetection,
      ExceptionHandler,
      Compiler,
      CompilerCache,
      LifeCycle,
      DirectiveMetadataReader,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      EmulatedScopedShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      TemplateLoader,
      ComponentUrlMapper,
      UrlResolver,
      StyleUrlResolver,
      StyleInliner,
      CssProcessor,
      MockTemplateResolver,
      Decorator,
      Component,
      Viewport,
      Template,
      ViewContainer,
      BrowserDomAdapter,
      TestDirectiveMetadataReader,
      ManualViewportDirective,
      AutoViewportDirective,
      Simple,
      MultipleContentTagsComponent,
      ConditionalContentComponent,
      OuterWithIndirectNestedComponent,
      OuterComponent,
      InnerComponent,
      InnerInnerComponent,
      MyComp;
  function main() {
    BrowserDomAdapter.makeCurrent();
    describe('integration tests', function() {
      var urlResolver = new UrlResolver();
      var styleUrlResolver = new StyleUrlResolver(urlResolver);
      var styleInliner = new StyleInliner(null, styleUrlResolver, urlResolver);
      var strategies = {
        "scoped": new EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, DOM.createElement('div')),
        "unscoped": new EmulatedUnscopedShadowDomStrategy(styleUrlResolver, DOM.createElement('div'))
      };
      if (DOM.supportsNativeShadowDOM()) {
        StringMapWrapper.set(strategies, "native", new NativeShadowDomStrategy(styleUrlResolver));
      }
      StringMapWrapper.forEach(strategies, (function(strategy, name) {
        describe((name + " shadow dom strategy"), (function() {
          var compiler,
              tplResolver;
          beforeEach((function() {
            tplResolver = new MockTemplateResolver();
            compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null, null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), strategy, tplResolver, new ComponentUrlMapper(), urlResolver, new CssProcessor(null));
          }));
          function compile(template, directives, assertions) {
            assert.argumentTypes(template, assert.type.any, directives, assert.genericType(List, Type), assertions, assert.type.any);
            tplResolver.setTemplate(MyComp, new Template({
              inline: template,
              directives: directives
            }));
            compiler.compile(MyComp).then(createView).then((function(view) {
              var lc = new LifeCycle(new ExceptionHandler(), view.changeDetector, false);
              assertions(view, lc);
            }));
          }
          Object.defineProperty(compile, "parameters", {get: function() {
              return [[], [assert.genericType(List, Type)], []];
            }});
          it('should support simple components', inject([AsyncTestCompleter], (function(async) {
            var temp = '<simple>' + '<div>A</div>' + '</simple>';
            compile(temp, [Simple], (function(view, lc) {
              expect(view.nodes).toHaveText('SIMPLE(A)');
              async.done();
            }));
          })));
          it('should support multiple content tags', inject([AsyncTestCompleter], (function(async) {
            var temp = '<multiple-content-tags>' + '<div>B</div>' + '<div>C</div>' + '<div class="left">A</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent], (function(view, lc) {
              expect(view.nodes).toHaveText('(A, BC)');
              async.done();
            }));
          })));
          it('should redistribute only direct children', inject([AsyncTestCompleter], (function(async) {
            var temp = '<multiple-content-tags>' + '<div>B<div class="left">A</div></div>' + '<div>C</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent], (function(view, lc) {
              expect(view.nodes).toHaveText('(, BAC)');
              async.done();
            }));
          })));
          it("should redistribute direct child viewcontainers when the light dom changes", inject([AsyncTestCompleter], (function(async) {
            var temp = '<multiple-content-tags>' + '<div><div template="manual" class="left">A</div></div>' + '<div>B</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent, ManualViewportDirective], (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualViewportDirective);
              expect(view.nodes).toHaveText('(, B)');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('(, AB)');
              dir.hide();
              lc.tick();
              expect(view.nodes).toHaveText('(, B)');
              async.done();
            }));
          })));
          it("should redistribute when the light dom changes", inject([AsyncTestCompleter], (function(async) {
            var temp = '<multiple-content-tags>' + '<div template="manual" class="left">A</div>' + '<div>B</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent, ManualViewportDirective], (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualViewportDirective);
              expect(view.nodes).toHaveText('(, B)');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('(A, B)');
              dir.hide();
              lc.tick();
              expect(view.nodes).toHaveText('(, B)');
              async.done();
            }));
          })));
          it("should support nested components", inject([AsyncTestCompleter], (function(async) {
            var temp = '<outer-with-indirect-nested>' + '<div>A</div>' + '<div>B</div>' + '</outer-with-indirect-nested>';
            compile(temp, [OuterWithIndirectNestedComponent], (function(view, lc) {
              expect(view.nodes).toHaveText('OUTER(SIMPLE(AB))');
              async.done();
            }));
          })));
          it("should support nesting with content being direct child of a nested component", inject([AsyncTestCompleter], (function(async) {
            var temp = '<outer>' + '<div template="manual" class="left">A</div>' + '<div>B</div>' + '<div>C</div>' + '</outer>';
            compile(temp, [OuterComponent, ManualViewportDirective], (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualViewportDirective);
              expect(view.nodes).toHaveText('OUTER(INNER(INNERINNER(,BC)))');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('OUTER(INNER(INNERINNER(A,BC)))');
              async.done();
            }));
          })));
          it('should redistribute when the shadow dom changes', inject([AsyncTestCompleter], (function(async) {
            var temp = '<conditional-content>' + '<div class="left">A</div>' + '<div>B</div>' + '<div>C</div>' + '</conditional-content>';
            compile(temp, [ConditionalContentComponent, AutoViewportDirective], (function(view, lc) {
              var cmp = view.elementInjectors[0].get(ConditionalContentComponent);
              expect(view.nodes).toHaveText('(, ABC)');
              cmp.showLeft();
              lc.tick();
              expect(view.nodes).toHaveText('(A, BC)');
              cmp.hideLeft();
              lc.tick();
              expect(view.nodes).toHaveText('(, ABC)');
              async.done();
            }));
          })));
        }));
      }));
    });
  }
  function createView(pv) {
    var view = pv.instantiate(null, null);
    view.hydrate(new Injector([]), null, null, {}, null);
    return view;
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
      xit = $__m.xit;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      List = $__m.List;
    }, function($__m) {
      Type = $__m.Type;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      ChangeDetector = $__m.ChangeDetector;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      ExceptionHandler = $__m.ExceptionHandler;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
      EmulatedScopedShadowDomStrategy = $__m.EmulatedScopedShadowDomStrategy;
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      CssProcessor = $__m.CssProcessor;
    }, function($__m) {
      MockTemplateResolver = $__m.MockTemplateResolver;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      BrowserDomAdapter = $__m.BrowserDomAdapter;
    }],
    execute: function() {
      TestDirectiveMetadataReader = (function($__super) {
        var TestDirectiveMetadataReader = function TestDirectiveMetadataReader(shadowDomStrategy) {
          $traceurRuntime.superConstructor(TestDirectiveMetadataReader).call(this);
          this.shadowDomStrategy = shadowDomStrategy;
        };
        return ($traceurRuntime.createClass)(TestDirectiveMetadataReader, {parseShadowDomStrategy: function(annotation) {
            assert.argumentTypes(annotation, Component);
            return assert.returnType((this.shadowDomStrategy), ShadowDomStrategy);
          }}, {}, $__super);
      }(DirectiveMetadataReader));
      Object.defineProperty(TestDirectiveMetadataReader.prototype.parseShadowDomStrategy, "parameters", {get: function() {
          return [[Component]];
        }});
      ManualViewportDirective = (function() {
        var ManualViewportDirective = function ManualViewportDirective(viewContainer) {
          assert.argumentTypes(viewContainer, ViewContainer);
          this.viewContainer = viewContainer;
        };
        return ($traceurRuntime.createClass)(ManualViewportDirective, {
          show: function() {
            this.viewContainer.create();
          },
          hide: function() {
            this.viewContainer.remove(0);
          }
        }, {});
      }());
      Object.defineProperty(ManualViewportDirective, "annotations", {get: function() {
          return [new Viewport({selector: '[manual]'})];
        }});
      Object.defineProperty(ManualViewportDirective, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      AutoViewportDirective = (function() {
        var AutoViewportDirective = function AutoViewportDirective(viewContainer) {
          assert.argumentTypes(viewContainer, ViewContainer);
          this.viewContainer = viewContainer;
        };
        return ($traceurRuntime.createClass)(AutoViewportDirective, {set auto(newValue) {
            assert.argumentTypes(newValue, assert.type.boolean);
            if (newValue) {
              this.viewContainer.create();
            } else {
              this.viewContainer.remove(0);
            }
          }}, {});
      }());
      Object.defineProperty(AutoViewportDirective, "annotations", {get: function() {
          return [new Viewport({
            selector: '[auto]',
            bind: {'auto': 'auto'}
          })];
        }});
      Object.defineProperty(AutoViewportDirective, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(AutoViewportDirective.prototype, "auto").set, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Simple = (function() {
        var Simple = function Simple() {};
        return ($traceurRuntime.createClass)(Simple, {}, {});
      }());
      Object.defineProperty(Simple, "annotations", {get: function() {
          return [new Component({selector: 'simple'}), new Template({inline: 'SIMPLE(<content></content>)'})];
        }});
      MultipleContentTagsComponent = (function() {
        var MultipleContentTagsComponent = function MultipleContentTagsComponent() {};
        return ($traceurRuntime.createClass)(MultipleContentTagsComponent, {}, {});
      }());
      Object.defineProperty(MultipleContentTagsComponent, "annotations", {get: function() {
          return [new Component({selector: 'multiple-content-tags'}), new Template({inline: '(<content select=".left"></content>, <content></content>)'})];
        }});
      ConditionalContentComponent = (function() {
        var ConditionalContentComponent = function ConditionalContentComponent() {
          this.cond = false;
        };
        return ($traceurRuntime.createClass)(ConditionalContentComponent, {
          showLeft: function() {
            this.cond = true;
          },
          hideLeft: function() {
            this.cond = false;
          }
        }, {});
      }());
      Object.defineProperty(ConditionalContentComponent, "annotations", {get: function() {
          return [new Component({selector: 'conditional-content'}), new Template({
            inline: '<div>(<div *auto="cond"><content select=".left"></content></div>, <content></content>)</div>',
            directives: [AutoViewportDirective]
          })];
        }});
      OuterWithIndirectNestedComponent = (function() {
        var OuterWithIndirectNestedComponent = function OuterWithIndirectNestedComponent() {};
        return ($traceurRuntime.createClass)(OuterWithIndirectNestedComponent, {}, {});
      }());
      Object.defineProperty(OuterWithIndirectNestedComponent, "annotations", {get: function() {
          return [new Component({selector: 'outer-with-indirect-nested'}), new Template({
            inline: 'OUTER(<simple><div><content></content></div></simple>)',
            directives: [Simple]
          })];
        }});
      OuterComponent = (function() {
        var OuterComponent = function OuterComponent() {};
        return ($traceurRuntime.createClass)(OuterComponent, {}, {});
      }());
      Object.defineProperty(OuterComponent, "annotations", {get: function() {
          return [new Component({selector: 'outer'}), new Template({
            inline: 'OUTER(<inner><content></content></inner>)',
            directives: [InnerComponent]
          })];
        }});
      InnerComponent = (function() {
        var InnerComponent = function InnerComponent() {};
        return ($traceurRuntime.createClass)(InnerComponent, {}, {});
      }());
      Object.defineProperty(InnerComponent, "annotations", {get: function() {
          return [new Component({selector: 'inner'}), new Template({
            inline: 'INNER(<innerinner><content></content></innerinner>)',
            directives: [InnerInnerComponent]
          })];
        }});
      InnerInnerComponent = (function() {
        var InnerInnerComponent = function InnerInnerComponent() {};
        return ($traceurRuntime.createClass)(InnerInnerComponent, {}, {});
      }());
      Object.defineProperty(InnerInnerComponent, "annotations", {get: function() {
          return [new Component({selector: 'innerinner'}), new Template({inline: 'INNERINNER(<content select=".left"></content>,<content></content>)'})];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {};
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({selector: 'my-comp'}), new Template({directives: [MultipleContentTagsComponent, ManualViewportDirective, ConditionalContentComponent, OuterWithIndirectNestedComponent, OuterComponent]})];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/shadow_dom_emulation_integration_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/shadow_dom_emulation_integration_spec.js.map