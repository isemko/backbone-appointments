require.config({
	paths : {
		'jquery' : 'lib/jquery-1.10.2.min',
		'jqdate' : 'lib/jquery.dateFormat-1.0',
		'polyfiller' : 'lib/polyfiller'//needs to be loaded after jquery even though it is used globally
	},
	shim : {
		'lib/underscore' : {
			exports : '_'
		},
		'lib/backbone' : {
			deps : ["lib/underscore", "jquery"],
			exports : 'Backbone'
		},
		"modernizr" : {
			deps : ["jquery"],
			exports : "modernizr"
		}
	}
});
var router, vent;

require(["jquery", "lib/underscore", "lib/backbone", "app", "lib/modernizr-custom", "lib/polyfiller"], function($, _, Backbone, Router, modernizr) {

	$(function() {
		$.webshims.debug = false;
		$.webshims.setOptions('forms forms-ext', {
			replaceUI : false,
			waitReady : false,
			debug: false
		});

		$.webshims.polyfill('forms forms-ext');

		router = new Router();
		vent = _.extend({}, Backbone.Events);
		$.expr.cacheLength = 1;

		Backbone.history.start({

		});
	});
});
