var app = app || {};

app.Appointment = Backbone.Model.extend({
	urlRoot: '/api/appointments',
	idAttribute: "_id",
	defaults : function() {
		return {
			'title' : '',
			'startTime' : '',
			'endTime' : '',
			'appointmentName' : '',
			'description' : ''
			
		}
	}
})
