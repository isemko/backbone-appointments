define(["lib/backbone","lib/underscore","models/Appointment", "views/AppointmentView","lib/modernizr-custom","lib/polyfiller", "lib/text!templates/detail.html"], function(Backbone,_, Appointment, AppointmentView,modernizr, webshims, detailTemplate){
	var AppointmentDetailView = AppointmentView.extend({
	tagName : "ul",
	id : "appList",
	template : _.template(detailTemplate),
	events : {
		'click .edit-save' : 'updateAppointment',
		'click .start-cover' : 'toggleInput',

	},
	initialize : function() {
		
		//this.listenTo(this.model, 'change', this.render);
		$("#main-data").html(this.el);
		$('#content').addClass('editApp');

		this.render();

	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		$.webshims.loader.basePath = 'lib/shims';
       // $.webshims.polyfill('forms forms-ext');
		this.$el.updatePolyfill();
		this.$el.prepend("<header>" +
		 "<nav><ul id='main-nav'><li><a href='#edit'>Cancel</a></li><li><a href='#home'>My Appointments</a></li>" + 
		 "<li class='edit-save' ><a class='pr' href='#save'>Save</a></li></ul>" + "</nav></header>");
		return this;

	},
	toggleInput : function(e) {
		$(e.currentTarget).hide();
		$(e.currentTarget).next('.start-input').show();

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
			this.model.save(formData).complete(function() {
				router.navigate('edit', true)

			});
		}

	},
	valid : function(f) {

		for (var v in f) {
			if (f[v] == '') {
				alert('please enter a value');
				return false;
			}

		}
		if (new Date(f['startTime']) > new Date(f['endTime'])) {
			alert('end date must come after start date');
			return false
		}

		return true;
	},
	close : function() {

		$('#content').removeClass('editApp');
		this.$el.empty();
		this.remove();
		this.el = null;
		this.$el = null;

	}
});
	return AppointmentDetailView;
});