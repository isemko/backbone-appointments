// Module dependencies.

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/appointments';

var application_root = __dirname, express = require('express'), //Web framework
path = require('path'), //Utilities for dealing with file paths

mongoose = require('mongoose');
//MongoDB integration

//Create server
var app = express();

// Configure server
app.configure(function() {
	//parses request body and populates request.body
	app.use(express.bodyParser());

	//checks request.body for HTTP method overrides
	app.use(express.methodOverride());

	//perform route lookup based on url and HTTP method
	app.use(app.router);

	//Where to serve static content
	app.use(express.static(path.join(application_root, 'site')));

	//Show all errors in development
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});
mongoose.connect(mongoUri);

//Schemas

var Appointment = new mongoose.Schema({
	title : String,
	startTime : Date,
	endTime : Date,
	appointmentName : String,
	description : String
});

app.get('/api/appointments', function(request, response) {
	return AppointmentModel.find(function(err, apps) {
		if (!err) {
			return response.send(apps);
		} else {
			return console.log(err);
		}
	});
});
app.post('/api/appointments', function(request, response) {
	var appointment = new AppointmentModel({
		title : request.body.title,
		startTime : request.body.startTime,
		endTime : request.body.endTime,
		appointmentName : request.body.appointmentName,
		description : request.body.description

	});
	appointment.save(function(err) {
		if (!err) {
			return console.log('created appointment');
		} else {
			return console.log(err);
		}
	});
	return response.send(appointment);
});
app.get('/api/appointments/:id', function(request, response) {
	return AppointmentModel.findById(request.params.id, function(err, appointment) {
		if (!err) {
			return response.send(appointment);
		} else {
			return console.log(err);
		}
	});
});
app.put('/api/appointments/:id', function(request, response) {
	console.log('Updating appointment ' + request.body.title);
	return AppointmentModel.findById(request.params.id, function(err, appointment) {

		appointment.title = request.body.title, 
		appointment.startTime = request.body.startTime, 
		appointment.endTime = request.body.endTime, 
		appointment.appointmentName = request.body.appointmentName,
		 appointment.description = request.body.description;
		 console.log(appointment)
		return appointment.save(function(err) {
			if (!err) {
				//console.log('appointment updated asdass');
			} else {
				console.log(err);
			}
			return response.send(appointment);
		});
	});
});
app.delete( '/api/appointments/:id', function( request, response ) {
    console.log( 'Deleting appointmnet with id: ' + request.params.id );
    return AppointmentModel.findById( request.params.id, function( err, appointment ) {
        return appointment.remove( function( err ) {
            if( !err ) {
                console.log( 'appointment removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});
//Models
var AppointmentModel = mongoose.model('Appointment', Appointment);
//Start server
var port = 5000;
app.listen(process.env.PORT || 5000, function() {
	console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
