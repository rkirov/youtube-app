System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      StringWrapper,
      RegExpWrapper,
      DASH_CASE_REGEXP,
      CAMEL_CASE_REGEXP;
  function dashCaseToCamelCase(input) {
    assert.argumentTypes(input, assert.type.string);
    return StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, (function(m) {
      return m[1].toUpperCase();
    }));
  }
  function camelCaseToDashCase(input) {
    assert.argumentTypes(input, assert.type.string);
    return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (function(m) {
      return '-' + m[1].toLowerCase();
    }));
  }
  $__export("dashCaseToCamelCase", dashCaseToCamelCase);
  $__export("camelCaseToDashCase", camelCaseToDashCase);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
    }],
    execute: function() {
      DASH_CASE_REGEXP = RegExpWrapper.create('-([a-z])');
      CAMEL_CASE_REGEXP = RegExpWrapper.create('([A-Z])');
      Object.defineProperty(dashCaseToCamelCase, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(camelCaseToDashCase, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/util.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/util.js.map