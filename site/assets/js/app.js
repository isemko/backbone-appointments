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
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},
	render : function() {

		this.$el.html(this.template(this.model.toJSON()));

	}
});
var AppointmentDetailView = AppointmentView.extend({
	tagName : "ul",
	id : "appList",

	template : _.template($('#edit-app').html()),
	initialize : function() {
		this.listenTo(this.model, 'change', this.render);
		$("#main-data").html(this.el);
		this.render();
		//this.$el.before("<a href='#edit'>edit Appointments</a>&nbsp;<a href='#home'>go home</a>");
	},
	render : function() {

		this.$el.html(this.template(this.model.toJSON()));
		return this;

	}
})

var EditAppointmentView = AppointmentView.extend({
	tagName: 'li',
	template : _.template($('#edit-template').html()),
	initialize : function(options) {
	
		this.$el.attr( "class", options.classId);

		this.render();

	},
	events : {
		'click .del' : 'showDelete',
		'click .hidden-delete' : 'removeAll'
	},
	removeAll : function() {
		vent.trigger('dateheadercheck', this);
		this.$el.empty();
		this.model.destroy();
		this.remove();
		this.unbind();
		this.off();
		return this;
	},
	showDelete : function() {
		this.$el.find('.hidden-delete').show();
		this.$el.find('.fl').addClass('slide-left');

	}
})

var HeaderView = Backbone.View.extend({
	tagName: 'li',
	className : 'date-head',
	template: _.template("<%=  $.format.date(new Date(temp_date), 'ddd, MMMM d, yyyy').toUpperCase() %> "),
	initialize : function(options) {
		
		this.$el.attr( "class", options.classId+ ' '+this.$el.attr('class'));
		this.model = options;
		//this.listenTo(this.model, 'change', this.render);
		this.id = this.model.id;
		this.render();
	},
	render : function() {

		this.$el.html(this.template(this.model));
	
		return this;
	}
	
})
var AppointmentsView = Backbone.View.extend({
	tagName : "ul",
	id : "appList",
	subViews : [],

	initialize : function(e) {

		this.collection = new Collection();
		// sort by date ascending
		this.collection.comparator = function(m) {
			return m.get("startTime");
		};

		this.collection.sort();

		$("#main-data").html(this.el);

		var self = this;
		this.collection.fetch({
		}).complete(function() {
			self.render();
		});

	},
	formatDate : function(d) {
		return $.format.date(new Date(d), 'ddd, MMMM d, yyyy').toUpperCase()
	},
	render : function() {
		var self = this;
		var temp_date = new Date(this.collection.first().get('startTime'));
		var hView = new HeaderView({temp_date: temp_date, id:this.collection.first().get('_id') });
		self.$el.append(hView.el);
		self.subViews.push(hView);
		this.collection.forEach(function(model) {

			var cView = new AppointmentView({
				model : model
			})
			if (new Date(model.get('startTime')).getDay() != new Date(temp_date).getDay()) {
				temp_date = model.get('startTime')
				var hView = new HeaderView({temp_date: temp_date, id:model.get('_id') });
				self.$el.append(hView.el);
				self.subViews.push(hView);
			}

			self.subViews.push(cView);
			self.$el.append(cView.el);

		})

		this.$el.before("<header>" + "<nav><ul id='main-nav'><li><a href='#edit'>Edit</a></li><li><a href='#home'>My Appointments</a></li>" + "<li  class='nav-last'><div class='add-main-inner'><a href='#/home' class='add-main'>+</a></div></li></ul>" + "</nav></header>");

	},

	close : function() {
		//$('.hidden-delete').unbind();
		while (this.subViews.length) {
			var x = this.subViews.pop();
			
			x.remove();
			x.unbind();
			x.off();
		}
		this.remove();
		this.unbind();
		this.off();
		vent.off('dateheadercheck', this.checkHeader, this);
	}
});
var EditAppointmentsView = AppointmentsView.extend({
	id : "appList",
	initialize : function(e) {
		vent.on('dateheadercheck', this.checkHeader, this);
		
		this.collection = new Collection();
		// sort by date ascending
		this.collection.comparator = function(m) {
			return m.get("startTime");
		};

		this.collection.sort();
		//this.listenTo(this.collection, 'sort', this.render);
		$("#main-data").html(this.el);

		var self = this;
		this.collection.fetch({
		}).complete(function() {
			self.render();
		});
	},
	render : function() {
		var self = this;
		var temp_model = this.collection.first();
		var temp_date = new Date(temp_model.get('startTime'));
		var hView = new HeaderView({temp_date: temp_date, id:temp_model.get('_id') , classId: temp_model.get('_id')} );
		self.$el.append(hView.el);
		self.subViews.push(hView);
	
		this.collection.forEach(function(model) {


			//need new way of referencing 
			if (new Date(model.get('startTime')).getDay() != new Date(temp_date).getDay()) {
				temp_model = model;
				temp_date = temp_model.get('startTime')
				var hView = new HeaderView({temp_date: temp_date, id :temp_model.get('_id'), classId: temp_model.get('_id') });
				self.$el.append(hView.el);
				self.subViews.push(hView);
			}
			var cView = new EditAppointmentView({
				model : model,
				headId : model.get('_id'),
				classId : temp_model.get('_id')
			});
			self.subViews.push(cView);
			self.$el.append(cView.el);

		})

		this.$el.before("<header>" + "<nav><ul id='main-nav'><li><a href='#home'>Done</a></li><li><a href='#edit'>Edit Appointments</a></li>" + "<li  class='nav-last'></li></ul>" + "</nav></header>");

	},
	checkHeader : function(e) {
		//find view from subViews that has the id  and remove it 
		/*
		 * assign class to each appointment on the day and the day header.  do a count ( $items = $('class-name'); $items.length;  )
		 * if length is == to 1 remove header (no more sub items left).
		 * 
		 * 
		 */

		$listCount = $('.'+$(e.$el[0]).attr('class')).length-1;
		if ($listCount == 1) {
			for( var i =  this.subViews.length-1 ; i>=0; i--){
		var check =(this.subViews[i].id ? this.subViews[i].id : this.subViews[i].model.id )
				if(check == $(e.$el[0]).attr('class')){
					var x = this.subViews.splice(i, 1);
					x[0].remove();
					x[0].unbind();
				}
			}
		}
	},
	compDates : function(e, model){
		var timeCheck = {

			day : new Date((this.collection.get(e.model.id)).get('startTime')).getDay(),
			month : new Date((this.collection.get(e.model.id)).get('startTime')).getMonth(),
		}
		return (new Date(model.get('startTime')).getMonth() == timeCheck.month && new Date(model.get('startTime')).getDay() == timeCheck.day)
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
