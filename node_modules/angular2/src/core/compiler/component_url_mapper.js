System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      Type,
      isPresent,
      Map,
      MapWrapper,
      ComponentUrlMapper,
      RuntimeComponentUrlMapper;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
      ComponentUrlMapper = $__export("ComponentUrlMapper", (function() {
        var ComponentUrlMapper = function ComponentUrlMapper() {};
        return ($traceurRuntime.createClass)(ComponentUrlMapper, {getUrl: function(component) {
            assert.argumentTypes(component, Type);
            return assert.returnType(('./'), assert.type.string);
          }}, {});
      }()));
      Object.defineProperty(ComponentUrlMapper, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(ComponentUrlMapper.prototype.getUrl, "parameters", {get: function() {
          return [[Type]];
        }});
      RuntimeComponentUrlMapper = $__export("RuntimeComponentUrlMapper", (function($__super) {
        var RuntimeComponentUrlMapper = function RuntimeComponentUrlMapper() {
          $traceurRuntime.superConstructor(RuntimeComponentUrlMapper).call(this);
          this._componentUrls = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(RuntimeComponentUrlMapper, {
          setComponentUrl: function(component, url) {
            assert.argumentTypes(component, Type, url, assert.type.string);
            MapWrapper.set(this._componentUrls, component, url);
          },
          getUrl: function(component) {
            assert.argumentTypes(component, Type);
            var url = MapWrapper.get(this._componentUrls, component);
            if (isPresent(url))
              return assert.returnType((url), assert.type.string);
            return assert.returnType(($traceurRuntime.superGet(this, RuntimeComponentUrlMapper.prototype, "getUrl").call(this, component)), assert.type.string);
          }
        }, {}, $__super);
      }(ComponentUrlMapper)));
      Object.defineProperty(RuntimeComponentUrlMapper.prototype.setComponentUrl, "parameters", {get: function() {
          return [[Type], [assert.type.string]];
        }});
      Object.defineProperty(RuntimeComponentUrlMapper.prototype.getUrl, "parameters", {get: function() {
          return [[Type]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/component_url_mapper.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/component_url_mapper.js.map