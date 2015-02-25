function googleClientReady() {
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
      Zone.patchPrototype(promise.__proto__, [
        'then',
        'catch'
      ]);
      gapi.client.load = delegate; // Remove the Promise patch;
      return promise;
    }
  })(gapi.client.load);
}
