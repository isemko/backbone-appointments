var Model = Backbone.Model.extend({
	defaults : {
		id : '',
		name : ''
	}

});
var Collection = Backbone.Collection.extend({
	model : Model
})
var HomeView = Backbone.View.extend({
	tagName : "div",
	id : "home-view",
	initialize : function() {
		$("body").html(this.el);
		this.render();
	},
	render : function() {
		this.$el.html("<h1>This is the home page</h1><a href='#users'>Go to users</a>");
	}
});

var UserView = Backbone.View.extend({
	tagName : "li",
	initialize : function(e) {

		_.bindAll(this, "alertName");
		this.render();
	},
	events : {
		"click" : "alertName"
	},
	render : function() {
		this.$el.html("Hi, my name is " + this.model.get('name'));
	},
	alertName : function() {
		alert(this.model.get('name'));
	}
});
var UsersView = Backbone.View.extend({
	tagName : "ul",
	id : "users-list",
	subViews : [],
	initialize : function(e) {
		$("body").html(this.el);
		this.collection = new Collection([{
			id : '4',
			name : 'candy'
		}, {
			id : '2',
			name : 'soap'
		}, {
			id : '3',
			name : 'pepper'
		}]);
		console.log(this.collection)

		this.render();
	},
	render : function() {
		var self = this;
		this.collection.forEach(function(model) {

			var cView = new UserView({
				model : model
			})
			self.subViews.push(cView);
			self.$el.append(cView.el);
		})

		this.$el.after("<a href='#home'>Go to home</a>");
	},
	close : function() {

		while (this.subViews.length) {
			this.subViews.pop().remove();

		}

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
$(document).ready(function() {

	var router = new Router();
	Backbone.history.start({

	});
}); 