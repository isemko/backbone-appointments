var app = app || {};
var viewHelper = {
	getDateHeader : function() {
		if (this.startTime) {
		}

	}
}
app.AppointmentView = Backbone.View.extend({
	tagName : 'li',
	className : 'appointment-cont',
	template : _.template($("#app-template").html()),
	events : {
		'click .del' : 'deleteAppointment',
		'click a.go' : 'appDetail',
		'click a.edit-main' : 'editMain'
	},

	initialize : function() {
		this.listenTo(this.model, 'change', this.render);

	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	deleteAppointment : function() {
		this.model.destroy();
		this.remove();
	},
	appDetail : function(e) {
		//console.log(this)
		e.preventDefault();
		var url = $(e.currentTarget).attr("href").replace(/^\//, "");
		appMain.navigate(url, {
			trigger : true
		});

	},

	editMain : function() {
		e.preventDefault();
		var url = $(e.currentTarget).attr("href").replace(/^\//, "");
		console.log('edit')
		$('.del').show();

	}
})