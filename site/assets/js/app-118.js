var Model = Backbone.Model.extend({
	urlRoot:'/api/appointments',
	defaults : {
		id : '',
		name : ''
	}

});
var Collection = Backbone.Collection.extend({
	url:'/api/appointments',
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
		this.$el.html("<h1>This is the home page</h1><a href='#home'>Go to users</a>");
	}
});

var UserView = Backbone.View.extend({
	tagName : "li",
	template : _.template("<div> Hi, my appointment is <%= title %></div><div class='hide2'>x</div>"),
	events: {
		
		'click': 'alertName'
	},
	initialize : function(e) {
	
		//_.bindAll(this, "alertName");
		this.render();
	},
	events : {
		"click" : "alertName"
	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
	},
	alertName : function() {
		alert(this.model.get('name'));
	}
});
var UsersView = Backbone.View.extend({
	tagName : "ul",
	id : "users-list",
	subViews : [],
	events :{
		'click .hide': 'hideme'
	},
	initialize : function(e) {
		this.collection = new Collection();
		$("body").html(this.el);
	/*	this.collection = new Collection([{
			id : '4',
			name : 'candy'
		}, {
			id : '2',
			name : 'soap'
		}, {
			id : '3',
			name : 'pepper'
		}]);
*/
		var self = this;
		this.collection.fetch({
		}).complete(function() {
			self.render();
		});
		//this.render();
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

		this.$el.append("<li><a href='#users'>Go to home</a><div class='hide'>+</div></li>");
	},
	hideme: function(){
		this.$el.unbind();
		//console.log('hiding')
		$(this.subViews).each(function(){
			//console.log('hi');
			//$(this)[0].$el.find('.hide2').hide();
			//console.log($(this)[0].$el)
		})
		//$('.hide2').hide()
	},
	close : function() {
this.$el.unbind();
		while (this.subViews.length) {
			this.subViews.pop().remove();

		}
	
		this.remove();
	
	}
});
var Router = Backbone.Router.extend({
	routes : {
		"" : "users",
		"home" : "users",
		"users" : "home"
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