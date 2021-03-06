require.config({
	paths : {
		jquery : 'lib/jquery-1.10.2.min',
		jqdate : 'lib/jquery.dateFormat-1.0'
		//'polyfiller' : 'lib/polyfiller'//needs to be loaded after jquery even though it is used globally
	},
	shim : {
		'lib/underscore' : {
			exports : '_'
		},
		'lib/backbone' : {
			deps : ["lib/underscore", "jquery"],
			exports : 'Backbone'
		}
			
	}
});
var router, vent;

require(["jquery", "lib/underscore", "lib/backbone", "app"], function($, _, Backbone, Router) {

	$(function() {
		$.webshims.debug = false;
		$.webshims.setOptions('forms forms-ext', {
			replaceUI : false,
			waitReady : false,
			debug: false,
			addValidators: true
		});

		$.webshims.polyfill('forms forms-ext');
		vent = _.extend({}, Backbone.Events);
		router = new Router();

		$.expr.cacheLength = 1;

		Backbone.history.start({

		});
	});
});
