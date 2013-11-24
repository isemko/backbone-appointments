define(["lib/backbone", "lib/underscore", "models/Appointment", "views/DetailView", "lib/modernizr-custom", "lib/polyfiller", 'lib/text!templates/add.html'], function(Backbone, _, Appointment, DetailView, modernizr, webshims, addTemplate) {
	var AppointmentAddView = DetailView.extend({
		template : _.template(addTemplate),
		render : function() {
			this.model = {
				today : new Date()
			};
			this.$el.html(this.template(this.model));
			$.webshims.loader.basePath = 'lib/shims';
		$.webshims.setOptions('forms forms-ext', {
			replaceUI : false,
			waitReady : false,
			debug: false,
			addValidators: true
		});
			this.$el.updatePolyfill();
			vent.trigger('switchhead', 'detail');
			vent.on('add-save', this.updateAppointment, this);
			return this;

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
			var v =  this.valid(formData);
			this.$el.find('.error').html('');
			if (!v) {
				var appV = new Appointment(formData)
				appV.save(formData).complete(function() {
					router.navigate('home', true);
						
					$('#main-data').attr('class', 'center transition');
					
					$('#alt-data').attr('class', 'right transition');
				});
			}
			else{
				for(var o in v){
					if(v[o].name =='startTime'){
						this.$el.find('.endtTime-error').html(v[o].message);
					}
					else{
						this.$el.find('.'+v[o].name+'-error').html(v[o].message);
					}
					
				}
				
			}

		},
	});
	return AppointmentAddView;
});

