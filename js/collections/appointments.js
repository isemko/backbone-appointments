var app = app || {};

app.AppointmentsCollection = Backbone.Collection.extend({
	model: app.Appointment,
	url: '/api/appointments',
	initialize: function(){
		console.log('init collection');
		
	}
	
	
})
