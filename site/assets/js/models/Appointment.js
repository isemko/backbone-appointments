
define(["lib/backbone"], function(Backbone){
	var Model = Backbone.Model.extend({
	idAttribute : '_id',
	urlRoot : '/api/appointments'

});
	return Model;
});

