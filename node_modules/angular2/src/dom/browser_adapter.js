System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang", "./dom_adapter", "./generic_browser_adapter"], function($__export) {
  "use strict";
  var assert,
      List,
      MapWrapper,
      ListWrapper,
      isPresent,
      setRootDomAdapter,
      GenericBrowserDomAdapter,
      _attrToPropMap,
      BrowserDomAdapter;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      setRootDomAdapter = $__m.setRootDomAdapter;
    }, function($__m) {
      GenericBrowserDomAdapter = $__m.GenericBrowserDomAdapter;
    }],
    execute: function() {
      _attrToPropMap = {
        'innerHtml': 'innerHTML',
        'readonly': 'readOnly',
        'tabindex': 'tabIndex'
      };
      BrowserDomAdapter = $__export("BrowserDomAdapter", (function($__super) {
        var BrowserDomAdapter = function BrowserDomAdapter() {
          $traceurRuntime.superConstructor(BrowserDomAdapter).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(BrowserDomAdapter, {
          get attrToPropMap() {
            return _attrToPropMap;
          },
          query: function(selector) {
            assert.argumentTypes(selector, assert.type.string);
            return document.querySelector(selector);
          },
          querySelector: function(el, selector) {
            assert.argumentTypes(el, assert.type.any, selector, assert.type.string);
            return assert.returnType((el.querySelector(selector)), Node);
          },
          querySelectorAll: function(el, selector) {
            assert.argumentTypes(el, assert.type.any, selector, assert.type.string);
            return assert.returnType((el.querySelectorAll(selector)), NodeList);
          },
          on: function(el, evt, listener) {
            el.addEventListener(evt, listener, false);
          },
          dispatchEvent: function(el, evt) {
            el.dispatchEvent(evt);
          },
          createMouseEvent: function(eventType) {
            var evt = new MouseEvent(eventType);
            evt.initEvent(eventType, true, true);
            return evt;
          },
          createEvent: function(eventType) {
            return new Event(eventType, true);
          },
          getInnerHTML: function(el) {
            return el.innerHTML;
          },
          getOuterHTML: function(el) {
            return el.outerHTML;
          },
          nodeName: function(node) {
            assert.argumentTypes(node, Node);
            return assert.returnType((node.nodeName), assert.type.string);
          },
          nodeValue: function(node) {
            assert.argumentTypes(node, Node);
            return assert.returnType((node.nodeValue), assert.type.string);
          },
          type: function(node) {
            assert.argumentTypes(node, assert.type.string);
            return node.type;
          },
          content: function(node) {
            assert.argumentTypes(node, HTMLTemplateElement);
            return assert.returnType((node.content), Node);
          },
          firstChild: function(el) {
            return assert.returnType((el.firstChild), Node);
          },
          nextSibling: function(el) {
            return assert.returnType((el.nextSibling), Node);
          },
          parentElement: function(el) {
            return el.parentElement;
          },
          childNodes: function(el) {
            return assert.returnType((el.childNodes), NodeList);
          },
          childNodesAsList: function(el) {
            var childNodes = el.childNodes;
            var res = ListWrapper.createFixedSize(childNodes.length);
            for (var i = 0; i < childNodes.length; i++) {
              res[i] = childNodes[i];
            }
            return assert.returnType((res), List);
          },
          clearNodes: function(el) {
            for (var i = 0; i < el.childNodes.length; i++) {
              this.remove(el.childNodes[i]);
            }
          },
          appendChild: function(el, node) {
            el.appendChild(node);
          },
          removeChild: function(el, node) {
            el.removeChild(node);
          },
          remove: function(el) {
            var parent = el.parentNode;
            parent.removeChild(el);
            return el;
          },
          insertBefore: function(el, node) {
            el.parentNode.insertBefore(node, el);
          },
          insertAllBefore: function(el, nodes) {
            ListWrapper.forEach(nodes, (function(n) {
              el.parentNode.insertBefore(n, el);
            }));
          },
          insertAfter: function(el, node) {
            el.parentNode.insertBefore(node, el.nextSibling);
          },
          setInnerHTML: function(el, value) {
            el.innerHTML = value;
          },
          getText: function(el) {
            return el.textContent;
          },
          setText: function(el, value) {
            assert.argumentTypes(el, assert.type.any, value, assert.type.string);
            el.textContent = value;
          },
          getValue: function(el) {
            return el.value;
          },
          setValue: function(el, value) {
            assert.argumentTypes(el, assert.type.any, value, assert.type.string);
            el.value = value;
          },
          getChecked: function(el) {
            return el.checked;
          },
          setChecked: function(el, value) {
            assert.argumentTypes(el, assert.type.any, value, assert.type.boolean);
            el.checked = value;
          },
          createTemplate: function(html) {
            var t = document.createElement('template');
            t.innerHTML = html;
            return t;
          },
          createElement: function(tagName) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : document;
            return doc.createElement(tagName);
          },
          createTextNode: function(text) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : document;
            assert.argumentTypes(text, assert.type.string, doc, assert.type.any);
            return doc.createTextNode(text);
          },
          createScriptTag: function(attrName, attrValue) {
            var doc = arguments[2] !== (void 0) ? arguments[2] : document;
            assert.argumentTypes(attrName, assert.type.string, attrValue, assert.type.string, doc, assert.type.any);
            var el = doc.createElement('SCRIPT');
            el.setAttribute(attrName, attrValue);
            return el;
          },
          createStyleElement: function(css) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : document;
            assert.argumentTypes(css, assert.type.string, doc, assert.type.any);
            var style = doc.createElement('STYLE');
            style.innerText = css;
            return assert.returnType((style), HTMLStyleElement);
          },
          createShadowRoot: function(el) {
            assert.argumentTypes(el, HTMLElement);
            return assert.returnType((el.createShadowRoot()), ShadowRoot);
          },
          getShadowRoot: function(el) {
            assert.argumentTypes(el, HTMLElement);
            return assert.returnType((el.shadowRoot), ShadowRoot);
          },
          clone: function(node) {
            assert.argumentTypes(node, Node);
            return node.cloneNode(true);
          },
          hasProperty: function(element, name) {
            assert.argumentTypes(element, assert.type.any, name, assert.type.string);
            return name in element;
          },
          getElementsByClassName: function(element, name) {
            assert.argumentTypes(element, assert.type.any, name, assert.type.string);
            return element.getElementsByClassName(name);
          },
          getElementsByTagName: function(element, name) {
            assert.argumentTypes(element, assert.type.any, name, assert.type.string);
            return element.getElementsByTagName(name);
          },
          classList: function(element) {
            return assert.returnType((Array.prototype.slice.call(element.classList, 0)), List);
          },
          addClass: function(element, classname) {
            assert.argumentTypes(element, assert.type.any, classname, assert.type.string);
            element.classList.add(classname);
          },
          removeClass: function(element, classname) {
            assert.argumentTypes(element, assert.type.any, classname, assert.type.string);
            element.classList.remove(classname);
          },
          hasClass: function(element, classname) {
            assert.argumentTypes(element, assert.type.any, classname, assert.type.string);
            return element.classList.contains(classname);
          },
          setStyle: function(element, stylename, stylevalue) {
            assert.argumentTypes(element, assert.type.any, stylename, assert.type.string, stylevalue, assert.type.string);
            element.style[stylename] = stylevalue;
          },
          removeStyle: function(element, stylename) {
            assert.argumentTypes(element, assert.type.any, stylename, assert.type.string);
            element.style[stylename] = null;
          },
          getStyle: function(element, stylename) {
            assert.argumentTypes(element, assert.type.any, stylename, assert.type.string);
            return element.style[stylename];
          },
          tagName: function(element) {
            return assert.returnType((element.tagName), assert.type.string);
          },
          attributeMap: function(element) {
            var res = MapWrapper.create();
            var elAttrs = element.attributes;
            for (var i = 0; i < elAttrs.length; i++) {
              var attrib = elAttrs[i];
              MapWrapper.set(res, attrib.name, attrib.value);
            }
            return res;
          },
          getAttribute: function(element, attribute) {
            assert.argumentTypes(element, assert.type.any, attribute, assert.type.string);
            return element.getAttribute(attribute);
          },
          setAttribute: function(element, name, value) {
            assert.argumentTypes(element, assert.type.any, name, assert.type.string, value, assert.type.string);
            element.setAttribute(name, value);
          },
          removeAttribute: function(element, attribute) {
            assert.argumentTypes(element, assert.type.any, attribute, assert.type.string);
            return element.removeAttribute(attribute);
          },
          templateAwareRoot: function(el) {
            return el instanceof HTMLTemplateElement ? el.content : el;
          },
          createHtmlDocument: function() {
            return document.implementation.createHTMLDocument();
          },
          defaultDoc: function() {
            return document;
          },
          getTitle: function() {
            return document.title;
          },
          setTitle: function(newTitle) {
            assert.argumentTypes(newTitle, assert.type.string);
            document.title = newTitle;
          },
          elementMatches: function(n, selector) {
            assert.argumentTypes(n, assert.type.any, selector, assert.type.string);
            return assert.returnType((n instanceof HTMLElement && n.matches(selector)), assert.type.boolean);
          },
          isTemplateElement: function(el) {
            assert.argumentTypes(el, assert.type.any);
            return assert.returnType((el instanceof HTMLTemplateElement), assert.type.boolean);
          },
          isTextNode: function(node) {
            assert.argumentTypes(node, Node);
            return assert.returnType((node.nodeType === Node.TEXT_NODE), assert.type.boolean);
          },
          isCommentNode: function(node) {
            assert.argumentTypes(node, Node);
            return assert.returnType((node.nodeType === Node.COMMENT_NODE), assert.type.boolean);
          },
          isElementNode: function(node) {
            assert.argumentTypes(node, Node);
            return assert.returnType((node.nodeType === Node.ELEMENT_NODE), assert.type.boolean);
          },
          hasShadowRoot: function(node) {
            return assert.returnType((node instanceof HTMLElement && isPresent(node.shadowRoot)), assert.type.boolean);
          },
          importIntoDoc: function(node) {
            assert.argumentTypes(node, Node);
            var result = document.importNode(node, true);
            if (this.isTemplateElement(result) && !result.content.childNodes.length && node.content.childNodes.length) {
              var childNodes = node.content.childNodes;
              for (var i = 0; i < childNodes.length; ++i) {
                result.content.appendChild(this.importIntoDoc(childNodes[i]));
              }
            }
            return result;
          },
          isPageRule: function(rule) {
            return assert.returnType((rule.type === CSSRule.PAGE_RULE), assert.type.boolean);
          },
          isStyleRule: function(rule) {
            return assert.returnType((rule.type === CSSRule.STYLE_RULE), assert.type.boolean);
          },
          isMediaRule: function(rule) {
            return assert.returnType((rule.type === CSSRule.MEDIA_RULE), assert.type.boolean);
          },
          isKeyframesRule: function(rule) {
            return assert.returnType((rule.type === CSSRule.KEYFRAMES_RULE), assert.type.boolean);
          },
          getHref: function(el) {
            assert.argumentTypes(el, Element);
            return assert.returnType((el.href), assert.type.string);
          }
        }, {makeCurrent: function() {
            setRootDomAdapter(new BrowserDomAdapter());
          }}, $__super);
      }(GenericBrowserDomAdapter)));
      Object.defineProperty(BrowserDomAdapter.prototype.query, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.querySelector, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.querySelectorAll, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.nodeName, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.nodeValue, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.type, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.content, "parameters", {get: function() {
          return [[HTMLTemplateElement]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.setText, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.setValue, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.setChecked, "parameters", {get: function() {
          return [[], [assert.type.boolean]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.createTextNode, "parameters", {get: function() {
          return [[assert.type.string], []];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.createScriptTag, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], []];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.createStyleElement, "parameters", {get: function() {
          return [[assert.type.string], []];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.createShadowRoot, "parameters", {get: function() {
          return [[HTMLElement]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.getShadowRoot, "parameters", {get: function() {
          return [[HTMLElement]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.clone, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.hasProperty, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.getElementsByClassName, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.getElementsByTagName, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.addClass, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.removeClass, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.hasClass, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.setStyle, "parameters", {get: function() {
          return [[], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.removeStyle, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.getStyle, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.getAttribute, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.setAttribute, "parameters", {get: function() {
          return [[], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.removeAttribute, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.setTitle, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.elementMatches, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.isTemplateElement, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.isTextNode, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.isCommentNode, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.isElementNode, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.importIntoDoc, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(BrowserDomAdapter.prototype.getHref, "parameters", {get: function() {
          return [[Element]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/dom/browser_adapter.map

//# sourceMappingURL=../../../angular2/src/dom/browser_adapter.js.map