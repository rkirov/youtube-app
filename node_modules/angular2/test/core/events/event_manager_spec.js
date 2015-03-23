System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/events/event_manager", "angular2/src/core/zone/vm_turn_zone", "angular2/src/facade/collection", "angular2/src/facade/browser", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var assert,
      describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      el,
      EventManager,
      EventManagerPlugin,
      DomEventsPlugin,
      VmTurnZone,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      document,
      DOM,
      FakeEventManagerPlugin,
      FakeVmTurnZone;
  function main() {
    var domEventPlugin;
    beforeEach((function() {
      domEventPlugin = new DomEventsPlugin();
    }));
    describe('EventManager', (function() {
      it('should delegate event bindings to plugins', (function() {
        var element = el('<div></div>');
        var handler = (function(e) {
          return e;
        });
        var plugin = new FakeEventManagerPlugin(['click']);
        var manager = new EventManager([plugin, domEventPlugin], new FakeVmTurnZone());
        manager.addEventListener(element, 'click', handler);
        expect(MapWrapper.get(plugin._nonBubbleEventHandlers, 'click')).toBe(handler);
      }));
      it('should delegate bubbling events to plugins', (function() {
        var element = el('<div></div>');
        var handler = (function(e) {
          return e;
        });
        var plugin = new FakeEventManagerPlugin(['click']);
        var manager = new EventManager([plugin, domEventPlugin], new FakeVmTurnZone());
        manager.addEventListener(element, '^click', handler);
        expect(MapWrapper.get(plugin._bubbleEventHandlers, 'click')).toBe(handler);
      }));
      it('should delegate event bindings to the first plugin supporting the event', (function() {
        var element = el('<div></div>');
        var clickHandler = (function(e) {
          return e;
        });
        var dblClickHandler = (function(e) {
          return e;
        });
        var plugin1 = new FakeEventManagerPlugin(['dblclick']);
        var plugin2 = new FakeEventManagerPlugin(['click', 'dblclick']);
        var manager = new EventManager([plugin1, plugin2], new FakeVmTurnZone());
        manager.addEventListener(element, 'click', clickHandler);
        manager.addEventListener(element, 'dblclick', dblClickHandler);
        expect(MapWrapper.contains(plugin1._nonBubbleEventHandlers, 'click')).toBe(false);
        expect(MapWrapper.get(plugin2._nonBubbleEventHandlers, 'click')).toBe(clickHandler);
        expect(MapWrapper.contains(plugin2._nonBubbleEventHandlers, 'dblclick')).toBe(false);
        expect(MapWrapper.get(plugin1._nonBubbleEventHandlers, 'dblclick')).toBe(dblClickHandler);
      }));
      it('should throw when no plugin can handle the event', (function() {
        var element = el('<div></div>');
        var plugin = new FakeEventManagerPlugin(['dblclick']);
        var manager = new EventManager([plugin], new FakeVmTurnZone());
        expect((function() {
          return manager.addEventListener(element, 'click', null);
        })).toThrowError('No event manager plugin found for event click');
      }));
      it('by default events are only caught on same element', (function() {
        var element = el('<div><div></div></div>');
        var child = DOM.firstChild(element);
        var dispatchedEvent = DOM.createMouseEvent('click');
        var receivedEvent = null;
        var handler = (function(e) {
          receivedEvent = e;
        });
        var manager = new EventManager([domEventPlugin], new FakeVmTurnZone());
        manager.addEventListener(element, 'click', handler);
        DOM.dispatchEvent(child, dispatchedEvent);
        expect(receivedEvent).toBe(null);
      }));
      it('bubbled events are caught when fired from a child', (function() {
        var element = el('<div><div></div></div>');
        DOM.appendChild(document.body, element);
        var child = DOM.firstChild(element);
        var dispatchedEvent = DOM.createMouseEvent('click');
        var receivedEvent = null;
        var handler = (function(e) {
          receivedEvent = e;
        });
        var manager = new EventManager([domEventPlugin], new FakeVmTurnZone());
        manager.addEventListener(element, '^click', handler);
        DOM.dispatchEvent(child, dispatchedEvent);
        expect(receivedEvent).toBe(dispatchedEvent);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      xdescribe = $__m.xdescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      el = $__m.el;
    }, function($__m) {
      EventManager = $__m.EventManager;
      EventManagerPlugin = $__m.EventManagerPlugin;
      DomEventsPlugin = $__m.DomEventsPlugin;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      document = $__m.document;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      FakeEventManagerPlugin = (function($__super) {
        var FakeEventManagerPlugin = function FakeEventManagerPlugin(supports) {
          assert.argumentTypes(supports, assert.genericType(List, assert.type.string));
          $traceurRuntime.superConstructor(FakeEventManagerPlugin).call(this);
          this._supports = supports;
          this._nonBubbleEventHandlers = MapWrapper.create();
          this._bubbleEventHandlers = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeEventManagerPlugin, {
          supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            return assert.returnType((ListWrapper.contains(this._supports, eventName)), assert.type.boolean);
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            assert.argumentTypes(element, assert.type.any, eventName, assert.type.string, handler, Function, shouldSupportBubble, assert.type.boolean);
            MapWrapper.set(shouldSupportBubble ? this._bubbleEventHandlers : this._nonBubbleEventHandlers, eventName, handler);
          }
        }, {}, $__super);
      }(EventManagerPlugin));
      Object.defineProperty(FakeEventManagerPlugin, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(FakeEventManagerPlugin.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeEventManagerPlugin.prototype.addEventListener, "parameters", {get: function() {
          return [[], [assert.type.string], [Function], [assert.type.boolean]];
        }});
      FakeVmTurnZone = (function($__super) {
        var FakeVmTurnZone = function FakeVmTurnZone() {
          $traceurRuntime.superConstructor(FakeVmTurnZone).call(this, {enableLongStackTrace: false});
        };
        return ($traceurRuntime.createClass)(FakeVmTurnZone, {
          run: function(fn) {
            fn();
          },
          runOutsideAngular: function(fn) {
            fn();
          }
        }, {}, $__super);
      }(VmTurnZone));
    }
  };
});

//# sourceMappingURL=angular2/test/core/events/event_manager_spec.map

//# sourceMappingURL=../../../../angular2/test/core/events/event_manager_spec.js.map