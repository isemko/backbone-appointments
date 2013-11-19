define(["lib/backbone","lib/underscore","models/Appointment", "views/DetailView","lib/modernizr-custom","lib/polyfiller"], function(Backbone, _, Appointment, AppointmentDetailView,modernizr, webshims){
	var AppointmentAddView = AppointmentDetailView.extend({
	template : _.template($('#add-app').html()),
	render : function() {
		this.model = {
			today : new Date()
		};
		this.$el.html(this.template(this.model));
		$.webshims.loader.basePath = 'lib/shims';
        $.webshims.polyfill('forms forms-ext');
		this.$el.updatePolyfill();
		
		this.$el.prepend("<header>" +
		 "<nav><ul id='main-nav'><li><a href='#home'>Cancel</a></li><li>New Appointment</li>" 
		+ "<li class='edit-save' ><a class='pr' href='#save'>Save</a></li></ul>" + "</nav></header>");
		return this;

	},
	updateAppointment : function(e) {
		
		e.preventDefault();
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
		if (this.valid(formData)) {
			var appV = new Appointment(formData)
			appV.save(formData).complete(function() {
			router.navigate('home', true);

			});
		}

	},
});
	return AppointmentAddView;
});

