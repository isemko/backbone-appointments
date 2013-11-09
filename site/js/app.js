var app = app || {};
// Define View Manager to manage view states

app.MyRouter = Backbone.Router.extend({
	//navView : new app.MainNav(),
	mainView : '',
	routes : {
		"" : "index",
		"appointments/:id" : "showAppointment",
		//"edit" : "editMain",
		"add" : "addApp"

	},
	initialize : function(options) {

		//this.collection.on('reset', this.render, this);
	},

	index : function() {
		//this.releaseNav();
		this.navView = new app.MainNav();

		this.loadView(new app.AppointmentListView());
					
			

	},
	releaseNav : function() {
		$(this.navView).empty
		this.navView.undelegateEvents();
		this.navView.unbind();
	},
	showAppointment : function(id) {
		//this.releaseNav();
		//this.navView = new app.MainNav();
		//$('.del, .app-link').unbind();
		var appointment = new app.Appointment({
			_id : id
		});
		var self = this;
		appointment.fetch({
			success : function(data) {
	
				self.loadView( new app.AppointmentDetailView({
					model : appointment

				}))
			}
		})
	},
	editMain : function(id) {
		//this.releaseNav();
		//this.navView = new app.EditNav();
		//this.loadView(new app.AppointmentListView());
		//$('.del, .app-link').show();

	},
	addApp : function() {
		this.releaseNav();
		var navView = new app.AddNav();

	},
	loadView : function(view) {
		this.view && (this.view.close ? this.view.close() : this.view.remove());
		this.view = view;
		//console.log(this.view)
	}
	
	
});
$(function() {

	appMain = new app.MyRouter();
	Backbone.history.start({
		pushState : false
	});
});
/*
jQuery.post( '/api/books', {
    'title': 'JavaScript the good parts',
    'author': 'Douglas Crockford',
    'releaseDate': new Date( 2008, 4, 1 ).getTime()
}, function(data, textStatus, jqXHR) {
    console.log( 'Post response:' );
    console.dir( data );
    console.log( textStatus );
    console.dir( jqXHR );
});
 * /
 */