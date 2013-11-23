
define(["lib/backbone", "views/AppointmentsView", "views/HeaderView","views/EditView", "collections/AppointmentsList"], function(Backbone, AppointmentsView, HeaderView,EditAppointmentView, Collection) {
	var EditAppointmentsView = AppointmentsView.extend({
	id : "appList",
	initialize : function(e) {
		vent.on('dateheadercheck', this.checkHeader, this);
		vent.trigger('switchhead', 'edit')
		this.collection = new Collection();
		// sort by date ascending
		this.collection.comparator = function(m) {
			return m.get("startTime");
		};

		this.collection.sort();
		$("#main-data").html(this.el);

		var self = this;
		this.collection.fetch({
		}).complete(function() {
			self.render();
		});
	},
	render : function() {
		var self = this;
		var temp_model = this.collection.first();
		var temp_date = new Date(temp_model.get('startTime'));
		var hView = new HeaderView({
			temp_date : temp_date,
			id : temp_model.get('_id'),
			classId : temp_model.get('_id')
		});
		self.$el.append(hView.el);
		self.subViews.push(hView);

		this.collection.forEach(function(model) {
			if (new Date(model.get('startTime')).getDay() != new Date(temp_date).getDay()) {
				temp_model = model;
				temp_date = temp_model.get('startTime');
				var hView = new HeaderView({
					temp_date : temp_date,
					id : temp_model.get('_id'),
					classId : temp_model.get('_id')
				});
				self.$el.append(hView.el);
				self.subViews.push(hView);
			}
			var cView = new EditAppointmentView({
				model : model,
				headId : model.get('_id'),
				classId : temp_model.get('_id')
			});
			self.subViews.push(cView);
			self.$el.append(cView.el);

		})

		/*this.$el.prepend("<header>" + "<nav><ul id='main-nav'><li><a href='#home'>Done</a></li><li><a href='#edit'>Edit Appointments</a></li>" + "<li  class='nav-last'></li></ul>" + "</nav></header>");
*/
	},
	checkHeader : function(e) {
		//find total number of the day's class
		$listCount = $('.' + $(e.$el[0]).attr('class').split(' ')[0]).length - 1;
		// if only one, it is the heeader
		if ($listCount == 1) {
			//search views remove the header from subviews
			for (var i = this.subViews.length - 1; i >= 0; i--) {
				var check = (this.subViews[i].id ? this.subViews[i].id : this.subViews[i].model.id )
				if (check == $(e.$el[0]).attr('class').split(' ')[0]) {
					var x = this.subViews.splice(i, 1);
					x[0].remove();
				}
			}
		} else {
			// if it is not the header, remove based on id in removeOneSubview
			this.removeOneSubview(e);
		}

	},
	removeOneSubview : function(e) {
		for (var i = this.subViews.length - 1; i >= 0; i--) {
			if (this.subViews[i].model.id == e.model.id) {
				if (!e.$el.find('.date-head')) {
					var x = this.subViews.splice(i, 1);
					x[0].remove();
				}

			}
		}

	}
}); 

return EditAppointmentsView;
	
});
