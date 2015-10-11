function googleClientReady() {

  // Zone.js no longer exposes those two utils. Copy-pasta.
  var patchPrototype = function (obj, fnNames) {
    fnNames.forEach(function (name) {
      var delegate = obj[name];
      if (delegate) {
        obj[name] = function () {
          return delegate.apply(this, bindArguments(arguments));
        };
      }
    });
  };

  var bindArguments = function (args) {
    for (var i = args.length - 1; i >= 0; i--) {
      if (typeof args[i] === 'function') {
        args[i] = zone.bind(args[i]);
      }
    }
    return args;
  };

  /**
   * This patches the Promise library of the GoogleClient. If it would be using native promises 
   * this would not be necessary.
   * 
   * The issue is that the GoogleClientPromise gets triggerd from a callback which was registered before
   * angular bootstraped and hence all `then`s execute in the wrong zone. If GoogleClient would use
   * native Promise, this would not be a problem, but it does not, hence we patch the GoogleClientPromise
   * to behave the same as native Promise.
   */
  gapi.client.load = (function(delegate) {
    return function(name, ver) {
      var promise = delegate.call(this, name, ver);
      patchPrototype(promise.__proto__, [
        'then',
        'catch'
      ]);
      gapi.client.load = delegate; // Remove the Promise patch;
      return promise;
    }
  })(gapi.client.load);


}
