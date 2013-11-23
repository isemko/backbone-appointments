define(["lib/backbone", "lib/underscore", "views/AppointmentView", 'lib/text!templates/edit.html'], function(Backbone, _, AppointmentView, editTemplate) {

	var EditAppointmentView = AppointmentView.extend({
		tagName : 'li',
		className : 'edit-list-item',
		template : _.template(editTemplate),
		initialize : function(options) {
			vent.on('show-edit', this.showEdit, this);

			this.$el.attr("class", options.classId + ' ' + this.className);

			this.render();

		},
		events : {
			'click .del' : 'showDelete',
			'click .hidden-delete-show' : 'removeAll'
		},
		removeAll : function() {
			vent.trigger('dateheadercheck', this);
			vent.off('show-edit', this.showEdit, this);
			this.$el.empty();
			this.model.destroy();
			this.remove();
			
			return this;
		},
		showDelete : function() {
			this.$el.find('.hidden-delete').addClass('hidden-delete-show').removeClass('hidden-delete');
			this.$el.find('.fl').addClass('slide-left');

		},
		showEdit : function() {
			if (this.$el.find('.app-link').is(':visible')) {
				this.$el.find('.app-link, .del').fadeOut('fast');
			} else {
				this.$el.find('.app-link, .del').fadeIn('fast');
			}

		}
	});

	return EditAppointmentView;

});
