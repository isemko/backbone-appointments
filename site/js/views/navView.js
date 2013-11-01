var app = app || {};

app.EditNav = Backbone.View.extend({
	el: '#main-nav',
	template: _.template('<div>home</div>'),
	events:{
		'click div': 'goHome'
		
	},
	initialize: function(){
	
	this.render();
	

		
	},
 render:function () {
        $(this.el).html(this.template());
        return this;
   },
   goHome: function(){
   	console.log('go home')
   	 //var url = $(e.currentTarget).attr("href").replace(/^\//, "");
  	 appMain.navigate('/',{trigger:true});
   }
});
app.MainNav = Backbone.View.extend({
	el: '#main-nav',
	template: _.template("<li ><a class='edit-main' href='/edit/'>Edit</a></li><li >My Appointments</li><li class='add-main'>+</li>"),
	events:{
		'click div': 'goHome'
		
	},
	initialize: function(){
	
	this.render();
	

		
	},
 render:function () {
        $(this.el).html(this.template());
        return this;
   },
   goHome: function(){
   	console.log('go home')
   	 //var url = $(e.currentTarget).attr("href").replace(/^\//, "");
  	 appMain.navigate('/',{trigger:true});
   }
});