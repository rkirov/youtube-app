System.register(["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/core/dom/element", "./view", "./element_injector", "./shadow_dom_strategy", "angular2/src/core/events/event_manager", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      Directive,
      NgElement,
      viewModule,
      eiModule,
      ShadowDomStrategy,
      EventManager,
      ListWrapper,
      Type,
      PrivateComponentLocation;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      eiModule = $__m;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      EventManager = $__m.EventManager;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Type = $__m.Type;
    }],
    execute: function() {
      PrivateComponentLocation = $__export("PrivateComponentLocation", (function() {
        var PrivateComponentLocation = function PrivateComponentLocation(elementInjector, elt, view) {
          assert.argumentTypes(elementInjector, eiModule.ElementInjector, elt, NgElement, view, viewModule.View);
          this._elementInjector = elementInjector;
          this._elt = elt;
          this._view = view;
        };
        return ($traceurRuntime.createClass)(PrivateComponentLocation, {createComponent: function(type, annotation, componentProtoView, eventManager, shadowDomStrategy) {
            assert.argumentTypes(type, Type, annotation, Directive, componentProtoView, viewModule.ProtoView, eventManager, EventManager, shadowDomStrategy, ShadowDomStrategy);
            var context = this._elementInjector.createPrivateComponent(type, annotation);
            var view = componentProtoView.instantiate(this._elementInjector, eventManager);
            view.hydrate(this._elementInjector.getShadowDomAppInjector(), this._elementInjector, null, context, null);
            shadowDomStrategy.attachTemplate(this._elt.domElement, view);
            ListWrapper.push(this._view.componentChildViews, view);
            this._view.changeDetector.addChild(view.changeDetector);
          }}, {});
      }()));
      Object.defineProperty(PrivateComponentLocation, "parameters", {get: function() {
          return [[eiModule.ElementInjector], [NgElement], [viewModule.View]];
        }});
      Object.defineProperty(PrivateComponentLocation.prototype.createComponent, "parameters", {get: function() {
          return [[Type], [Directive], [viewModule.ProtoView], [EventManager], [ShadowDomStrategy]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/private_component_location.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/private_component_location.js.map