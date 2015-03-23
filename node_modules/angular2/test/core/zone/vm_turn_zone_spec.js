System.register(["angular2/test_lib", "angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/core/zone/vm_turn_zone"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      expect,
      iit,
      inject,
      it,
      xdescribe,
      xit,
      Log,
      once,
      PromiseWrapper,
      BaseException,
      VmTurnZone;
  function main() {
    describe("VmTurnZone", (function() {
      var log,
          zone;
      beforeEach((function() {
        log = new Log();
        zone = new VmTurnZone({enableLongStackTrace: true});
        zone.initCallbacks({
          onTurnStart: log.fn('onTurnStart'),
          onTurnDone: log.fn('onTurnDone')
        });
      }));
      describe("run", (function() {
        it('should call onTurnStart and onTurnDone', (function() {
          zone.run(log.fn('run'));
          expect(log.result()).toEqual('onTurnStart; run; onTurnDone');
        }));
        it('should return the body return value from run', (function() {
          expect(zone.run((function() {
            return 6;
          }))).toEqual(6);
        }));
        it('should not run onTurnStart and onTurnDone for nested Zone.run', (function() {
          zone.run((function() {
            zone.run(log.fn('run'));
          }));
          expect(log.result()).toEqual('onTurnStart; run; onTurnDone');
        }));
        it('should call onTurnStart and onTurnDone before and after each top-level run', (function() {
          zone.run(log.fn('run1'));
          zone.run(log.fn('run2'));
          expect(log.result()).toEqual('onTurnStart; run1; onTurnDone; onTurnStart; run2; onTurnDone');
        }));
        it('should call onTurnStart and onTurnDone before and after each turn', inject([AsyncTestCompleter], (function(async) {
          var a = PromiseWrapper.completer();
          var b = PromiseWrapper.completer();
          zone.run((function() {
            log.add('run start');
            a.promise.then((function(_) {
              return log.add('a then');
            }));
            b.promise.then((function(_) {
              return log.add('b then');
            }));
          }));
          a.resolve("a");
          b.resolve("b");
          PromiseWrapper.all([a.promise, b.promise]).then((function(_) {
            expect(log.result()).toEqual('onTurnStart; run start; onTurnDone; onTurnStart; a then; onTurnDone; onTurnStart; b then; onTurnDone');
            async.done();
          }));
        })));
      }));
      describe("runOutsideAngular", (function() {
        it("should run a function outside of the angular zone", (function() {
          zone.runOutsideAngular(log.fn('run'));
          expect(log.result()).toEqual('run');
        }));
      }));
      describe("exceptions", (function() {
        var trace,
            exception,
            saveStackTrace;
        beforeEach((function() {
          trace = null;
          exception = null;
          saveStackTrace = (function(e, t) {
            exception = e;
            trace = t;
          });
        }));
        it('should call the on error callback when it is defined', (function() {
          zone.initCallbacks({onErrorHandler: saveStackTrace});
          zone.run((function() {
            throw new BaseException('aaa');
          }));
          expect(exception).toBeDefined();
        }));
        it('should rethrow exceptions from the body when no callback defined', (function() {
          expect((function() {
            zone.run((function() {
              throw new BaseException('bbb');
            }));
          })).toThrowError('bbb');
        }));
        it('should produce long stack traces', inject([AsyncTestCompleter], (function(async) {
          zone.initCallbacks({onErrorHandler: saveStackTrace});
          var c = PromiseWrapper.completer();
          zone.run(function() {
            PromiseWrapper.setTimeout(function() {
              PromiseWrapper.setTimeout(function() {
                c.resolve(null);
                throw new BaseException('ccc');
              }, 0);
            }, 0);
          });
          c.promise.then((function(_) {
            expect(trace.length).toBeGreaterThan(1);
            async.done();
          }));
        })));
        it('should produce long stack traces (when using promises)', inject([AsyncTestCompleter], (function(async) {
          zone.initCallbacks({onErrorHandler: saveStackTrace});
          var c = PromiseWrapper.completer();
          zone.run(function() {
            PromiseWrapper.resolve(null).then((function(_) {
              return PromiseWrapper.resolve(null).then((function(__) {
                c.resolve(null);
                throw new BaseException("ddd");
              }));
            }));
          });
          c.promise.then((function(_) {
            expect(trace.length).toBeGreaterThan(1);
            async.done();
          }));
        })));
        it('should disable long stack traces', inject([AsyncTestCompleter], (function(async) {
          var zone = new VmTurnZone({enableLongStackTrace: false});
          zone.initCallbacks({onErrorHandler: saveStackTrace});
          var c = PromiseWrapper.completer();
          zone.run(function() {
            PromiseWrapper.setTimeout(function() {
              PromiseWrapper.setTimeout(function() {
                c.resolve(null);
                throw new BaseException('ccc');
              }, 0);
            }, 0);
          });
          c.promise.then((function(_) {
            expect(trace.length).toEqual(1);
            async.done();
          }));
        })));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xdescribe = $__m.xdescribe;
      xit = $__m.xit;
      Log = $__m.Log;
      once = $__m.once;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      BaseException = $__m.BaseException;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/core/zone/vm_turn_zone_spec.map

//# sourceMappingURL=../../../../angular2/test/core/zone/vm_turn_zone_spec.js.map