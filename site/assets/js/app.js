
define(['lib/backbone', 'models/Appointment', 'views/AppointmentView','views/EditView', 'views/AddView', 'views/DetailView', 'views/AppointmentsView', 'views/EditAppointmentsView'],
function(Backbone, AppModel,  AppView, EditView, AddView, DetailView, AppointmentsView, EditAppointmentsView){
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
	
	},
	Appointments : function() {

		this.loadView(new AppointmentsView());

	},
	editAppointments : function() {
		this.loadView(new EditAppointmentsView());

	},
	editAppointment : function(id) {

		var appointment = new AppModel({
			_id : id
		});
		var self = this;
		appointment.fetch({
			success : function(data) {
				self.loadView(new DetailView({
					model : appointment
				}))
			}
		})

	},
	addAppointment : function(){
		this.loadView(new AddView());
	}
	,
	loadView : function(view) {
		this.view && (this.view.close ? this.view.close() : this.view.remove());
		this.view = view;
	}
});
	return Router;
});

