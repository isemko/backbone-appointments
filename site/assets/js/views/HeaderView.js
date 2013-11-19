define(["lib/backbone", "jqdate"], function(Backbone, jqdate){
var HeaderView = Backbone.View.extend({
	tagName : 'li',
	className : 'date-head',
	template : _.template("<%=  $.format.date(new Date(temp_date), 'ddd, MMMM d, yyyy').toUpperCase() %> "),
	initialize : function(options) {

		this.$el.attr("class", options.classId + ' ' + this.$el.attr('class'));
		this.model = options;
		this.id = this.model.id;
		this.render();
	},
	render : function() {

		this.$el.html(this.template(this.model));

		return this;
	}

});
return HeaderView;
});