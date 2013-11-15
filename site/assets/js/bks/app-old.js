var Model = Backbone.Model.extend({
	defaults:{
		id:'',
		user: ''
		
	}
	
});
var Collection = Backbone.Collection.extend({
	model: Model
})
var HomeView = Backbone.View.extend({
	tagName: "div",
	id: "home-view",
	initialize: function() {
		$("body").html(this.el);
		this.render();
	},
	render: function() {
		this.$el.html("<h1>This is the home page</h1><a href='#users'>Go to users</a>");
	}
});



var UserView = Backbone.View.extend({
	tagName: "li",
	initialize: function(e) {

		_.bindAll(this, "alertName");
		this.render();
	},
	events: {
		"click" : "alertName"
	},
	render: function() {
		this.$el.html("Hi, my name is " + this.model.id);
	},
	alertName: function() { alert(this.model.id); }
});
var UsersView = Backbone.View.extend({
	tagName: "ul",
	id: "users-list",
	initialize: function(e) {

		$("body").html(this.el);
		this.subViews = _.map(["Jules", "Vincent", "Marsellus"], function(user) { 
			return new UserView({ model: new Backbone.Model({ id: user, name: user }) });
		});
		this.render();
	},
	render: function() {
		_.each(this.subViews, function(view) {
			this.$el.append(view.el);
		}, this);
		this.$el.after("<a href='#home'>Go to home</a>");
	},
	close: function() {
		console.log('close')
		_.each(this.subViews, function(view) { view.remove(); });
		this.remove();
	}
});
var Router = Backbone.Router.extend({
	routes : {
		"" : "home",
		"home" : "home",
		"users" : "users"
	},
		initialize : function(options) {
console.log('router')
		//this.collection.on('reset', this.render, this);
	},

	home : function(e) {
console.log('home')
		this.loadView(new HomeView());
		
	},
	users : function(e) {
		console.log('users');
		this.loadView(new UsersView());
	
		
	},
	loadView : function(view) {
		this.view && (this.view.close ? this.view.close() : this.view.remove());
		this.view = view;
	}
});
$(document).ready(function(){

	var router = new Router();
	Backbone.history.start({

	});
});
