define(["lib/backbone", "views/EditView", "views/HeaderView", "collections/AppointmentsList"], function(Backbone, EditAppointmentView, HeaderView, Collection) {
	var AppointmentsView = Backbone.View.extend({
		tagName : "ul",
		id : "appList",
		subViews : [],
		events : {
			'click .edit' : 'editView'
			
		},
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

			/*this.$el.prepend("<header>" + "<nav><ul id='main-nav'><li><a  class='edit'>Edit</a></li><li><a href='#home'>My Appointments</a></li>" + "<li  class='nav-last'><div class='add-main-inner'><a href='#add' class='add-main'>+</a></div></li></ul>" + "</nav></header>");
		*/	
	//this.$el.prepend("<header>" + "<nav><ul id='main-nav'><li><a href='#home'>Done</a></li><li><a href='#edit'>Edit Appointments</a></li>" + "<li  class='nav-last'></li></ul>" + "</nav></header>");

		},
		editView: function(){
		

		}
,
		close : function() {
			while (this.subViews.length) {
				var x = this.subViews.pop();
				x.$el.empty();
				x.$el.remove();
				x.remove();
				vent.off('show-edit', x.editView, x);

			}
			//this.$el.find('nav li').each(function(){this.})

			//console.log(this.$el)
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

