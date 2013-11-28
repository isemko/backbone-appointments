
define(['lib/backbone', 'models/Appointment', 'views/AppointmentView','views/EditView', 'views/AddView', 'views/DetailView', 'views/AppointmentsView', 'views/EditAppointmentsView','views/NavView'],
function(Backbone, AppModel,  AppView, EditView, AddView, DetailView, AppointmentsView, EditAppointmentsView, NavView){
	var Router = Backbone.Router.extend({
	routes : {
		"" : "Appointments",
		"home" : "Appointments",
		"edit" : "editAppointments",
		"appointments/:id" : "editAppointment",
		"save" : "triggerSave",
		"add" : "addAppointment"
	},
	initialize : function(options) {
		this.loadNavView(new NavView());
	},
	Appointments : function() {
	
		vent.trigger('switchhead', 'main');

		
		this.loadView(new AppointmentsView({loadcheck: false}));
	
		
	},
	editAppointments : function() {
		vent.trigger('switchhead', 'edit');
		if(!this.view ){
			this.loadView(new AppointmentsView({loadcheck: true}));

		}
	},
	editAppointment : function(id) {
	
		vent.trigger('switchhead', 'detail');
		var appointment = new AppModel({
			_id : id
		});
		var self = this;
		appointment.fetch({
			success : function(data) {
			
				self.loadView(new DetailView({
					model : appointment
				}));
			$('#main-data').attr('class', 'left transition');
			$('#alt-data').attr('class', 'center transition');
					
			}
			
		});

	},
	addAppointment : function(){
		
		
		this.loadView(new AddView());
			$('#main-data').attr('class', 'left transition');
			$('#alt-data').attr('class', 'center transition');
	}
	,
	loadView : function(view) {
		this.view && (this.view.close ? this.view.close() : this.view.remove());
		this.view = view;
		
	},
	loadNavView : function(view){
		this.navview && (this.navview.close ? this.navview.close() : this.navview.remove());
		this.navview = this.navview ;
	}
});
	return Router;
});

