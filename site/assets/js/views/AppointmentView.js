
define(["lib/backbone"], function(Backbone){
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
	return AppointmentView;
	
});



