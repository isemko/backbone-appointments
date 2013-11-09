var app = app || {};

app.Appointment = Backbone.Model.extend({
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
