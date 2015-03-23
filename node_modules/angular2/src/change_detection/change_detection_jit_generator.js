System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./abstract_change_detector", "./change_detection_util", "./proto_record"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      BaseException,
      Type,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      AbstractChangeDetector,
      ChangeDetectionUtil,
      ProtoRecord,
      RECORD_TYPE_SELF,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_LOCAL,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_PRIMITIVE_OP,
      RECORD_TYPE_KEYED_ACCESS,
      RECORD_TYPE_PIPE,
      RECORD_TYPE_INTERPOLATE,
      ABSTRACT_CHANGE_DETECTOR,
      UTIL,
      DISPATCHER_ACCESSOR,
      PIPE_REGISTRY_ACCESSOR,
      PROTOS_ACCESSOR,
      CONTEXT_ACCESSOR,
      CHANGE_LOCAL,
      CHANGES_LOCAL,
      LOCALS_ACCESSOR,
      TEMP_LOCAL,
      ChangeDetectorJITGenerator;
  function typeTemplate(type, cons, detectChanges, setContext) {
    assert.argumentTypes(type, assert.type.string, cons, assert.type.string, detectChanges, assert.type.string, setContext, assert.type.string);
    return assert.returnType((("\n" + cons + "\n" + detectChanges + "\n" + setContext + ";\n\nreturn function(dispatcher, pipeRegistry) {\n  return new " + type + "(dispatcher, pipeRegistry, protos);\n}\n")), assert.type.string);
  }
  function constructorTemplate(type, fieldsDefinitions) {
    assert.argumentTypes(type, assert.type.string, fieldsDefinitions, assert.type.string);
    return assert.returnType((("\nvar " + type + " = function " + type + "(dispatcher, pipeRegistry, protos) {\n" + ABSTRACT_CHANGE_DETECTOR + ".call(this);\n" + DISPATCHER_ACCESSOR + " = dispatcher;\n" + PIPE_REGISTRY_ACCESSOR + " = pipeRegistry;\n" + PROTOS_ACCESSOR + " = protos;\n" + fieldsDefinitions + "\n}\n\n" + type + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n")), assert.type.string);
  }
  function pipeOnDestroyTemplate(pipeNames) {
    return pipeNames.map((function(p) {
      return (p + ".onDestroy()");
    })).join("\n");
  }
  function hydrateTemplate(type, fieldsDefinitions, pipeOnDestroy) {
    assert.argumentTypes(type, assert.type.string, fieldsDefinitions, assert.type.string, pipeOnDestroy, assert.type.string);
    return assert.returnType((("\n" + type + ".prototype.hydrate = function(context, locals) {\n  " + CONTEXT_ACCESSOR + " = context;\n  " + LOCALS_ACCESSOR + " = locals;\n}\n" + type + ".prototype.dehydrate = function() {\n  " + pipeOnDestroy + "\n  " + fieldsDefinitions + "\n  " + LOCALS_ACCESSOR + " = null;\n}\n" + type + ".prototype.hydrated = function() {\n  return " + CONTEXT_ACCESSOR + " !== " + UTIL + ".unitialized();\n}\n")), assert.type.string);
  }
  function detectChangesTemplate(type, body) {
    assert.argumentTypes(type, assert.type.string, body, assert.type.string);
    return assert.returnType((("\n" + type + ".prototype.detectChangesInRecords = function(throwOnChange) {\n  " + body + "\n}\n")), assert.type.string);
  }
  function bodyTemplate(localDefinitions, changeDefinitions, records) {
    assert.argumentTypes(localDefinitions, assert.type.string, changeDefinitions, assert.type.string, records, assert.type.string);
    return assert.returnType((("\n" + localDefinitions + "\n" + changeDefinitions + "\nvar " + TEMP_LOCAL + ";\nvar " + CHANGE_LOCAL + ";\nvar " + CHANGES_LOCAL + " = null;\n\ncontext = " + CONTEXT_ACCESSOR + ";\n" + records + "\n")), assert.type.string);
  }
  function notifyTemplate(index) {
    assert.argumentTypes(index, assert.type.number);
    return assert.returnType((("\nif (" + CHANGES_LOCAL + " && " + CHANGES_LOCAL + ".length > 0) {\n  if(throwOnChange) " + UTIL + ".throwOnChange(" + PROTOS_ACCESSOR + "[" + index + "], " + CHANGES_LOCAL + "[0]);\n  " + DISPATCHER_ACCESSOR + ".onRecordChange(" + PROTOS_ACCESSOR + "[" + index + "].directiveMemento, " + CHANGES_LOCAL + ");\n  " + CHANGES_LOCAL + " = null;\n}\n")), assert.type.string);
  }
  function pipeCheckTemplate(context, pipe, pipeType, value, change, addRecord, notify) {
    assert.argumentTypes(context, assert.type.string, pipe, assert.type.string, pipeType, assert.type.string, value, assert.type.string, change, assert.type.string, addRecord, assert.type.string, notify, assert.type.string);
    return assert.returnType((("\nif (" + pipe + " === " + UTIL + ".unitialized()) {\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ");\n} else if (!" + pipe + ".supports(" + context + ")) {\n  " + pipe + ".onDestroy();\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ");\n}\n\n" + CHANGE_LOCAL + " = " + pipe + ".transform(" + context + ");\nif (! " + UTIL + ".noChangeMarker(" + CHANGE_LOCAL + ")) {\n  " + value + " = " + CHANGE_LOCAL + ";\n  " + change + " = true;\n  " + addRecord + "\n}\n" + notify + "\n")), assert.type.string);
  }
  function referenceCheckTemplate(assignment, newValue, oldValue, change, addRecord, notify) {
    return ("\n" + assignment + "\nif (" + newValue + " !== " + oldValue + " || (" + newValue + " !== " + newValue + ") && (" + oldValue + " !== " + oldValue + ")) {\n  " + change + " = true;\n  " + addRecord + "\n  " + oldValue + " = " + newValue + ";\n}\n" + notify + "\n");
  }
  function assignmentTemplate(field, value) {
    assert.argumentTypes(field, assert.type.string, value, assert.type.string);
    return (field + " = " + value + ";");
  }
  function localDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return ("var " + n + ";");
    })).join("\n")), assert.type.string);
  }
  function changeDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return ("var " + n + " = false;");
    })).join("\n")), assert.type.string);
  }
  function fieldDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return (n + " = " + UTIL + ".unitialized();");
    })).join("\n")), assert.type.string);
  }
  function ifChangedGuardTemplate(changeNames, body) {
    assert.argumentTypes(changeNames, List, body, assert.type.string);
    var cond = changeNames.join(" || ");
    return assert.returnType((("\nif (" + cond + ") {\n  " + body + "\n}\n")), assert.type.string);
  }
  function addSimpleChangeRecordTemplate(protoIndex, oldValue, newValue) {
    assert.argumentTypes(protoIndex, assert.type.number, oldValue, assert.type.string, newValue, assert.type.string);
    return (CHANGES_LOCAL + " = " + UTIL + ".addRecord(" + CHANGES_LOCAL + ",\n    " + UTIL + ".simpleChangeRecord(" + PROTOS_ACCESSOR + "[" + protoIndex + "].bindingMemento, " + oldValue + ", " + newValue + "));");
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      Type = $__m.Type;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      AbstractChangeDetector = $__m.AbstractChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
      RECORD_TYPE_SELF = $__m.RECORD_TYPE_SELF;
      RECORD_TYPE_PROPERTY = $__m.RECORD_TYPE_PROPERTY;
      RECORD_TYPE_LOCAL = $__m.RECORD_TYPE_LOCAL;
      RECORD_TYPE_INVOKE_METHOD = $__m.RECORD_TYPE_INVOKE_METHOD;
      RECORD_TYPE_CONST = $__m.RECORD_TYPE_CONST;
      RECORD_TYPE_INVOKE_CLOSURE = $__m.RECORD_TYPE_INVOKE_CLOSURE;
      RECORD_TYPE_PRIMITIVE_OP = $__m.RECORD_TYPE_PRIMITIVE_OP;
      RECORD_TYPE_KEYED_ACCESS = $__m.RECORD_TYPE_KEYED_ACCESS;
      RECORD_TYPE_PIPE = $__m.RECORD_TYPE_PIPE;
      RECORD_TYPE_INTERPOLATE = $__m.RECORD_TYPE_INTERPOLATE;
    }],
    execute: function() {
      ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
      UTIL = "ChangeDetectionUtil";
      DISPATCHER_ACCESSOR = "this.dispatcher";
      PIPE_REGISTRY_ACCESSOR = "this.pipeRegistry";
      PROTOS_ACCESSOR = "this.protos";
      CONTEXT_ACCESSOR = "this.context";
      CHANGE_LOCAL = "change";
      CHANGES_LOCAL = "changes";
      LOCALS_ACCESSOR = "this.locals";
      TEMP_LOCAL = "temp";
      Object.defineProperty(typeTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(constructorTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(pipeOnDestroyTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(hydrateTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(detectChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(bodyTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(notifyTemplate, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(pipeCheckTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(assignmentTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(localDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(changeDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(fieldDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(ifChangedGuardTemplate, "parameters", {get: function() {
          return [[List], [assert.type.string]];
        }});
      Object.defineProperty(addSimpleChangeRecordTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string]];
        }});
      ChangeDetectorJITGenerator = $__export("ChangeDetectorJITGenerator", (function() {
        var ChangeDetectorJITGenerator = function ChangeDetectorJITGenerator(typeName, records) {
          assert.argumentTypes(typeName, assert.type.string, records, assert.genericType(List, ProtoRecord));
          this.typeName = typeName;
          this.records = records;
          this.localNames = this.getLocalNames(records);
          this.changeNames = this.getChangeNames(this.localNames);
          this.fieldNames = this.getFieldNames(this.localNames);
          this.pipeNames = this.getPipeNames(this.localNames);
        };
        return ($traceurRuntime.createClass)(ChangeDetectorJITGenerator, {
          getLocalNames: function(records) {
            assert.argumentTypes(records, assert.genericType(List, ProtoRecord));
            var index = 0;
            var names = records.map((function(r) {
              var sanitizedName = r.name.replace(new RegExp("\\W", "g"), '');
              return ("" + sanitizedName + index++);
            }));
            return assert.returnType((["context"].concat(names)), assert.genericType(List, String));
          },
          getChangeNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("change_" + n);
            }))), assert.genericType(List, String));
          },
          getFieldNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("this." + n);
            }))), assert.genericType(List, String));
          },
          getPipeNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("this." + n + "_pipe");
            }))), assert.genericType(List, String));
          },
          generate: function() {
            var text = typeTemplate(this.typeName, this.genConstructor(), this.genDetectChanges(), this.genHydrate());
            return assert.returnType((new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'protos', text)(AbstractChangeDetector, ChangeDetectionUtil, this.records)), Function);
          },
          genConstructor: function() {
            return assert.returnType((constructorTemplate(this.typeName, this.genFieldDefinitions())), assert.type.string);
          },
          genHydrate: function() {
            return assert.returnType((hydrateTemplate(this.typeName, this.genFieldDefinitions(), pipeOnDestroyTemplate(this.getnonNullPipeNames()))), assert.type.string);
          },
          genFieldDefinitions: function() {
            var fields = [];
            fields = fields.concat(this.fieldNames);
            fields = fields.concat(this.getnonNullPipeNames());
            return fieldDefinitionsTemplate(fields);
          },
          getnonNullPipeNames: function() {
            var $__0 = this;
            var pipes = [];
            this.records.forEach((function(r) {
              if (r.mode === RECORD_TYPE_PIPE) {
                pipes.push($__0.pipeNames[r.selfIndex]);
              }
            }));
            return assert.returnType((pipes), assert.genericType(List, String));
          },
          genDetectChanges: function() {
            var body = this.genBody();
            return assert.returnType((detectChangesTemplate(this.typeName, body)), assert.type.string);
          },
          genBody: function() {
            var $__0 = this;
            var rec = this.records.map((function(r) {
              return $__0.genRecord(r);
            })).join("\n");
            return assert.returnType((bodyTemplate(this.genLocalDefinitions(), this.genChangeDefinitions(), rec)), assert.type.string);
          },
          genLocalDefinitions: function() {
            return assert.returnType((localDefinitionsTemplate(this.localNames)), assert.type.string);
          },
          genChangeDefinitions: function() {
            return assert.returnType((changeDefinitionsTemplate(this.changeNames)), assert.type.string);
          },
          genRecord: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            if (r.mode === RECORD_TYPE_PIPE) {
              return assert.returnType((this.genPipeCheck(r)), assert.type.string);
            } else {
              return assert.returnType((this.genReferenceCheck(r)), assert.type.string);
            }
          },
          genPipeCheck: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var context = this.localNames[r.contextIndex];
            var pipe = this.pipeNames[r.selfIndex];
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var addRecord = addSimpleChangeRecordTemplate(r.selfIndex - 1, oldValue, newValue);
            var notify = this.genNotify(r);
            return assert.returnType((pipeCheckTemplate(context, pipe, r.name, newValue, change, addRecord, notify)), assert.type.string);
          },
          genReferenceCheck: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var assignment = this.genUpdateCurrentValue(r);
            var addRecord = addSimpleChangeRecordTemplate(r.selfIndex - 1, oldValue, newValue);
            var notify = this.genNotify(r);
            var check = referenceCheckTemplate(assignment, newValue, oldValue, change, r.lastInBinding ? addRecord : '', notify);
            ;
            if (r.isPureFunction()) {
              return assert.returnType((this.ifChangedGuard(r, check)), assert.type.string);
            } else {
              return assert.returnType((check), assert.type.string);
            }
          },
          genUpdateCurrentValue: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var context = this.localNames[r.contextIndex];
            var newValue = this.localNames[r.selfIndex];
            var args = this.genArgs(r);
            switch (r.mode) {
              case RECORD_TYPE_SELF:
                return assert.returnType((assignmentTemplate(newValue, context)), assert.type.string);
              case RECORD_TYPE_CONST:
                return assert.returnType(((newValue + " = " + this.genLiteral(r.funcOrValue))), assert.type.string);
              case RECORD_TYPE_PROPERTY:
                return assert.returnType((assignmentTemplate(newValue, (context + "." + r.name))), assert.type.string);
              case RECORD_TYPE_LOCAL:
                return assert.returnType((assignmentTemplate(newValue, (LOCALS_ACCESSOR + ".get('" + r.name + "')"))), assert.type.string);
              case RECORD_TYPE_INVOKE_METHOD:
                return assert.returnType((assignmentTemplate(newValue, (context + "." + r.name + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_INVOKE_CLOSURE:
                return assert.returnType((assignmentTemplate(newValue, (context + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_PRIMITIVE_OP:
                return assert.returnType((assignmentTemplate(newValue, (UTIL + "." + r.name + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_INTERPOLATE:
                return assert.returnType((assignmentTemplate(newValue, this.genInterpolation(r))), assert.type.string);
              case RECORD_TYPE_KEYED_ACCESS:
                var key = this.localNames[r.args[0]];
                return assert.returnType((assignmentTemplate(newValue, (context + "[" + key + "]"))), assert.type.string);
              default:
                throw new BaseException(("Unknown operation " + r.mode));
            }
          },
          ifChangedGuard: function(r, body) {
            var $__0 = this;
            return assert.returnType((ifChangedGuardTemplate(r.args.map((function(a) {
              return $__0.changeNames[a];
            })), body)), assert.type.string);
          },
          genInterpolation: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var res = "";
            for (var i = 0; i < r.args.length; ++i) {
              res += this.genLiteral(r.fixedArgs[i]);
              res += " + ";
              res += this.localNames[r.args[i]];
              res += " + ";
            }
            res += this.genLiteral(r.fixedArgs[r.args.length]);
            return assert.returnType((res), assert.type.string);
          },
          genLiteral: function(value) {
            return assert.returnType((JSON.stringify(value)), assert.type.string);
          },
          genNotify: function(r) {
            return assert.returnType((r.lastInDirective ? notifyTemplate(r.selfIndex - 1) : ''), assert.type.string);
          },
          genArgs: function(r) {
            var $__0 = this;
            return assert.returnType((r.args.map((function(arg) {
              return $__0.localNames[arg];
            })).join(", ")), assert.type.string);
          }
        }, {});
      }()));
      Object.defineProperty(ChangeDetectorJITGenerator, "parameters", {get: function() {
          return [[assert.type.string], [assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getLocalNames, "parameters", {get: function() {
          return [[assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getChangeNames, "parameters", {get: function() {
          return [[assert.genericType(List, String)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getFieldNames, "parameters", {get: function() {
          return [[assert.genericType(List, String)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getPipeNames, "parameters", {get: function() {
          return [[assert.genericType(List, String)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genRecord, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genPipeCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genReferenceCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genUpdateCurrentValue, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.ifChangedGuard, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.string]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genInterpolation, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genArgs, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/change_detection_jit_generator.map

//# sourceMappingURL=../../../angular2/src/change_detection/change_detection_jit_generator.js.map