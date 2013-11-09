var app = app || {};

app.AppointmentListView = Backbone.View.extend({
	tagName : "ul",
	id : "appList",
	children : [],
	events: {
		//'click .edit-main': 'editMain'
	},
	initialize : function() {
		this.collection = new app.AppointmentsCollection();
		$('#appListContainer').html(this.el)
		this.render();

	},
	render : function() {

		var self = this;
		this.collection.fetch({
		}).complete(function() {
			self.renderView();
		});

	},
	renderView : function() {
		this.$el.html('');
		var self =  this;
		this.collection.forEach(function(model){
			var cView = new app.AppointmentView({
				model : model
			})
			self.children.push(cView);
			self.$el.append(cView.el);
			
			
		});
		//this.$el.prepend("<ul id='main-nav'><li ><a class='edit-main' href='#/edit/'>Edit</a></li><li class='home'>My Appointments</li><li class='nav-last'><div class='add-main-inner'><a href='/add' class='add-main'>+</a></div></li></ul>");

	},
	editMain: function(){
		console.log('clicked');
	

			//$('.app-link').show();
			/*for(var i=0 ;i<this.children.length;i++){
				$(this.children[i]).find('.app-link').show();
			}
		*/
		
	},
	addOne : function(model) {
		var appView = new app.AppointmentView({
			model : model
		});
		this.children.push(appView);
		this.$el.append(appView.el);
	},
	close : function() {
			//$('.app-link').unbind();
		while (this.children.length) {

			this.children.pop().close();
	
		}

		this.remove();
		
	}
});
