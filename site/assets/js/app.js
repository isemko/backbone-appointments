var app = app || {};

$.expr.cacheLength = 1;
/*
jQuery.webshims.setOptions('forms forms-ext', {
	replaceUI : false,
	waitReady : false,
	replaceValidationUI : true
});*/
define(['lib/backbone', 'models/Appointment', 'views/AppointmentView','views/EditView', 'views/AddView', 'views/DetailView', 'views/AppointmentsView'],
function(Backbone, AppModel,  AppView, EditView, AddView, DetailView, AppointmentsView){
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
		this.loadView(new AppsView.EditAppointmentsView());

	},
	editAppointment : function(id) {

		var appointment = new AppModel.Model({
			_id : id
		});
		var self = this;
		appointment.fetch({
			success : function(data) {
				self.loadView(new AppView.AppointmentDetailView({
					model : appointment
				}))
			}
		})

	},
	addAppointment : function(){
		this.loadView(new app.AppointmentAddView());
	}
	,
	loadView : function(view) {
		this.view && (this.view.close ? this.view.close() : this.view.remove());
		this.view = view;
	}
});
	return Router;
});

/*
$(document).ready(function() {
	webshims.polyfill('forms forms-ext');
	app.router = new app.Router();
	Backbone.history.start({

	});

});

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
