var app = app || {};
var viewHelper = {
	getDateHeader : function(){
		if(this.startTime ){}
		
		
	}
	
	
}
app.AppointmentView = Backbone.View.extend({
	tagName: 'li',
	className: 'appointment-cont',
	template: _.template("<div class='del'></div><div class='title'> <%= title %></div><div class='app-link'><a class='go' href='/appointments/<%= _id %>'> </a></div> <div class='date'><%= $.format.date( new Date( startTime), 'hh:mm a' ) %></div><div class='clear'></div>"),
	 events: {
        'click .del': 'deleteAppointment',
        'click a.go' : 'appDetail'
    },
	
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		
	},
	render: function(){
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},
	deleteAppointment: function(){
		this.model.destroy();
		this.remove();
	},
	appDetail: function(e){
		console.log(this)
		    e.preventDefault();
    var url = $(e.currentTarget).attr("href").replace(/^\//, "");
  	 appMain.navigate(url,{trigger:true});
		
	

	}

	
})
