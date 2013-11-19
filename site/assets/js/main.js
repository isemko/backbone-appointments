
require.config({
  paths: {
    'jquery': 'lib/jquery-1.10.2.min',
    'jqdate' : 'lib/jquery.dateFormat-1.0',
    'modernizr': 'lib/modernizr-custom',
    'webshims' : 'lib/polyfiller'
  },
  shim: {
    'lib/underscore': {
      exports: '_'
    },
    'lib/backbone': {
      deps: ["lib/underscore", "jquery"],
      exports: 'Backbone'
    },
      "modernizr": {
      "exports": "modernizr"
  },
  "webshims":{
  	"exports" : "webshims"
  }
  }
});
var router, vent;

require(
  ["jquery",
    "lib/underscore",
    "lib/backbone",
    "app",
    "lib/modernizr-custom",
    "lib/polyfiller"
    
  ],
  function($, _, Backbone, Router,modernizr, webshims) {
    $(function() {
     router = new Router();
    vent = _.extend({}, Backbone.Events);
    $.webshims.setOptions('forms forms-ext', {
	replaceUI : false,
	waitReady : false
});
      	Backbone.history.start({

	});
    });
  }
);