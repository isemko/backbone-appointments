define(["lib/backbone","lib/underscore","lib/text!templates/nav.html"], 
function(Backbone, _,  navTemplate){
var NavView = Backbone.View.extend({
	tagName: 'ul',
	className: 'main-nav',
	navTypes : ['main', 'edit', 'detail'],
	template: navTemplate,
	events : {
		'click .go-edit': 'triggerEdit'
		
	},
	initialize: function(){
		vent.on('switchhead', this.switchHead, this);
		$('.head').html(this.el);
		this.render();
	},
	render : function(){
		this.$el.html(this.template);
		return this;
	},
	switchHead: function(data, data2){


		var self = this;
		this.navTypes.splice(this.navTypes.indexOf(data), 1);
		this.$el.find('.'+this.navTypes[0]+',.'+this.navTypes[1]).fadeOut(.2, function(){
			self.$el.find('.'+data).fadeIn('fast');
		});
		
		
	},
	triggerEdit : function(e){
		
		
		vent.trigger('show-edit', this);
		this.switchHead('edit');
		
	}
	
	
	
});
return NavView;
});



