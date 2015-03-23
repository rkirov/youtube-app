System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/core/compiler/shadow_dom_emulation/content_tag", "angular2/src/core/compiler/shadow_dom_emulation/light_dom", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_container"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      SpyObject,
      el,
      proxy,
      IMPLEMENTS,
      isBlank,
      isPresent,
      ListWrapper,
      MapWrapper,
      DOM,
      Content,
      LightDom,
      View,
      ViewContainer,
      FakeView,
      FakeViewContainer,
      FakeContentTag;
  function main() {
    describe('LightDom', function() {
      var lightDomView;
      beforeEach((function() {
        lightDomView = new FakeView();
      }));
      describe("contentTags", (function() {
        it("should collect content tags from element injectors", (function() {
          var tag = new FakeContentTag(el('<script></script>'));
          var shadowDomView = new FakeView([tag]);
          var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
          expect(lightDom.contentTags()).toEqual([tag]);
        }));
        it("should collect content tags from ViewContainers", (function() {
          var tag = new FakeContentTag(el('<script></script>'));
          var vc = new FakeViewContainer(null, null, [new FakeView([tag])]);
          var shadowDomView = new FakeView([vc]);
          var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
          expect(lightDom.contentTags()).toEqual([tag]);
        }));
      }));
      describe("expandedDomNodes", (function() {
        it("should contain root nodes", (function() {
          var lightDomEl = el("<div><a></a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
        it("should include view container nodes", (function() {
          var lightDomEl = el("<div><template></template></div>");
          var lightDom = new LightDom(new FakeView([new FakeViewContainer(DOM.firstChild(lightDomEl), [el('<a></a>')])]), null, lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
        it("should include content nodes", (function() {
          var lightDomEl = el("<div><content></content></div>");
          var lightDom = new LightDom(new FakeView([new FakeContentTag(DOM.firstChild(lightDomEl), '', [el('<a></a>')])]), null, lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
        it("should work when the element injector array contains nulls", (function() {
          var lightDomEl = el("<div><a></a></div>");
          var lightDomView = new FakeView();
          var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
      }));
      describe("redistribute", (function() {
        it("should redistribute nodes between content tags with select property set", (function() {
          var contentA = new FakeContentTag(null, "a");
          var contentB = new FakeContentTag(null, "b");
          var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView([contentA, contentB]), lightDomEl);
          lightDom.redistribute();
          expect(toHtml(contentA.nodes())).toEqual(["<a>1</a>", "<a>3</a>"]);
          expect(toHtml(contentB.nodes())).toEqual(["<b>2</b>"]);
        }));
        it("should support wildcard content tags", (function() {
          var wildcard = new FakeContentTag(null, '');
          var contentB = new FakeContentTag(null, "b");
          var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView([wildcard, contentB]), lightDomEl);
          lightDom.redistribute();
          expect(toHtml(wildcard.nodes())).toEqual(["<a>1</a>", "<b>2</b>", "<a>3</a>"]);
          expect(toHtml(contentB.nodes())).toEqual([]);
        }));
      }));
    });
  }
  function toHtml(nodes) {
    if (isBlank(nodes))
      return [];
    return ListWrapper.map(nodes, DOM.getOuterHTML);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      SpyObject = $__m.SpyObject;
      el = $__m.el;
      proxy = $__m.proxy;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Content = $__m.Content;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }],
    execute: function() {
      FakeView = (function() {
        var FakeView = function FakeView() {
          var containers = arguments[0] !== (void 0) ? arguments[0] : null;
          var $__0 = this;
          this.contentTags = [];
          this.viewContainers = [];
          if (isPresent(containers)) {
            ListWrapper.forEach(containers, (function(c) {
              if (c instanceof FakeContentTag) {
                ListWrapper.push($__0.contentTags, c);
              } else {
                ListWrapper.push($__0.contentTags, null);
              }
              if (c instanceof FakeViewContainer) {
                ListWrapper.push($__0.viewContainers, c);
              } else {
                ListWrapper.push($__0.viewContainers, null);
              }
            }));
          }
        };
        return ($traceurRuntime.createClass)(FakeView, {noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeView.prototype, "noSuchMethod").call(this, i);
          }}, {});
      }());
      Object.defineProperty(FakeView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(View)];
        }});
      FakeViewContainer = (function() {
        var FakeViewContainer = function FakeViewContainer(templateEl) {
          var nodes = arguments[1] !== (void 0) ? arguments[1] : null;
          var views = arguments[2] !== (void 0) ? arguments[2] : null;
          this.templateElement = templateEl;
          this._nodes = nodes;
          this._contentTagContainers = views;
        };
        return ($traceurRuntime.createClass)(FakeViewContainer, {
          nodes: function() {
            return this._nodes;
          },
          contentTagContainers: function() {
            return this._contentTagContainers;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeViewContainer.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeViewContainer, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ViewContainer)];
        }});
      FakeContentTag = (function() {
        var FakeContentTag = function FakeContentTag(contentEl) {
          var select = arguments[1] !== (void 0) ? arguments[1] : '';
          var nodes = arguments[2] !== (void 0) ? arguments[2] : null;
          this.contentStartElement = contentEl;
          this.select = select;
          this._nodes = nodes;
        };
        return ($traceurRuntime.createClass)(FakeContentTag, {
          insert: function(nodes) {
            this._nodes = ListWrapper.clone(nodes);
          },
          nodes: function() {
            return this._nodes;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeContentTag.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeContentTag, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(Content)];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/light_dom_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/light_dom_spec.js.map