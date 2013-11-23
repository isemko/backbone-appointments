define(["lib/backbone", "lib/underscore", "models/Appointment", "views/AppointmentView", "lib/modernizr-custom", "lib/polyfiller", "lib/text!templates/detail.html"], function(Backbone, _, Appointment, AppointmentView, modernizr, webshims, detailTemplate) {
	var AppointmentDetailView = AppointmentView.extend({
		tagName : "ul",
		id : "appList",
		template : _.template(detailTemplate),
		events : {
			'click .edit-save' : 'updateAppointment',
			'click .start-cover' : 'toggleInput',

		},
		initialize : function() {

			$("#alt-data").html(this.el);
			$('#content').addClass('editApp');

			this.render();

		},
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			$.webshims.loader.basePath = 'lib/shims';
			this.$el.updatePolyfill();
			vent.on('add-save', this.updateAppointment, this);
			return this;

		},
		toggleInput : function(e) {
			$(e.currentTarget).hide();
			$(e.currentTarget).next('.start-input').show();

		},
		updateAppointment : function(e) {

			var formData = {};
			var startDate = endDate = '';
			$('#appList li input,#appList li textarea').each(function(i, el) {
				if (el.id == 'entry-day-end-time') {
					endDate = $(el).val().split(/[-T:]+/);
				} else if (el.id == 'entry-day-time') {
					startDate = $(el).val().split(/[-T:]+/);
				} else {
					formData[el.id] = $(el).val().trim();
				}
			});

			formData['startTime'] = new Date(startDate[0], startDate[1] - 1, startDate[2], startDate[3], startDate[4]);
			formData['endTime'] = new Date(endDate[0], endDate[1] - 1, endDate[2], endDate[3], endDate[4]);
			var self = this;

			var v = this.valid(formData);
			this.$el.find('.error').html('');
			if (!v) {
				this.model.save(formData).complete(function() {
					router.navigate('home', true);
					$('#main-data').attr('class', 'center transition');
					$('#alt-data').attr('class', 'right transition');

				});
			} else {
				for (var o in v) {
					if (v[o].name == 'startTime') {
						this.$el.find('.endtTime-error').html(v[o].message);
					} else {
						this.$el.find('.' + v[o].name + '-error').html(v[o].message);
					}

				}

			}

		},
		valid : function(f) {
			var errors = [];
			for (var v in f) {
				if (f[v] == '') {
					errors.push({
						name : v,
						message : 'Value can not be empty'
					});

				}

			}
			if (new Date(f['startTime']) >= new Date(f['endTime'])) {
				errors.push({
					name : 'startTime',
					message : 'End time must be after start time.'
				});

			}

			return errors.length > 0 ? errors : false;
		},
		close : function() {
			$('#content').removeClass('editApp');
			vent.off('add-save', this.updateAppointment, this);
			this.$el.empty();
			this.remove();
			this.el = null;
			this.$el = null;

		}
	});
	return AppointmentDetailView;
}); 