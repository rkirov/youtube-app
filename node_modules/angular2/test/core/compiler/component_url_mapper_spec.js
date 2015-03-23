System.register(["angular2/test_lib", "angular2/src/core/compiler/component_url_mapper"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      ComponentUrlMapper,
      RuntimeComponentUrlMapper,
      SomeComponent;
  function main() {
    describe('RuntimeComponentUrlMapper', (function() {
      it('should return the registered URL', (function() {
        var url = 'http://path/to/component';
        var mapper = new RuntimeComponentUrlMapper();
        mapper.setComponentUrl(SomeComponent, url);
        expect(mapper.getUrl(SomeComponent)).toEqual(url);
      }));
      it('should fallback to ComponentUrlMapper', (function() {
        var mapper = new ComponentUrlMapper();
        var runtimeMapper = new RuntimeComponentUrlMapper();
        expect(runtimeMapper.getUrl(SomeComponent)).toEqual(mapper.getUrl(SomeComponent));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
      RuntimeComponentUrlMapper = $__m.RuntimeComponentUrlMapper;
    }],
    execute: function() {
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/component_url_mapper_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/component_url_mapper_spec.js.map