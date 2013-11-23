var vent = _.extend({}, Backbone.Events);
$.expr.cacheLength = 1;
webshims.setOptions({
	waitReady : false,
	//basePath : "libs/shims",
	replaceUI : false
});
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
	className : 'edit-list-item',
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
	events : {
		'click #update' : 'updateAppointment'
	},
	initialize : function() {

		this.listenTo(this.model, 'change', this.render);
		$("#main-data").html(this.el);
		$('#content').addClass('editApp');
		this.render();
	
			//preload after onload
			webshims.polyfill('forms forms-ext');
	

		this.$el.before("<header>" + "<nav><ul id='main-nav'><li><a href='#edit'>Edit</a></li><li><a href='#home'>My Appointments</a></li>" + "<li  class='nav-last'><div class='add-main-inner'><a href='#/home' class='add-main'>+</a></div></li></ul>" + "</nav></header>");

	},
	render : function() {

		this.$el.html(this.template(this.model.toJSON()));
		this.$el.updatePolyfill();
		return this;

	},
	updateAppointment : function(e) {
		e.preventDefault();
		var formData = {};
		var startDate = endDate = '';
		$('#appList li').children('input, div input').each(function(i, el) {
			if (el.id == 'entry-day-end-time') {
				endDate = $(el).val().split(/[-T:]+/);
			} else if (el.id == 'entry-day-time') {
				//formData['startTime'] = $(el).val();
				startDate = $(el).val().split(/[-T:]+/);
			} else {
				formData[el.id] = $(el).val();
			}
		});
		formData['startTime'] = new Date(parseInt(startDate[0]), parseInt(startDate[1]), parseInt(startDate[2]), parseInt(startDate[3]), parseInt(startDate[4]));
		this.model.save(formData);
		this.$el.updatePolyfill();

	},
	close : function() {
		$('#content').removeClass('editApp');

		this.$el.empty();
		this.remove();
		this.el = null;
		this.$el = null;

	}
})

var EditAppointmentView = AppointmentView.extend({
	tagName : 'li',

	template : _.template($('#edit-template').html()),
	initialize : function(options) {

		this.$el.attr("class", options.classId + ' ' + this.className);

		this.render();

	},
	events : {
		'click .del' : 'showDelete',
		'click .hidden-delete-show' : 'removeAll'
	},
	removeAll : function() {
		vent.trigger('dateheadercheck', this);
		this.$el.empty();
		this.model.destroy();
		this.remove();

		return this;
	},
	showDelete : function() {
		this.$el.find('.hidden-delete').addClass('hidden-delete-show').removeClass('hidden-delete');
		this.$el.find('.fl').addClass('slide-left');

	}
})

var HeaderView = Backbone.View.extend({
	tagName : 'li',
	className : 'date-head',
	template : _.template("<%=  $.format.date(new Date(temp_date), 'ddd, MMMM d, yyyy').toUpperCase() %> "),
	initialize : function(options) {

		this.$el.attr("class", options.classId + ' ' + this.$el.attr('class'));
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
		var hView = new HeaderView({
			temp_date : temp_date,
			id : this.collection.first().get('_id')
		});
		self.$el.append(hView.el);
		self.subViews.push(hView);
		this.collection.forEach(function(model) {

			var cView = new AppointmentView({
				model : model
			})
			if (new Date(model.get('startTime')).getDay() != new Date(temp_date).getDay()) {
				temp_date = model.get('startTime')
				var hView = new HeaderView({
					temp_date : temp_date,
					id : model.get('_id')
				});
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
			x.$el.empty();
			x.$el.remove();
			x.remove();

			x.unbind();
			x.off();
		}
		this.$el.remove();
		this.remove();
		this.el = null;
		// ???
		this.$el = null;
		// ???
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
		var hView = new HeaderView({
			temp_date : temp_date,
			id : temp_model.get('_id'),
			classId : temp_model.get('_id')
		});
		self.$el.append(hView.el);
		self.subViews.push(hView);

		this.collection.forEach(function(model) {

			//need new way of referencing
			if (new Date(model.get('startTime')).getDay() != new Date(temp_date).getDay()) {
				temp_model = model;
				temp_date = temp_model.get('startTime')
				var hView = new HeaderView({
					temp_date : temp_date,
					id : temp_model.get('_id'),
					classId : temp_model.get('_id')
				});
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
		//find total number of the day's class
		$listCount = $('.' + $(e.$el[0]).attr('class')).length - 1;
		// if only one, it is the heeader
		if ($listCount == 1) {
			//search views remove the header from subviews
			for (var i = this.subViews.length - 1; i >= 0; i--) {
				var check = (this.subViews[i].id ? this.subViews[i].id : this.subViews[i].model.id )
				if (check == $(e.$el[0]).attr('class')) {
					var x = this.subViews.splice(i, 1);
					x[0].remove();
				}
			}
		} else {
			// if it is not the header, remove based on id in removeOneSubview
			this.removeOneSubview(e);
		}

	},
	removeOneSubview : function(e) {
		for (var i = this.subViews.length - 1; i >= 0; i--) {
			if (this.subViews[i].model.id == e.model.id) {
				if (!e.$el.find('.date-head')) {
					var x = this.subViews.splice(i, 1);
					x[0].remove();
				}

			}
		}

	},
	compDates : function(e, model) {
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
jQuery.webshims.debug = false;

$(document).ready(function() {

	var router = new Router();
	Backbone.history.start({

	});

});
/*
 for(var i=0; i<10; i++){jQuery.post( '/api/appointments', {
 'title': 'appointment' +i,
 'startTime': new Date( 2013, i, i+1, (i+1) * 2).getTime(),
 'endTime': new Date( 2013, i, i+1,(i+2) *2 ).getTime()
 }, function(data, textStatus, jqXHR) {
 console.log( 'Post response:' );
 console.dir( data );
 console.log( textStatus );
 console.dir( jqXHR );
 });}
 * /
 */
