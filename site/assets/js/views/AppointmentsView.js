define(["lib/backbone", "views/AppointmentView", "views/HeaderView", "collections/AppointmentsList"], function(Backbone, AppointmentView, HeaderView, Collection) {
	var AppointmentsView = Backbone.View.extend({
		tagName : "ul",
		id : "appList",
		subViews : [],

		initialize : function(e) {

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
		formatDate : function(d) {
			return $.format.date(new Date(d), 'ddd, MMMM d, yyyy').toUpperCase()
		},
		render : function() {
			var self = this;
			var temp_date = new Date(this.collection.first().get('startTime'));
			var hView = new HeaderView({
				temp_date : temp_date,
				id : this.collection.first().get('_id')
			});
			self.$el.append(hView.el);
			self.subViews.push(hView);
			this.collection.forEach(function(model) {

				var cView = new AppointmentView({
					model : model
				})
				if (new Date(model.get('startTime')).getDay() != new Date(temp_date).getDay()) {
					temp_date = model.get('startTime')
					var hView = new HeaderView({
						temp_date : temp_date,
						id : model.get('_id')
					});
					self.$el.append(hView.el);
					self.subViews.push(hView);
				}

				self.subViews.push(cView);
				self.$el.append(cView.el);

			})

			this.$el.prepend("<header>" + "<nav><ul id='main-nav'><li><a href='#edit'>Edit</a></li><li><a href='#home'>My Appointments</a></li>" + "<li  class='nav-last'><div class='add-main-inner'><a href='#add' class='add-main'>+</a></div></li></ul>" + "</nav></header>");

		},

		close : function() {
			while (this.subViews.length) {
				var x = this.subViews.pop();
				x.$el.empty();
				x.$el.remove();
				x.remove();

			}
			this.$el.remove();
			this.remove();
			this.el = null;
			// ???
			this.$el = null;
			// ???
			vent.off('dateheadercheck', this.checkHeader, this);
		}
	});
return AppointmentsView;
});

