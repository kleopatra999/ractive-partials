define(['exports', 'ractive'], function (exports, _ractive) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.load = load;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ractive = _interopRequireDefault(_ractive);

  // Finds all '{{> partialName }}' in the template
  var findPartial = /{{>\s?([^\s]+)\s?}}/gi;

  function load(moduleName, require, done) {
    var requireMod = [];
    requireMod.push('text!' + moduleName);
    // TODO: Why was [`text!${moduleName}`] not producing an array? (babel is suspect)
    require(requireMod, function (text) {

      var toGet = [];

      var repartial = text.replace(findPartial, function (match, partial) {
        // replace slash with $
        var safePartialKey = partial.replace(/\/|\./g, '$');

        // remember to grab partial
        if (~partial.indexOf('/')) {
          toGet.push({
            safeKey: safePartialKey,
            path: partial
          });
        }

        return '{{> ' + safePartialKey + ' }}';
      });

      var compiled = _Ractive['default'].parse(repartial);
      if (toGet.length) {
        require(toGet.map(function (partial) {
          return 'text!' + partial.path;
        }), function () {
          for (var _len = arguments.length, parsed = Array(_len), _key = 0; _key < _len; _key++) {
            parsed[_key] = arguments[_key];
          }

          toGet.forEach(function (partial, i) {
            _Ractive['default'].partials[partial.safeKey] = _Ractive['default'].parse(parsed[i]);
            console.log(partial);
          });
          done(compiled);
        });
      } else {
        done(compiled);
      }
    });
  }
});

