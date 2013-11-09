var app = app || {};

app.EditNav = Backbone.View.extend({
	el : '#main-nav',
	template : _.template("<li class='home'>Done</li><li class='home'>My Appointments</li><li></li>"),
	events : {
		'click div' : 'goHome',
		'click li.home' : 'goHome'
	},
	initialize : function() {

		this.render();

	},
	render : function() {
		$(this.el).html(this.template());
		return this;
	},

	goHome : function(e) {
			e.preventDefault();
		console.log('go home from edit')
		//var url = $(e.currentTarget).attr("href").replace(/^\//, "");
		appMain.navigate('/', {
			trigger : true
		});
	}
});
app.MainNav = Backbone.View.extend({
	el : '#main-nav',
	template : _.template("<li ><a class='edit-main' href='/edit/'>Edit</a></li><li class='home'>My Appointments</li><li class='nav-last'><div class='add-main-inner'><a href='/add' class='add-main'>+</a></div></li>"),
	events : {
		'click a.edit-main' : 'goEdit',
		'click a.add-main' :'goAdd',
		'click li.home' : 'goHome'
	},
	initialize : function() {
		console.log('home nav');
		this.render();

	},
	render : function() {
		$(this.el).html(this.template());
		return this;
	},
	goEdit : function(e) {
		e.preventDefault();
		appMain.navigate('/edit', {
			trigger : true
		});

	},
	goAdd : function(e){
		console.log('going to add')
		e.preventDefault();
		appMain.navigate('/add', {
			trigger : true
		});
	},


	goHome : function(e) {
		
			e.preventDefault();
		console.log('go home from main')
		//var url = $(e.currentTarget).attr("href").replace(/^\//, "");
		appMain.navigate('/', {
			trigger : true
		});
	}
}); 
app.AddNav = Backbone.View.extend({
	el : '#main-nav',
	template : _.template("<li class='home'>Done</li><li>New Appointment</li><li class='add-main'><a href='/save'>Save</a></li>"),
	events : {
		'click a.home' : 'goHome'

	},
	initialize : function() {
		console.log(this.count++)
		this.render();

	},
	render : function() {
		$(this.el).html(this.template());
		return this;
	},
	goEdit : function(e) {
		e.preventDefault();
		appMain.navigate('/', {
			trigger : true
		});
	}
});