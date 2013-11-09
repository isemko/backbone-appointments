var HomeView = Backbone.View.extend({
	tagName: "div",
	id: "home-view",
	events : {
		'click .home-a': 'go',
		'click a' : 'prevent'
		
	},
	initialize: function() {
		$("body").html(this.el);
		this.render();
	},
	render: function() {
		this.$el.html("<h1>This is the home page</h1><a class='home-a' href='#users'>Go to users</a>");
	},
	go: function(e){
		console.log('going: '+$(e.currentTarget).attr("href"))
	
		router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), true)
		
	},
	prevent: function(e){
			e.preventDefault();
	}
});



var UserView = Backbone.View.extend({
	tagName: "li",
	events : {
		'click a': 'prevent',
		'click .edit-a': 'goe'
		
	},

	initialize: function(e) {
		
	router.navigate('/users', true);
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
			events : {
		'click a': 'prevent',
		'click .edit-a': 'goe'
		
	},
	initialize: function(e) {
		//e.preventDefault()
		
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
		this.$el.after("<a class='edit-a' href='#home'>Go to home</a>");
	},
	close: function() {
		_.each(this.subViews, function(view) { view.remove(); });
		this.remove();
	}
	,
	goe: function(e){
		alert('clicked')
		console.log('go home')
		e.preventDefault();
		router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), true)
		
	},
	prevent: function(e){
		console.log('prevent');
		e.preventDefault();
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
		this.navigate('/home', true)
	},
	users : function(e) {
		console.log('users');
		
		this.loadView(new UsersView());
		this.navigate('/users', true)
		
	},
	loadView : function(view) {
		this.view && this.view.remove();
		this.view = view;
	}
});
var router ='';
$(document).ready(function(){

	router = new Router();
	Backbone.history.start({
		pushState:true
	});
});
