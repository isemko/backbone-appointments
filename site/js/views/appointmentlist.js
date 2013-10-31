var app = app || {};

app.AppointmentListView = Backbone.View.extend({
	el: '#appList',
	initialize: function(){
	this.collection = new app.AppointmentsCollection();
	

		
	},
 viewFetch: function(){
 	var self = this;
	this.collection.fetch({
			}).complete(function() {
				self.render();
			});
 
 	
 },
  render: function(){
  	console.log('going to render', this.collection.length);
  	this.$el.html('');
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(model){
  	console.log('adding one', model);
    var appView = new app.AppointmentView({model: model});
    this.$el.append(appView.render().el);
  }
});