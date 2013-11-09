var app = app || {};

app.AppointmentDetailView = Backbone.View.extend({
	tagName: 'li',
	className : 'appointment-det-cont',
	template : _.template($("#app-template").html()),
	events : {
		'click .change' : 'setObject'

	},
	initialize : function() {
	
		this.listenTo(this.model, 'change', this.render);
		$('#appListContainer').html(this.el)
		// Event listener on parent
	this.render();
	},
	render : function() {

		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	setObject : function(event) {

		this.model.set({
			title : $('#ap-title').val()
		})
		this.model.save();
	}
});
