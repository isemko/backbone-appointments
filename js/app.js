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
		"appointments/:id" : "showAppointment",
		"edit" : "editMain",
		"add" : "addApp"
	
	},
	initialize : function(options) {

		// this.collection.on('reset', this.render, this);
	},

	index : function() {
		var navView = new app.MainNav();
		var homeView = new app.AppointmentListView();
		homeView.viewFetch();
	},

	showAppointment : function(id) {
		//change nav, update view to show edit
		var navView = new app.EditNav();

	},
	editMain : function() {
		var navView = new app.EditNav();
		$('.del, .app-link').show();
	},
	addApp: function(){
		console.log('add')
		var navView = new app.AddNav();
		
	}
});
$(function() {

	appMain = new app.MyRouter();
	Backbone.history.start({
		pushState : true
	});
});
