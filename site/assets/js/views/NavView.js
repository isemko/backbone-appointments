define(["lib/backbone", "lib/underscore", "lib/text!templates/nav.html"], function(Backbone, _, navTemplate) {
	var NavView = Backbone.View.extend({
		tagName : 'ul',
		className : 'main-nav',
		navTypes : ['main', 'edit', 'detail'],
		template : navTemplate,
		events : {
			'click .go-edit, .done' : 'triggerEdit',
			'click .done' : 'triggerHome',
			'click .cancel-add' : 'triggerHome',
			'click .add-save' : 'triggerAddSave'

		},
		initialize : function() {
			vent.on('switchhead', this.switchHead, this);
			$('.head').html(this.el);
			this.render();
		},
		render : function() {
			this.$el.html(this.template);
			return this;
		},
		switchHead : function(data) {
			var self = this;
			var temp_nav = this.navTypes.slice();
			temp_nav.splice(temp_nav.indexOf(data), 1);
			this.$el.find('.' + temp_nav[0] + ',.' + temp_nav[1]).fadeOut(.001, function() {
				self.$el.find('.' + data).fadeIn('fast');
			});

		},
		triggerEdit : function(e) {
			vent.trigger('show-edit', this);
			this.switchHead('edit');
		},
		triggerHome : function() {
			vent.trigger('show-edit', this);
			this.switchHead('main');
			router.navigate('home', true);
		},
		triggerAddSave : function(){
			vent.trigger('add-save', this);
			
		}
	});
	return NavView;
});

