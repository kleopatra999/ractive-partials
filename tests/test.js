requirejs([
  'ractive',
  'rapr!templates/view.mustache',
  'rapr!templates/normalPartial.mustache'
], function (Ractive, view, normalPartial) {

  var instance = new Ractive({
    template: function() { return view; },
    partials: {
      'normalPartial': normalPartial
    },
    data: {
      x: "Hello World?",
      y: "HELLO WORLD FROM AUTOMATICALLY RESOLVED PARTIAL",
      z: 'Some data from a partial from root dir'
    },
    el: '#container'
  });
  debugger;
});