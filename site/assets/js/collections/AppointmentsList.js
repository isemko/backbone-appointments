define(["lib/backbone", "models/Appointment"], function(Backbone, Model) {
	var Collection = Backbone.Collection.extend({
		url : '/api/appointments',
		model : Model
	});

	return Collection;

});
