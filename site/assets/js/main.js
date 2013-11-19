require.config({
  paths: {
    'jquery': 'lib/jquery-1.10.2.min',
    'jqdate' : 'lib/jquery.dateFormat-1.0'
  },
  shim: {
    'lib/underscore': {
      exports: '_'
    },
    'lib/backbone': {
      deps: ["lib/underscore", "jquery"],
      exports: 'Backbone'
    }
  }
});
var router, vent;
 
require(
  ["jquery",
    "lib/underscore",
    "lib/backbone",
    "app"
  ],
  function($, _, Backbone, Router) {
    $(function() {
     router = new Router();
    vent = _.extend({}, Backbone.Events);
      	Backbone.history.start({

	});
    });
  }
);