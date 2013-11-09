var app = app || {};

app.AppointmentView = Backbone.View.extend({
	tagName : 'li',
	className : 'appointment-cont',
	template : _.template($("#app-template").html()),
	events : {
	//'click .del' : 'deleteAppointment',
	'click .go' : 'test',
		'click a.edit-main' : 'editMain'
	},

	initialize : function() {
		//this.listenTo(this.model, 'change', this.render);
		 this.listenTo(this.model, 'remove', this.close);
		  //console.log(this.$el)
		this.render();

	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	test: function(e){
		//e.preventDefault();
		
	},
	deleteAppointment : function() {
		// this.model.trigger("remove");
		this.$el.remove()
		this.model.destroy();
	
		this.remove();
		this.stopListening()
		this.unbind();
	},
	appDetail : function(e) {
	
		e.preventDefault();
		var url = $(e.currentTarget).attr("href").replace(/^\//, "");
		appMain.navigate(url, {
			trigger : true
		});

	},

	editMain : function() {
		//e.preventDefault();
		//var url = $(e.currentTarget).attr("href").replace(/^\//, "");
	
		//$('.del').show();

	},
	close : function(){
		
		this.$el.off('click', '.go');
	 	//this.model.trigger("remove");
		//this.$el.remove()
		this.unbind();
		
		this.undelegateEvents() 
		this.remove();
		this.stopListening()
		
	}
})