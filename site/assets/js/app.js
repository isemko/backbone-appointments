var vent = _.extend({}, Backbone.Events);
$.expr.cacheLength = 1;
var Model = Backbone.Model.extend({
	idAttribute : '_id',
	urlRoot : '/api/appointments',
	defaults : {
		id : '',
		name : ''
	}

});
var Collection = Backbone.Collection.extend({
	url : '/api/appointments',
	model : Model
})


var AppointmentView = Backbone.View.extend({
	tagName : "li",
	template : _.template($('#app-template').html()),
	events : {
	},
	initialize : function(e) {
		this.listenTo(this.model, 'change', this.render)
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},
	render : function() {

		this.$el.html(this.template(this.model.toJSON()));

	}
});
var AppointmentDetailView = AppointmentView.extend({
	tagName : "ul",
	id : "Appointments-list",
	template : _.template('<li><%= _id %></li>'),
	initialize : function() {
		this.listenTo(this.model, 'change', this.render)
		$("#main-data").html(this.el);
		this.render();
		this.$el.before("<a href='#edit'>edit Appointments</a>&nbsp;<a href='#home'>go home</a>");
	},
	render : function() {

		this.$el.html(this.template(this.model.toJSON()));
		return this;

	}
})
/*
 * 
 * this.$el.before("<header>"+
				"<nav><ul id='main-nav'><li><a href='#edit'>Edit</a></li><li><a href='#home'>My Appointments</a></li>"+
				"<li  class='nav-last'><div class='add-main-inner'><a href='#/home' class='add-main'>+</a></div></li></ul>"
				+"</nav></header>"
				);
				 _.template("<div class='de'>x</div>"+
	"<div> <%= title %></div><a href='/#appointments/<%= _id %>'> edit app </a>"+
	"<div class='hidden-delete'>delete</div>")
 */
var EditAppointmentView = AppointmentView.extend({
	template : _.template($('#edit-template').html()),
	initialize : function() {

		this.render();
	

	},
	events : {
		'click .del' : 'showDelete',
		'click .hidden-delete' : 'removeAll'
	},
	removeAll : function() {

		this.$el.empty();
		this.model.destroy();
		this.remove();
		this.unbind();
		this.off()
	
		//vent.trigger('singleRemove', this);

	},
	showDelete : function() {
		this.$el.find('.hidden-delete').show();
		this.$el.find('.fl').addClass('slide-left')
	/*	this.$el.find('.fl').css({
			'margin-left': '-100px'
		})*/
	}
})

var AppointmentsView = Backbone.View.extend({
	tagName : "ul",
	id : "appList",
	subViews : [],
	
	initialize : function(e) {

		this.collection = new Collection();
		$("#main-data").html(this.el);
		
		var self = this;
		this.collection.fetch({
		}).complete(function() {
			self.render();
		});

	},
	render : function() {
		var self = this;

		this.collection.forEach(function(model) {

			var cView = new AppointmentView({
				model : model
			})

			self.subViews.push(cView);
			self.$el.append(cView.el);
			
		})

		this.$el.before("<header>"+
				"<nav><ul id='main-nav'><li><a href='#edit'>Edit</a></li><li><a href='#home'>My Appointments</a></li>"+
				"<li  class='nav-last'><div class='add-main-inner'><a href='#/home' class='add-main'>+</a></div></li></ul>"
				+"</nav></header>"
				);

	},

	close : function() {
		//$('.hidden-delete').unbind();
		while (this.subViews.length) {
			var x =this.subViews.pop()
	
			x.remove();
			x.unbind();
			x.off()
		}
		
		this.remove();
		this.unbind();
	}
});
var EditAppointmentsView = AppointmentsView.extend({
	id : "appList",
	initialize : function(e) {
		//vent.on('singleRemove', this.removeOne, this);

		this.collection = new Collection();
		$("#main-data").html(this.el);

		var self = this;
		this.collection.fetch({
		}).complete(function() {
			self.render();
		});
	},
	render : function() {
		var self = this;
		//this.$el.hide();
		this.collection.forEach(function(model) {

			var cView = new EditAppointmentView({
				model : model
			})
			self.subViews.push(cView);

			self.$el.append(cView.el);
			
		})

			 this.$el.before("<header>"+
				"<nav><ul id='main-nav'><li><a href='#home'>Close</a></li><li><a href='#edit'>Edit Appointments</a></li>"+
				"<li  class='nav-last'></li></ul>"
				+"</nav></header>"
				);
		//this.$el.slideDown("fast");
	},
	removeOne : function(e) {

		for (var i = 0; i < this.subViews.length; i++) {
			if (this.subViews[i].cid == e.cid) {

				//this.subViews[i].remove()
				//this.subViews.splice(i, 1)

			}

		}

	}
})
var Router = Backbone.Router.extend({
	routes : {
		"" : "Appointments",
		"home" : "Appointments",
		"edit" : "editAppointments",
		"appointments/:id" : "editAppointment"
	},
	initialize : function(options) {

	},
	Appointments : function() {
		this.loadView(new AppointmentsView());

	},
	editAppointments : function() {
		this.loadView(new EditAppointmentsView());

	},
	editAppointment : function(id) {

		var appointment = new Model({
			_id : id
		});
		var self = this;
		appointment.fetch({
			success : function(data) {
				self.loadView(new AppointmentDetailView({
					model : appointment
				}))
			}
		})

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
/*
 for(var i=0; i<10; i++){jQuery.post( '/api/appointments', {
 'title': 'appointment' +i,
 'startTime': new Date( 20013, 6, 45).getTime(),
 'endTime': new Date( 20013, 7, 15 ).getTime()
 }, function(data, textStatus, jqXHR) {
 console.log( 'Post response:' );
 console.dir( data );
 console.log( textStatus );
 console.dir( jqXHR );
 });}
 * /
 */
