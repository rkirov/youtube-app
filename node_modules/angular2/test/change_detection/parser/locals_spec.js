System.register(["angular2/test_lib", "angular2/src/change_detection/parser/locals", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      xit,
      iit,
      expect,
      beforeEach,
      Locals,
      MapWrapper;
  function main() {
    describe('Locals', (function() {
      var locals;
      beforeEach((function() {
        locals = new Locals(null, MapWrapper.createFromPairs([['key', 'value'], ['nullKey', null]]));
      }));
      it('should support getting values', (function() {
        expect(locals.get('key')).toBe('value');
        expect((function() {
          return locals.get('notPresent');
        })).toThrowError(new RegExp("Cannot find"));
      }));
      it('should support checking if key is present', (function() {
        expect(locals.contains('key')).toBe(true);
        expect(locals.contains('nullKey')).toBe(true);
        expect(locals.contains('notPresent')).toBe(false);
      }));
      it('should support setting keys', (function() {
        locals.set('key', 'bar');
        expect(locals.get('key')).toBe('bar');
      }));
      it('should not support setting keys that are not present already', (function() {
        expect((function() {
          return locals.set('notPresent', 'bar');
        })).toThrowError();
      }));
      it('should clearValues', (function() {
        locals.clearValues();
        expect(locals.get('key')).toBe(null);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      xit = $__m.xit;
      iit = $__m.iit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      Locals = $__m.Locals;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/change_detection/parser/locals_spec.map

//# sourceMappingURL=../../../../angular2/test/change_detection/parser/locals_spec.js.map