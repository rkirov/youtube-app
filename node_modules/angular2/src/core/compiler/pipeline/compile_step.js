System.register(["rtts_assert/rtts_assert", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var assert,
      CompileElement,
      ccModule,
      CompileStep;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      ccModule = $__m;
    }],
    execute: function() {
      CompileStep = $__export("CompileStep", (function() {
        var CompileStep = function CompileStep() {};
        return ($traceurRuntime.createClass)(CompileStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, ccModule.CompileControl);
          }}, {});
      }()));
      Object.defineProperty(CompileStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [ccModule.CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/compile_step.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/compile_step.js.map