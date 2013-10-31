var app = app || {};
/*function AppView() {

	this.showView(view) {
		if (this.currentView) {
			this.currentView.close();
		}

		this.currentView = view;
		this.currentView.render();

		$("#mainContent").html(this.currentView.el);
	}

}
*/

app.MyRouter = Backbone.Router.extend({
	routes : {
		"" : "index",
		"appointments/:id" : "showAppointment"
	},

	initialize : function(options) {
	
	Backbone.history.start({pushState: true});
	// this.collection.on('reset', this.render, this);
	},

	index : function() {
		var homeView = new app.AppointmentListView();
		homeView.viewFetch();
	},

	showAppointment : function(id) {
	console.log('test', id);
	}
});
$(function() {
	
	appMain = new app.MyRouter();
	
});
