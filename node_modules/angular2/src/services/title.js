System.register(["rtts_assert/rtts_assert", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var assert,
      DOM,
      Title;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      Title = $__export("Title", (function() {
        var Title = function Title() {};
        return ($traceurRuntime.createClass)(Title, {
          getTitle: function() {
            return assert.returnType((DOM.getTitle()), assert.type.string);
          },
          setTitle: function(newTitle) {
            assert.argumentTypes(newTitle, assert.type.string);
            DOM.setTitle(newTitle);
          }
        }, {});
      }()));
      Object.defineProperty(Title.prototype.setTitle, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/services/title.map

//# sourceMappingURL=../../../angular2/src/services/title.js.map